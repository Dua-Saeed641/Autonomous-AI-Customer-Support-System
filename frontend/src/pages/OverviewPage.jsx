import React from 'react';
import { 
  ArrowUpRight, 
  Activity, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export default function OverviewPage({ 
  kpis, 
  tickets, 
  activities, 
  onSelectTicket, 
  onRunDemo, 
  onOpenArchitecture 
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-emerald"><CheckCircle2 size={10} /> Resolved</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber"><ShieldAlert size={10} /> Awaiting Approval</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-neutral"><Activity size={10} /> {status.toLowerCase()}</span>;
      default:
        return <span className="badge badge-neutral">{status.toLowerCase()}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Executive Hero Banner for PPT */}
      <div className="shadcn-card" style={{
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111114'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">NEUROSERVE Architecture</span>
            <span className="badge badge-neutral">Autonomous Engine</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Human-Embedded Autonomous Customer Support Intelligence
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '3px', lineHeight: '1.4' }}>
            Combines fast perception judgment, agentic RAG, scoped multi-agent APIs, and human governance. Human expertise is an embedded architectural component rather than an exception fallback.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={onRunDemo} style={{ padding: '7px 12px' }}>
            Run Demo (PH-1042)
          </button>
          <button className="btn btn-outline" onClick={onOpenArchitecture} style={{ padding: '7px 12px' }}>
            <Layers size={13} /> Architecture
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        <div className="shadcn-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>
              Active Queue
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Live</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0', fontFamily: 'var(--font-mono)' }}>
            {kpis?.active_tickets || 14}
          </div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
            98.4% sparse routing
          </div>
        </div>

        <div className="shadcn-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>
              Autonomous Resolved
            </span>
            <CheckCircle2 size={12} color="#71717a" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0', fontFamily: 'var(--font-mono)' }}>
            {kpis?.ai_resolutions || 182}
          </div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
            74.8% containment rate
          </div>
        </div>

        <div className="shadcn-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>
              Human Embedded In Loop
            </span>
            <ShieldAlert size={12} color="#71717a" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0', fontFamily: 'var(--font-mono)' }}>
            {kpis?.human_interventions || 18}
          </div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
            1 Approval pending review
          </div>
        </div>

        <div className="shadcn-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>
              Avg Resolution Time
            </span>
            <Clock size={12} color="#71717a" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0', fontFamily: 'var(--font-mono)' }}>
            {kpis?.avg_resolution || "34s"}
          </div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
            vs 18m industry baseline
          </div>
        </div>

        <div className="shadcn-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>
              Prediction Error (δ)
            </span>
            <span className="badge badge-neutral" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Biomimetic</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0', fontFamily: 'var(--font-mono)' }}>
            {kpis?.prediction_error_delta || "-0.08"}
          </div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
            Reward converging (optimal)
          </div>
        </div>
      </div>

      {/* Main Grid: Decision Cockpit Stream (65%) + Real-time Multi-Agent Telemetry (35%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* Live Decision Cockpit Table */}
        <div className="shadcn-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontSize: '13.5px', fontWeight: '600', color: '#fafafa' }}>
                Decision Intelligence Cockpit
              </h2>
              <p style={{ fontSize: '11.5px', color: '#71717a' }}>
                Active sessions undergoing intent judgment, agentic retrieval, and human safety gates
              </p>
            </div>
            <span className="badge badge-neutral">{tickets?.length || 5} Active Cases</span>
          </div>

          <table className="shadcn-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Intent</th>
                <th>Assigned Agent</th>
                <th>Governance Mode</th>
                <th>Status</th>
                <th>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((t) => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => onSelectTicket(t.id)}>
                  <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                    {t.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: '500', color: '#e4e4e7' }}>{t.customer_name}</div>
                    <div style={{ fontSize: '10.5px', color: '#71717a' }}>{t.customer_plan}</div>
                  </td>
                  <td style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t.subject}
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '9.5px' }}>{t.intent}</span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    {t.assigned_agent}
                  </td>
                  <td>
                    <span style={{ fontSize: '11px', color: t.human_mode?.includes('Approval') ? '#fde68a' : '#a1a1aa' }}>
                      {t.human_mode || 'Mode A: Autonomous'}
                    </span>
                  </td>
                  <td>{getStatusBadge(t.status)}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '2px 7px', fontSize: '10.5px' }}>
                      Open <ArrowUpRight size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-Time Agent Activity & Embedded Modes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Live Agent Event Timeline */}
          <div className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', height: '390px' }}>
            <div style={{
              paddingBottom: '10px',
              marginBottom: '10px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={13} color="#a1a1aa" />
                <h3 style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa' }}>
                  Multi-Agent Execution Trace
                </h3>
              </div>
              <span className="badge badge-neutral">Live</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', paddingRight: '4px' }}>
              {activities?.map((act, idx) => (
                <div key={idx} style={{
                  padding: '8px 10px',
                  backgroundColor: '#111114',
                  borderRadius: '4px',
                  border: '1px solid #1c1c20',
                  fontSize: '11.5px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                      {act.ticket_id}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '9px', padding: '0 4px' }}>{act.event_type}</span>
                  </div>
                  <div style={{ color: '#a1a1aa', lineHeight: '1.35' }}>
                    {act.description}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#52525b', marginTop: '3px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Agent: {act.agent}</span>
                    <span className="font-mono">{act.timestamp || 'Realtime'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 Architecture: Human Modes Distribution */}
          <div className="shadcn-card" style={{ padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>
              Section 7 — Human Embedding Modes
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', fontSize: '11px' }}>
              <div style={{ padding: '6px 8px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode A (Auto)</div>
                <div style={{ fontWeight: '600', color: '#fafafa', marginTop: '2px' }}>74.8%</div>
              </div>
              <div style={{ padding: '6px 8px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode D (Approval)</div>
                <div style={{ fontWeight: '600', color: '#fde68a', marginTop: '2px' }}>14.2%</div>
              </div>
              <div style={{ padding: '6px 8px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode C/E (Collab)</div>
                <div style={{ fontWeight: '600', color: '#fafafa', marginTop: '2px' }}>11.0%</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
