import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

export default function TopBar({ 
  pageTitle, 
  searchTerm, 
  setSearchTerm, 
  onSelectScenario, 
  activeScenario 
}) {
  return (
    <header style={{
      height: '52px',
      backgroundColor: '#0c0c0e',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      zIndex: 5
    }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#71717a' }}>Resolvyn</span>
        <ChevronRight size={12} color="#52525b" />
        <h1 style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#fafafa',
          textTransform: 'capitalize'
        }}>
          {pageTitle}
        </h1>
      </div>

      {/* Center PPT Scenario Tabs (shadcn style segmented control) */}
      <div className="tab-pill-group">
        <button 
          className={`tab-pill ${activeScenario === 'PH-1042' ? 'active' : ''}`}
          onClick={() => onSelectScenario('PH-1042')}
        >
          Scenario 1: Duplicate Refund
        </button>
        <button 
          className={`tab-pill ${activeScenario === 'PH-1044' ? 'active' : ''}`}
          onClick={() => onSelectScenario('PH-1044')}
        >
          Scenario 2: Contradiction & δ
        </button>
        <button 
          className={`tab-pill ${activeScenario === 'ROOT_CAUSE' ? 'active' : ''}`}
          onClick={() => onSelectScenario('ROOT_CAUSE')}
        >
          Scenario 3: Release 4.2 Incident
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', width: '200px' }}>
          <Search size={13} style={{
            position: 'absolute',
            left: '9px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#71717a'
          }} />
          <input
            type="text"
            placeholder="Search tickets, policies..."
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="shadcn-input"
            style={{ paddingLeft: '28px', height: '30px', fontSize: '11.5px' }}
          />
        </div>

        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingLeft: '12px',
          borderLeft: '1px solid var(--border)'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '9999px',
            backgroundColor: '#27272a',
            border: '1px solid #3f3f46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: '600',
            color: '#fafafa'
          }}>
            OP
          </div>
          <span style={{ fontSize: '12px', color: '#e4e4e7', fontWeight: '500' }}>
            Operator #01
          </span>
        </div>
      </div>
    </header>
  );
}
