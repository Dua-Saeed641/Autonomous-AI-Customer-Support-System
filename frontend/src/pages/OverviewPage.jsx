import React from 'react';
import { ArrowUpRight, Activity, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function OverviewPage({ data, onSelectTicket, onRunDemo }) {
  if (!data) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading operational telemetry...</div>;

  const { kpis, tickets, activities } = data;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-green">● RESOLVED</span>;
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
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px'
      }}>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ACTIVE TICKETS
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>
            {kpis.active_tickets}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Queue in progress</div>
        </div>

        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI RESOLUTIONS
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>
            {kpis.ai_resolutions}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>98.4% success rate</div>
        </div>

        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            HUMAN INTERVENTIONS
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>
            {kpis.human_interventions}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-amber)' }}>3 pending approval</div>
        </div>

        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AVG RESOLUTION
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>
            {kpis.avg_resolution}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Automated pipeline</div>
        </div>

        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI CONFIDENCE
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>
            {kpis.ai_confidence}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-green)' }}>High certainty</div>
        </div>
      </div>

      {/* Main Grid: Live Tickets Stream (2/3) + Live Activity Feed (1/3) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Live Tickets Table */}
        <div className="phrona-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)' }}>Live Tickets</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time support activity</p>
            </div>
          </div>

          <table className="phrona-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Issue / Subject</th>
                <th>Intent</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => onSelectTicket(t.id)}>
                  <td className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>{t.id}</td>
                  <td>{t.customer_name}</td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.subject}
                  </td>
                  <td><span className="badge badge-neutral">{t.intent}</span></td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t.assigned_agent}</td>
                  <td>{getStatusBadge(t.status)}</td>
                  <td>
                    <span style={{
                      color: t.confidence >= 90 ? 'var(--accent-green)' : t.confidence >= 75 ? 'var(--accent-amber)' : 'var(--accent-red)',
                      fontWeight: '600',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {t.confidence}%
                    </span>
                  </td>
                  <td>
                    <button className="btn" style={{ padding: '2px 8px', fontSize: '11px' }}>
                      Inspect <ArrowUpRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Activity Stream */}
        <div className="phrona-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            paddingBottom: '12px',
            marginBottom: '12px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Activity size={16} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)' }}>Real-time Activity</h2>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '420px' }}>
            {activities.map((act, idx) => (
              <div key={idx} style={{
                padding: '8px 10px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>{act.ticket_id}</span>
                  <span className="badge badge-neutral" style={{ fontSize: '9px' }}>{act.event_type}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{act.description}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Agent: {act.agent}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
