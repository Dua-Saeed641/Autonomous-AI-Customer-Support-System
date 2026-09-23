import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight } from 'lucide-react';

export default function TicketsPage({ tickets, onSelectTicket }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [agentFilter, setAgentFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTickets = tickets.filter(t => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (agentFilter !== 'ALL' && t.assigned_agent !== agentFilter) return false;
    if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.customer_name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-green">✓ RESOLVED</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber">● AWAITING APPROVAL</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-blue">● {status}</span>;
      default:
        return <span className="badge badge-neutral">● {status}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Support Tickets</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Manage and inspect autonomous support workflow queues</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status Filter */}
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '4px',
              fontSize: '12px',
              outline: 'none'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="ANALYZING">Analyzing</option>
            <option value="ROUTING">Routing</option>
            <option value="ACTIVE">Active</option>
            <option value="WAITING_FOR_HUMAN">Awaiting Human</option>
            <option value="VERIFYING">Verifying</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          {/* Agent Filter */}
          <select 
            value={agentFilter} 
            onChange={e => setAgentFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '4px',
              fontSize: '12px',
              outline: 'none'
            }}
          >
            <option value="ALL">All Agents</option>
            <option value="Billing Agent">Billing Agent</option>
            <option value="Account Agent">Account Agent</option>
            <option value="Technical Agent">Technical Agent</option>
            <option value="Order Agent">Order Agent</option>
            <option value="Logistics Agent">Logistics Agent</option>
          </select>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter list..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '5px 10px 5px 30px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="phrona-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="phrona-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Intent</th>
              <th>Assigned Agent</th>
              <th>Priority</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => (
              <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => onSelectTicket(t.id)}>
                <td className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>{t.id}</td>
                <td>{t.customer_name}</td>
                <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.subject}
                </td>
                <td><span className="badge badge-neutral">{t.intent}</span></td>
                <td>{t.assigned_agent}</td>
                <td>
                  <span className={`badge ${t.priority === 'CRITICAL' ? 'badge-red' : t.priority === 'HIGH' ? 'badge-amber' : 'badge-neutral'}`}>
                    {t.priority}
                  </span>
                </td>
                <td className="font-mono" style={{ fontWeight: '600', color: t.confidence >= 90 ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
                  {t.confidence}%
                </td>
                <td>{getStatusBadge(t.status)}</td>
                <td>
                  <button className="btn" style={{ padding: '2px 8px', fontSize: '11px' }}>
                    Open <ArrowUpRight size={12} />
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
