import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function LearningSignalsPage({ learningSignals }) {
  const rewardStructure = [
    { event: "Successful autonomous resolution", reward: "+1.0", status: "Optimal" },
    { event: "Customer accepts resolution", reward: "+0.5", status: "Positive" },
    { event: "Correct sparse tool selection", reward: "+0.3", status: "Accurate" },
    { event: "Useful knowledge retrieval", reward: "+0.1", status: "Effective" },
    { event: "Unnecessary human intervention", reward: "-0.2", status: "Suboptimal" },
    { event: "Repeated clarification question", reward: "-0.3", status: "Friction" },
    { event: "Wrong domain routing", reward: "-0.5", status: "Routing Error" },
    { event: "Policy violation / Contradiction", reward: "-1.0", status: "Violation" },
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Biomimetic Reinforcement (§15–18)</span>
            <span className="badge badge-neutral">Weights Active</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Dopamine-Inspired Prediction Error & Learning Signals
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Biologically inspired computational mechanism where human corrections and outcome mismatches generate structured reinforcement signals.
          </p>
        </div>

        <div className="shadcn-card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase' }}>Current Delta (δ)</div>
            <div className="font-mono" style={{ fontSize: '16px', fontWeight: '700', color: '#fafafa' }}>
              -0.08 (Optimal)
            </div>
          </div>
          <BrainCircuit size={18} color="#a1a1aa" />
        </div>
      </div>

      {/* Mathematical Formulation Banner */}
      <div className="shadcn-card" style={{
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '16px',
        alignItems: 'center',
        backgroundColor: '#111114'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '3px' }}>
            Computational Analogy (§17)
          </div>
          <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '0.02em' }}>
            δ = r + γ · V(s') - V(s)
          </div>
          <p style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '4px', lineHeight: '1.4' }}>
            Where <span className="font-mono" style={{ color: '#fafafa' }}>δ</span> is prediction error, <span className="font-mono" style={{ color: '#fafafa' }}>r</span> is observed outcome reward, <span className="font-mono">γ</span> is discount factor, and <span className="font-mono">V(s)</span> is predicted state value.
          </p>
        </div>

        <div style={{
          padding: '10px 12px',
          backgroundColor: '#09090b',
          borderRadius: '6px',
          fontSize: '11px',
          color: '#a1a1aa',
          lineHeight: '1.4',
          border: '1px solid #1c1c20'
        }}>
          <strong style={{ color: '#fafafa' }}>Scientific Grounding (§42):</strong> "We use biologically inspired reward-learning and prediction-error mechanisms as an adaptive decision layer — not claiming a literal fruit-fly brain in customer support."
        </div>
      </div>

      {/* Main Grid: Learning Signals Stream (65%) + Reward Structure Matrix (35%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '16px' }}>
        
        {/* Learning Signals Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa' }}>
            Recorded Mismatch Events & Policy Updates (§18)
          </div>

          {learningSignals?.map(ls => (
            <div key={ls.id} className="shadcn-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BrainCircuit size={14} color="#71717a" />
                  <span className="font-mono" style={{ fontSize: '12.5px', fontWeight: '600', color: '#fafafa' }}>
                    {ls.id}
                  </span>
                  <span className="badge badge-neutral">Ticket: {ls.ticket_id}</span>
                  <span className="badge badge-secondary" style={{ fontSize: '9.5px' }}>{ls.signal_type}</span>
                </div>
                <span className="badge badge-neutral">● {ls.status}</span>
              </div>

              {/* Expected vs Observed */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '8px 10px',
                backgroundColor: '#111114',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                fontSize: '11.5px'
              }}>
                <div>
                  <div style={{ fontSize: '9.5px', color: '#71717a', textTransform: 'uppercase' }}>AI Proposed Action:</div>
                  <div style={{ color: '#a1a1aa', marginTop: '2px' }}>{ls.expected_action}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9.5px', color: '#71717a', textTransform: 'uppercase' }}>Observed Human Decision:</div>
                  <div style={{ fontWeight: '500', color: '#fafafa', marginTop: '2px' }}>{ls.observed_action}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#a1a1aa' }}>
                <span>{ls.description}</span>
                {ls.prediction_error_delta && (
                  <span className="font-mono" style={{ fontSize: '11px', color: '#fafafa', fontWeight: '500' }}>
                    δ = {ls.prediction_error_delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section 16: Reward Model Matrix */}
        <div className="shadcn-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="shadcn-card-header">
            <h3 className="shadcn-card-title">Reinforcement Reward Matrix (§16)</h3>
            <p className="shadcn-card-description">Scored feedback values applied to model policies</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {rewardStructure.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 9px',
                backgroundColor: '#111114',
                borderRadius: '4px',
                fontSize: '11.5px',
                border: '1px solid var(--border)'
              }}>
                <span style={{ color: '#a1a1aa' }}>{item.event}</span>
                <span className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                  {item.reward}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '14px',
            padding: '10px',
            backgroundColor: '#111114',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#71717a',
            lineHeight: '1.4',
            border: '1px solid var(--border)'
          }}>
            <strong style={{ color: '#a1a1aa' }}>Sparse Associative Updates:</strong> Corrections alter only sparse routing weights between perception tokens and specialized tool handlers, avoiding catastrophic forgetting.
          </div>
        </div>

      </div>

    </div>
  );
}
