import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AnalyticsPage({ onNavigateRootCause }) {
  const metrics = {
    tickets_today: 196,
    resolved: 147,
    active: 35,
    human_interventions: 18,
    average_resolution: "34s",
    containment_rate: "74.8%",
    fcr_rate: "89.2%"
  };

  const intents = [
    { name: "Duplicate Payment / Financial", count: 54, pct: 28 },
    { name: "Account Recovery & MFA", count: 42, pct: 21 },
    { name: "Order Fulfillment / Cancel", count: 38, pct: 19 },
    { name: "Technical Diagnostics", count: 28, pct: 14 },
    { name: "Carrier Logistics & Delay", count: 22, pct: 11 },
    { name: "Policy Inquiries", count: 12, pct: 7 }
  ];

  const agents = [
    { name: "Billing Specialist Agent", count: 52, accuracy: "98.4%", latency: "410ms" },
    { name: "Order Lifecycle Agent", count: 41, accuracy: "96.1%", latency: "320ms" },
    { name: "Identity & Security Agent", count: 39, accuracy: "99.2%", latency: "210ms" },
    { name: "Diagnostics & Tech Agent", count: 35, accuracy: "92.0%", latency: "580ms" },
    { name: "Logistics & Carrier Agent", count: 29, accuracy: "94.8%", latency: "480ms" }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Operational Observability (§37)</span>
            <span className="badge badge-neutral">Live Telemetry</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Predictive Customer Experience & Performance Analytics
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Observability metrics covering resolution latency, first-contact resolution (FCR), containment rates, and intent distributions.
          </p>
        </div>

        <button className="btn btn-outline" onClick={onNavigateRootCause} style={{ fontSize: '11.5px' }}>
          Root-Cause Anomaly Engine (§26) <ArrowRight size={12} />
        </button>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>TOTAL LOAD</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.tickets_today}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>↑ 14% vs yesterday</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>AI RESOLVED</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.resolved}
          </div>
          <div style={{ fontSize: '10.5px', color: '#71717a' }}>Automated pipeline</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>CONTAINMENT</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.containment_rate}
          </div>
          <div style={{ fontSize: '10.5px', color: '#71717a' }}>Target: &gt; 70%</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>FCR RATE</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.fcr_rate}
          </div>
          <div style={{ fontSize: '10.5px', color: '#71717a' }}>First contact resolution</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>HUMAN EMBEDDED</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.human_interventions}
          </div>
          <div style={{ fontSize: '10.5px', color: '#71717a' }}>Governed actions</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>AVG RESOLUTION</div>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '3px 0' }}>
            {metrics.average_resolution}
          </div>
          <div style={{ fontSize: '10.5px', color: '#71717a' }}>vs 18m baseline</div>
        </div>
      </div>

      {/* Two Column Graphs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Intent Distribution */}
        <div className="shadcn-card">
          <div className="shadcn-card-header">
            <h3 className="shadcn-card-title">Classified Intent Volume</h3>
            <p className="shadcn-card-description">Perception classification breakdown</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {intents.map(item => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                  <span style={{ color: '#fafafa' }}>{item.name}</span>
                  <span className="font-mono" style={{ color: '#a1a1aa' }}>
                    {item.count} tickets ({item.pct}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '5px', backgroundColor: '#18181b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(item.count / 54) * 100}%`,
                    height: '100%',
                    backgroundColor: '#52525b',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialist Agent Workload */}
        <div className="shadcn-card">
          <div className="shadcn-card-header">
            <h3 className="shadcn-card-title">Agent Workload & Accuracy</h3>
            <p className="shadcn-card-description">Throughput by specialized domain agent</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {agents.map(item => (
              <div key={item.name} style={{
                padding: '8px 10px',
                backgroundColor: '#111114',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#fafafa', fontSize: '12px' }}>{item.name}</div>
                  <div style={{ fontSize: '10.5px', color: '#71717a' }}>Latency: {item.latency} avg</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontWeight: '600', color: '#fafafa', fontSize: '12px' }}>
                    {item.accuracy}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#71717a' }}>{item.count} handled</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
