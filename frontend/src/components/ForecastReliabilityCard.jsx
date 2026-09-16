import React from 'react';
import { Target, HelpCircle, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ForecastReliabilityCard({ reliability }) {
  if (!reliability) return null;

  const isHigh = reliability.score >= 80;
  const isModerate = reliability.score >= 60 && reliability.score < 80;
  const badgeColor = isHigh ? 'var(--accent-emerald)' : isModerate ? 'var(--accent-amber)' : 'var(--accent-rose)';

  return (
    <div className="glass-card reliability-card">
      <div className="reliability-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Target size={16} color="var(--primary)" />
          <span className="reliability-tag">Forecast Confidence Engine</span>
        </div>
        <div 
          className="nav-pill"
          style={{ 
            fontSize: '0.675rem', 
            padding: '0.2rem 0.5rem',
            color: badgeColor,
            borderColor: badgeColor,
            background: `${badgeColor}15`
          }}
        >
          {reliability.level} CONFIDENCE
        </div>
      </div>

      <div className="reliability-metric">
        {reliability.score}%
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '0.5rem' }}>
          Estimated Model Stability
        </span>
      </div>

      <p className="reliability-expl">
        {reliability.explanation}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.65rem' }}>
        <HelpCircle size={12} />
        <span>Distinguishes atmospheric occurrence probability from numerical forecast reliability.</span>
      </div>
    </div>
  );
}
