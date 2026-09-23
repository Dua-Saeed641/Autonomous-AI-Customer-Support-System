import React from 'react';
import { Bot } from 'lucide-react';

export default function AgentsPage({ agents }) {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Section 19 & 20 Multi-Agent Swarm</span>
            <span className="badge badge-neutral">Sparse Routing Active</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Specialist Autonomous Agents & Sparse Routing
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Instead of invoking one monolithic LLM, an orchestrator activates narrow specialist agents with scoped tool permissions to minimize compute, latency, and tokens.
          </p>
        </div>

        <span className="badge badge-neutral" style={{ padding: '5px 10px' }}>
          5 Domain Specialists
        </span>
      </div>

      {/* Sparse Routing Callout */}
      <div className="shadcn-card" style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11.5px',
        backgroundColor: '#111114'
      }}>
        <div>
          <span style={{ fontWeight: '600', color: '#fafafa' }}>Sparse Routing Principle (§20):</span>
          <span style={{ color: '#a1a1aa', marginLeft: '6px' }}>
            For query "My card was charged but order disappeared" → Billing + Order Agents activate; Technical, Logistics, and Account agents remain idle.
          </span>
        </div>
        <span className="badge badge-neutral">380ms avg latency</span>
      </div>

      {/* Agents Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {agents?.map(a => (
          <div key={a.id} className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Agent Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  backgroundColor: '#18181b',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={15} color="#d4d4d8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa' }}>{a.name}</h3>
                  <div style={{ fontSize: '10.5px', color: '#71717a' }}>{a.role}</div>
                </div>
              </div>
              <span className={`badge ${a.status === 'ACTIVE' ? 'badge-emerald' : 'badge-neutral'}`}>
                ● {a.status.toLowerCase()}
              </span>
            </div>

            {/* Metrics Triad */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px',
              padding: '8px 0',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a', textTransform: 'uppercase' }}>Active Task</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa', marginTop: '2px' }}>
                  {a.current_task || 'Idle'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a', textTransform: 'uppercase' }}>Resolved</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa', marginTop: '2px' }}>
                  {a.resolved_today}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a', textTransform: 'uppercase' }}>Affinity</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa', marginTop: '2px' }}>
                  {a.sparse_routing_affinity || '95%'}
                </div>
              </div>
            </div>

            {/* Current Operation */}
            <div>
              <div style={{ fontSize: '9.5px', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>
                Active Operation Trace:
              </div>
              <div style={{
                fontSize: '11px',
                color: '#d4d4d8',
                padding: '7px 9px',
                backgroundColor: '#111114',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                lineHeight: '1.4'
              }}>
                {a.current_operation}
              </div>
            </div>

            {/* Authorized Tools */}
            {a.tools_authorized && (
              <div>
                <div style={{ fontSize: '9.5px', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Authorized Tools (§21):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {a.tools_authorized.map((t, idx) => (
                    <span key={idx} className="font-mono" style={{
                      fontSize: '9px',
                      color: '#a1a1aa',
                      padding: '1px 5px',
                      backgroundColor: '#111114',
                      borderRadius: '3px',
                      border: '1px solid var(--border)'
                    }}>
                      {t}()
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
