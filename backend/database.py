import sqlite3
import json
from datetime import datetime, timezone

DB_PATH = "phrona.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Customers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        plan TEXT NOT NULL,
        account_age TEXT NOT NULL,
        ticket_count INTEGER DEFAULT 0,
        sentiment TEXT DEFAULT 'Neutral'
    )
    """)

    # Tickets
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tickets (
        id TEXT PRIMARY KEY,
        customer_id TEXT NOT NULL,
        subject TEXT NOT NULL,
        status TEXT NOT NULL,
        priority TEXT NOT NULL,
        urgency TEXT NOT NULL,
        intent TEXT NOT NULL,
        sentiment TEXT NOT NULL,
        confidence INTEGER NOT NULL,
        assigned_agent TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        resolution_time TEXT
    )
    """)

    # Messages
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id TEXT NOT NULL,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
    """)

    # Agents
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        current_tickets INTEGER DEFAULT 0,
        resolved_today INTEGER DEFAULT 0,
        avg_confidence INTEGER DEFAULT 90,
        current_task TEXT,
        current_operation TEXT
    )
    """)

    # Agent Events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS agent_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id TEXT NOT NULL,
        agent TEXT NOT NULL,
        event_type TEXT NOT NULL,
        description TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        status TEXT NOT NULL
    )
    """)

    # Tool Calls
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tool_calls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id TEXT NOT NULL,
        tool_name TEXT NOT NULL,
        parameters TEXT NOT NULL,
        result TEXT,
        status TEXT NOT NULL,
        duration_ms INTEGER DEFAULT 0,
        timestamp TEXT NOT NULL
    )
    """)

    # Knowledge Documents
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS knowledge_documents (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        reference_count INTEGER DEFAULT 0,
        last_updated TEXT NOT NULL
    )
    """)

    # Human Events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS human_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        previous_ai_action TEXT,
        human_action TEXT NOT NULL,
        reason TEXT,
        operator TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
    """)

    # Learning Signals
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS learning_signals (
        id TEXT PRIMARY KEY,
        ticket_id TEXT NOT NULL,
        source_event_id TEXT,
        signal_type TEXT NOT NULL,
        expected_action TEXT NOT NULL,
        observed_action TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()

def seed_db():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Reset tables if needed
    cursor.execute("DELETE FROM customers")
    cursor.execute("DELETE FROM tickets")
    cursor.execute("DELETE FROM messages")
    cursor.execute("DELETE FROM agents")
    cursor.execute("DELETE FROM agent_events")
    cursor.execute("DELETE FROM tool_calls")
    cursor.execute("DELETE FROM knowledge_documents")
    cursor.execute("DELETE FROM human_events")
    cursor.execute("DELETE FROM learning_signals")

    now = datetime.now(timezone.utc).isoformat()

    # Seed Customers
    cursor.executemany("""
    INSERT INTO customers (id, name, email, plan, account_age, ticket_count, sentiment)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, [
        ("CUS-20481", "Aarav Sharma", "aarav.sharma@example.com", "Premium", "2 years", 7, "Frustrated"),
        ("CUS-10294", "Maya Patel", "maya.patel@example.com", "Enterprise", "3 years", 12, "Neutral"),
        ("CUS-30192", "Rohan Mehta", "rohan.mehta@example.com", "Standard", "6 months", 3, "Frustrated"),
        ("CUS-40582", "Priya Singh", "priya.singh@example.com", "Premium", "1 year", 5, "Neutral"),
        ("CUS-50129", "Vikram Malhotra", "vikram.m@example.com", "Standard", "3 months", 2, "Frustrated")
    ])

    # Seed Agents
    cursor.executemany("""
    INSERT INTO agents (id, name, status, current_tickets, resolved_today, avg_confidence, current_task, current_operation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, [
        ("AGENT-BILLING", "Billing Agent", "ACTIVE", 3, 28, 94, "PH-1042", "Verifying duplicate payment"),
        ("AGENT-ACCOUNT", "Account Agent", "IDLE", 0, 19, 98, None, "Monitoring account security logs"),
        ("AGENT-TECH", "Technical Agent", "ACTIVE", 2, 14, 91, "PH-1046", "Analyzing device error log"),
        ("AGENT-ORDER", "Order Agent", "ACTIVE", 1, 22, 95, "PH-1044", "Checking refund status"),
        ("AGENT-LOGISTICS", "Logistics Agent", "IDLE", 0, 16, 92, "PH-1045", "Tracking package carrier status")
    ])

    # Seed Tickets
    cursor.executemany("""
    INSERT INTO tickets (id, customer_id, subject, status, priority, urgency, intent, sentiment, confidence, assigned_agent, created_at, updated_at, resolution_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, [
        ("PH-1042", "CUS-20481", "Duplicate payment charged for order ORD-83921", "NEW", "HIGH", "High", "Duplicate Payment", "Frustrated", 96, "Billing Agent", now, now, None),
        ("PH-1043", "CUS-10294", "Unable to access account after password reset", "RESOLVED", "MEDIUM", "Medium", "Account Locked", "Neutral", 98, "Account Agent", now, now, "1m 12s"),
        ("PH-1044", "CUS-30192", "Refund not received for cancelled item", "WAITING_FOR_HUMAN", "HIGH", "High", "Refund Status", "Frustrated", 81, "Billing Agent", now, now, None),
        ("PH-1045", "CUS-40582", "Shipment delayed beyond delivery estimate", "ANALYZING", "LOW", "Low", "Shipment Delay", "Neutral", 92, "Logistics Agent", now, now, None),
        ("PH-1046", "CUS-50129", "Product features crashing on launch", "ACTIVE", "CRITICAL", "High", "Technical Issue", "Angry", 68, "Technical Agent", now, now, None)
    ])

    # Seed Messages
    cursor.executemany("""
    INSERT INTO messages (ticket_id, sender, content, timestamp)
    VALUES (?, ?, ?, ?)
    """, [
        ("PH-1042", "CUSTOMER", "I was charged twice for the same order (ORD-83921) and I need one of the payments refunded immediately.", now),
        ("PH-1043", "CUSTOMER", "I reset my password 10 mins ago but it still says account locked.", now),
        ("PH-1043", "PHRONA", "I verified your identity token and unlocked your account. A password reset link has been dispatched to maya.patel@example.com.", now),
        ("PH-1044", "CUSTOMER", "I cancelled order ORD-77192 three days ago and haven't seen the credit back.", now),
        ("PH-1044", "PHRONA", "I am retrieving payment gateway records for ORD-77192. Transaction ID TXN-99102 is currently marked PENDING gateway authorization.", now),
        ("PH-1045", "CUSTOMER", "My order ORD-99201 was supposed to arrive yesterday.", now),
        ("PH-1046", "CUSTOMER", "I've been charged but something is wrong with my order and the app keeps crashing.", now)
    ])

    # Seed Knowledge Documents
    cursor.executemany("""
    INSERT INTO knowledge_documents (id, title, category, content, reference_count, last_updated)
    VALUES (?, ?, ?, ?, ?, ?)
    """, [
        ("KBD-01", "Billing Refund Policy", "Billing", "If two successful transactions exist for the same order within 10 minutes, verify duplicate charge and issue a full refund to the original payment method.", 42, "2026-09-20"),
        ("KBD-02", "Payment Processing Guide", "Billing", "Duplicate charges require checking payment gateway transaction hashes before initiating automated reversal. Transaction status must be SETTLED.", 38, "2026-09-18"),
        ("KBD-03", "Account Lock Recovery", "Account", "Accounts locked due to repeated failed logins can be unlocked automatically after 2FA token verification or supervisor approval.", 29, "2026-09-15"),
        ("KBD-04", "Shipment Delay & Claims Policy", "Logistics", "If tracking shows carrier delay > 48 hours, issue a priority re-shipment or provide a $15 courtesy shipping credit.", 19, "2026-09-12"),
        ("KBD-05", "Technical Crash Diagnostic Guide", "Technical", "For launch crashes on Android/iOS build 4.2+, check API rate limits and local cache corruption before escalating.", 14, "2026-09-10")
    ])

    # Seed Agent Events
    cursor.executemany("""
    INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
    VALUES (?, ?, ?, ?, ?, ?)
    """, [
        ("PH-1042", "Billing Agent", "INTENT_DETECTED", "Intent classified as Duplicate Payment (Confidence: 96%)", now, "COMPLETED"),
        ("PH-1042", "Billing Agent", "AGENT_ASSIGNED", "Billing Agent assigned based on payment category", now, "COMPLETED"),
        ("PH-1043", "Account Agent", "ACTION_VERIFIED", "Account unlock operation verified successfully", now, "COMPLETED"),
        ("PH-1044", "Billing Agent", "ACTION_PROPOSED", "Refund of ₹1,850 proposed — awaiting supervisor approval", now, "WAITING")
    ])

    # Seed Tool Calls
    cursor.executemany("""
    INSERT INTO tool_calls (ticket_id, tool_name, parameters, result, status, duration_ms, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, [
        ("PH-1042", "get_customer", "{\"customer_id\": \"CUS-20481\"}", "{\"status\": \"active\", \"plan\": \"Premium\"}", "COMPLETED", 45, now),
        ("PH-1042", "get_order", "{\"order_id\": \"ORD-83921\"}", "{\"amount\": 2499, \"status\": \"FULFILLED\"}", "COMPLETED", 62, now),
        ("PH-1042", "get_payment_transactions", "{\"order_id\": \"ORD-83921\"}", "{\"transactions\": [{\"txn_id\": \"TXN-101\", \"status\": \"SETTLED\"}, {\"txn_id\": \"TXN-102\", \"status\": \"SETTLED\"}]}", "COMPLETED", 88, now),
        ("PH-1042", "check_refund_policy", "{\"category\": \"duplicate\"}", "{\"eligible\": true, \"max_amount\": 2499}", "COMPLETED", 30, now),
        ("PH-1042", "issue_refund", "{\"txn_id\": \"TXN-102\", \"amount\": 2499}", None, "NOT_STARTED", 0, now),
        ("PH-1042", "verify_refund", "{\"refund_id\": \"RFD-28192\"}", None, "NOT_STARTED", 0, now)
    ])

    # Seed Human Events
    cursor.executemany("""
    INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, [
        ("PH-1044", "APPROVAL_REQUESTED", "Proposed ₹1,850 refund", "Awaiting human operator approval", "High transaction threshold rule", "System", now),
        ("PH-1041", "CORRECTION", "Proposed full replacement", "Issued partial refund ₹500", "Customer opted to keep item", "Operator #01", now),
        ("PH-1039", "GUIDANCE", "Low confidence classification", "Guided intent to Account Recovery", "Ambiguous phrasing", "Supervisor #04", now)
    ])

    # Seed Learning Signals
    cursor.executemany("""
    INSERT INTO learning_signals (id, ticket_id, source_event_id, signal_type, expected_action, observed_action, description, status, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, [
        ("LS-0281", "PH-1041", "HE-101", "Human Correction", "Automatic full replacement", "Partial refund issued", "Decision mismatch detected: Customer requested partial refund option", "RECORDED", now),
        ("LS-0280", "PH-1039", "HE-100", "Human Guidance", "Default general support route", "Routed to Account Specialist", "Guidance signal saved for low-confidence phrasing pattern", "RECORDED", now),
        ("LS-0279", "PH-1035", "HE-098", "Tool Failure", "Immediate gateway query", "Gateway timeout retry mandatory", "Tool resilience signal added to Payment API wrapper", "RECORDED", now)
    ])

    conn.commit()
    conn.close()

if __name__ == "__main__":
    seed_db()
    print("Database initialized and seeded successfully.")
