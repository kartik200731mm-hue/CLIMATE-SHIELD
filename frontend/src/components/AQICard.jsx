import React from 'react';
import { Wind, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getAqiCategory } from '../utils/formatters';

export default function AQICard({ airQuality }) {
  if (!airQuality) return null;

  const aqiVal = airQuality.aqi;
  const categoryInfo = getAqiCategory(aqiVal);

  return (
    <div className="glass-card env-card">
      <div className="env-card-header">
        <span className="env-card-title">Air Quality Index</span>
        <div 
          className="nav-pill" 
          style={{ 
            fontSize: '0.7rem', 
            padding: '0.2rem 0.5rem',
            background: `${categoryInfo.color}22`,
            borderColor: categoryInfo.color,
            color: categoryInfo.color
          }}
        >
          {categoryInfo.text}
        </div>
      </div>

      <div className="env-primary-metric">
        <span className="metric-big" style={{ color: categoryInfo.color }}>
          {aqiVal != null ? aqiVal : '--'}
        </span>
        <span className="metric-unit">AQI</span>
      </div>

      <div className="env-subgrid">
        <div className="submetric-box">
          <span className="submetric-label">PM2.5 Conc.</span>
          <span className="submetric-val">
            {airQuality.pm25 != null ? `${airQuality.pm25.toFixed(1)} µg/m³` : 'N/A'}
          </span>
        </div>

        <div className="submetric-box">
          <span className="submetric-label">PM10 Conc.</span>
          <span className="submetric-val">
            {airQuality.pm10 != null ? `${airQuality.pm10.toFixed(1)} µg/m³` : 'N/A'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
        {aqiVal > 150 ? (
          <>
            <AlertTriangle size={13} color="var(--accent-orange)" />
            <span>High particulate burden; mask recommended outdoors.</span>
          </>
        ) : (
          <>
            <ShieldCheck size={13} color="var(--accent-emerald)" />
            <span>Air pollution within tolerable exposure limits.</span>
          </>
        )}
      </div>
    </div>
  );
}
