import React from 'react';
import { History, Calendar, MapPin, User, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { getRiskLevel } from '../utils/formatters';

export default function HistorySection({ historyItems = [] }) {
  const renderVerdictBadge = (verdict) => {
    switch (verdict) {
      case 'RECOMMENDED':
        return (
          <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Safe
          </span>
        );
      case 'NOT_RECOMMENDED':
        return (
          <span style={{ color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <XCircle size={14} /> Avoid
          </span>
        );
      case 'CAUTION':
      default:
        return (
          <span style={{ color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <AlertTriangle size={14} /> Caution
          </span>
        );
    }
  };

  return (
    <div className="glass-card history-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Assessment Audit & History Log</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          MongoDB Snapshot Synchronized
        </span>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Location</th>
            <th>Context (Mode & Activity)</th>
            <th>Risk Score</th>
            <th>Decision Verdict</th>
          </tr>
        </thead>
        <tbody>
          {historyItems.map((item) => {
            const riskLevel = getRiskLevel(item.overallScore);
            const dateStr = new Date(item.timestamp).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <tr key={item.id}>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  {dateStr}
                </td>
                <td style={{ fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="var(--text-muted)" />
                    <span>{item.location}</span>
                  </div>
                </td>
                <td>
                  <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{item.mode}</span>
                  <span style={{ color: 'var(--text-muted)' }}> • {item.activity}</span>
                </td>
                <td>
                  <span 
                    style={{ 
                      color: riskLevel.color, 
                      fontWeight: 700, 
                      fontFamily: 'var(--font-mono)' 
                    }}
                  >
                    {item.overallScore}/100 ({item.status})
                  </span>
                </td>
                <td>
                  {renderVerdictBadge(item.verdict)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
