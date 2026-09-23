from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
import json
import sqlite3
import asyncio

from backend.database import get_db_connection, seed_db
from backend.services.demo_orchestrator import demo_orchestrator
from backend.services.mock_enterprise_apis import MockEnterpriseServices

app = FastAPI(title="PHRONA Autonomous Support Operations API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    seed_db()

# --- OVERVIEW DASHBOARD ---
@app.get("/api/overview")
def get_overview():
    conn = get_db_connection()
    cursor = conn.cursor()

    # KPIs
    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status != 'RESOLVED'")
    active_tickets = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status = 'RESOLVED'")
    ai_resolutions = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM human_events")
    human_interventions = cursor.fetchone()[0]

    avg_resolution = "42s"
    ai_confidence = 94

    # Live tickets
    cursor.execute("""
    SELECT t.id, c.name as customer_name, t.subject, t.intent, t.assigned_agent, t.status, t.confidence, t.priority, t.updated_at
    FROM tickets t
    JOIN customers c ON t.customer_id = c.id
    ORDER BY t.updated_at DESC
    """)
    tickets = [dict(row) for row in cursor.fetchall()]

    # Activity Log
    cursor.execute("""
    SELECT ticket_id, agent, event_type, description, timestamp, status
    FROM agent_events
    ORDER BY id DESC LIMIT 15
    """)
    activities = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return {
        "kpis": {
            "active_tickets": active_tickets,
            "ai_resolutions": ai_resolutions,
            "human_interventions": human_interventions,
            "avg_resolution": avg_resolution,
            "ai_confidence": f"{ai_confidence}%"
        },
        "tickets": tickets,
        "activities": activities
    }

# --- TICKETS ---
@app.get("/api/tickets")
def get_tickets(status: Optional[str] = None, agent: Optional[str] = None, priority: Optional[str] = None, search: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    SELECT t.*, c.name as customer_name, c.email as customer_email, c.plan as customer_plan
    FROM tickets t
    JOIN customers c ON t.customer_id = c.id
    WHERE 1=1
    """
    params = []

    if status and status != 'ALL':
        query += " AND t.status = ?"
        params.append(status)
    if agent and agent != 'ALL':
        query += " AND t.assigned_agent = ?"
        params.append(agent)
    if priority and priority != 'ALL':
        query += " AND t.priority = ?"
        params.append(priority)
    if search:
        query += " AND (t.id LIKE ? OR c.name LIKE ? OR t.subject LIKE ? OR t.intent LIKE ?)"
        s = f"%{search}%"
        params.extend([s, s, s, s])

    query += " ORDER BY t.created_at DESC"
    cursor.execute(query, params)
    tickets = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return tickets

@app.get("/api/tickets/{ticket_id}")
def get_ticket_detail(ticket_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Ticket & Customer
    cursor.execute("""
    SELECT t.*, c.name as customer_name, c.email as customer_email, c.plan as customer_plan,
           c.account_age as customer_account_age, c.ticket_count as customer_ticket_count
    FROM tickets t
    JOIN customers c ON t.customer_id = c.id
    WHERE t.id = ?
    """, (ticket_id,))
    ticket_row = cursor.fetchone()

    if not ticket_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Ticket not found")

    ticket = dict(ticket_row)

    # Messages
    cursor.execute("SELECT * FROM messages WHERE ticket_id = ? ORDER BY id ASC", (ticket_id,))
    messages = [dict(row) for row in cursor.fetchall()]

    # Agent Events (Timeline)
    cursor.execute("SELECT * FROM agent_events WHERE ticket_id = ? ORDER BY id ASC", (ticket_id,))
    events = [dict(row) for row in cursor.fetchall()]

    # Tool Calls
    cursor.execute("SELECT * FROM tool_calls WHERE ticket_id = ? ORDER BY id ASC", (ticket_id,))
    tool_calls = [dict(row) for row in cursor.fetchall()]
    for tc in tool_calls:
        if tc["parameters"]:
            try:
                tc["parameters"] = json.loads(tc["parameters"])
            except:
                pass
        if tc["result"]:
            try:
                tc["result"] = json.loads(tc["result"])
            except:
                pass

    # Knowledge Docs (simulated relevant lookup)
    cursor.execute("SELECT * FROM knowledge_documents LIMIT 3")
    knowledge_sources = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return {
        "ticket": ticket,
        "messages": messages,
        "events": events,
        "tool_calls": tool_calls,
        "knowledge_sources": knowledge_sources
    }

class HumanActionRequest(BaseModel):
    action_type: str  # GUIDE, APPROVE, CORRECT, OVERRIDE
    input_text: Optional[str] = None
    reason: Optional[str] = None

@app.post("/api/tickets/{ticket_id}/human-action")
def handle_human_action(ticket_id: str, req: HumanActionRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now(timezone.utc).isoformat()

    if req.action_type == "APPROVE":
        cursor.execute("UPDATE tickets SET status = 'VERIFYING', updated_at = ? WHERE id = ?", (now, ticket_id))
        cursor.execute("""
        INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
        VALUES (?, 'APPROVAL', 'Proposed Action', 'Human supervisor approved action execution', ?, 'Operator #01', ?)
        """, (ticket_id, req.reason or "Action approved", now))

        # Execute refund tool call if pending
        ref_data = MockEnterpriseServices.issue_refund("TXN-83921-B", 2499, "Duplicate Payment")
        cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED' WHERE ticket_id = ? AND tool_name = 'issue_refund'", (json.dumps(ref_data), ticket_id))

        ver_data = MockEnterpriseServices.verify_refund("RFD-28192")
        cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED' WHERE ticket_id = ? AND tool_name = 'verify_refund'", (json.dumps(ver_data), ticket_id))

        cursor.execute("""
        INSERT INTO messages (ticket_id, sender, content, timestamp)
        VALUES (?, 'PHRONA', 'I confirmed that two payment transactions were recorded for this order. Refund reference RFD-28192 has been executed and verified.', ?)
        """, (ticket_id, now))

        cursor.execute("UPDATE tickets SET status = 'RESOLVED', updated_at = ? WHERE id = ?", (now, ticket_id))

    elif req.action_type == "GUIDE":
        cursor.execute("""
        INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
        VALUES (?, 'GUIDANCE', 'Uncertain intent', ?, ?, 'Operator #01', ?)
        """, (ticket_id, f"Human Guidance: {req.input_text}", req.reason or "Guidance provided", now))
        cursor.execute("UPDATE tickets SET status = 'ACTIVE', confidence = 95, updated_at = ? WHERE id = ?", (now, ticket_id))

    elif req.action_type == "CORRECT":
        cursor.execute("""
        INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
        VALUES (?, 'CORRECTION', 'Proposed full refund', ?, ?, 'Operator #01', ?)
        """, (ticket_id, f"Human Correction: {req.input_text}", req.reason or "Decision correction", now))

        cursor.execute("""
        INSERT INTO learning_signals (id, ticket_id, source_event_id, signal_type, expected_action, observed_action, description, status, timestamp)
        VALUES (?, ?, 'HE-CUSTOM', 'Human Correction', 'Initial AI proposed action', ?, ?, 'RECORDED', ?)
        """, (f"LS-{int(datetime.now().timestamp())}", ticket_id, req.input_text or "Human corrected decision", req.reason or "Decision mismatch logged", now))

    elif req.action_type == "OVERRIDE":
        cursor.execute("""
        INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
        VALUES (?, 'OVERRIDE', 'AI Automated Flow', ?, ?, 'Operator #01', ?)
        """, (ticket_id, f"Human Override: {req.input_text}", req.reason or "Direct supervisor override", now))
        cursor.execute("UPDATE tickets SET status = 'RESOLVED', updated_at = ? WHERE id = ?", (now, ticket_id))

    conn.commit()
    conn.close()
    return {"status": "SUCCESS", "message": f"Human action {req.action_type} recorded successfully."}

# --- AGENTS ---
@app.get("/api/agents")
def get_agents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM agents")
    agents = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return agents

# --- CUSTOMERS ---
@app.get("/api/customers")
def get_customers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM customers")
    customers = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return customers

# --- KNOWLEDGE ---
@app.get("/api/knowledge")
def get_knowledge():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM knowledge_documents ORDER BY reference_count DESC")
    docs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return docs

class TeachRequest(BaseModel):
    topic: str
    category: str
    content: str

@app.post("/api/knowledge/teach")
def teach_phrona(req: TeachRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.now(timezone.utc).isoformat()
    doc_id = f"KBD-{int(datetime.now().timestamp())}"

    cursor.execute("""
    INSERT INTO knowledge_documents (id, title, category, content, reference_count, last_updated)
    VALUES (?, ?, ?, ?, 1, ?)
    """, (doc_id, req.topic, req.category, req.content, now))

    cursor.execute("""
    INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
    VALUES ('ORGANIZATIONAL', 'TEACHING', 'Standard Policy', ?, 'Added organizational memory', 'Operator #01', ?)
    """, (f"Taught Topic: {req.topic}", now))

    conn.commit()
    conn.close()
    return {"status": "SUCCESS", "doc_id": doc_id}

# --- HUMAN INTELLIGENCE ---
@app.get("/api/human-intelligence")
def get_human_intelligence():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM human_events ORDER BY id DESC")
    events = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return events

# --- LEARNING SIGNALS ---
@app.get("/api/learning-signals")
def get_learning_signals():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM learning_signals ORDER BY id DESC")
    signals = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return signals

# --- ANALYTICS ---
@app.get("/api/analytics")
def get_analytics():
    return {
        "metrics": {
            "tickets_today": 124,
            "resolved": 91,
            "active": 24,
            "human_interventions": 9,
            "average_resolution": "38s"
        },
        "intents": [
            {"name": "Billing", "count": 34},
            {"name": "Account", "count": 27},
            {"name": "Orders", "count": 22},
            {"name": "Technical", "count": 18},
            {"name": "Logistics", "count": 15},
            {"name": "Other", "count": 8}
        ],
        "agent_activity": [
            {"agent": "Billing Agent", "count": 32},
            {"agent": "Account Agent", "count": 27},
            {"agent": "Order Agent", "count": 22},
            {"agent": "Technical Agent", "count": 18},
            {"agent": "Logistics Agent", "count": 15}
        ]
    }

# --- DEMO ORCHESTRATION ---
@app.post("/api/demo/reset")
def reset_demo_endpoint():
    return demo_orchestrator.reset_demo()

@app.post("/api/demo/step/{step_num}")
async def run_demo_step(step_num: int):
    await demo_orchestrator.run_step(step_num)
    return {"status": "SUCCESS", "step": step_num}

@app.post("/api/demo/run")
async def run_full_demo():
    demo_orchestrator.reset_demo()
    for s in range(1, 7):
        await demo_orchestrator.run_step(s)
        await asyncio.sleep(0.3)
    return {"status": "SUCCESS", "message": "Full hero demo loop executed."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
