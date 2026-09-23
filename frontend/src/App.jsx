import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

import OverviewPage from './pages/OverviewPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import AgentsPage from './pages/AgentsPage';
import CustomersPage from './pages/CustomersPage';
import KnowledgePage from './pages/KnowledgePage';
import HumanIntelligencePage from './pages/HumanIntelligencePage';
import LearningSignalsPage from './pages/LearningSignalsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

const API_BASE = 'http://localhost:8000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  // Data states
  const [overviewData, setOverviewData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketDetail, setTicketDetail] = useState(null);
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [humanEvents, setHumanEvents] = useState([]);
  const [learningSignals, setLearningSignals] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Fetch telemetry
  const fetchAllData = async () => {
    try {
      const [ovRes, tRes, aRes, cRes, kRes, hRes, lRes, anRes] = await Promise.all([
        fetch(`${API_BASE}/overview`).then(r => r.json()),
        fetch(`${API_BASE}/tickets`).then(r => r.json()),
        fetch(`${API_BASE}/agents`).then(r => r.json()),
        fetch(`${API_BASE}/customers`).then(r => r.json()),
        fetch(`${API_BASE}/knowledge`).then(r => r.json()),
        fetch(`${API_BASE}/human-intelligence`).then(r => r.json()),
        fetch(`${API_BASE}/learning-signals`).then(r => r.json()),
        fetch(`${API_BASE}/analytics`).then(r => r.json()),
      ]);

      setOverviewData(ovRes);
      setTickets(tRes);
      setAgents(aRes);
      setCustomers(cRes);
      setKnowledge(kRes);
      setHumanEvents(hRes);
      setLearningSignals(lRes);
      setAnalytics(anRes);

      if (selectedTicketId) {
        const tdRes = await fetch(`${API_BASE}/tickets/${selectedTicketId}`).then(r => r.json());
        setTicketDetail(tdRes);
      }
    } catch (err) {
      console.error('Error fetching Phrona telemetry:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 3000);
    return () => clearInterval(interval);
  }, [selectedTicketId]);

  // Handle single ticket selection
  const handleSelectTicket = async (id) => {
    setSelectedTicketId(id);
    setActiveTab('ticket-detail');
    try {
      const tdRes = await fetch(`${API_BASE}/tickets/${id}`).then(r => r.json());
      setTicketDetail(tdRes);
    } catch (err) {
      console.error('Error fetching ticket detail:', err);
    }
  };

  // Demo Handlers
  const handleRunDemo = async () => {
    setIsDemoRunning(true);
    // Automatically switch to ticket PH-1042 detail view
    handleSelectTicket('PH-1042');

    // Run backend demo loop with step intervals so UI animates step by step
    await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    await fetchAllData();

    for (let step = 1; step <= 6; step++) {
      await new Promise(res => setTimeout(res, 1200));
      await fetch(`${API_BASE}/demo/step/${step}`, { method: 'POST' });
      await fetchAllData();
      const td = await fetch(`${API_BASE}/tickets/PH-1042`).then(r => r.json());
      setTicketDetail(td);
    }

    setIsDemoRunning(false);
  };

  const handleResetDemo = async () => {
    await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    await fetchAllData();
    if (selectedTicketId === 'PH-1042') {
      const td = await fetch(`${API_BASE}/tickets/PH-1042`).then(r => r.json());
      setTicketDetail(td);
    }
  };

  // Human Action Submit
  const handleHumanAction = async (ticketId, actionType, inputText, reason) => {
    await fetch(`${API_BASE}/tickets/${ticketId}/human-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action_type: actionType, input_text: inputText, reason: reason })
    });
    await fetchAllData();
    const td = await fetch(`${API_BASE}/tickets/${ticketId}`).then(r => r.json());
    setTicketDetail(td);
  };

  // Teach Phrona Knowledge Submit
  const handleTeachKnowledge = async (topic, category, content) => {
    await fetch(`${API_BASE}/knowledge/teach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, category, content })
    });
    await fetchAllData();
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* 1. Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          if (tab !== 'ticket-detail') setSelectedTicketId(null);
          setActiveTab(tab);
        }} 
        onRunDemo={handleRunDemo}
        onResetDemo={handleResetDemo}
        isDemoRunning={isDemoRunning}
      />

      {/* 2. Main Workspace Layout */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar 
          pageTitle={selectedTicketId ? `Ticket Workspace — ${selectedTicketId}` : activeTab.replace('-', ' ')} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Dynamic Page Routing */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <OverviewPage 
              data={overviewData} 
              onSelectTicket={handleSelectTicket} 
              onRunDemo={handleRunDemo}
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
              ticketDetail={ticketDetail} 
              onBack={() => setActiveTab('tickets')} 
              onHumanAction={handleHumanAction}
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

          {activeTab === 'analytics' && (
            <AnalyticsPage analytics={analytics} />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}
        </main>
      </div>
    </div>
  );
}
