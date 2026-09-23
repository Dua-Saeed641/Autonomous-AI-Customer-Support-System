import React from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Bot, 
  Users, 
  BookOpen, 
  Activity, 
  ShieldAlert, 
  BrainCircuit, 
  BarChart3, 
  Settings,
  Play,
  RotateCcw
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onRunDemo, onResetDemo, isDemoRunning }) {
  const mainNav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  const learningNav = [
    { id: 'human-intelligence', label: 'Human Intelligence', icon: ShieldAlert },
    { id: 'learning-signals', label: 'Learning Signals', icon: BrainCircuit },
  ];

  const systemNav = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            color: 'var(--text-emphasis)',
            fontFamily: 'var(--font-mono)'
          }}>
            PHRONA
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Autonomous Control Center
          </div>
        </div>
      </div>

      {/* Demo Controls Section */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          className="btn btn-primary" 
          onClick={onRunDemo}
          disabled={isDemoRunning}
          style={{ width: '100%', marginBottom: '6px', fontSize: '11px', letterSpacing: '0.05em' }}
        >
          <Play size={12} fill="black" />
          {isDemoRunning ? 'RUNNING DEMO...' : '▶ RUN DEMO'}
        </button>
        <button 
          className="btn" 
          onClick={onResetDemo}
          style={{ width: '100%', fontSize: '11px', color: 'var(--text-secondary)' }}
        >
          <RotateCcw size={12} />
          RESET DEMO
        </button>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '20px' }}>
          {mainNav.map(item => {
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
                  gap: '10px',
                  padding: '8px 12px',
                  marginBottom: '2px',
                  borderRadius: '4px',
                  border: 'none',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-emphasis)' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--text-emphasis)' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0 12px 6px 12px'
          }}>
            Learning
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
                  gap: '10px',
                  padding: '8px 12px',
                  marginBottom: '2px',
                  borderRadius: '4px',
                  border: 'none',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-emphasis)' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--text-emphasis)' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0 12px 6px 12px'
          }}>
            System
          </div>
          {systemNav.map(item => {
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
                  gap: '10px',
                  padding: '8px 12px',
                  marginBottom: '2px',
                  borderRadius: '4px',
                  border: 'none',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-emphasis)' : 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--text-emphasis)' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '11px',
        color: 'var(--text-muted)'
      }}>
        <div>Phrona OS v2.4.0</div>
        <div style={{ fontSize: '10px' }}>Enterprise Ops</div>
      </div>
    </aside>
  );
}
