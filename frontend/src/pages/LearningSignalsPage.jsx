import React from 'react';
import { BrainCircuit, AlertCircle, ArrowRight } from 'lucide-react';

export default function LearningSignalsPage({ learningSignals }) {
  if (!learningSignals) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading learning signals...</div>;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Learning Signals & Prediction Error</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Autonomous system feedback events generated from decision mismatches and human corrections</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {learningSignals.map(ls => (
          <div key={ls.id} className="phrona-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BrainCircuit size={18} color="var(--accent-green)" />
                <span className="font-mono" style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-emphasis)' }}>
                  {ls.id}
                </span>
                <span className="badge badge-neutral">Ticket: {ls.ticket_id}</span>
                <span className="badge badge-blue">{ls.signal_type}</span>
              </div>
              <span className="badge badge-green">● {ls.status}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '10px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px'
            }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', uppercase: true }}>Expected AI Outcome:</span>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{ls.expected_action}</div>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', uppercase: true }}>Observed Human Action:</span>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-amber)' }}>{ls.observed_action}</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
              {ls.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
