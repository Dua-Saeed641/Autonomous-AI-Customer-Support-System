import React, { useState } from 'react';
import { Search, ArrowUpRight, CheckCircle2, AlertCircle, Activity } from 'lucide-react';

export default function TicketsPage({ tickets, onSelectTicket }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [agentFilter, setAgentFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTickets = (tickets || []).filter(t => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (agentFilter !== 'ALL' && t.assigned_agent !== agentFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t.id.toLowerCase().includes(q) && 
          !t.subject.toLowerCase().includes(q) && 
          !t.customer_name.toLowerCase().includes(q) &&
          !t.intent.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-emerald"><CheckCircle2 size={10} /> Resolved</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber"><AlertCircle size={10} /> Awaiting Approval</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-neutral">{status.toLowerCase()}</span>;
      default:
        return <span className="badge badge-neutral">{status.toLowerCase()}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Operations Queue</span>
            <span className="badge badge-neutral">{filteredTickets.length} Displayed</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Decision Intelligence Queues & Active Workflows
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Filter and inspect customer sessions across perception, agentic RAG, and human approval gates.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="shadcn-input"
            style={{ width: 'auto', height: '30px', fontSize: '11.5px', padding: '0 8px' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="WAITING_FOR_HUMAN">Awaiting Human Approval</option>
            <option value="ACTIVE">Active (In Flight)</option>
            <option value="ANALYZING">Analyzing / Perception</option>
            <option value="RESOLVED">Resolved (Verified)</option>
          </select>

          <select 
            value={agentFilter} 
            onChange={e => setAgentFilter(e.target.value)}
            className="shadcn-input"
            style={{ width: 'auto', height: '30px', fontSize: '11.5px', padding: '0 8px' }}
          >
            <option value="ALL">All Specialist Agents</option>
            <option value="Billing Specialist Agent">Billing Specialist</option>
            <option value="Order Lifecycle Agent">Order Lifecycle</option>
            <option value="Diagnostics & Tech Agent">Diagnostics & Tech</option>
            <option value="Identity & Security Agent">Identity & Security</option>
            <option value="Logistics & Carrier Agent">Logistics & Carrier</option>
          </select>

          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
            <input 
              type="text"
              placeholder="Search queue..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="shadcn-input"
              style={{ paddingLeft: '28px', height: '30px', fontSize: '11.5px' }}
            />
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="shadcn-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="shadcn-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Intent & Sentiment</th>
              <th>Assigned Specialist</th>
              <th>Priority</th>
              <th>Governance Mode</th>
              <th>Status</th>
              <th>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => (
              <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => onSelectTicket(t.id)}>
                <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                  {t.id}
                </td>
                <td>
                  <div style={{ fontWeight: '500', color: '#fafafa' }}>{t.customer_name}</div>
                  <div style={{ fontSize: '10.5px', color: '#71717a' }}>{t.customer_plan}</div>
                </td>
                <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.subject}
                </td>
                <td>
                  <span className="badge badge-neutral" style={{ fontSize: '9.5px' }}>{t.intent}</span>
                  <div style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '2px' }}>
                    {t.sentiment}
                  </div>
                </td>
                <td style={{ fontSize: '12px', color: '#a1a1aa' }}>
                  {t.assigned_agent}
                </td>
                <td>
                  <span className="badge badge-neutral" style={{ fontSize: '9px' }}>
                    {t.priority}
                  </span>
                </td>
                <td style={{ fontSize: '11px', color: '#a1a1aa' }}>
                  {t.human_mode || 'Mode A'}
                </td>
                <td>{getStatusBadge(t.status)}</td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '2px 7px', fontSize: '10.5px' }}>
                    Open <ArrowUpRight size={10} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
