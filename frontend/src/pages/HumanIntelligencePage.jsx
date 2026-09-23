import React, { useState } from 'react';

export default function HumanIntelligencePage({ humanEvents }) {
  const [filterType, setFilterType] = useState('ALL');

  const filtered = (humanEvents || []).filter(h => {
    if (filterType === 'ALL') return true;
    return h.event_type === filterType;
  });

  const getActionBadge = (type) => {
    switch (type) {
      case 'APPROVAL':
        return <span className="badge badge-emerald">Approval</span>;
      case 'CORRECTION':
        return <span className="badge badge-amber">Correction (δ)</span>;
      case 'OVERRIDE':
        return <span className="badge badge-rose">Override</span>;
      case 'GUIDANCE':
        return <span className="badge badge-neutral">Guidance</span>;
      case 'TEACHING':
        return <span className="badge badge-secondary">Teaching</span>;
      default:
        return <span className="badge badge-neutral">{type.toLowerCase()}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Section 6 & 25 Human Governance</span>
            <span className="badge badge-neutral">Audit Trail Active</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Human Intelligence & Governance Audit Stream
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Every supervisor observation, guidance, approval, correction, override, and teaching action logged as structured learning events.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#71717a' }}>Filter Event:</span>
          <select 
            value={filterType} 
            onChange={e => setFilterType(e.target.value)}
            className="shadcn-input"
            style={{ width: 'auto', height: '30px', fontSize: '11.5px', padding: '0 8px' }}
          >
            <option value="ALL">All Event Types</option>
            <option value="APPROVAL">Approvals (Mode D)</option>
            <option value="GUIDANCE">Guidance (Mode C)</option>
            <option value="CORRECTION">Corrections (Mode E)</option>
            <option value="OVERRIDE">Overrides (Mode F)</option>
            <option value="TEACHING">Teaching (Section 6.6)</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="shadcn-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="shadcn-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Ticket ID</th>
              <th>Action Type</th>
              <th>Prior AI Proposition</th>
              <th>Human Intervention Action</th>
              <th>Justification / Reason</th>
              <th>Operator ID</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => (
              <tr key={h.id}>
                <td className="font-mono" style={{ fontSize: '11px', color: '#71717a', whiteSpace: 'nowrap' }}>
                  {h.timestamp || 'Realtime'}
                </td>
                <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                  {h.ticket_id}
                </td>
                <td>{getActionBadge(h.event_type)}</td>
                <td style={{ fontSize: '12px', color: '#a1a1aa' }}>
                  {h.previous_ai_action || '—'}
                </td>
                <td style={{ fontWeight: '500', color: '#fafafa', maxWidth: '280px', lineHeight: '1.4' }}>
                  {h.human_action}
                </td>
                <td style={{ fontSize: '12px', color: '#a1a1aa', maxWidth: '240px' }}>
                  {h.reason || 'Verified'}
                </td>
                <td style={{ fontSize: '11px', color: '#71717a', whiteSpace: 'nowrap' }}>
                  {h.operator}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
