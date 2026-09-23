// Resolvyn (NEUROSERVE) Comprehensive Client-Side Domain Store
// Derived from technical architecture: Human-Embedded Biologically Inspired Autonomous Customer Support Intelligence System

export const INITIAL_KPIS = {
  active_tickets: 14,
  ai_resolutions: 182,
  human_interventions: 18,
  avg_resolution: "34s",
  ai_confidence: "96.4%",
  fcr_rate: "89.2%",
  containment_rate: "74.8%",
  prediction_error_delta: "-0.08"
};

export const INITIAL_CUSTOMERS = [
  {
    id: "CUS-20481",
    name: "Aarav Sharma",
    email: "aarav.sharma@enterprise-cloud.io",
    company: "Apex Dynamics",
    plan: "Enterprise Platinum",
    account_age: "2.4 years",
    ticket_count: 7,
    sentiment: "Frustrated",
    frustration_index: "78%",
    total_spend: "₹4,80,000",
    vip_status: true,
    previous_tickets: ["PH-0921 (Resolved)", "PH-0814 (Resolved)"]
  },
  {
    id: "CUS-10294",
    name: "Maya Patel",
    email: "maya.patel@fintech-labs.com",
    company: "FinLabs Global",
    plan: "Enterprise",
    account_age: "3.1 years",
    ticket_count: 12,
    sentiment: "Neutral",
    frustration_index: "22%",
    total_spend: "₹12,40,000",
    vip_status: true,
    previous_tickets: ["PH-1011 (Resolved)", "PH-0744 (Resolved)"]
  },
  {
    id: "CUS-30192",
    name: "Rohan Mehta",
    email: "rohan.mehta@hyperlogix.in",
    company: "HyperLogix Supply",
    plan: "Standard Scale",
    account_age: "7 months",
    ticket_count: 3,
    sentiment: "Frustrated",
    frustration_index: "64%",
    total_spend: "₹95,000",
    vip_status: false,
    previous_tickets: ["PH-1002 (Resolved)"]
  },
  {
    id: "CUS-40582",
    name: "Priya Singh",
    email: "priya.singh@strata-ai.org",
    company: "Strata AI",
    plan: "Enterprise Plus",
    account_age: "1.2 years",
    ticket_count: 5,
    sentiment: "Neutral",
    frustration_index: "18%",
    total_spend: "₹3,20,000",
    vip_status: true,
    previous_tickets: ["PH-0889 (Resolved)"]
  },
  {
    id: "CUS-50129",
    name: "Vikram Malhotra",
    email: "vikram.m@nexustech.co",
    company: "Nexus Technologies",
    plan: "Standard Growth",
    account_age: "3 months",
    ticket_count: 2,
    sentiment: "Angry",
    frustration_index: "91%",
    total_spend: "₹62,000",
    vip_status: false,
    previous_tickets: ["PH-1021 (Pending)"]
  }
];

