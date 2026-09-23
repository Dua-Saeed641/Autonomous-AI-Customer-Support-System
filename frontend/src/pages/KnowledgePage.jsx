import React, { useState } from 'react';
import { BookOpen, Plus, Search } from 'lucide-react';

export default function KnowledgePage({ knowledge, onTeach }) {
  const [showTeachModal, setShowTeachModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Billing');
  const [content, setContent] = useState('');

  if (!knowledge) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading knowledge repository...</div>;

  const handleSaveTeach = () => {
    if (!topic || !content) return;
    onTeach(topic, category, content);
    setShowTeachModal(false);
    setTopic('');
    setContent('');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Organizational Memory & Knowledge</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Policies, processing guides, and agent retrieval sources</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowTeachModal(true)}>
          <Plus size={14} /> TEACH PHRONA
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {knowledge.map(k => (
          <div key={k.id} className="phrona-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)' }}>{k.title}</h3>
              </div>
              <span className="badge badge-neutral">{k.category}</span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {k.content}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text-muted)',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <span>Referenced in {k.reference_count} tickets</span>
              <span>Updated: {k.last_updated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Teach Phrona Modal */}
      {showTeachModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="phrona-card" style={{ width: '500px', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-emphasis)', marginBottom: '12px' }}>
              TEACH PHRONA — Add Organizational Knowledge
            </h3>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Topic / Title</label>
              <input
                type="text"
                placeholder="e.g. Duplicate refund 10-min window rule"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '12px'
                }}
              >
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Technical">Technical</option>
                <option value="Logistics">Logistics</option>
                <option value="Orders">Orders</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Knowledge Specification / Rule</label>
              <textarea
                rows={4}
                placeholder="If two successful transactions exist for the same order within 10 minutes, verify duplicate charge before issuing refund..."
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '12px'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn" onClick={() => setShowTeachModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveTeach}>
                SAVE KNOWLEDGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
