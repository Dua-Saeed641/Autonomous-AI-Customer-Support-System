import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  User, 
  BookOpen, 
  Wrench, 
  ShieldAlert, 
  Check, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function TicketDetailPage({ 
  ticketDetail, 
  onBack, 
  onHumanAction 
}) {
  const [activeModal, setActiveModal] = useState(null); // 'GUIDE', 'APPROVE', 'CORRECT', 'OVERRIDE', 'TEACH'
  const [inputText, setInputText] = useState('');
  const [reasonText, setReasonText] = useState('');

  if (!ticketDetail) return <div style={{ padding: '32px', color: '#71717a' }}>Loading decision telemetry...</div>;

  const { ticket, messages, events, tool_calls, knowledge_sources, fast_judgment } = ticketDetail;

  const handleSubmitAction = (actionType) => {
    onHumanAction(ticket.id, actionType, inputText, reasonText);
    setActiveModal(null);
    setInputText('');
    setReasonText('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-emerald" style={{ whiteSpace: 'nowrap' }}><CheckCircle2 size={10} /> Resolved</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber" style={{ whiteSpace: 'nowrap' }}><AlertCircle size={10} /> Approval Required</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}>{status.toLowerCase()}</span>;
      default:
        return <span className="badge badge-neutral" style={{ whiteSpace: 'nowrap' }}>{status.toLowerCase()}</span>;
    }
  };

  return (
    <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Top Header & Human Action Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onBack} style={{ padding: '4px 10px', fontSize: '11px' }}>
            <ArrowLeft size={11} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="font-mono" style={{ fontSize: '15px', fontWeight: '700', color: '#fafafa' }}>
                {ticket.id}
              </span>
              {getStatusBadge(ticket.status)}
              <span className="badge badge-neutral" style={{ fontSize: '9.5px' }}>
                {ticket.human_mode || 'Mode D: Human Approval Required'}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '1px' }}>
              {ticket.subject}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setActiveModal('GUIDE')}
            style={{ fontSize: '11px', padding: '4px 10px' }}
          >
            <ShieldAlert size={11} /> Guide AI
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={() => setActiveModal('APPROVE')}
            style={{ fontSize: '11px', padding: '4px 12px' }}
          >
            <CheckCircle2 size={11} /> Approve
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveModal('CORRECT')}
            style={{ fontSize: '11px', padding: '4px 10px' }}
          >
            Correct
          </button>

          <button 
            className="btn btn-destructive" 
            onClick={() => setActiveModal('OVERRIDE')}
            style={{ fontSize: '11px', padding: '4px 10px' }}
          >
            Override
          </button>

          <button 
            className="btn btn-outline" 
            onClick={() => setActiveModal('TEACH')}
            style={{ fontSize: '11px', padding: '4px 10px' }}
          >
            Teach Rule
          </button>
        </div>
      </div>

      {/* Contradiction Alert if applicable */}
      {ticket.contradiction && (
        <div style={{
          padding: '8px 12px',
          backgroundColor: ticket.contradiction_detected ? 'rgba(127, 29, 29, 0.25)' : '#141418',
          border: `1px solid ${ticket.contradiction_detected ? 'rgba(185, 28, 28, 0.4)' : 'var(--border)'}`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {ticket.contradiction_detected ? (
              <AlertTriangle size={13} color="#fca5a5" />
            ) : (
              <ShieldCheck size={13} color="#a7f3d0" />
            )}
            <div>
              <span style={{ fontWeight: '600', color: ticket.contradiction_detected ? '#fca5a5' : '#fafafa' }}>
                {ticket.contradiction_detected ? 'Contradiction Alert (§7):' : 'Status:'}
              </span>
              <span style={{ color: '#d4d4d8', marginLeft: '6px' }}>
                {ticket.contradiction}
              </span>
            </div>
          </div>
          <span className="badge badge-neutral" style={{ fontSize: '9px', padding: '0 5px' }}>Audited</span>
        </div>
      )}

      {/* Main 3-Column Decision Cockpit (Clean & Balanced) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 0.85fr', gap: '14px' }}>
        
        {/* Column 1: Customer Context & Conversation */}
        <div className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', height: '580px', padding: '14px' }}>
          <div className="shadcn-card-header" style={{ paddingBottom: '8px', marginBottom: '10px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={12} color="#a1a1aa" />
              <h3 className="shadcn-card-title" style={{ fontSize: '12.5px' }}>Conversation</h3>
            </div>
            <span className="badge badge-neutral" style={{ fontSize: '9px' }}>{messages?.length || 2} msgs</span>
          </div>

          {/* Conversation Stream */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' }}>
            {messages?.map((m) => {
              const isCustomer = m.sender === 'CUSTOMER';
              return (
                <div key={m.id} style={{
                  alignSelf: isCustomer ? 'flex-start' : 'flex-end',
                  maxWidth: '94%',
                  backgroundColor: isCustomer ? '#141418' : '#222226',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '8px 10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isCustomer ? <User size={10} color="#71717a" /> : <Bot size={10} color="#a1a1aa" />}
                      <span style={{ fontSize: '10px', fontWeight: '600', color: isCustomer ? '#a1a1aa' : '#fafafa' }}>
                        {isCustomer ? ticket.customer_name : 'Resolvyn AI'}
                      </span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '9px', color: '#52525b' }}>
                      {m.timestamp || 'Realtime'}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#f4f4f5', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                    {m.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guidance Input */}
          <div style={{
            paddingTop: '8px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '6px'
          }}>
            <input 
              type="text"
              placeholder="Inject supervisor guidance..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && inputText) {
                  handleSubmitAction('GUIDE');
                }
              }}
              className="shadcn-input"
              style={{ fontSize: '11px', height: '30px' }}
            />
            <button 
              className="btn btn-secondary" 
              onClick={() => handleSubmitAction('GUIDE')}
              disabled={!inputText}
              style={{ fontSize: '10.5px', padding: '0 10px' }}
            >
              Guide
            </button>
          </div>
        </div>

        {/* Column 2: Fast Judgment, RAG Evidence & Tool Execution */}
        <div className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '580px', padding: '14px' }}>
          
          {/* Section 8 & 9: Fast Judgment */}
          <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h3 className="shadcn-card-title" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#71717a' }}>
                Fast Judgment Cascade (§9)
              </h3>
              <span className="badge badge-neutral" style={{ fontSize: '9.5px' }}>{ticket.confidence || 96}% confidence</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              padding: '6px 8px',
              backgroundColor: '#111114',
              borderRadius: '5px',
              border: '1px solid var(--border)',
              marginBottom: '6px'
            }}>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a' }}>Intent</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#fafafa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ticket.intent}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a' }}>Sentiment</div>
                <div style={{ fontSize: '11px', fontWeight: '500', color: '#e4e4e7' }}>{ticket.sentiment}</div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a' }}>Frustration</div>
                <div className="font-mono" style={{ fontSize: '11px', fontWeight: '600', color: '#fafafa' }}>
                  {ticket.frustration_index || "78%"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#71717a' }}>Urgency</div>
                <div style={{ fontSize: '11px', fontWeight: '500', color: '#fca5a5' }}>{ticket.urgency || "High"}</div>
              </div>
            </div>

            {fast_judgment && (
              <div style={{ fontSize: '11px', color: '#a1a1aa', lineHeight: '1.35' }}>
                {fast_judgment.policy_evaluation}
              </div>
            )}
          </div>

          {/* Section 12 & 13: Auditable Evidence */}
          <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <BookOpen size={11} color="#a1a1aa" />
                <h3 className="shadcn-card-title" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#71717a' }}>
                  Auditable RAG Evidence (§13)
                </h3>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '9px' }}>Verified</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {knowledge_sources?.map(k => (
                <div key={k.id} style={{
                  padding: '7px 9px',
                  backgroundColor: '#111114',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '500', color: '#fafafa' }}>{k.title}</span>
                    <span className="font-mono" style={{ fontSize: '9px', color: '#71717a' }}>
                      {Math.round((k.relevance_score || 0.95) * 100)}% match
                    </span>
                  </div>
                  <div style={{ color: '#a1a1aa', lineHeight: '1.3' }}>
                    "{k.evidence || k.content}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 21 & 23: Tool Execution */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Wrench size={11} color="#a1a1aa" />
                <h3 className="shadcn-card-title" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#71717a' }}>
                  Enterprise API Tool Calls (§21 & §23)
                </h3>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '9px' }}>2-Phase Verify</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {tool_calls?.map((t) => (
                <div key={t.id} style={{
                  padding: '6px 8px',
                  backgroundColor: '#111114',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="font-mono" style={{ fontWeight: '500', color: '#fafafa' }}>
                        {t.tool_name}()
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '8px', padding: '0 4px' }}>
                        {t.safety_level || 'READ_ONLY'}
                      </span>
                    </div>

                    {t.status === 'COMPLETED' ? (
                      <span className="badge badge-emerald" style={{ fontSize: '9px' }}><Check size={8} /> Verified</span>
                    ) : t.status === 'WAITING_APPROVAL' ? (
                      <span className="badge badge-amber" style={{ fontSize: '9px' }}>Held for Review</span>
                    ) : (
                      <span className="badge badge-neutral" style={{ fontSize: '9px' }}>Pending</span>
                    )}
                  </div>

                  {t.result && (
                    <div className="font-mono" style={{
                      marginTop: '4px',
                      padding: '3px 6px',
                      backgroundColor: '#09090b',
                      borderRadius: '3px',
                      fontSize: '9.5px',
                      color: '#d4d4d8',
                      overflowX: 'auto',
                      border: '1px solid #1c1c20'
                    }}>
                      {typeof t.result === 'object' ? JSON.stringify(t.result) : t.result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3: Customer 360 & Safety Action Gate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Customer Profile */}
          <div className="shadcn-card" style={{ padding: '12px' }}>
            <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '6px' }}>
              Customer Profile (§10)
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fafafa' }}>
                  {ticket.customer_name}
                </div>
                <div style={{ fontSize: '10.5px', color: '#71717a' }}>{ticket.customer_email}</div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                paddingTop: '6px',
                borderTop: '1px solid var(--border)',
                fontSize: '10.5px'
              }}>
                <div>
                  <span style={{ color: '#71717a' }}>Plan:</span>
                  <div style={{ fontWeight: '500', color: '#e4e4e7' }}>{ticket.customer_plan}</div>
                </div>
                <div>
                  <span style={{ color: '#71717a' }}>Tenure:</span>
                  <div style={{ color: '#e4e4e7' }}>{ticket.customer_account_age}</div>
                </div>
                <div>
                  <span style={{ color: '#71717a' }}>History:</span>
                  <div style={{ color: '#e4e4e7' }}>{ticket.customer_ticket_count} tickets</div>
                </div>
                <div>
                  <span style={{ color: '#71717a' }}>Tier:</span>
                  <div style={{ color: '#fafafa', fontWeight: '500' }}>Platinum VIP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Safety Gate */}
          <div className="shadcn-card" style={{
            padding: '12px',
            backgroundColor: ticket.status === 'WAITING_FOR_HUMAN' ? '#141418' : 'var(--card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fafafa', fontWeight: '600', fontSize: '11px', marginBottom: '3px' }}>
              <ShieldAlert size={12} color="#fde68a" />
              Action Safety Gate (§22)
            </div>
            
            <p style={{ fontSize: '10.5px', color: '#a1a1aa', marginBottom: '8px', lineHeight: '1.35' }}>
              {ticket.risk_level || 'Financial limit held (> ₹2,000 threshold). Proposed duplicate refund: ₹2,499.'}
            </p>

            {ticket.status === 'WAITING_FOR_HUMAN' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleSubmitAction('APPROVE')}
                  style={{ width: '100%', padding: '5px', fontSize: '11px', fontWeight: '600' }}
                >
                  <CheckCircle2 size={11} /> Authorize Refund (₹2,499)
                </button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => setActiveModal('GUIDE')}
                    style={{ flex: 1, fontSize: '10px', padding: '4px' }}
                  >
                    Guide
                  </button>
                  <button 
                    className="btn btn-destructive" 
                    onClick={() => setActiveModal('OVERRIDE')}
                    style={{ flex: 1, fontSize: '10px', padding: '4px' }}
                  >
                    Override
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#a7f3d0' }}>
                <CheckCircle2 size={11} />
                <span>Authorized & ledger verified</span>
              </div>
            )}
          </div>

          {/* Event Activity Trace */}
          <div className="shadcn-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px' }}>
            <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '6px' }}>
              Execution Trace
            </div>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '160px' }}>
              {events?.map(ev => (
                <div key={ev.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '10px' }}>
                  <span className="font-mono" style={{ color: '#52525b', fontSize: '9px', marginTop: '1px', flexShrink: 0 }}>
                    {ev.timestamp?.substring(0, 8) || 'Realtime'}
                  </span>
                  <div style={{ color: '#a1a1aa', lineHeight: '1.25' }}>
                    {ev.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Human Action Dialog */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div className="shadcn-card" style={{ width: '440px', padding: '18px', backgroundColor: '#0f0f12' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span className="badge badge-secondary">{activeModal} Action</span>
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#fafafa', marginBottom: '2px' }}>
              Human Operator Control
            </h3>

            {activeModal === 'GUIDE' && (
              <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '10px' }}>
                Inject contextual guidance directly into the active working memory:
              </p>
            )}

            {activeModal === 'CORRECT' && (
              <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '10px' }}>
                Specify corrected business logic. Generates a structured learning signal δ:
              </p>
            )}

            {activeModal === 'OVERRIDE' && (
              <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '10px' }}>
                Manually supersede the autonomous pipeline. Enter audit justification:
              </p>
            )}

            {activeModal === 'APPROVE' && (
              <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '10px' }}>
                Authorize high-risk financial action execution (Duplicate Refund of ₹2,499 for TXN-83921-B).
              </p>
            )}

            {activeModal === 'TEACH' && (
              <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '10px' }}>
                Add this operational heuristic to Organizational Memory to permanently resolve future duplicate charges:
              </p>
            )}

            {activeModal !== 'APPROVE' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                <textarea
                  rows={3}
                  placeholder={
                    activeModal === 'GUIDE' ? "e.g. Inquire about merchant batch closing time..." :
                    activeModal === 'CORRECT' ? "e.g. Issue partial store credit instead of full replacement..." :
                    activeModal === 'TEACH' ? "e.g. If payment succeeds but order is pending > 25 mins, verify settlement..." :
                    "Provide override justification..."
                  }
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="shadcn-input"
                  style={{ fontSize: '11px', resize: 'vertical' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button className="btn btn-outline" onClick={() => setActiveModal(null)} style={{ fontSize: '11px', padding: '4px 10px' }}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleSubmitAction(activeModal)} style={{ fontSize: '11px', padding: '4px 12px' }}>
                Confirm {activeModal}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