export const INITIAL_AGENTS = [
  {
    id: "AGENT-BILLING",
    name: "Billing Specialist Agent",
    role: "Financial & Reconciliation",
    status: "ACTIVE",
    current_tickets: 3,
    resolved_today: 48,
    avg_confidence: 96,
    avg_latency: "410ms",
    current_task: "PH-1042",
    current_operation: "Settlement ledger cross-validation on Payment Gateway Y",
    tools_authorized: ["get_payment", "check_refund_policy", "issue_refund", "verify_refund"],
    sparse_routing_affinity: "98.2%"
  },
  {
    id: "AGENT-ORDER",
    name: "Order Lifecycle Agent",
    role: "Fulfillment & Catalog",
    status: "ACTIVE",
    current_tickets: 2,
    resolved_today: 39,
    avg_confidence: 95,
    avg_latency: "320ms",
    current_task: "PH-1044",
    current_operation: "Tracking inventory reservation release for cancelled order",
    tools_authorized: ["get_order", "update_order", "check_inventory", "cancel_order"],
    sparse_routing_affinity: "94.5%"
  },
  {
    id: "AGENT-TECH",
    name: "Diagnostics & Tech Agent",
    role: "System & API Diagnostics",
    status: "ACTIVE",
    current_tickets: 2,
    resolved_today: 28,
    avg_confidence: 91,
    avg_latency: "580ms",
    current_task: "PH-1046",
    current_operation: "Analyzing mobile stack trace and token corruption logs",
    tools_authorized: ["get_crash_logs", "reset_session", "check_api_health"],
    sparse_routing_affinity: "89.0%"
  },
  {
    id: "AGENT-ACCOUNT",
    name: "Identity & Security Agent",
    role: "Auth, IAM & Compliance",
    status: "IDLE",
    current_tickets: 0,
    resolved_today: 34,
    avg_confidence: 98,
    avg_latency: "210ms",
    current_task: null,
    current_operation: "Monitoring security 2FA audit stream",
    tools_authorized: ["verify_identity", "reset_password", "unlock_account"],
    sparse_routing_affinity: "99.1%"
  },
  {
    id: "AGENT-LOGISTICS",
    name: "Logistics & Carrier Agent",
    role: "Shipment & Tracking",
    status: "IDLE",
    current_tickets: 0,
    resolved_today: 23,
    avg_confidence: 93,
    avg_latency: "480ms",
    current_task: null,
    current_operation: "Carrier webhook polling active",
    tools_authorized: ["track_shipment", "issue_carrier_claim", "re_route_package"],
    sparse_routing_affinity: "91.8%"
  }
];

export const INITIAL_TICKETS = [
  {
    id: "PH-1042",
    customer_id: "CUS-20481",
    customer_name: "Aarav Sharma",
    customer_email: "aarav.sharma@enterprise-cloud.io",
    customer_plan: "Enterprise Platinum",
    customer_account_age: "2.4 years",
    customer_ticket_count: 7,
    subject: "Duplicate payment charged for order ORD-83921",
    status: "WAITING_FOR_HUMAN", // Starts ready for approval or demo run
    priority: "HIGH",
    urgency: "High",
    intent: "Duplicate Payment / Refund",
    intent_confidence: 96,
    sentiment: "Frustrated",
    sentiment_score: -0.68,
    frustration_index: "78%",
    risk_level: "HIGH (Financial Action > ₹2,000)",
    assigned_agent: "Billing Specialist Agent",
    human_mode: "Mode D: Human Approval Required",
    contradiction_detected: false,
    resolution_time: null,
    updated_at: "Just now",
    created_at: "10 mins ago"
  },
  {
    id: "PH-1044",
    customer_id: "CUS-30192",
    customer_name: "Rohan Mehta",
    customer_email: "rohan.mehta@hyperlogix.in",
    customer_plan: "Standard Scale",
    customer_account_age: "7 months",
    customer_ticket_count: 3,
    subject: "Cancelled item refund missing; prior agent promised immediate return",
    status: "WAITING_FOR_HUMAN",
    priority: "HIGH",
    urgency: "High",
    intent: "Policy Discrepancy / Refund",
    intent_confidence: 84,
    sentiment: "Frustrated",
    sentiment_score: -0.55,
    frustration_index: "64%",
    risk_level: "MEDIUM (Contradiction Found)",
    assigned_agent: "Billing Specialist Agent",
    human_mode: "Mode C: Human Guided",
    contradiction_detected: true,
    resolution_time: null,
    updated_at: "14 mins ago",
    created_at: "28 mins ago"
  },
  {
    id: "PH-1043",
    customer_id: "CUS-10294",
    customer_name: "Maya Patel",
    customer_email: "maya.patel@fintech-labs.com",
    customer_plan: "Enterprise",
    customer_account_age: "3.1 years",
    customer_ticket_count: 12,
    subject: "Account locked after password reset sequence",
    status: "RESOLVED",
    priority: "MEDIUM",
    urgency: "Medium",
    intent: "Account Recovery",
    intent_confidence: 98,
    sentiment: "Neutral",
    sentiment_score: 0.1,
    frustration_index: "22%",
    risk_level: "LOW (Automated Reversible)",
    assigned_agent: "Identity & Security Agent",
    human_mode: "Mode A: Fully Autonomous",
    contradiction_detected: false,
    resolution_time: "42s",
    updated_at: "35 mins ago",
    created_at: "36 mins ago"
  },
  {
    id: "PH-1045",
    customer_id: "CUS-40582",
    customer_name: "Priya Singh",
    customer_email: "priya.singh@strata-ai.org",
    customer_plan: "Enterprise Plus",
    customer_account_age: "1.2 years",
    customer_ticket_count: 5,
    subject: "Shipment delayed beyond delivery estimate by 48 hours",
    status: "ANALYZING",
    priority: "LOW",
    urgency: "Low",
    intent: "Shipment Delay Claim",
    intent_confidence: 93,
    sentiment: "Neutral",
    sentiment_score: 0.0,
    frustration_index: "18%",
    risk_level: "LOW (Carrier API Query)",
    assigned_agent: "Logistics & Carrier Agent",
    human_mode: "Mode B: Human Observable",
    contradiction_detected: false,
    resolution_time: null,
    updated_at: "5 mins ago",
    created_at: "8 mins ago"
  },
  {
    id: "PH-1046",
    customer_id: "CUS-50129",
    customer_name: "Vikram Malhotra",
    customer_email: "vikram.m@nexustech.co",
    customer_plan: "Standard Growth",
    customer_account_age: "3 months",
    customer_ticket_count: 2,
    subject: "Mobile app crashes consistently on startup after release 4.2",
    status: "ACTIVE",
    priority: "CRITICAL",
    urgency: "High",
    intent: "App Crash / Bug Diagnosis",
    intent_confidence: 76,
    sentiment: "Angry",
    sentiment_score: -0.84,
    frustration_index: "91%",
    risk_level: "MEDIUM (System Defect)",
    assigned_agent: "Diagnostics & Tech Agent",
    human_mode: "Mode E: Collaborative",
    contradiction_detected: false,
    resolution_time: null,
    updated_at: "2 mins ago",
    created_at: "12 mins ago"
  }
];

