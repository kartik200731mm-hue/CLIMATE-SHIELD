import React from 'react';
import { 
  Flame, 
  CloudRain, 
  Wind, 
  Footprints, 
  Car, 
  ShieldAlert 
} from 'lucide-react';
import { getRiskLevel } from '../utils/formatters';

export default function RiskScoreGauge({ overallScore, status, risks }) {
  const riskInfo = getRiskLevel(overallScore);

  // SVG circular calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const SUBRISK_ICONS = {
    heat: Flame,
    rain: CloudRain,
    airQuality: Wind,
    outdoor: Footprints,
    travel: Car
  };

  const SUBRISK_LABELS = {
    heat: 'Heat Risk',
    rain: 'Rain Risk',
    airQuality: 'Air Quality Risk',
    outdoor: 'Outdoor Activity Risk',
    travel: 'Travel / Transit Risk'
  };

  return (
    <div className="glass-card risk-gauge-card">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <ShieldAlert size={16} color="var(--primary)" />
          <span>Deterministic Risk Index</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Scale: 0-100
        </span>
      </div>

      {/* Circular Gauge */}
      <div className="gauge-wrapper">
        <svg className="gauge-svg" viewBox="0 0 160 160">
          <circle
            className="gauge-circle-bg"
            cx="80"
            cy="80"
            r={radius}
          />
          <circle
            className="gauge-circle-progress"
            cx="80"
            cy="80"
            r={radius}
            stroke={riskInfo.color}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div className="gauge-center-content">
          <span className="gauge-score" style={{ color: riskInfo.color }}>
            {overallScore}
          </span>
          <span className="gauge-denom">/100</span>
        </div>
      </div>

      {/* Status Badge */}
      <div 
        className="status-badge"
        style={{ 
          color: riskInfo.color, 
          background: riskInfo.bgColor, 
          border: `1px solid ${riskInfo.borderColor}` 
        }}
      >
        {status} RISK
      </div>

      <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        {riskInfo.description}
      </p>

      {/* Sub-Risks Breakdown */}
      <div className="subrisks-list">
        {risks && Object.entries(risks).map(([key, item]) => {
          const IconComp = SUBRISK_ICONS[key] || Flame;
          const label = SUBRISK_LABELS[key] || key;
          const subLevel = getRiskLevel(item.score);

          return (
            <div key={key} className="subrisk-item">
              <div className="subrisk-info">
                <span className="subrisk-name">
                  <IconComp size={14} color={subLevel.color} />
                  <span>{label}</span>
                </span>
                <span className="subrisk-score" style={{ color: subLevel.color }}>
                  {item.score}% ({item.level})
                </span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${item.score}%`, 
                    backgroundColor: subLevel.color 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
