import React, { useState } from 'react';
import { BookOpen, Plus, Search, ShieldCheck } from 'lucide-react';

export default function KnowledgePage({ knowledge, onTeach }) {
  const [showTeachModal, setShowTeachModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Billing');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const filtered = (knowledge || []).filter(k => 
    !search || 
    k.title.toLowerCase().includes(search.toLowerCase()) || 
    k.content.toLowerCase().includes(search.toLowerCase()) ||
    k.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveTeach = () => {
    if (!topic || !content) return;
    onTeach(topic, category, content);
    setShowTeachModal(false);
    setTopic('');
    setContent('');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Section 10.4 Organizational Memory</span>
            <span className="badge badge-neutral">RAG Vector Index</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Organizational Memory & Policy Knowledge
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Corporate policies, operational exception heuristics, and employee-taught rules queried by the Agentic RAG engine.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <Search size={13} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
            <input 
              type="text"
              placeholder="Search knowledge..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="shadcn-input"
              style={{ paddingLeft: '28px', height: '30px', fontSize: '11.5px' }}
            />
          </div>

          <button className="btn btn-primary" onClick={() => setShowTeachModal(true)} style={{ padding: '6px 12px' }}>
            <Plus size={12} /> Teach Resolvyn (§6.6)
          </button>
        </div>
      </div>

      {/* Grid of Knowledge Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {filtered.map(k => (
          <div key={k.id} className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <BookOpen size={14} color="#a1a1aa" />
                <h3 style={{ fontSize: '13.5px', fontWeight: '600', color: '#fafafa' }}>{k.title}</h3>
              </div>
              <span className="badge badge-neutral">{k.category}</span>
            </div>

            <p style={{ fontSize: '11.5px', color: '#a1a1aa', lineHeight: '1.5' }}>
              {k.content}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10.5px',
              color: '#71717a',
              paddingTop: '8px',
              borderTop: '1px solid var(--border)'
            }}>
              <span>Referenced in <strong style={{ color: '#fafafa' }}>{k.reference_count}</strong> decisions</span>
              <span style={{ color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={11} /> {k.validated_by || 'Validated by Staff'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Teach Modal */}
      {showTeachModal && (
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
          <div className="shadcn-card" style={{ width: '480px', padding: '20px', backgroundColor: '#0f0f12' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span className="badge badge-secondary">Teaching Mode (§6.6)</span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fafafa', marginBottom: '2px' }}>
              Teach Resolvyn — Add Organizational Rule
            </h3>
            <p style={{ fontSize: '11.5px', color: '#a1a1aa', marginBottom: '14px' }}>
              Humans can introduce validated operational knowledge directly into organizational memory without engineering code deploys.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '10.5px', color: '#71717a', fontWeight: '500' }}>Topic / Policy Identifier</label>
                <input
                  type="text"
                  placeholder="e.g. Gateway Delayed Webhook Reconciliation Rule"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="shadcn-input"
                  style={{ marginTop: '3px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '10.5px', color: '#71717a', fontWeight: '500' }}>Domain Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="shadcn-input"
                  style={{ marginTop: '3px' }}
                >
                  <option value="Billing">Billing & Refunds</option>
                  <option value="Account">Identity & Security</option>
                  <option value="Orders">Order Fulfillment</option>
                  <option value="Technical">Technical Diagnostics</option>
                  <option value="Logistics">Logistics & Carriers</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '10.5px', color: '#71717a', fontWeight: '500' }}>Operational Heuristic / Decision Rule</label>
                <textarea
                  rows={4}
                  placeholder="If payment succeeds on card but order remains pending for >25 minutes, cross-check settlement hash before prompting customer retry..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="shadcn-input"
                  style={{ marginTop: '3px', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button className="btn btn-outline" onClick={() => setShowTeachModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveTeach}>
                Commit to Organizational Memory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