export const INITIAL_TICKET_DETAILS = {
  "PH-1042": {
    ticket: {
      id: "PH-1042",
      customer_id: "CUS-20481",
      customer_name: "Aarav Sharma",
      customer_email: "aarav.sharma@enterprise-cloud.io",
      customer_plan: "Enterprise Platinum",
      customer_account_age: "2.4 years",
      customer_ticket_count: 7,
      subject: "Duplicate payment charged for order ORD-83921",
      status: "WAITING_FOR_HUMAN",
      priority: "HIGH",
      urgency: "High",
      intent: "Duplicate Payment",
      confidence: 96,
      sentiment: "Frustrated",
      frustration_index: "78%",
      assigned_agent: "Billing Specialist Agent",
      risk_level: "HIGH (Financial Action > ₹2,000)",
      human_mode: "Mode D: Human Approval Required",
      contradiction: "None detected. Ledger confirms 2 settled charges of ₹2,499 within 4 minutes."
    },
    messages: [
      {
        id: "msg-1",
        sender: "CUSTOMER",
        content: "I was charged twice for the same order (ORD-83921). Both transactions of ₹2,499 cleared on my HDFC card. I need one payment refunded immediately.",
        timestamp: "10:14:02 AM"
      },
      {
        id: "msg-2",
        sender: "RESOLVYN_AI",
        content: "Hello Aarav, I have detected a potential duplicate transaction on order ORD-83921. I am querying the payment gateway records and cross-referencing our refund policy to verify settlement.",
        timestamp: "10:14:06 AM"
      }
    ],
    fast_judgment: {
      intent: "Duplicate Payment Reversal",
      intent_confidence: 96,
      frustration_score: "0.78 (Elevated)",
      urgency: "HIGH (SLA: 15 mins)",
      conversation_deterioration: "No (First message, but high churn risk due to duplicate debit)",
      routing_decision: "Billing Specialist Agent (Sparse match score: 0.98)",
      policy_evaluation: "Refund Policy §3.2: Immediate refund permitted for identical amounts within 10 mins window",
      risk_rating: "HIGH — High-value financial action (₹2,499) requires supervisor authorization under Section 22 Safety Gate."
    },
    knowledge_sources: [
      {
        id: "KBD-01",
        title: "Billing Refund Policy §3.2 (Duplicate Debits)",
        category: "Billing",
        relevance_score: 0.97,
        evidence: "When two identical debits occur for one Order ID within 10 minutes, system must verify both transactions are SETTLED before executing reversal.",
        source_doc: "Enterprise Financial Policies v4.1"
      },
      {
        id: "KBD-02",
        title: "Payment Reconciliation SOP (Gateway Y)",
        category: "Billing",
        relevance_score: 0.92,
        evidence: "Gateway Y transaction hashes must be checked for unique reference before triggering reverse webhook.",
        source_doc: "FinOps Standard Operating Procedures 2026"
      }
    ],
    tool_calls: [
      {
        id: "tool-1",
        tool_name: "get_customer_profile",
        parameters: { customer_id: "CUS-20481" },
        result: { status: "ACTIVE", tier: "Enterprise Platinum", mrr: "₹40,000", trust_score: 98 },
        status: "COMPLETED",
        duration_ms: 38,
        safety_level: "READ_ONLY"
      },
      {
        id: "tool-2",
        tool_name: "get_order_details",
        parameters: { order_id: "ORD-83921" },
        result: { amount: 2499, currency: "INR", status: "FULFILLED", items: 1, created: "2026-09-23T04:28:10Z" },
        status: "COMPLETED",
        duration_ms: 45,
        safety_level: "READ_ONLY"
      },
      {
        id: "tool-3",
        tool_name: "get_payment_transactions",
        parameters: { order_id: "ORD-83921" },
        result: {
          transactions: [
            { txn_id: "TXN-83921-A", amount: 2499, status: "SETTLED", gateway: "Gateway Y", timestamp: "04:28:14Z" },
            { txn_id: "TXN-83921-B", amount: 2499, status: "SETTLED", gateway: "Gateway Y", timestamp: "04:31:02Z" }
          ]
        },
        status: "COMPLETED",
        duration_ms: 82,
        safety_level: "READ_ONLY"
      },
      {
        id: "tool-4",
        tool_name: "check_refund_policy",
        parameters: { order_id: "ORD-83921", is_duplicate: true },
        result: { eligible: true, max_allowed: 2499, requires_human_approval: true, policy_ref: "KBD-01" },
        status: "COMPLETED",
        duration_ms: 29,
        safety_level: "READ_ONLY"
      },
      {
        id: "tool-5",
        tool_name: "issue_gateway_refund",
        parameters: { txn_id: "TXN-83921-B", amount: 2499, reason: "Duplicate Settlement" },
        result: null,
        status: "WAITING_APPROVAL",
        duration_ms: 0,
        safety_level: "FINANCIAL_HIGH_RISK"
      },
      {
        id: "tool-6",
        tool_name: "verify_settlement_ledger",
        parameters: { refund_id: "RFD-28192" },
        result: null,
        status: "NOT_STARTED",
        duration_ms: 0,
        safety_level: "VERIFICATION"
      }
    ],
    events: [
      { id: "ev-1", timestamp: "10:14:02 AM", event_type: "PERCEPTION", description: "Converted raw text; Intent='Duplicate Payment', Sentiment='Frustrated' (Score: -0.68)" },
      { id: "ev-2", timestamp: "10:14:04 AM", event_type: "FAST_JUDGMENT", description: "Judgment cascade evaluated risk: HIGH. Routed to Billing Specialist Agent (Score: 0.98)" },
      { id: "ev-3", timestamp: "10:14:05 AM", event_type: "MEMORY_RAG", description: "Retrieved customer memory (Platinum Tier) & Refund Policy KBD-01 §3.2" },
      { id: "ev-4", timestamp: "10:14:07 AM", event_type: "API_LOOKUP", description: "Executed get_payment_transactions(): 2 settled charges confirmed for ORD-83921" },
      { id: "ev-5", timestamp: "10:14:08 AM", event_type: "SAFETY_GATE", description: "Financial limit exceeded (> ₹2,000 threshold). Action held for Human Supervisor Approval." }
    ]
  },
  "PH-1044": {
    ticket: {
      id: "PH-1044",
      customer_id: "CUS-30192",
      customer_name: "Rohan Mehta",
      customer_email: "rohan.mehta@hyperlogix.in",
      customer_plan: "Standard Scale",
      customer_account_age: "7 months",
      customer_ticket_count: 3,
      subject: "Cancelled item refund missing; prior agent promised immediate return",
      status: "WAITING_FOR_HUMAN",
      priority: "HIGH",
      urgency: "High",
      intent: "Refund Status / Contradiction",
      confidence: 84,
      sentiment: "Frustrated",
      frustration_index: "64%",
      assigned_agent: "Billing Specialist Agent",
      risk_level: "MEDIUM (Contradiction Found)",
      human_mode: "Mode C: Human Guided",
      contradiction: "CONTRADICTION DETECTED: Ticket #PH-1002 promises immediate refund, but Gateway records show refund status CANCELLED by merchant policy."
    },
    messages: [
      {
        id: "msg-11",
        sender: "CUSTOMER",
        content: "I cancelled order ORD-77192 three days ago. Your agent on ticket #PH-1002 promised I would see the funds in 24 hours. Where is my refund?",
        timestamp: "09:48:10 AM"
      },
      {
        id: "msg-12",
        sender: "RESOLVYN_AI",
        content: "I am examining the prior transcript in Ticket #PH-1002 alongside current payment gateway records to reconcile the delay.",
        timestamp: "09:48:14 AM"
      }
    ],
    fast_judgment: {
      intent: "Refund Status Inconsistency",
      intent_confidence: 84,
      frustration_score: "0.64 (Elevated)",
      urgency: "HIGH",
      conversation_deterioration: "Yes (Customer citing broken commitment from previous agent)",
      routing_decision: "Billing Specialist Agent (Sparse match score: 0.91)",
      policy_evaluation: "Contradiction between Episodic Memory and Gateway State requires Human Guidance.",
      risk_rating: "MEDIUM — Operational discrepancy requires supervisor alignment before committing."
    },
    knowledge_sources: [
      {
        id: "KBD-06",
        title: "Cancellation & Reversal SLA Window",
        category: "Orders",
        relevance_score: 0.94,
        evidence: "Cancelled merchant orders require automated inventory restocking acknowledgement before refund authorization.",
        source_doc: "Order Lifecycle SOP"
      }
    ],
    tool_calls: [
      {
        id: "tool-21",
        tool_name: "get_ticket_history",
        parameters: { ticket_id: "PH-1002" },
        result: { agent: "Operator #03", commitment: "Refund approved for ₹1,850 on 2026-09-20" },
        status: "COMPLETED",
        duration_ms: 32,
        safety_level: "READ_ONLY"
      },
      {
        id: "tool-22",
        tool_name: "get_gateway_status",
        parameters: { txn_id: "TXN-99102" },
        result: { status: "VOID_FAILED", reason: "Merchant batch closed without settlement key" },
        status: "COMPLETED",
        duration_ms: 64,
        safety_level: "READ_ONLY"
      }
    ],
    events: [
      { id: "ev-21", timestamp: "09:48:10 AM", event_type: "PERCEPTION", description: "Perceived customer issue; Intent='Refund Inquiry', Urgency='High'" },
      { id: "ev-22", timestamp: "09:48:12 AM", event_type: "PREDICTION_ERROR", description: "Detected contradiction between Ticket #PH-1002 promise and VOID_FAILED status. Prediction error δ increases to +0.82" },
      { id: "ev-23", timestamp: "09:48:14 AM", event_type: "HUMAN_TRIGGER", description: "Human Guidance requested to resolve gateway batch exception without hallucinating timeline." }
    ]
  }
};

