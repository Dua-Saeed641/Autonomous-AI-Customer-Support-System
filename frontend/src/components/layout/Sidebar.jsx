import React from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Bot, 
  Users, 
  BookOpen, 
  ShieldAlert, 
  BrainCircuit, 
  BarChart3, 
  Play, 
  RotateCcw,
  Layers,
  GitBranch,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onRunDemo, 
  onResetDemo, 
  isDemoRunning, 
  demoStep, 
  onOpenArchitecture 
}) {
  const operationsNav = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'tickets', label: 'Decision Cockpit', icon: Ticket, badge: '5' },
    { id: 'agents', label: 'Specialist Agents', icon: Bot },
    { id: 'customers', label: 'Customer 360', icon: Users },
  ];

  const intelligenceNav = [
    { id: 'knowledge', label: 'Policy & Memory RAG', icon: BookOpen },
    { id: 'human-intelligence', label: 'Human Governance', icon: ShieldAlert },
  ];

  const learningNav = [
    { id: 'learning-signals', label: 'Prediction Error (δ)', icon: BrainCircuit },
    { id: 'root-cause', label: 'Root-Cause Incident', icon: GitBranch },
    { id: 'analytics', label: 'CX Telemetry', icon: BarChart3 },
  ];

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      backgroundColor: '#0c0c0e',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none',
      zIndex: 10
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '4px',
              backgroundColor: '#fafafa',
              color: '#09090b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)'
            }}>
              R
            </div>
            <div>
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '-0.01em',
                color: '#fafafa'
              }}>
                Resolvyn
              </div>
              <div style={{
                fontSize: '10px',
                color: '#71717a',
                fontWeight: '500'
              }}>
                NEUROSERVE Architecture
              </div>
            </div>
          </div>
        </div>
        <span className="badge badge-neutral" style={{ fontSize: '9.5px', padding: '1px 6px' }}>v1.0</span>
      </div>

      {/* Demo Scenario Controller */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', backgroundColor: '#111114' }}>
        <div style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.04em' }}>
          Presentation Demo
        </div>
        <button 
          className="btn btn-primary" 
          onClick={onRunDemo}
          disabled={isDemoRunning}
          style={{ width: '100%', marginBottom: '6px', fontSize: '11.5px', padding: '6px 10px' }}
        >
          <Play size={11} fill="currentColor" />
          {isDemoRunning ? `Step ${demoStep || 1}/6 in progress...` : 'Run Hero Demo (PH-1042)'}
        </button>
        <button 
          className="btn btn-outline" 
          onClick={onResetDemo}
          style={{ width: '100%', fontSize: '11px', padding: '5px 8px' }}
        >
          <RotateCcw size={10} />
          Reset Demo State
        </button>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, padding: '14px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Operations */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#52525b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0 8px 6px 8px'
          }}>
            Operations
          </div>
          {operationsNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  marginBottom: '1px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#27272a' : 'transparent',
                  color: isActive ? '#fafafa' : '#a1a1aa',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.1s ease, color 0.1s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={isActive ? '#fafafa' : '#71717a'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="badge badge-neutral" style={{ fontSize: '9.5px', padding: '1px 5px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Embedded Intelligence */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#52525b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0 8px 6px 8px'
          }}>
            Intelligence & Memory
          </div>
          {intelligenceNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  marginBottom: '1px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#27272a' : 'transparent',
                  color: isActive ? '#fafafa' : '#a1a1aa',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={isActive ? '#fafafa' : '#71717a'} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Learning & Governance */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: '#52525b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '0 8px 6px 8px'
          }}>
            Feedback & Diagnostics
          </div>
          {learningNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  marginBottom: '1px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#27272a' : 'transparent',
                  color: isActive ? '#fafafa' : '#a1a1aa',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={isActive ? '#fafafa' : '#71717a'} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Architecture Deep Dive Trigger */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', backgroundColor: '#0c0c0e' }}>
        <button 
          className="btn btn-outline" 
          onClick={onOpenArchitecture}
          style={{ width: '100%', fontSize: '11px', justifyContent: 'center' }}
        >
          <Layers size={12} />
          Architecture Spec
        </button>
      </div>
    </aside>
  );
}
