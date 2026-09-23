import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ArchitectureModal from './components/ArchitectureModal';

import OverviewPage from './pages/OverviewPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import AgentsPage from './pages/AgentsPage';
import CustomersPage from './pages/CustomersPage';
import KnowledgePage from './pages/KnowledgePage';
import HumanIntelligencePage from './pages/HumanIntelligencePage';
import LearningSignalsPage from './pages/LearningSignalsPage';
import RootCausePage from './pages/RootCausePage';
import AnalyticsPage from './pages/AnalyticsPage';

import {
  INITIAL_KPIS,
  INITIAL_CUSTOMERS,
  INITIAL_AGENTS,
  INITIAL_TICKETS,
  INITIAL_TICKET_DETAILS,
  INITIAL_KNOWLEDGE,
  INITIAL_HUMAN_EVENTS,
  INITIAL_LEARNING_SIGNALS,
  ROOT_CAUSE_INCIDENT
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicketId, setSelectedTicketId] = useState('PH-1042');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState('PH-1042');

  // Reactive Domain Store
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [ticketDetails, setTicketDetails] = useState(INITIAL_TICKET_DETAILS);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [knowledge, setKnowledge] = useState(INITIAL_KNOWLEDGE);
  const [humanEvents, setHumanEvents] = useState(INITIAL_HUMAN_EVENTS);
  const [learningSignals, setLearningSignals] = useState(INITIAL_LEARNING_SIGNALS);

  const [activities, setActivities] = useState([
    { ticket_id: "PH-1042", agent: "Billing Specialist", event_type: "SAFETY_GATE", description: "Financial threshold held (>₹2,000). Awaiting human supervisor approval.", timestamp: "10:14:08 AM" },
    { ticket_id: "PH-1042", agent: "Billing Specialist", event_type: "API_LOOKUP", description: "Executed get_payment_transactions(): 2 settled charges confirmed for ORD-83921", timestamp: "10:14:07 AM" },
    { ticket_id: "PH-1043", agent: "Identity Agent", event_type: "ACTION_VERIFIED", description: "Verified account unlock sequence and dispatched MFA token", timestamp: "10:10:20 AM" },
    { ticket_id: "PH-1044", agent: "Billing Specialist", event_type: "PREDICTION_ERROR", description: "Contradiction detected between Ticket #PH-1002 and Gateway settlement. δ = +0.82", timestamp: "09:48:12 AM" }
  ]);

  // Handle single ticket selection
  const handleSelectTicket = (id) => {
    setSelectedTicketId(id);
    setActiveTab('ticket-detail');
  };

  // Scenario quick switcher
  const handleSelectScenario = (scenario) => {
    setActiveScenario(scenario);
    if (scenario === 'PH-1042') {
      setSelectedTicketId('PH-1042');
      setActiveTab('ticket-detail');
    } else if (scenario === 'PH-1044') {
      setSelectedTicketId('PH-1044');
      setActiveTab('ticket-detail');
    } else if (scenario === 'ROOT_CAUSE') {
      setActiveTab('root-cause');
    }
  };

  // Run Hero Demonstration (Scenario 1: Case PH-1042 Duplicate Refund)
  const handleRunDemo = async () => {
    setIsDemoRunning(true);
    handleSelectTicket('PH-1042');
    setActiveScenario('PH-1042');

    // Step 1: PERCEPTION & FAST JUDGMENT
    setDemoStep(1);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "ANALYZING" },
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "PERCEPTION", description: "Fast Judgment cascade classified Intent: Duplicate Payment (96% confidence, Frustration: 78%)" }
        ]
      }
    }));
    await new Promise(r => setTimeout(r, 1200));

    // Step 2: SPARSE ROUTING & API LOOKUPS
    setDemoStep(2);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "ROUTING" },
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "SPARSE_ROUTING", description: "Sparse router assigned Billing Specialist Agent (affinity 0.98). Querying Gateway Y records." }
        ]
      }
    }));
    await new Promise(r => setTimeout(r, 1200));

    // Step 3: AGENTIC RAG & POLICY VERIFICATION
    setDemoStep(3);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "ACTIVE" },
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "POLICY_VERIFIED", description: "Refund Policy §3.2 evaluated. Duplicate payment of ₹2,499 eligible for reversal." }
        ]
      }
    }));
    await new Promise(r => setTimeout(r, 1200));

    // Step 4: SAFETY GATE HOLD -> AWAITING APPROVAL
    setDemoStep(4);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "WAITING_FOR_HUMAN" },
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "SAFETY_GATE", description: "Financial limit exceeded (> ₹2,000 threshold). Proposed duplicate refund held for human approval." }
        ]
      }
    }));
    await new Promise(r => setTimeout(r, 1400));

    // Step 5: SUPERVISOR APPROVES & REVERSAL EXECUTES
    setDemoStep(5);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "VERIFYING" },
        tool_calls: prev["PH-1042"].tool_calls.map(tc => 
          tc.tool_name === 'issue_gateway_refund' 
            ? { ...tc, status: 'COMPLETED', result: { refund_id: "RFD-28192", txn: "TXN-83921-B", amount: 2499, status: "SETTLED" } }
            : tc
        ),
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "HUMAN_APPROVAL", description: "Human supervisor Operator #01 authorized duplicate refund. Initiated gateway settlement." }
        ]
      }
    }));
    await new Promise(r => setTimeout(r, 1200));

    // Step 6: 2-PHASE LEDGER VERIFICATION & RESOLUTION
    setDemoStep(6);
    setTicketDetails(prev => ({
      ...prev,
      "PH-1042": {
        ...prev["PH-1042"],
        ticket: { ...prev["PH-1042"].ticket, status: "RESOLVED", resolution_time: "34s" },
        tool_calls: prev["PH-1042"].tool_calls.map(tc => 
          tc.tool_name === 'verify_settlement_ledger'
            ? { ...tc, status: 'COMPLETED', result: { verified: true, ledger_ack: "ACK-88201-SETTLED", gateway_timestamp: "2026-09-23T10:18:24Z" } }
            : tc
        ),
        messages: [
          ...prev["PH-1042"].messages,
          {
            id: `msg-${Date.now()}`,
            sender: "RESOLVYN_AI",
            content: "I have confirmed that two payment transactions were recorded for order ORD-83921. One duplicate charge of ₹2,499 has been refunded under reference RFD-28192 and verified on the settlement ledger. The credit will reflect in your account within 2-3 business days.",
            timestamp: "Just now"
          }
        ],
        events: [
          ...prev["PH-1042"].events,
          { id: `ev-${Date.now()}`, timestamp: "Just now", event_type: "LEDGER_CONFIRMED", description: "Two-phase ledger verification succeeded (ACK-88201-SETTLED). Case autonomously closed." }
        ]
      }
    }));

    // Update tickets list
    setTickets(prev => prev.map(t => t.id === 'PH-1042' ? { ...t, status: 'RESOLVED', resolution_time: '34s' } : t));

    // Update KPIs
    setKpis(prev => ({
      ...prev,
      ai_resolutions: prev.ai_resolutions + 1,
      active_tickets: Math.max(0, prev.active_tickets - 1)
    }));

    // Append to Human Events & Learning Signals
    const newHumanEvent = {
      id: `HE-${Date.now().toString().slice(-4)}`,
      ticket_id: "PH-1042",
      event_type: "APPROVAL",
      previous_ai_action: "Proposed Duplicate Refund (₹2,499)",
      human_action: "Authorized Refund Execution & Ledger Verification",
      reason: "Confirmed duplicate settlement hash on Gateway Y",
      operator: "Operator #01 (Lead)",
      timestamp: "Just now",
      mode: "Mode D: Human Approval"
    };
    setHumanEvents(prev => [newHumanEvent, ...prev]);

    const newSignal = {
      id: `LS-${Date.now().toString().slice(-4)}`,
      ticket_id: "PH-1042",
      source_event_id: newHumanEvent.id,
      signal_type: "Reward +1.0 (Optimal Human Approval)",
      expected_action: "Proposed Duplicate Refund ₹2,499 under §3.2",
      observed_action: "Approved & executed without policy deviation",
      prediction_error_delta: "-0.04",
      description: "Reward confirmed: Decision aligned with business safety rules. Policy confidence reinforced.",
      status: "WEIGHTS_UPDATED",
      timestamp: "Just now"
    };
    setLearningSignals(prev => [newSignal, ...prev]);

    setIsDemoRunning(false);
  };

  // Reset Demo to initial state
  const handleResetDemo = () => {
    setKpis(INITIAL_KPIS);
    setTickets(INITIAL_TICKETS);
    setTicketDetails(INITIAL_TICKET_DETAILS);
    setAgents(INITIAL_AGENTS);
    setCustomers(INITIAL_CUSTOMERS);
    setKnowledge(INITIAL_KNOWLEDGE);
    setHumanEvents(INITIAL_HUMAN_EVENTS);
    setLearningSignals(INITIAL_LEARNING_SIGNALS);
    setDemoStep(0);
    setIsDemoRunning(false);
  };

  // Interactive Human Controls Handler
  const handleHumanAction = (ticketId, actionType, inputText, reason) => {
    const now = "Just now";

    if (actionType === 'APPROVE') {
      setTicketDetails(prev => {
        const current = prev[ticketId];
        if (!current) return prev;
        return {
          ...prev,
          [ticketId]: {
            ...current,
            ticket: { ...current.ticket, status: 'RESOLVED', resolution_time: '34s' },
            tool_calls: current.tool_calls.map(tc => 
              tc.status !== 'COMPLETED' ? { ...tc, status: 'COMPLETED', result: { status: "SETTLED", verified: true, ack: "MANUAL-SUPERVISOR-ACK" } } : tc
            ),
            messages: [
              ...current.messages,
              {
                id: `msg-${Date.now()}`,
                sender: "RESOLVYN_AI",
                content: "Your transaction review has been authorized by our supervisor team and verified on the settlement ledger. The issue has been marked resolved.",
                timestamp: now
              }
            ],
            events: [
              ...current.events,
              { id: `ev-${Date.now()}`, timestamp: now, event_type: "APPROVAL", description: "Human supervisor authorized proposed resolution. Ledger verified." }
            ]
          }
        };
      });

      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t));

      setHumanEvents(prev => [
        {
          id: `HE-${Date.now().toString().slice(-4)}`,
          ticket_id: ticketId,
          event_type: "APPROVAL",
          previous_ai_action: "Held Action",
          human_action: "Approved action execution and settlement verification",
          reason: reason || "Supervisor verified business criteria",
          operator: "Operator #01",
          timestamp: now,
          mode: "Mode D: Human Approval"
        },
        ...prev
      ]);
    } else if (actionType === 'GUIDE') {
      setTicketDetails(prev => {
        const current = prev[ticketId];
        if (!current) return prev;
        return {
          ...prev,
          [ticketId]: {
            ...current,
            events: [
              ...current.events,
              { id: `ev-${Date.now()}`, timestamp: now, event_type: "GUIDANCE", description: `Supervisor injected operational guidance: "${inputText}"` }
            ]
          }
        };
      });

      setHumanEvents(prev => [
        {
          id: `HE-${Date.now().toString().slice(-4)}`,
          ticket_id: ticketId,
          event_type: "GUIDANCE",
          previous_ai_action: "Awaiting Guidance",
          human_action: `Guided: ${inputText}`,
          reason: reason || "Context clarification",
          operator: "Operator #01",
          timestamp: now,
          mode: "Mode C: Human Guided"
        },
        ...prev
      ]);
    } else if (actionType === 'CORRECT') {
      setTicketDetails(prev => {
        const current = prev[ticketId];
        if (!current) return prev;
        return {
          ...prev,
          [ticketId]: {
            ...current,
            events: [
              ...current.events,
              { id: `ev-${Date.now()}`, timestamp: now, event_type: "CORRECTION", description: `Supervisor corrected decision logic: "${inputText}"` }
            ]
          }
        };
      });

      const newHeId = `HE-${Date.now().toString().slice(-4)}`;
      setHumanEvents(prev => [
        {
          id: newHeId,
          ticket_id: ticketId,
          event_type: "CORRECTION",
          previous_ai_action: "Default Model Decision",
          human_action: `Corrected: ${inputText}`,
          reason: reason || "Policy nuance",
          operator: "Operator #01",
          timestamp: now,
          mode: "Mode E: Human Correction"
        },
        ...prev
      ]);

      setLearningSignals(prev => [
        {
          id: `LS-${Date.now().toString().slice(-4)}`,
          ticket_id: ticketId,
          source_event_id: newHeId,
          signal_type: "Human Correction (δ = +0.55)",
          expected_action: "Initial Autonomous Proposition",
          observed_action: inputText,
          prediction_error_delta: "+0.55",
          description: `Decision mismatch logged: ${reason || 'Human corrected policy interpretation.'}`,
          status: "LEARNING_INTEGRATED",
          timestamp: now
        },
        ...prev
      ]);
    } else if (actionType === 'OVERRIDE') {
      setTicketDetails(prev => {
        const current = prev[ticketId];
        if (!current) return prev;
        return {
          ...prev,
          [ticketId]: {
            ...current,
            ticket: { ...current.ticket, status: 'RESOLVED' },
            events: [
              ...current.events,
              { id: `ev-${Date.now()}`, timestamp: now, event_type: "OVERRIDE", description: `Human supervisor overridden pipeline: "${inputText}"` }
            ]
          }
        };
      });

      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t));

      setHumanEvents(prev => [
        {
          id: `HE-${Date.now().toString().slice(-4)}`,
          ticket_id: ticketId,
          event_type: "OVERRIDE",
          previous_ai_action: "AI Processing",
          human_action: `Overridden: ${inputText}`,
          reason: reason || "Direct executive intervention",
          operator: "Operator #01",
          timestamp: now,
          mode: "Mode F: Human Override"
        },
        ...prev
      ]);
    } else if (actionType === 'TEACH') {
      handleTeachKnowledge("Operational Exception Rule", "Billing", inputText);
    }
  };

  // Section 6.6 Teach Resolvyn Handler
  const handleTeachKnowledge = (topic, category, content) => {
    const docId = `KBD-${Date.now().toString().slice(-4)}`;
    const newDoc = {
      id: docId,
      title: topic,
      category: category,
      content: content,
      reference_count: 1,
      last_updated: "Just now",
      validated_by: "Operator #01 (Supervisor)"
    };
    setKnowledge(prev => [newDoc, ...prev]);

    setHumanEvents(prev => [
      {
        id: `HE-${Date.now().toString().slice(-4)}`,
        ticket_id: "ORGANIZATIONAL",
        event_type: "TEACHING",
        previous_ai_action: "Standard Baseline Policy",
        human_action: `Taught Operational Heuristic: ${topic}`,
        reason: "Added to organizational memory",
        operator: "Operator #01",
        timestamp: "Just now",
        mode: "Mode E: Organizational Teaching"
      },
      ...prev
    ]);

    setLearningSignals(prev => [
      {
        id: `LS-${Date.now().toString().slice(-4)}`,
        ticket_id: "ORGANIZATIONAL",
        source_event_id: docId,
        signal_type: "Permanent Organizational Knowledge",
        expected_action: "Standard Model Behavior",
        observed_action: `Validated Heuristic: ${topic}`,
        prediction_error_delta: "-0.15",
        description: "New heuristic indexed into RAG memory: prevents recurring exceptions.",
        status: "PERMANENT_MEMORY",
        timestamp: "Just now"
      },
      ...prev
    ]);
  };

  const currentTicketDetail = ticketDetails[selectedTicketId] || ticketDetails['PH-1042'];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* 1. Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }} 
        onRunDemo={handleRunDemo}
        onResetDemo={handleResetDemo}
        isDemoRunning={isDemoRunning}
        demoStep={demoStep}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      {/* 2. Main Workspace Layout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* TopBar with Scenario Selector */}
        <TopBar 
          pageTitle={
            activeTab === 'ticket-detail' ? `Decision Cockpit — ${selectedTicketId}` :
            activeTab === 'root-cause' ? 'Complaint Investigation & Root-Cause Anomaly' :
            activeTab === 'learning-signals' ? 'Prediction Error (δ) & Biomimetic Reinforcement' :
            activeTab.replace('-', ' ')
          } 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSelectScenario={handleSelectScenario}
          activeScenario={activeScenario}
        />

        {/* Dynamic Page Views */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <OverviewPage 
              kpis={kpis} 
              tickets={tickets} 
              activities={activities}
              onSelectTicket={handleSelectTicket} 
              onRunDemo={handleRunDemo}
              onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
            />
          )}

          {activeTab === 'tickets' && (
            <TicketsPage 
              tickets={tickets} 
              onSelectTicket={handleSelectTicket} 
            />
          )}

          {activeTab === 'ticket-detail' && (
            <TicketDetailPage 
              ticketDetail={currentTicketDetail} 
              onBack={() => setActiveTab('tickets')} 
              onHumanAction={handleHumanAction}
              onTeachKnowledge={handleTeachKnowledge}
            />
          )}

          {activeTab === 'agents' && (
            <AgentsPage agents={agents} />
          )}

          {activeTab === 'customers' && (
            <CustomersPage customers={customers} />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgePage knowledge={knowledge} onTeach={handleTeachKnowledge} />
          )}

          {activeTab === 'human-intelligence' && (
            <HumanIntelligencePage humanEvents={humanEvents} />
          )}

          {activeTab === 'learning-signals' && (
            <LearningSignalsPage learningSignals={learningSignals} />
          )}

          {activeTab === 'root-cause' && (
            <RootCausePage onNavigateKnowledge={() => setActiveTab('knowledge')} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage 
              analytics={{}} 
              onNavigateRootCause={() => setActiveTab('root-cause')} 
            />
          )}
        </main>
      </div>

      {/* 5-Layer System Architecture Modal for Presentations */}
      <ArchitectureModal 
        isOpen={isArchitectureModalOpen} 
        onClose={() => setIsArchitectureModalOpen(false)} 
      />

    </div>
  );
}
