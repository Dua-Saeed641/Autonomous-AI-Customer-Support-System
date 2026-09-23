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
        return <span className="badge badge-emerald" style={{ whiteSpace: 'nowrap' }}><CheckCircle2 size={10} /> Resolved</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber" style={{ whiteSpace: 'nowrap' }}><AlertCircle size={10} /> Approval</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}>{status.toLowerCase()}</span>;
      default:
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}>{status.toLowerCase()}</span>;
    }
  };

  const getShortAgent = (agent) => {
    if (!agent) return 'Agent';
    return agent.replace(' Specialist Agent', '').replace(' Agent', '').replace(' Lifecycle', '');
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Operations Queue</span>
            <span className="badge badge-neutral">{filteredTickets.length} cases</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Decision Intelligence Queues
          </h2>
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
            <option value="WAITING_FOR_HUMAN">Approval Required</option>
            <option value="ACTIVE">Active</option>
            <option value="ANALYZING">Analyzing</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select 
            value={agentFilter} 
            onChange={e => setAgentFilter(e.target.value)}
            className="shadcn-input"
            style={{ width: 'auto', height: '30px', fontSize: '11.5px', padding: '0 8px' }}
          >
            <option value="ALL">All Agents</option>
            <option value="Billing Specialist Agent">Billing</option>
            <option value="Order Lifecycle Agent">Order</option>
            <option value="Diagnostics & Tech Agent">Diagnostics</option>
            <option value="Identity & Security Agent">Identity</option>
            <option value="Logistics & Carrier Agent">Logistics</option>
          </select>

          <div style={{ position: 'relative', width: '180px' }}>
            <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
            <input 
              type="text"
              placeholder="Search..."
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
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="shadcn-table" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ width: '90px' }}>Ticket</th>
                <th style={{ width: '150px' }}>Customer</th>
                <th>Subject</th>
                <th style={{ width: '110px' }}>Agent</th>
                <th style={{ width: '80px' }}>Priority</th>
                <th style={{ width: '110px' }}>Status</th>
                <th style={{ width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(t => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => onSelectTicket(t.id)} className="subtle-hover">
                  <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa', whiteSpace: 'nowrap' }}>
                    {t.id}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: '500', color: '#fafafa', fontSize: '12px' }}>{t.customer_name}</div>
                    <div style={{ fontSize: '10px', color: '#71717a' }}>{t.customer_plan}</div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px', color: '#d4d4d8' }}>
                      {t.subject}
                    </div>
                  </td>
                  <td style={{ fontSize: '11.5px', color: '#a1a1aa', whiteSpace: 'nowrap' }}>
                    {getShortAgent(t.assigned_agent)}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '9px', padding: '1px 5px' }}>
                      {t.priority}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {getStatusBadge(t.status)}
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
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

    </div>
  );
}
