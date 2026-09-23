import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Bot, 
  User, 
  BookOpen, 
  Wrench, 
  ShieldAlert, 
  Check, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function TicketDetailPage({ ticketDetail, onBack, onHumanAction }) {
  const [activeModal, setActiveModal] = useState(null); // 'GUIDE', 'APPROVE', 'CORRECT', 'OVERRIDE'
  const [inputText, setInputText] = useState('');
  const [reasonText, setReasonText] = useState('');

  if (!ticketDetail) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading ticket detail...</div>;

  const { ticket, messages, events, tool_calls, knowledge_sources } = ticketDetail;

  const handleSubmitAction = (actionType) => {
    onHumanAction(ticket.id, actionType, inputText, reasonText);
    setActiveModal(null);
    setInputText('');
    setReasonText('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <span className="badge badge-green">✓ RESOLVED</span>;
      case 'WAITING_FOR_HUMAN':
        return <span className="badge badge-amber">● AWAITING APPROVAL</span>;
      case 'ANALYZING':
      case 'ROUTING':
      case 'VERIFYING':
        return <span className="badge badge-blue">● {status}</span>;
      default:
        return <span className="badge badge-neutral">● {status}</span>;
    }
  };

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Navigation & Actions Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn" onClick={onBack}>
            <ArrowLeft size={14} /> Back to Tickets
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>
                {ticket.id}
              </span>
              {getStatusBadge(ticket.status)}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {ticket.subject}
            </div>
          </div>
        </div>

        {/* Human Interactive Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-amber" onClick={() => setActiveModal('GUIDE')}>
            <ShieldAlert size={13} /> GUIDE AI
          </button>
          <button className="btn btn-primary" onClick={() => setActiveModal('APPROVE')}>
            <CheckCircle2 size={13} /> APPROVE
          </button>
          <button className="btn" onClick={() => setActiveModal('CORRECT')}>
            CORRECT
          </button>
          <button className="btn btn-danger" onClick={() => setActiveModal('OVERRIDE')}>
            OVERRIDE
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr', gap: '20px' }}>
        
        {/* Column 1: Customer Conversation */}
        <div className="phrona-card" style={{ display: 'flex', flexDirection: 'column', height: '620px' }}>
          <div style={{
            paddingBottom: '12px',
            marginBottom: '12px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-emphasis)' }}>
              Customer Conversation
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{messages.length} messages</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
            {messages.map((m) => {
              const isCustomer = m.sender === 'CUSTOMER';
              return (
                <div key={m.id} style={{
                  alignSelf: isCustomer ? 'flex-start' : 'flex-end',
                  maxWidth: '88%',
                  backgroundColor: isCustomer ? 'var(--bg-secondary)' : '#161B22',
                  border: `1px solid ${isCustomer ? 'var(--border-color)' : '#238636'}`,
                  borderRadius: '6px',
                  padding: '10px 12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    {isCustomer ? <User size={12} color="var(--text-secondary)" /> : <Bot size={12} color="var(--accent-green)" />}
                    <span style={{ fontSize: '11px', fontWeight: '600', color: isCustomer ? 'var(--text-secondary)' : 'var(--accent-green)' }}>
                      {m.sender}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                    {m.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: AI Operations Panel */}
        <div className="phrona-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '620px' }}>
          
          {/* AI Understanding Section */}
          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Understanding & Intent
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Intent:</span>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-emphasis)' }}>{ticket.intent}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Confidence:</span>
                <div style={{ fontSize: '13px', fontWeight: '600', color: ticket.confidence >= 90 ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
                  {ticket.confidence}% (High)
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sentiment:</span>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{ticket.sentiment}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Urgency:</span>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{ticket.urgency}</div>
              </div>
            </div>
          </div>

          {/* Specialist Agent Section */}
          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Assigned Agent
            </h3>
            <div style={{
              padding: '10px 12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-emphasis)' }}>
                  {ticket.assigned_agent}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Specialist agent routing</div>
              </div>
              <span className="badge badge-green">ACTIVE</span>
            </div>
          </div>

          {/* Knowledge Retrieved Section */}
          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Knowledge & Memory Sources
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {knowledge_sources.map(k => (
                <div key={k.id} style={{
                  padding: '8px 10px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={13} color="var(--accent-blue)" />
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{k.title}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Score: 0.94</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & API Calls Checklist */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Tools & Enterprise API Execution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {tool_calls.map((t) => (
                <div key={t.id} style={{
                  padding: '8px 10px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Wrench size={13} color="var(--text-secondary)" />
                      <span className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>
                        {t.tool_name}()
                      </span>
                    </div>
                    {t.status === 'COMPLETED' ? (
                      <span className="badge badge-green"><Check size={10} /> Verified</span>
                    ) : t.status === 'WAITING' ? (
                      <span className="badge badge-amber">→ Waiting</span>
                    ) : (
                      <span className="badge badge-neutral">○ Not Started</span>
                    )}
                  </div>
                  {t.result && (
                    <div className="font-mono" style={{
                      marginTop: '6px',
                      padding: '4px 6px',
                      backgroundColor: '#000000',
                      borderRadius: '3px',
                      fontSize: '10px',
                      color: 'var(--accent-green)',
                      overflowX: 'auto'
                    }}>
                      {typeof t.result === 'object' ? JSON.stringify(t.result) : t.result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3: Customer Context & Human Intervention Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Customer Context */}
          <div className="phrona-card">
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Customer Profile & Context
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-emphasis)' }}>
                  {ticket.customer_name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ticket.customer_email}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Plan:</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-blue)' }}>{ticket.customer_plan}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Account Age:</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{ticket.customer_account_age}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>History:</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{ticket.customer_ticket_count} tickets</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sentiment:</div>
                  <div style={{ fontSize: '12px', color: 'var(--accent-amber)' }}>{ticket.sentiment}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Prompt Card if Waiting */}
          {ticket.status === 'WAITING_FOR_HUMAN' && (
            <div className="phrona-card" style={{ borderColor: 'var(--accent-amber)', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', fontWeight: '600', marginBottom: '6px' }}>
                <AlertCircle size={16} /> Human Approval Required
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Billing Agent detected duplicate transaction for ORD-83921. Proposed refund amount: ₹2,499.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" onClick={() => handleSubmitAction('APPROVE')}>
                  [ APPROVE REFUND ]
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Activity Timeline */}
      <div className="phrona-card">
        <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '12px' }}>
          Event Activity Timeline
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {events.map(ev => (
            <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {ev.timestamp.substring(11, 19)}
              </span>
              <span className="badge badge-neutral">{ev.event_type}</span>
              <span style={{ color: 'var(--text-primary)' }}>{ev.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Human Action Modal */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="phrona-card" style={{ width: '450px', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '12px' }}>
              Human Action: {activeModal}
            </h3>

            {activeModal === 'GUIDE' && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Provide operational guidance for Phrona to consider when processing this ticket:
              </p>
            )}

            {activeModal === 'CORRECT' && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Specify corrected AI decision (will generate a Learning Signal):
              </p>
            )}

            {activeModal === 'OVERRIDE' && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Enter override justification to manually resolve this issue:
              </p>
            )}

            {activeModal === 'APPROVE' && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Confirm supervisor approval for proposed action: Issue duplicate refund of ₹2,499.
              </p>
            )}

            {activeModal !== 'APPROVE' && (
              <textarea
                rows={3}
                placeholder="Type instruction or correction..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '12px',
                  marginBottom: '12px'
                }}
              />
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn" onClick={() => setActiveModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleSubmitAction(activeModal)}>
                Submit {activeModal}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
