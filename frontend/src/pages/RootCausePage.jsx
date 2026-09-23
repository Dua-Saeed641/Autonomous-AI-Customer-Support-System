import React from 'react';
import { AlertTriangle, Database, CheckCircle2 } from 'lucide-react';
import { ROOT_CAUSE_INCIDENT } from '../data/mockData';

export default function RootCausePage({ onNavigateKnowledge }) {
  const incident = ROOT_CAUSE_INCIDENT;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Anomaly Clustering (§26–27)</span>
            <span className="badge badge-neutral">Topic Detection</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Complaint Investigation Engine & Root-Cause Clustering
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Embedding, clustering, and topic detection identifying systemic product anomalies from recurring customer complaints.
          </p>
        </div>

        <span className="badge badge-neutral" style={{ padding: '5px 10px', fontSize: '11px' }}>
          {incident.cluster_findings.prevented_duplicate_losses}
        </span>
      </div>

      {/* Main Incident Investigation Card */}
      <div className="shadcn-card" style={{
        padding: '20px',
        backgroundColor: '#111114'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              backgroundColor: '#1f1f24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fafafa'
            }}>
              <AlertTriangle size={15} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-mono" style={{ fontSize: '14px', fontWeight: '700', color: '#fafafa' }}>
                  {incident.incident_id}
                </span>
                <span className="badge badge-neutral">{incident.title}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#71717a' }}>
                Target Vector: {incident.gateway} · {incident.affected_product} · {incident.deployment_version}
              </div>
            </div>
          </div>

          <div className="badge badge-emerald">
            <CheckCircle2 size={10} /> {incident.cluster_findings.investigation_status}
          </div>
        </div>

        {/* Section 27: 3-Day Complaint Spike Graph */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '16px'
        }}>
          {incident.timeline_spike.map((spike, idx) => (
            <div key={idx} style={{
              padding: '12px 14px',
              backgroundColor: '#18181b',
              borderRadius: '6px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>{spike.day}</span>
                <span style={{ fontSize: '10px', color: '#a1a1aa' }}>
                  {spike.label}
                </span>
              </div>
              <div className="font-mono" style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#fafafa',
                margin: '4px 0 2px 0'
              }}>
                {spike.complaints} <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '400' }}>complaints</span>
              </div>
              {/* Visual trend bar */}
              <div style={{ width: '100%', height: '3px', backgroundColor: '#27272a', borderRadius: '2px', marginTop: '6px' }}>
                <div style={{
                  width: `${(spike.complaints / 94) * 100}%`,
                  height: '100%',
                  backgroundColor: '#71717a',
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Root Cause Candidate Synthesis */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '14px',
          padding: '14px',
          backgroundColor: '#18181b',
          borderRadius: '6px',
          border: '1px solid var(--border)'
        }}>
          <div>
            <div style={{ fontSize: '10.5px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '3px' }}>
              Common Vector Discovery
            </div>
            <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa', marginBottom: '6px' }}>
              "{incident.cluster_findings.common_topic}"
            </div>
            <div style={{ fontSize: '11.5px', color: '#a1a1aa', lineHeight: '1.4' }}>
              <strong style={{ color: '#e4e4e7' }}>Root Cause Candidate:</strong> {incident.cluster_findings.root_cause_candidate}
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '14px' }}>
            <div style={{ fontSize: '10.5px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '3px' }}>
              Organizational Learning Feedback Loop (§27)
            </div>
            <div style={{ fontSize: '11.5px', color: '#a1a1aa', lineHeight: '1.4', marginBottom: '8px' }}>
              A human analyst validated the finding, propagating candidate rule <span className="font-mono" style={{ color: '#fafafa' }}>KBD-02</span> into Policy Memory.
            </div>
            <button className="btn btn-outline" onClick={onNavigateKnowledge} style={{ fontSize: '11px', padding: '4px 10px' }}>
              <Database size={11} /> Inspect Policy Memory (KBD-02)
            </button>
          </div>
        </div>

      </div>

      {/* Cluster Analysis Pipeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600' }}>1. Embedding</div>
          <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa', marginTop: '3px' }}>Vector Embeddings</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '3px' }}>1536-dim semantic space over chat & call transcripts</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600' }}>2. HDBSCAN Clustering</div>
          <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa', marginTop: '3px' }}>Density Spikes</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '3px' }}>Identified 94-complaint cluster with 0.94 cosine similarity</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600' }}>3. Anomaly Correlator</div>
          <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa', marginTop: '3px' }}>Release 4.2 Cross-Link</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '3px' }}>Correlated spike onset with Release 4.2 deployment window</div>
        </div>

        <div className="shadcn-card">
          <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600' }}>4. Human Validation</div>
          <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa', marginTop: '3px' }}>Validated Knowledge</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '3px' }}>Converted into permanent exception heuristic for all agents</div>
        </div>
      </div>

    </div>
  );
}
