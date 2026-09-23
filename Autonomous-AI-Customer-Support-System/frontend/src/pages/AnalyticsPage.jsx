import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function AnalyticsPage({ analytics }) {
  if (!analytics) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading analytics telemetry...</div>;

  const { metrics, intents, agent_activity } = analytics;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>System Analytics</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aggregate operational metrics and intent breakdown</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TICKETS TODAY</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>{metrics.tickets_today}</div>
        </div>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>RESOLVED</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)', margin: '4px 0' }}>{metrics.resolved}</div>
        </div>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ACTIVE QUEUE</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>{metrics.active}</div>
        </div>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>HUMAN INTERVENTIONS</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-amber)', margin: '4px 0' }}>{metrics.human_interventions}</div>
        </div>
        <div className="phrona-card">
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AVG RESOLUTION TIME</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-emphasis)', margin: '4px 0' }}>{metrics.average_resolution}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Intent Distribution */}
        <div className="phrona-card">
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '16px' }}>
            Ticket Intents Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {intents.map(item => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                  <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{item.count} tickets</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.count / 34) * 100}%`, height: '100%', backgroundColor: 'var(--text-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Activity Workload */}
        <div className="phrona-card">
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '16px' }}>
            Agent Workload Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {agent_activity.map(item => (
              <div key={item.agent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{item.agent}</span>
                  <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{item.count} handled</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.count / 32) * 100}%`, height: '100%', backgroundColor: 'var(--accent-blue)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
