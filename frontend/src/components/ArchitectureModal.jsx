import React, { useState } from 'react';
import { X, Layers, Cpu, Shield, BrainCircuit, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  const [selectedLayer, setSelectedLayer] = useState(5);

  if (!isOpen) return null;

  const layers = [
    {
      level: 5,
      name: "Level 5 — Embedded Human Intelligence",
      tag: "Core Thesis",
      icon: Shield,
      summary: "Human intelligence is embedded directly into the AI decision, supervision, correction and learning loop rather than being treated as a fallback exception mechanism.",
      details: [
        "6 Interactive Controls: Observe, Guide, Approve, Correct, Override, Teach",
        "Adaptive Involvement Modes: Mode A (Autonomous) through Mode F (Human Override)",
        "Human corrections become structured reinforcement signals rather than conversational takeovers"
      ]
    },
    {
      level: 4,
      name: "Level 4 — Biologically Inspired Decision Learning",
      tag: "Adaptive Circuit",
      icon: BrainCircuit,
      summary: "Sparse modular connectivity inspired by connectome neuroscience, coupled with dopamine-modeled prediction error δ = r + γV(s') - V(s).",
      details: [
        "Sparse activation: only specialized sub-circuits engage per query to minimize compute & token usage",
        "Outcome reward modeling: actions scored (+1.0 to -1.0) based on resolution, tool accuracy & policy adherence",
        "Decision mismatches update associative policy weights to adapt to company-specific nuances"
      ]
    },
    {
      level: 3,
      name: "Level 3 — Fast Judgment & Sparse Routing",
      tag: "Efficiency Cascade",
      icon: Zap,
      summary: "Separation of lightweight fast-judgment classifiers from heavy generative reasoning.",
      details: [
        "Lightweight judge evaluates urgency, sentiment, risk, and conversation deterioration in <60ms",
        "Selective reasoning: 74% of queries resolved through verified tool calls without expensive LLM loops",
        "Sparse Agent Router activates only needed specialists (e.g. Billing + Order, shutting down Logistics & Account)"
      ]
    },
    {
      level: 2,
      name: "Level 2 — Agentic RAG & Enterprise Tool Execution",
      tag: "Execution & Evidence",
      icon: Cpu,
      summary: "Closed-loop enterprise API execution with auditable evidence tracking and 2-phase safety verification.",
      details: [
        "Action Safety Gates: Read-only, Reversible, and High-Risk/Financial (>₹2,000 threshold holds for approval)",
        "2-Phase Verification: No resolution claimed until ledger settlement confirmed via cryptographic transaction ID",
        "Evidence object tracking: every decision auditable via policy section, API response, and prior ticket fact"
      ]
    },
    {
      level: 1,
      name: "Level 1 — Autonomous Customer Support",
      tag: "Baseline Scale",
      icon: Layers,
      summary: "End-to-end customer intent resolution across omnichannel interfaces with context retention.",
      details: [
        "Perception Layer parses intent, entities, sentiment and customer frustration index",
        "Persistent multi-tiered memory: Working, Customer, Episodic, and Organizational Memory",
        "Target containment of 75%+ with <45s average automated resolution"
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '24px'
    }}>
      <div className="shadcn-card" style={{
        width: '880px',
        maxHeight: '88vh',
        overflowY: 'auto',
        backgroundColor: '#0f0f12',
        border: '1px solid #27272a',
        padding: '24px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-secondary">NEUROSERVE Architecture</span>
              <span className="badge badge-neutral">Technical Spec 1.0</span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
              5-Level System Architecture & Innovation Hierarchy
            </h2>
            <p style={{ fontSize: '12.5px', color: '#a1a1aa', marginTop: '2px' }}>
              From <span className="font-mono" style={{ color: '#e4e4e7' }}>resolvyn.txt</span> — Human intelligence embedded as an architectural component.
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Central Thesis Comparison Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px',
          padding: '14px',
          backgroundColor: '#141418',
          borderRadius: '6px',
          border: '1px solid #27272a'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
              Traditional Support Automation (Fallback Model)
            </div>
            <div className="font-mono" style={{ fontSize: '11.5px', color: '#71717a', lineHeight: '1.5' }}>
              Customer → AI Chatbot → [Fails / Cannot Solve] → Escalate to Human
            </div>
            <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>
              ✕ Human is treated as a component of the failure architecture.
            </div>
          </div>

          <div style={{ borderLeft: '1px solid #27272a', paddingLeft: '16px' }}>
            <div style={{ fontSize: '11px', color: '#fafafa', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
              Resolvyn · NEUROSERVE Architecture
            </div>
            <div className="font-mono" style={{ fontSize: '11.5px', color: '#e4e4e7', lineHeight: '1.5' }}>
              Embedded Human Intelligence (Observe · Guide · Approve · Correct · Override · Teach) ↕ Decision Engine
            </div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>
              ✓ Human is a component of the decision, supervision & learning architecture.
            </div>
          </div>
        </div>

        {/* 5-Level Interactive Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '16px' }}>
          
          {/* Level Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {layers.map(l => {
              const Icon = l.icon;
              const isSelected = selectedLayer === l.level;
              return (
                <div 
                  key={l.level}
                  onClick={() => setSelectedLayer(l.level)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? '#52525b' : '#27272a'}`,
                    backgroundColor: isSelected ? '#27272a' : '#141418',
                    transition: 'all 0.12s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? '#18181b' : '#1c1c20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={14} color={isSelected ? '#fafafa' : '#a1a1aa'} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: isSelected ? '#fafafa' : '#d4d4d8' }}>
                        {l.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#71717a' }}>{l.tag}</div>
                    </div>
                  </div>
                  <ArrowRight size={13} color={isSelected ? '#fafafa' : 'transparent'} />
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Layer */}
          {(() => {
            const active = layers.find(l => l.level === selectedLayer) || layers[0];
            const Icon = active.icon;
            return (
              <div style={{
                padding: '18px',
                borderRadius: '6px',
                backgroundColor: '#141418',
                border: '1px solid #27272a',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={18} color="#fafafa" />
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#fafafa' }}>
                      {active.name}
                    </h3>
                    <span className="badge badge-neutral" style={{ marginTop: '2px' }}>
                      {active.tag}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: '#d4d4d8', lineHeight: '1.5' }}>
                  {active.summary}
                </p>

                <div>
                  <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '6px' }}>
                    Key Architecture Capabilities
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {active.details.map((detail, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#a1a1aa' }}>
                        <CheckCircle2 size={13} color="#a1a1aa" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {active.level === 4 && (
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#1a1a20',
                    border: '1px solid #27272a',
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontSize: '10.5px', color: '#a1a1aa', fontWeight: '500', marginBottom: '2px' }}>
                      Reward Prediction Error Formulation (§17):
                    </div>
                    <div className="font-mono" style={{ fontSize: '12px', color: '#fafafa' }}>
                      δ = r + γ · V(s') - V(s)
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
}
