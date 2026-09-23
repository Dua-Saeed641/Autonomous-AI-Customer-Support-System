"""
Mock Enterprise Services for Phrona Prototype
Includes Customer API, Order API, Payment API, Refund API, and Shipping API.
"""

from typing import Dict, Any

MOCK_CUSTOMERS: Dict[str, Dict[str, Any]] = {
    "CUS-20481": {
        "customer_id": "CUS-20481",
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "plan": "Premium",
        "account_age": "2 years",
        "previous_tickets_count": 7,
        "recent_sentiment": "Frustrated",
        "verified_identity": True
    },
    "CUS-10294": {
        "customer_id": "CUS-10294",
        "name": "Maya Patel",
        "email": "maya.patel@example.com",
        "plan": "Enterprise",
        "account_age": "3 years",
        "previous_tickets_count": 12,
        "recent_sentiment": "Neutral",
        "verified_identity": True
    },
    "CUS-30192": {
        "customer_id": "CUS-30192",
        "name": "Rohan Mehta",
        "email": "rohan.mehta@example.com",
        "plan": "Standard",
        "account_age": "6 months",
        "previous_tickets_count": 3,
        "recent_sentiment": "Frustrated",
        "verified_identity": True
    }
}

MOCK_ORDERS: Dict[str, Dict[str, Any]] = {
    "ORD-83921": {
        "order_id": "ORD-83921",
        "customer_id": "CUS-20481",
        "order_date": "2026-09-23T18:30:00Z",
        "items": [
            {"sku": "PRO-LINE-4K", "title": "UltraHD Streaming WebCam", "qty": 1, "price": 2499}
        ],
        "total_amount": 2499,
        "currency": "INR",
        "status": "FULFILLED"
    },
    "ORD-77192": {
        "order_id": "ORD-77192",
        "customer_id": "CUS-30192",
        "order_date": "2026-09-20T11:15:00Z",
        "items": [
            {"sku": "AUD-BT-HEADSET", "title": "Noise Canceller Headphones", "qty": 1, "price": 1850}
        ],
        "total_amount": 1850,
        "currency": "INR",
        "status": "CANCELLED"
    }
}

MOCK_PAYMENTS: Dict[str, Dict[str, Any]] = {
    "ORD-83921": {
        "order_id": "ORD-83921",
        "total_transactions": 2,
        "transactions": [
            {
                "transaction_id": "TXN-83921-A",
                "timestamp": "2026-09-23T18:30:02Z",
                "amount": 2499,
                "currency": "INR",
                "gateway": "Razorpay",
                "status": "SETTLED",
                "card_last4": "4021"
            },
            {
                "transaction_id": "TXN-83921-B",
                "timestamp": "2026-09-23T18:30:14Z",
                "amount": 2499,
                "currency": "INR",
                "gateway": "Razorpay",
                "status": "SETTLED",
                "card_last4": "4021"
            }
        ]
    }
}

class MockEnterpriseServices:
    @staticmethod
    def get_customer(customer_id: str) -> Dict[str, Any]:
        return MOCK_CUSTOMERS.get(customer_id, {
            "customer_id": customer_id,
            "name": "Standard Customer",
            "plan": "Standard",
            "verified_identity": True
        })

    @staticmethod
    def get_order(order_id: str) -> Dict[str, Any]:
        return MOCK_ORDERS.get(order_id, {
            "order_id": order_id,
            "status": "UNKNOWN",
            "total_amount": 0
        })

    @staticmethod
    def get_payment_transactions(order_id: str) -> Dict[str, Any]:
        return MOCK_PAYMENTS.get(order_id, {
            "order_id": order_id,
            "total_transactions": 1,
            "transactions": [{"transaction_id": "TXN-DEFAULT", "amount": 1000, "status": "SETTLED"}]
        })

    @staticmethod
    def check_refund_policy(order_id: str, is_duplicate: bool) -> Dict[str, Any]:
        if is_duplicate:
            return {
                "eligible": True,
                "policy_code": "POL-DUP-REFUND-v2",
                "max_permitted_refund": 2499,
                "requires_human_approval": True,
                "reason": "Duplicate transaction detected within 10-minute window."
            }
        return {"eligible": False, "reason": "Standard non-returnable timeframe."}

    @staticmethod
    def issue_refund(transaction_id: str, amount: int, reason: str) -> Dict[str, Any]:
        return {
            "refund_id": "RFD-28192",
            "transaction_id": transaction_id,
            "amount_refunded": amount,
            "currency": "INR",
            "status": "EXECUTED",
            "timestamp": "2026-09-23T19:42:22Z"
        }

    @staticmethod
    def verify_refund(refund_id: str) -> Dict[str, Any]:
        return {
            "refund_id": refund_id,
            "verification_status": "VERIFIED",
            "gateway_ack_code": "ACK-88201-SETTLED",
            "customer_notified": True
        }
