import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  CloudRain, 
  Wind, 
  Sun, 
  Thermometer 
} from 'lucide-react';
import { formatTemperature, formatPercent } from '../utils/formatters';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="glass-card env-card">
      <div className="env-card-header">
        <span className="env-card-title">Weather Observations</span>
        <div className="nav-pill" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
          <CloudSun size={12} />
          <span>{weather.condition}</span>
        </div>
      </div>

      <div className="env-primary-metric">
        <span className="metric-big">{formatTemperature(weather.temperature)}</span>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          Feels like {formatTemperature(weather.feelsLike)}
        </span>
      </div>

      <div className="env-subgrid">
        <div className="submetric-box">
          <span className="submetric-label">Rain Chance</span>
          <span className="submetric-val" style={{ color: weather.rainProbability > 50 ? 'var(--primary)' : 'inherit' }}>
            {formatPercent(weather.rainProbability)}
          </span>
        </div>

        <div className="submetric-box">
          <span className="submetric-label">Humidity</span>
          <span className="submetric-val">{formatPercent(weather.humidity)}</span>
        </div>

        <div className="submetric-box">
          <span className="submetric-label">Wind Speed</span>
          <span className="submetric-val">{Math.round(weather.windSpeed)} km/h</span>
        </div>

        <div className="submetric-box">
          <span className="submetric-label">UV Index</span>
          <span className="submetric-val" style={{ color: weather.uvIndex > 7 ? 'var(--accent-orange)' : 'inherit' }}>
            {weather.uvIndex?.toFixed(1) || '--'}
          </span>
        </div>
      </div>
    </div>
  );
}
