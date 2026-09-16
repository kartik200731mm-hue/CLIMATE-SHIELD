import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Info, 
  AlertCircle,
  CheckCircle,
  HelpCircle 
} from 'lucide-react';
import { DECISIONS } from '../utils/constants';

export default function OutdoorDecisionCard({ decision, mode, activity, aiExplanation }) {
  const currentVerdict = DECISIONS[decision.verdict] || DECISIONS.CAUTION;

  const renderVerdictIcon = () => {
    switch (decision.verdict) {
      case 'RECOMMENDED':
        return <CheckCircle2 size={32} color="#10b981" />;
      case 'NOT_RECOMMENDED':
        return <XCircle size={32} color="#ef4444" />;
      case 'CAUTION':
      default:
        return <AlertTriangle size={32} color="#f59e0b" />;
    }
  };

  return (
    <div className="glass-card hero-decision-card" style={{ borderColor: currentVerdict.borderColor }}>
      <div 
        className="hero-glow-bg" 
        style={{ backgroundColor: currentVerdict.color }}
      />

      <div className="hero-header">
        <div>
          <span className="hero-subtitle">Decision Synthesis Engine</span>
          <h2 className="hero-title">SHOULD I GO OUTSIDE?</h2>
        </div>
        <div className="nav-pill" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)' }}>
          <span>{mode} • {activity}</span>
        </div>
      </div>

      {/* Main Verdict Banner */}
      <div 
        className="verdict-banner"
        style={{ 
          background: currentVerdict.bgColor, 
          borderColor: currentVerdict.borderColor 
        }}
      >
        <div className="verdict-icon" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
          {renderVerdictIcon()}
        </div>
        <div>
          <div className="verdict-title" style={{ color: currentVerdict.color }}>
            {currentVerdict.text}
          </div>
          <div className="verdict-desc">
            {currentVerdict.badgeText} based on deterministic risk analysis & selected activity threshold.
          </div>
        </div>
      </div>

      {/* Reasons and Recommendations Grid */}
      <div className="decision-details-grid">
        <div className="section-box">
          <div className="section-box-title">
            <AlertCircle size={16} color="var(--accent-amber)" />
            <span>Identified Risk Factors</span>
          </div>
          <ul className="bullet-list">
            {decision.reasons.map((reason, idx) => (
              <li key={idx} className="bullet-item">
                <AlertTriangle size={15} color="var(--accent-amber)" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-box">
          <div className="section-box-title">
            <CheckCircle size={16} color="var(--accent-emerald)" />
            <span>Actionable Safety Checklist</span>
          </div>
          <ul className="bullet-list">
            {decision.recommendations.map((rec, idx) => (
              <li key={idx} className="bullet-item">
                <CheckCircle size={15} color="var(--accent-emerald)" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Explanation Box */}
      {aiExplanation && (
        <div className="ai-box">
          <div className="ai-box-header">
            <span className="ai-badge">
              <Sparkles size={13} />
              <span>{aiExplanation.engine || 'Gemini AI Contextual Briefing'}</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Natural Language Synthesis
            </span>
          </div>
          <p className="ai-text">
            "{aiExplanation.summary}"
          </p>
          {Array.isArray(aiExplanation.actionableAdvice) && aiExplanation.actionableAdvice.length > 0 && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Recommended Precautions:
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {aiExplanation.actionableAdvice.map((advice, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)', marginTop: '2px' }}>•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="ai-disclaimer">
            <Info size={13} />
            <span>{aiExplanation.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
