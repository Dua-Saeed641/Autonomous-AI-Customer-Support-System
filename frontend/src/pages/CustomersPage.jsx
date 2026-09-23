import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

export default function CustomersPage({ customers }) {
  if (!customers) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Loading customer accounts...</div>;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-emphasis)' }}>Customer Accounts</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Enterprise profiles, transaction history, and sentiment telemetry</p>
      </div>

      <div className="phrona-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="phrona-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription Plan</th>
              <th>Account Age</th>
              <th>Ticket History</th>
              <th>Recent Sentiment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td className="font-mono" style={{ fontWeight: '600', color: 'var(--text-emphasis)' }}>{c.id}</td>
                <td style={{ fontWeight: '500' }}>{c.name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{c.email}</td>
                <td><span className="badge badge-blue">{c.plan}</span></td>
                <td>{c.account_age}</td>
                <td>{c.ticket_count} tickets</td>
                <td>
                  <span className={`badge ${c.sentiment === 'Frustrated' ? 'badge-amber' : c.sentiment === 'Angry' ? 'badge-red' : 'badge-neutral'}`}>
                    {c.sentiment}
                  </span>
                </td>
                <td><span className="badge badge-green"><ShieldCheck size={10} strokeWidth={3} /> Verified</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
