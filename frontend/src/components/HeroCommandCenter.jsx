import React, { useMemo } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Flame, 
  CloudRain, 
  Wind, 
  Footprints, 
  Car, 
  Sparkles, 
  ArrowUpRight,
  Info,
  RefreshCw
} from 'lucide-react';
import { getRiskLevel } from '../utils/formatters';

export default function HeroCommandCenter({ 
  overallScore = 0, 
  status = 'LOW', 
  risks = {}, 
  decision = {}, 
  mode = 'Student', 
  activity = 'College',
  weather,
  airQuality,
  aiExplanation,
  isLoading = false,
  selectedMode,
  setSelectedMode,
  selectedActivity,
  setSelectedActivity
}) {
  const riskInfo = getRiskLevel(overallScore);

  // Only show full loading fallback if no risk data exists at all
  if (isLoading && (!risks || Object.keys(risks).length === 0)) {
    return (
      <section className="hero-command-center glass-panel">
        <div className="risk-loading-state">
          <RefreshCw className="animate-spin" size={24} style={{ color: 'var(--accent)' }} />
          <span className="state-label">Calculating environmental risk...</span>
        </div>
      </section>
    );
  }

  // SVG circular calculations
  const radius = 86;
  const strokeWidth = 11;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, overallScore)) / 100) * circumference;

  // Compute dynamic human-centric summary: "WHY IS THE RISK HIGH/MODERATE/LOW?"
  const dynamicRiskExplanation = useMemo(() => {
    const heat = risks?.heat?.score ?? 0;
    const rain = risks?.rain?.score ?? 0;
    const aqi = risks?.airQuality?.score ?? 0;
    const effectiveTemp = Math.round(weather?.feelsLike ?? weather?.temperature ?? 28);
    const rainProb = weather?.rainProbability ?? 0;
    const aqiVal = airQuality?.aqi ?? 50;

    const criticalFactors = [];
    if (heat >= 60) criticalFactors.push(`thermal stress (Feels like ${effectiveTemp}°C)`);
    if (aqi >= 60) criticalFactors.push(`poor air quality (${aqiVal} AQI)`);
    if (rain >= 55) criticalFactors.push(`heavy precipitation probability (${rainProb}%)`);

    if (overallScore > 75) {
      if (criticalFactors.length > 1) {
        return `High ${criticalFactors.join(' combined with ')} is elevating outdoor hazard levels significantly. Prolonged unshaded exposure is unsafe.`;
      } else if (criticalFactors.length === 1) {
        return `Severe ${criticalFactors[0]} is the primary hazard driver today, requiring strict precautions.`;
      }
      return `Multiple adverse atmospheric factors exceed comfortable thresholds for ${(activity || 'routine').toLowerCase()}.`;
    } else if (overallScore > 40) {
      if (criticalFactors.length > 0) {
        return `Elevated ${criticalFactors.join(' and ')} is increasing outdoor risk. Exercise vigilance during commutes.`;
      }
      return `Moderate environmental variance detected. Suitable for planned activities with standard protective gear.`;
    } else {
      return `All atmospheric indices (thermal comfort, air quality, precipitation) are within optimal safety ranges for ${(activity || 'routine').toLowerCase()}.`;
    }
  }, [overallScore, risks, weather, airQuality, activity]);

  const SUBRISK_ICONS = {
    heat: Flame,
    rain: CloudRain,
    airQuality: Wind,
    outdoor: Footprints,
    travel: Car
  };

  const SUBRISK_LABELS = {
    heat: 'Heat',
    rain: 'Rain',
    airQuality: 'Air Quality',
    outdoor: 'Outdoor',
    travel: 'Travel'
  };

  const verdictBadge = useMemo(() => {
    switch (decision?.verdict) {
      case 'RECOMMENDED':
        return {
          title: 'Safe to Go Outside',
          subtitle: 'Optimal conditions for your planned schedule',
          icon: CheckCircle2,
          color: '#4F8061',
          bg: '#E8EFE9'
        };
      case 'NOT_RECOMMENDED':
        return {
          title: 'Avoid Outdoor Activity',
          subtitle: 'Outdoor exertion poses high environmental stress',
          icon: XCircle,
          color: '#B95F5F',
          bg: 'rgba(185, 95, 95, 0.12)'
        };
      case 'CAUTION':
      default:
        return {
          title: 'Outdoor Activity Requires Caution',
          subtitle: 'Manageable conditions with recommended precautions',
          icon: AlertTriangle,
          color: '#B58A45',
          bg: 'rgba(181, 138, 69, 0.12)'
        };
    }
  }, [decision]);

  const VerdictIcon = verdictBadge.icon;

  return (
    <section className="hero-command-center glass-panel">
      {/* Top Banner Question & Verdict */}
      <div className="hero-question-bar">
        <div className="question-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
            <span className="question-eyebrow">Real-Time Risk Engine Assessment</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              border: '1px solid var(--border)'
            }}>
              CALIBRATED: {mode?.toUpperCase() || 'STUDENT'} // {activity?.toUpperCase() || 'COLLEGE'}
            </span>
          </div>
          <h2 className="question-title">How safe is it to go outside right now?</h2>
        </div>

        <div 
          className="verdict-pill-hero"
          style={{ borderColor: verdictBadge.color, background: verdictBadge.bg, color: verdictBadge.color }}
        >
          <VerdictIcon size={18} />
          <div className="verdict-pill-text">
            <span className="verdict-primary-text">{verdictBadge.title}</span>
            <span className="verdict-sub-text">{verdictBadge.subtitle}</span>
          </div>
        </div>
      </div>

      {/* Main Command Split: Dynamic Radial Ring + Factor Deep-Dive */}
      <div className="command-grid-layout">
        {/* Left Column: Radial Score Gauge & Core Reasoning */}
        <div className="radial-command-cell">
          <div className="dynamic-gauge-container">
            <svg className="radial-svg" viewBox="0 0 200 200">
              {/* Background Track */}
              <circle
                className="radial-track"
                cx="100"
                cy="100"
                r={radius}
                strokeWidth={strokeWidth}
              />

              {/* Animated Progress Arc starting at 12 o'clock */}
              <circle
                className="radial-progress"
                cx="100"
                cy="100"
                r={radius}
                strokeWidth={strokeWidth}
                stroke={riskInfo.color}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 100 100)"
              />
            </svg>

            {/* Center Content */}
            <div className="radial-center-stats">
              <span className="radial-score-num" style={{ color: riskInfo.color }}>
                {overallScore}
              </span>
              <span className="radial-score-denom">/ 100</span>
              <div 
                className="radial-level-tag"
                style={{ color: riskInfo.color, borderColor: `${riskInfo.color}40`, background: `${riskInfo.color}15` }}
              >
                {status} RISK
              </div>
            </div>
          </div>

          {/* Dynamic "Why is the risk high/moderate/low?" */}
          <div className="risk-why-card">
            <div className="why-header">
              <Info size={14} className="accent-info" />
              <span className="why-title">Why this score exists</span>
            </div>
            <p className="why-text">
              {dynamicRiskExplanation}
            </p>
          </div>
        </div>

        {/* Right Column: Factor Breakdown (Heat, Rain, AQI, Outdoor, Travel) */}
        <div className="factors-command-cell">
          <div className="factors-header">
            <span className="factors-title">Deterministic Risk Factors</span>
            <span className="factors-sub">Persona-Weighted Decomposition</span>
          </div>

          <div className="factors-list">
            {risks && Object.entries(risks).map(([key, item]) => {
              if (!item) return null;
              const IconComp = SUBRISK_ICONS[key] || Flame;
              const label = SUBRISK_LABELS[key] || key;
              const rawScore = typeof item === 'number' ? item : (typeof item.score === 'number' ? item.score : Number(item.score) || 0);
              const score = Math.min(100, Math.max(0, rawScore));
              const subLevel = getRiskLevel(score) || { color: '#10b981', label: 'LOW' };
              const severityLabel = (item && typeof item === 'object' && item.level) ? item.level : subLevel.label;

              // Contextual short reason for each factor
              let factorReason = '';
              if (key === 'heat') {
                factorReason = weather ? `${Math.round(weather.feelsLike ?? weather.temperature ?? 28)}°C feels-like index` : 'Thermal balance';
              } else if (key === 'rain') {
                factorReason = weather ? `${weather.rainProbability ?? 0}% rain prob • ${weather.precipitation ?? 0} mm` : 'Precipitation index';
              } else if (key === 'airQuality') {
                const aqiCat = typeof airQuality?.category === 'object' ? airQuality.category.text : (airQuality?.category || 'Moderate');
                factorReason = airQuality ? `${airQuality.aqi ?? 50} AQI • ${aqiCat}` : 'Particulate matter';
              } else if (key === 'outdoor') {
                factorReason = `${activity || 'Planned'} exertion profile`;
              } else if (key === 'travel') {
                factorReason = `${mode || 'Transit'} vulnerability`;
              }

              return (
                <div key={key} className="factor-row-card">
                  <div className="factor-meta-left">
                    <div className="factor-icon-wrap" style={{ color: subLevel.color, background: `${subLevel.color}18` }}>
                      <IconComp size={15} />
                    </div>
                    <div className="factor-labels">
                      <span className="factor-name">{label}</span>
                      <span className="factor-reason">{factorReason}</span>
                    </div>
                  </div>

                  <div className="factor-progress-right">
                    <div className="factor-score-wrap">
                      <span className="factor-severity" style={{ color: subLevel.color }}>
                        {severityLabel}
                      </span>
                      <span className="factor-numeric" style={{ color: subLevel.color }}>
                        {score}%
                      </span>
                    </div>
                    <div className="factor-track">
                      <div 
                        className="factor-fill"
                        style={{ width: `${score}%`, backgroundColor: subLevel.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Briefing Callout if available */}
          {aiExplanation && (
            <div className="ai-briefing-hero-box">
              <div className="ai-briefing-header">
                <div className="ai-tag">
                  <Sparkles size={13} />
                  <span>Gemini AI Synthesis</span>
                </div>
                <span className="ai-engine-label">
                  {typeof aiExplanation === 'object' && aiExplanation.engine ? aiExplanation.engine : 'Responsible AI Layer'}
                </span>
              </div>
              <p className="ai-briefing-quote">
                "{typeof aiExplanation === 'string' ? aiExplanation : (aiExplanation.summary || 'Atmospheric parameters calibrated.')}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