export const INITIAL_KNOWLEDGE = [
  {
    id: "KBD-01",
    title: "Billing Refund Policy §3.2 (Duplicate Debits)",
    category: "Billing",
    content: "If two successful transactions exist for the same order within 10 minutes, verify duplicate charge on Gateway settlement ledger and issue a full refund to original payment source. Amounts exceeding ₹2,000 trigger Safety Gate (Mode D).",
    reference_count: 58,
    last_updated: "2026-09-20",
    validated_by: "Chief Compliance Officer"
  },
  {
    id: "KBD-02",
    title: "Payment Reconciliation Guide (Gateway Y Releases)",
    category: "Billing",
    content: "Release 4.2 known exception: Gateway Y batch reconciliations may delay order status webhooks by up to 28 minutes. Check transaction settlement hashes before requesting customer to retry payment.",
    reference_count: 94,
    last_updated: "2026-09-22",
    validated_by: "Human Supervisor #01 (Learned from Root Cause Incident)"
  },
  {
    id: "KBD-03",
    title: "Account Lock & Credential Recovery Protocols",
    category: "Account",
    content: "Accounts locked due to repeated failed logins can be unlocked automatically after 2FA token verification and behavioral risk score < 0.15. High-risk geographic shifts require manual supervisor review.",
    reference_count: 41,
    last_updated: "2026-09-18",
    validated_by: "Security Operations Center"
  },
  {
    id: "KBD-04",
    title: "Carrier Transit & Delay Courtesy Compensation",
    category: "Logistics",
    content: "If carrier tracking indicates delay > 48 hours past guaranteed SLA, automatically issue priority re-shipment request and dispatch a $15 courtesy shipping credit voucher without requiring supervisor escalation.",
    reference_count: 27,
    last_updated: "2026-09-15",
    validated_by: "Logistics Director"
  },
  {
    id: "KBD-05",
    title: "Mobile App Crash Diagnostic (Android/iOS 4.2+)",
    category: "Technical",
    content: "For startup crashes on build 4.2+, inspect local SQLite token storage corruption and API rate limiting before escalating to Tier 3 engineering. Advise cache purge.",
    reference_count: 19,
    last_updated: "2026-09-14",
    validated_by: "Lead Mobile Architect"
  }
];

