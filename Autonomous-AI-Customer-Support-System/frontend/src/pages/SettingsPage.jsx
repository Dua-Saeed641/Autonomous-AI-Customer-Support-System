import React from 'react';
import { Settings, Shield, Sliders } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>System Settings & Policy Controls</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Configure autonomous thresholds, risk limits, and human approval bounds</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="phrona-card">
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '14px' }}>
            Autonomous Approval Bounds
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-Refund Threshold (INR)</label>
              <input
                type="number"
                defaultValue={1500}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginTop: '4px'
                }}
              />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Refunds exceeding this amount mandate human supervisor approval</span>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Minimum Confidence Floor (%)</label>
              <input
                type="number"
                defaultValue={75}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginTop: '4px'
                }}
              />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Below this confidence score, ticket prompts for Human Guidance</span>
            </div>
          </div>
        </div>

        <div className="phrona-card">
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-emphasis)', marginBottom: '14px' }}>
            Enterprise API Integration Modes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
              <span>Razorpay / Payment Gateway API</span>
              <span className="badge badge-green">MOCK ONLINE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
              <span>Shopify / Enterprise Order API</span>
              <span className="badge badge-green">MOCK ONLINE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
              <span>Zendesk / Customer CRM API</span>
              <span className="badge badge-green">MOCK ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
