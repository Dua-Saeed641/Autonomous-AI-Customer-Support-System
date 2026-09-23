import React from 'react';
import { Bot, CheckCircle2, Clock, Activity, Zap } from 'lucide-react';

export default function AgentsPage({ agents }) {
  if (!agents) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading agent metrics...</div>;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Specialist Agents</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Autonomous domain agents monitoring and processing task queues</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {agents.map(a => (
          <div key={a.id} className="phrona-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={20} color="var(--accent-blue)" />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-emphasis)' }}>{a.name}</h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {a.id}</span>
                </div>
              </div>
              <span className={`badge ${a.status === 'ACTIVE' ? 'badge-green' : 'badge-neutral'}`}>
                ● {a.status}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              padding: '10px 0',
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Active Queue</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-emphasis)' }}>{a.current_tickets}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Resolved Today</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-green)' }}>{a.resolved_today}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Avg Confidence</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-emphasis)' }}>{a.avg_confidence}%</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Current Operation:</div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-primary)',
                padding: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px'
              }}>
                {a.current_operation || 'Monitoring domain queues'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