export const INITIAL_HUMAN_EVENTS = [
  {
    id: "HE-104",
    ticket_id: "PH-1042",
    event_type: "APPROVAL",
    previous_ai_action: "Proposed Duplicate Refund (₹2,499)",
    human_action: "Authorized Refund Execution & Ledger Verification",
    reason: "Confirmed duplicate settlement hash on Gateway Y",
    operator: "Operator #01 (Lead)",
    timestamp: "10:18:22 AM",
    mode: "Mode D: Human Approval"
  },
  {
    id: "HE-103",
    ticket_id: "PH-1044",
    event_type: "GUIDANCE",
    previous_ai_action: "Uncertain Gateway Reversal State",
    human_action: "Injected operational context: Merchant batch was closed manually; trigger offline ledger credit",
    reason: "Resolving contradiction between historical agent promise and gateway status",
    operator: "Supervisor #04",
    timestamp: "09:50:11 AM",
    mode: "Mode C: Human Guided"
  },
  {
    id: "HE-102",
    ticket_id: "PH-1041",
    event_type: "CORRECTION",
    previous_ai_action: "AI proposed full item replacement",
    human_action: "Human modified resolution to ₹500 courtesy credit; customer retained goods",
    reason: "Customer preferred instant store credit over return shipping wait",
    operator: "Operator #02",
    timestamp: "08:35:40 AM",
    mode: "Mode E: Human Correction"
  },
  {
    id: "HE-101",
    ticket_id: "PH-1038",
    event_type: "OVERRIDE",
    previous_ai_action: "Deny policy claim based on 14-day cutoff",
    human_action: "Override policy cutoff: Extended 3-day grace period for Enterprise Platinum VIP",
    reason: "Executive customer retention rule applied",
    operator: "Director of CS",
    timestamp: "Yesterday",
    mode: "Mode F: Human Override"
  },
  {
    id: "HE-100",
    ticket_id: "ORGANIZATIONAL",
    event_type: "TEACHING",
    previous_ai_action: "Generic Gateway Retry Prompt",
    human_action: "Added Organizational Rule: If payment succeeds but order is pending > 25 mins, check reconciliation before prompting customer retry",
    reason: "Preventing recurring duplicate charges during Gateway Y outages",
    operator: "Lead Analyst",
    timestamp: "2 days ago",
    mode: "Mode E: Organizational Teaching"
  }
];

