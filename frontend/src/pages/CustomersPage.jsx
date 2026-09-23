import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CustomersPage({ customers }) {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-secondary">Section 10.3 Customer Memory</span>
            <span className="badge badge-neutral">5 Profiles Synced</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fafafa', letterSpacing: '-0.01em' }}>
            Customer 360 & Episodic Interaction Memory
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
            Long-term customer attributes, subscription tiers, lifetime value, and historical sentiment telemetry across support touchpoints.
          </p>
        </div>
      </div>

      {/* Customer Accounts Table */}
      <div className="shadcn-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="shadcn-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name & Enterprise</th>
              <th>Subscription Plan</th>
              <th>Account Tenure</th>
              <th>Lifetime Spend</th>
              <th>Frustration Index</th>
              <th>Episodic History</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map(c => (
              <tr key={c.id}>
                <td className="font-mono" style={{ fontWeight: '600', color: '#fafafa' }}>
                  {c.id}
                </td>
                <td>
                  <div style={{ fontWeight: '500', color: '#fafafa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {c.name}
                    {c.vip_status && <span className="badge badge-neutral" style={{ fontSize: '8.5px', padding: '1px 5px' }}>VIP</span>}
                  </div>
                  <div style={{ fontSize: '11px', color: '#71717a' }}>{c.company || c.email}</div>
                </td>
                <td>
                  <span className="badge badge-neutral">{c.plan}</span>
                </td>
                <td style={{ fontSize: '12px', color: '#a1a1aa' }}>
                  {c.account_age}
                </td>
                <td className="font-mono" style={{ fontWeight: '500', color: '#fafafa' }}>
                  {c.total_spend || '₹1,50,000'}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="font-mono" style={{
                      fontWeight: '600',
                      color: parseInt(c.frustration_index || '30') > 70 ? '#fca5a5' : '#fafafa'
                    }}>
                      {c.frustration_index || '25%'}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#71717a' }}>({c.sentiment})</span>
                  </div>
                </td>
                <td style={{ fontSize: '11px', color: '#a1a1aa', maxWidth: '200px' }}>
                  {c.previous_tickets?.join(', ') || `${c.ticket_count} tickets logged`}
                </td>
                <td>
                  <span className="badge badge-emerald">
                    <ShieldCheck size={10} /> Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
