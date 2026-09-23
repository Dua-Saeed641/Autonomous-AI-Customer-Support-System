import asyncio
import json
from datetime import datetime, timezone
from backend.database import get_db_connection
from backend.services.mock_enterprise_apis import MockEnterpriseServices

class DemoOrchestrator:
    def __init__(self):
        self.is_running = False

    def reset_demo(self):
        self.is_running = False
        conn = get_db_connection()
        cursor = conn.cursor()
        now = datetime.now(timezone.utc).isoformat()

        # Reset ticket PH-1042
        cursor.execute("""
        UPDATE tickets SET
            status = 'NEW',
            assigned_agent = 'Billing Agent',
            intent = 'Duplicate Payment',
            sentiment = 'Frustrated',
            urgency = 'High',
            confidence = 96,
            updated_at = ?
        WHERE id = 'PH-1042'
        """, (now,))

        cursor.execute("DELETE FROM messages WHERE ticket_id = 'PH-1042'")
        cursor.execute("""
        INSERT INTO messages (ticket_id, sender, content, timestamp)
        VALUES ('PH-1042', 'CUSTOMER', 'I was charged twice for the same order (ORD-83921) and I need one of the payments refunded immediately.', ?)
        """, (now,))

        cursor.execute("DELETE FROM agent_events WHERE ticket_id = 'PH-1042'")
        cursor.execute("DELETE FROM tool_calls WHERE ticket_id = 'PH-1042'")
        cursor.execute("DELETE FROM learning_signals WHERE ticket_id = 'PH-1042'")

        # Seed initial pending tools for PH-1042
        tools = [
            ("get_customer", "{\"customer_id\": \"CUS-20481\"}", None, "NOT_STARTED", 0),
            ("get_order", "{\"order_id\": \"ORD-83921\"}", None, "NOT_STARTED", 0),
            ("get_payment_transactions", "{\"order_id\": \"ORD-83921\"}", None, "NOT_STARTED", 0),
            ("check_refund_policy", "{\"category\": \"duplicate\"}", None, "NOT_STARTED", 0),
            ("issue_refund", "{\"transaction_id\": \"TXN-83921-B\", \"amount\": 2499}", None, "NOT_STARTED", 0),
            ("verify_refund", "{\"refund_id\": \"RFD-28192\"}", None, "NOT_STARTED", 0)
        ]
        for name, params, res, status, dur in tools:
            cursor.execute("""
            INSERT INTO tool_calls (ticket_id, tool_name, parameters, result, status, duration_ms, timestamp)
            VALUES ('PH-1042', ?, ?, ?, ?, ?, ?)
            """, (name, params, res, status, dur, now))

        cursor.execute("UPDATE agents SET status = 'IDLE', current_operation = 'Waiting for queue' WHERE name = 'Billing Agent'")

        conn.commit()
        conn.close()

        return {"status": "SUCCESS", "message": "Demo state reset successfully."}

    async def run_step(self, step_num: int):
        conn = get_db_connection()
        cursor = conn.cursor()
        now = datetime.now(timezone.utc).isoformat()

        if step_num == 1:
            # Step 1: ANALYZING
            cursor.execute("UPDATE tickets SET status = 'ANALYZING', updated_at = ? WHERE id = 'PH-1042'", (now,))
            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'INTENT_DETECTED', 'Intent classified as Duplicate Payment (Confidence: 96%)', ?, 'COMPLETED')
            """, (now,))
            cursor.execute("UPDATE agents SET status = 'ANALYZING', current_operation = 'Analyzing intent and customer history' WHERE name = 'Billing Agent'")

        elif step_num == 2:
            # Step 2: ROUTING & RETRIEVING
            cursor.execute("UPDATE tickets SET status = 'ROUTING', updated_at = ? WHERE id = 'PH-1042'", (now,))
            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'AGENT_ASSIGNED', 'Specialist Billing Agent assigned based on intent', ?, 'COMPLETED')
            """, (now,))
            cursor.execute("UPDATE agents SET status = 'RETRIEVING', current_operation = 'Querying enterprise customer & order records' WHERE name = 'Billing Agent'")

            # Execute get_customer, get_order, get_payment_transactions
            c_data = MockEnterpriseServices.get_customer("CUS-20481")
            o_data = MockEnterpriseServices.get_order("ORD-83921")
            p_data = MockEnterpriseServices.get_payment_transactions("ORD-83921")

            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 42 WHERE ticket_id = 'PH-1042' AND tool_name = 'get_customer'", (json.dumps(c_data),))
            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 58 WHERE ticket_id = 'PH-1042' AND tool_name = 'get_order'", (json.dumps(o_data),))
            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 76 WHERE ticket_id = 'PH-1042' AND tool_name = 'get_payment_transactions'", (json.dumps(p_data),))

            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'MEMORY_RETRIEVED', 'Retrieved Customer CUS-20481 profile & 2 settled transactions for ORD-83921', ?, 'COMPLETED')
            """, (now,))

        elif step_num == 3:
            # Step 3: KNOWLEDGE & POLICY CHECK
            cursor.execute("UPDATE tickets SET status = 'ACTIVE', updated_at = ? WHERE id = 'PH-1042'", (now,))
            pol_data = MockEnterpriseServices.check_refund_policy("ORD-83921", is_duplicate=True)
            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 35 WHERE ticket_id = 'PH-1042' AND tool_name = 'check_refund_policy'", (json.dumps(pol_data),))

            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'KNOWLEDGE_RETRIEVED', 'Applied Billing Refund Policy (KBD-01). Duplicate refund of ₹2,499 eligible.', ?, 'COMPLETED')
            """, (now,))

            cursor.execute("""
            INSERT INTO messages (ticket_id, sender, content, timestamp)
            VALUES ('PH-1042', 'PHRONA', 'I am checking your payment and order records to verify whether the second charge is a duplicate.', ?)
            """, (now,))

        elif step_num == 4:
            # Step 4: ACTION PROPOSED -> AWAITING APPROVAL
            cursor.execute("UPDATE tickets SET status = 'WAITING_FOR_HUMAN', updated_at = ? WHERE id = 'PH-1042'", (now,))
            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'ACTION_PROPOSED', 'Proposed refund of ₹2,499 for TXN-83921-B. Human supervisor approval required.', ?, 'WAITING')
            """, (now,))
            cursor.execute("UPDATE agents SET status = 'WAITING', current_operation = 'Awaiting human operator approval' WHERE name = 'Billing Agent'")

        elif step_num == 5:
            # Step 5: HUMAN APPROVED & EXECUTE REFUND
            cursor.execute("UPDATE tickets SET status = 'VERIFYING', updated_at = ? WHERE id = 'PH-1042'", (now,))
            cursor.execute("""
            INSERT INTO human_events (ticket_id, event_type, previous_ai_action, human_action, reason, operator, timestamp)
            VALUES ('PH-1042', 'APPROVAL', 'Proposed refund ₹2,499', 'Approved automated duplicate refund execution', 'Verified duplicate payment settled on gateway', 'Operator #01', ?)
            """, (now,))

            ref_data = MockEnterpriseServices.issue_refund("TXN-83921-B", 2499, "Duplicate Payment")
            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 110 WHERE ticket_id = 'PH-1042' AND tool_name = 'issue_refund'", (json.dumps(ref_data),))
            cursor.execute("UPDATE agents SET status = 'ACTING', current_operation = 'Executing gateway refund RFD-28192' WHERE name = 'Billing Agent'")

            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'ACTION_EXECUTED', 'Refund RFD-28192 executed on gateway for ₹2,499', ?, 'COMPLETED')
            """, (now,))

        elif step_num == 6:
            # Step 6: VERIFICATION & RESOLVED
            ver_data = MockEnterpriseServices.verify_refund("RFD-28192")
            cursor.execute("UPDATE tool_calls SET result = ?, status = 'COMPLETED', duration_ms = 45 WHERE ticket_id = 'PH-1042' AND tool_name = 'verify_refund'", (json.dumps(ver_data),))

            cursor.execute("""
            INSERT INTO agent_events (ticket_id, agent, event_type, description, timestamp, status)
            VALUES ('PH-1042', 'Billing Agent', 'ACTION_VERIFIED', 'Refund RFD-28192 verified with settlement ACK-88201-SETTLED', ?, 'COMPLETED')
            """, (now,))

            cursor.execute("""
            INSERT INTO messages (ticket_id, sender, content, timestamp)
            VALUES ('PH-1042', 'PHRONA', 'I confirmed that two payment transactions were recorded for this order (ORD-83921). One payment of ₹2,499 has been refunded under refund reference RFD-28192. The funds will reflect in your account within 2-3 business days.', ?)
            """, (now,))

            cursor.execute("UPDATE tickets SET status = 'RESOLVED', resolution_time = '42s', updated_at = ? WHERE id = 'PH-1042'", (now,))
            cursor.execute("UPDATE agents SET status = 'IDLE', current_operation = 'Idle / Monitoring' WHERE name = 'Billing Agent'")

            # Create Learning Signal
            cursor.execute("""
            INSERT OR REPLACE INTO learning_signals (id, ticket_id, source_event_id, signal_type, expected_action, observed_action, description, status, timestamp)
            VALUES ('LS-0282', 'PH-1042', 'HE-105', 'Human Approval', 'Automated refund under duplicate policy', 'Human supervisor verified & approved refund execution', 'Successful resolution feedback logged into organizational memory', 'RECORDED', ?)
            """, (now,))

        conn.commit()
        conn.close()

demo_orchestrator = DemoOrchestrator()
