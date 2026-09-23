# Resolvyn

### Autonomous AI Customer Support System

 **Resolve issues, not just answer questions.**

Resolvyn is an autonomous AI customer-support system that combines **multi-agent orchestration, agentic retrieval, verified actions, and embedded human intelligence** to resolve customer issues end-to-end.

---

## Architecture

```text
┌──────────────┐
│   Customer   │
└──────┬───────┘
       ↓
┌──────────────────────┐
│ Perception           │
│ Intent · Sentiment   │
│ Urgency · Risk       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Fast-Judgment Layer  │
│      Jev Cascade     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Orchestrator      │
└──────────┬───────────┘
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
 Billing Account Technical
    ↓      ↓      ↓
    └──────┼──────┘
           ↓
┌──────────────────────┐
│ Knowledge + Memory   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Tools / APIs         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Verification         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Customer Response    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Human Intelligence   │
│ Guide · Approve      │
│ Correct · Override   │
│ Teach                │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Learning Signals     │
└──────────────────────┘
```

---

## Core Components

| Component              | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| **Perception**         | Understand intent, sentiment, urgency and risk      |
| **Jev Cascade**        | Make fast initial judgments before deeper reasoning |
| **Orchestrator**       | Route issues to the appropriate specialist          |
| **Specialist Agents**  | Handle domain-specific support tasks                |
| **Knowledge + Memory** | Provide policies, context and relevant information  |
| **Tools / APIs**       | Execute permitted business actions                  |
| **Verification**       | Confirm that an action actually succeeded           |
| **Human Intelligence** | Guide, approve, correct, override or teach          |
| **Learning Signals**   | Capture outcomes and human feedback                 |

---

## Support Flow

```text
Customer Issue
      ↓
  Understand
      ↓
   Evaluate
      ↓
    Route
      ↓
   Retrieve
      ↓
     Act
      ↓
   Verify
      ↓
   Resolve
      ↓
    Learn
```

---

## Specialist Agents

| Agent         | Handles                      |
| ------------- | ---------------------------- |
| **Billing**   | Payments, refunds, billing   |
| **Account**   | Account access and recovery  |
| **Technical** | Product and technical issues |
| **Order**     | Orders and order information |
| **Logistics** | Shipping and delivery        |

---

## Human Intelligence

Human involvement is part of the workflow, not just an escalation mechanism.

```text
              AI Decision
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      Guide     Approve   Correct
        │         │         │
        └─────────┼─────────┘
                  ↓
              AI Action
                  ↓
               Outcome
                  ↓
            Learning Signal
```

---

## Learning Loop

```text
Expected Outcome
       ↓
     Action
       ↓
Actual Outcome
       ↓
  Difference
       ↓
Learning Signal
       ↓
Future Improvement
```

| Signal                | Example                 |
| --------------------- | ----------------------- |
| Human Correction      | Wrong agent selected    |
| Human Override        | AI action changed       |
| Failed Action         | Tool or API failure     |
| Policy Conflict       | Action violates policy  |
| Customer Rejection    | Resolution not accepted |
| Successful Resolution | Issue resolved          |

---

## Example: Duplicate Payment

```text
Customer reports duplicate charge
              ↓
       Identify intent
              ↓
        Billing Agent
              ↓
    Retrieve transactions
              ↓
       Check policy
              ↓
       Human approval
              ↓
        Issue refund
              ↓
       Verify refund
              ↓
        Resolve issue
```

---

## Resolvyn vs Traditional Support

```text
Traditional

Customer → AI → Answer
                  ↓
               Escalate


Phrona

Customer → Understand → Decide → Act → Verify
                              ↑
                              │
                       Human Intelligence
                              │
                              ↓
                        Learn & Improve
```

---

## Key Idea

 **AI handles the work. Humans remain embedded in the intelligence loop.**

---

## Status

Resolvyn is an **experimental prototype** exploring autonomous customer-support workflows, multi-agent systems, agentic retrieval, verified actions, and human-in-the-loop learning.
