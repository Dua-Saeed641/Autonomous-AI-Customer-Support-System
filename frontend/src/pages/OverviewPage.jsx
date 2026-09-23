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
        return <span className="badge badge-emerald" style={{ whiteSpace: 'nowrap' }}><CheckCircle2 size={10} /> Resolved</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber" style={{ whiteSpace: 'nowrap' }}><ShieldAlert size={10} /> Approval</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}><Activity size={10} /> {status.toLowerCase()}</span>;
      default:
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}>{status.toLowerCase()}</span>;
    }
  };

  const getShortAgent = (agent) => {
    if (!agent) return 'Agent';
    return agent.replace(' Specialist Agent', '').replace(' Agent', '').replace(' Lifecycle', '');
  };

  const getShortMode = (mode) => {
    if (!mode) return 'Auto';
    if (mode.includes('Approval')) return 'Approval';
    if (mode.includes('Guided')) return 'Guided';
    if (mode.includes('Collab')) return 'Collab';
    if (mode.includes('Override')) return 'Override';
    return 'Autonomous';
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Executive Hero Banner */}
      <div className="shadcn-card" style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111114'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">NEUROSERVE</span>
            <span style={{ fontSize: '12px', color: '#71717a' }}>Human-Embedded Support Intelligence</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Autonomous Operations & Decision Cockpit
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-primary" onClick={onRunDemo} style={{ padding: '6px 14px', fontSize: '11.5px' }}>
            Run Demo (PH-1042)
          </button>
          <button className="btn btn-outline" onClick={onOpenArchitecture} style={{ padding: '6px 12px', fontSize: '11.5px' }}>
            <Layers size={12} /> Spec
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        <div className="shadcn-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>Active Queue</span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0' }}>
            {kpis?.active_tickets || 14}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>98.4% sparse routed</div>
        </div>

        <div className="shadcn-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>Autonomous Resolved</span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0' }}>
            {kpis?.ai_resolutions || 182}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>74.8% containment</div>
        </div>

        <div className="shadcn-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>Human Governed</span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0' }}>
            {kpis?.human_interventions || 18}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>1 Pending approval</div>
        </div>

        <div className="shadcn-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>Avg Resolution</span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0' }}>
            {kpis?.avg_resolution || "34s"}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>vs 18m baseline</div>
        </div>

        <div className="shadcn-card" style={{ padding: '12px 16px' }}>
          <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '500' }}>Prediction Error (δ)</span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '700', color: '#fafafa', margin: '4px 0 2px 0' }}>
            {kpis?.prediction_error_delta || "-0.08"}
          </div>
          <div style={{ fontSize: '10.5px', color: '#a1a1aa' }}>Reward converging</div>
        </div>
      </div>

      {/* Main Grid: Decision Cockpit Stream (65%) + Real-time Multi-Agent Telemetry (35%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', minWidth: 0 }}>
        
        {/* Clean Live Decision Cockpit Table (No overflowing!) */}
        <div className="shadcn-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa' }}>
                Active Decision Queue
              </h2>
            </div>
            <span className="badge badge-neutral">{tickets?.length || 5} active</span>
          </div>

          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="shadcn-table" style={{ width: '100%', minWidth: '560px' }}>
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Ticket</th>
                  <th style={{ width: '140px' }}>Customer</th>
                  <th>Issue / Subject</th>
                  <th style={{ width: '90px' }}>Agent</th>
                  <th style={{ width: '90px' }}>Mode</th>
                  <th style={{ width: '110px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets?.map((t) => (
                  <tr 
                    key={t.id} 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => onSelectTicket(t.id)}
                    className="subtle-hover"
                  >
                    <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa', whiteSpace: 'nowrap' }}>
                      {t.id}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: '500', color: '#e4e4e7', fontSize: '12px' }}>{t.customer_name}</div>
                      <div style={{ fontSize: '10px', color: '#71717a' }}>{t.customer_plan}</div>
                    </td>
                    <td style={{ maxWidth: '240px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px', color: '#d4d4d8' }}>
                        {t.subject}
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '11.5px', color: '#a1a1aa' }}>
                      {getShortAgent(t.assigned_agent)}
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '11px', color: t.human_mode?.includes('Approval') ? '#fde68a' : '#71717a' }}>
                      {getShortMode(t.human_mode)}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {getStatusBadge(t.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clean Agent Activity Stream (Less text-heavy!) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
          
          <div className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', height: '360px', padding: '14px' }}>
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
                <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#fafafa' }}>
                  Agent Execution Log
                </h3>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '9px', padding: '1px 5px' }}>Live</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
              {activities?.map((act, idx) => (
                <div key={idx} style={{
                  padding: '8px 10px',
                  backgroundColor: '#111114',
                  borderRadius: '5px',
                  border: '1px solid #1c1c20',
                  fontSize: '11px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                      {act.ticket_id}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '8.5px', padding: '0 4px' }}>{act.event_type}</span>
                  </div>
                  <div style={{ color: '#a1a1aa', lineHeight: '1.35', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {act.description}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#52525b', marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{act.agent}</span>
                    <span className="font-mono">{act.timestamp || 'Realtime'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 Architecture Summary */}
          <div className="shadcn-card" style={{ padding: '12px 14px' }}>
            <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '6px' }}>
              Human Embedding Modes (§7)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center' }}>
              <div style={{ padding: '6px 4px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode A (Auto)</div>
                <div style={{ fontWeight: '600', color: '#fafafa', fontSize: '12px' }}>74.8%</div>
              </div>
              <div style={{ padding: '6px 4px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode D (Approval)</div>
                <div style={{ fontWeight: '600', color: '#fde68a', fontSize: '12px' }}>14.2%</div>
              </div>
              <div style={{ padding: '6px 4px', background: '#111114', borderRadius: '4px', border: '1px solid #1c1c20' }}>
                <div style={{ color: '#71717a', fontSize: '9px' }}>Mode C/E (Collab)</div>
                <div style={{ fontWeight: '600', color: '#fafafa', fontSize: '12px' }}>11.0%</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
