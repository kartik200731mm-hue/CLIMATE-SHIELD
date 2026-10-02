import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

export default function ActionableRecommendationCard({
  evaluationResult,
  isLoadingAi = false,
  onRefreshAi
}) {
  if (!evaluationResult) {
    return (
      <div className="actionable-briefing-card glass-panel skeleton-loading">
        <div className="briefing-loading-state">
          <RefreshCw className="animate-spin" size={18} style={{ color: 'var(--accent)' }} />
          <span>Generating climate briefing and recommendations...</span>
        </div>
      </div>
    );
  }

  const { decision = {}, aiExplanation, risks = {}, status = 'LOW' } = evaluationResult;
  const reasons = decision?.reasons || [];
  const recommendations = decision?.recommendations || [];

  // Parse explanation safely whether string or object
  const situationText = typeof aiExplanation === 'string'
    ? aiExplanation
    : (aiExplanation?.summary || aiExplanation?.explanation || 'All measured parameters are within standard baseline thresholds.');

  // Verdict theme
  const isRecommended = decision?.verdict === 'RECOMMENDED';
  const isDanger = decision?.verdict === 'NOT_RECOMMENDED';
  const verdictColor = isRecommended ? 'var(--success)' : isDanger ? 'var(--danger)' : 'var(--warning)';

  return (
    <section className="actionable-briefing-card glass-panel">
      {/* Header Badge */}
      <div className="briefing-card-header">
        <div className="briefing-badge">
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span>CLIMATESHIELD BRIEFING</span>
        </div>

        <div className="briefing-verdict-tag" style={{ color: verdictColor, borderColor: 'var(--border)' }}>
          {isRecommended && <CheckCircle2 size={13} />}
          {!isRecommended && !isDanger && <AlertTriangle size={13} />}
          {isDanger && <XCircle size={13} />}
          <span>{decision?.verdict ? decision.verdict.replace('_', ' ') : status} RISK</span>
        </div>
      </div>

      {/* 3 Structured Columns / Sections */}
      <div className="briefing-three-column-grid">
        {/* 1. Current Situation */}
        <div className="briefing-section-box">
          <div className="briefing-section-label">
            <span className="section-number-pill">01</span>
            <h4>Current situation</h4>
          </div>
          <p className="briefing-text">
            {isLoadingAi ? (
              <span className="ai-loading-pulse">Synthesizing live atmospheric telemetry...</span>
            ) : (
              situationText
            )}
          </p>
        </div>

        {/* 2. Recommended Action */}
        <div className="briefing-section-box highlight-box">
          <div className="briefing-section-label">
            <span className="section-number-pill">02</span>
            <h4>Recommended action</h4>
          </div>
          {recommendations.length > 0 ? (
            <ul className="briefing-actions-list">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="briefing-action-item">
                  <span className="action-bullet-dot" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="briefing-text">Safe for routine outdoor schedule. Standard hydration advised.</p>
          )}
        </div>

        {/* 3. Why (Supporting Factors) */}
        <div className="briefing-section-box">
          <div className="briefing-section-label">
            <span className="section-number-pill">03</span>
            <h4>Why</h4>
          </div>
          {reasons.length > 0 ? (
            <ul className="briefing-reasons-list">
              {reasons.map((reason, idx) => (
                <li key={idx} className="briefing-reason-item">
                  <Info size={13} className="reason-info-icon" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="briefing-text">All atmospheric parameters (Heat, AQI, Rain) satisfy normal physical tolerance.</p>
          )}
        </div>
      </div>
    </section>
  );
}