export const INITIAL_LEARNING_SIGNALS = [
  {
    id: "LS-0284",
    ticket_id: "PH-1042",
    source_event_id: "HE-104",
    signal_type: "Reward +1.0 (Optimal Human Approval)",
    expected_action: "Proposed Duplicate Refund ₹2,499 under §3.2",
    observed_action: "Approved & executed without policy deviation",
    prediction_error_delta: "-0.04",
    description: "Reward confirmed: Decision aligned with business safety rules. Policy confidence reinforced.",
    status: "WEIGHTS_UPDATED",
    timestamp: "10:18:24 AM"
  },
  {
    id: "LS-0283",
    ticket_id: "PH-1044",
    source_event_id: "HE-103",
    signal_type: "Prediction Error δ = +0.82 (Contradiction Mismatch)",
    expected_action: "Automated Gateway Reversal",
    observed_action: "Human injected offline batch ledger resolution",
    prediction_error_delta: "+0.82",
    description: "Decision mismatch logged: Agentic RAG failed to correlate closed batch code with manual ledger bypass. Synaptic route updated.",
    status: "LEARNING_INTEGRATED",
    timestamp: "09:51:00 AM"
  },
  {
    id: "LS-0282",
    ticket_id: "PH-1041",
    source_event_id: "HE-102",
    signal_type: "Human Correction (Reward -0.40)",
    expected_action: "Full Item Replacement",
    observed_action: "Partial Store Credit ₹500",
    prediction_error_delta: "+0.45",
    description: "Root cause analysis: Customer retention heuristic outweighed physical replacement cost. Policy preference updated.",
    status: "RECORDED",
    timestamp: "08:36:12 AM"
  },
  {
    id: "LS-0281",
    ticket_id: "ORGANIZATIONAL",
    source_event_id: "HE-100",
    signal_type: "Organizational Memory Integration",
    expected_action: "Standard Retry Flow",
    observed_action: "Candidate operational rule validated by staff",
    prediction_error_delta: "-0.12",
    description: "Permanent heuristic added to Policy Memory: eliminates 31 duplicate charges per week.",
    status: "PERMANENT_MEMORY",
    timestamp: "2 days ago"
  }
];

// Section 26-27: Root Cause Analysis & Complaint Investigation Engine Data
export const ROOT_CAUSE_INCIDENT = {
  incident_id: "INC-882",
  title: "Duplicate Payment Reconciliation Anomaly",
  deployment_version: "Release 4.2",
  gateway: "Gateway Y",
  affected_product: "Enterprise Checkout Module",
  timeline_spike: [
    { day: "Monday", complaints: 12, label: "Baseline Normal" },
    { day: "Tuesday", complaints: 31, label: "Initial Warning Spike" },
    { day: "Wednesday", complaints: 94, label: "Critical Cluster Detected" }
  ],
  cluster_findings: {
    common_topic: "Payment successful on card → Order status remains 'Pending' on checkout",
    root_cause_candidate: "Payment reconciliation webhook failure associated with Gateway Y settlement token validation in Release 4.2",
    investigation_status: "VALIDATED BY HUMAN ANALYST",
    remedy_action: "Added candidate operational rule to Organizational Memory (KBD-02) & Hotfix Patch 4.2.1 deployed",
    prevented_duplicate_losses: "₹3,42,000 saved"
  }
};
