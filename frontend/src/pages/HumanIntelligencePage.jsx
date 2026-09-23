import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileEdit } from 'lucide-react';

export default function HumanIntelligencePage({ humanEvents }) {
  if (!humanEvents) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading human intelligence audit log...</div>;

  const getActionBadge = (type) => {
    switch (type) {
      case 'APPROVAL':
        return <span className="badge badge-green">✓ APPROVAL</span>;
      case 'CORRECT':
      case 'CORRECTION':
        return <span className="badge badge-amber">● CORRECTION</span>;
      case 'OVERRIDE':
        return <span className="badge badge-red">⚡ OVERRIDE</span>;
      case 'GUIDANCE':
        return <span className="badge badge-blue">ℹ GUIDANCE</span>;
      case 'TEACHING':
        return <span className="badge badge-neutral">★ TEACHING</span>;
      default:
        return <span className="badge badge-neutral">{type}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Human Intelligence Log</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Audit stream of human operator interventions embedded in the AI loop</p>
      </div>

      <div className="phrona-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="phrona-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Ticket ID</th>
              <th>Action Type</th>
              <th>Previous AI Action</th>
              <th>Human Interaction</th>
              <th>Reason / Justification</th>
              <th>Operator</th>
            </tr>
          </thead>
          <tbody>
            {humanEvents.map(h => (
              <tr key={h.id}>
                <td className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {h.timestamp ? h.timestamp.substring(11, 19) : '19:42:20'}
                </td>
                <td className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>{h.ticket_id}</td>
                <td>{getActionBadge(h.event_type)}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{h.previous_ai_action || '—'}</td>
                <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{h.human_action}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{h.reason || '—'}</td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{h.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
