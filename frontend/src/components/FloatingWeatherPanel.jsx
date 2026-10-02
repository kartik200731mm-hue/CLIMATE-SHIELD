import React, { useState } from 'react';
import { 
  Sun, 
  Sunrise, 
  Sunset, 
  Droplets, 
  Wind, 
  CloudRain, 
  MapPin, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  Gauge
} from 'lucide-react';

export default function FloatingWeatherPanel({ 
  weather, 
  location, 
  airQuality, 
  isLoading = false,
  error = null,
  onRetry
}) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // 1. Loading State (Only if no weather data is loaded yet)
  if (isLoading && !weather) {
    return (
      <div className="floating-weather-panel glass-panel">
        <div className="weather-state-box">
          <RefreshCw className="animate-spin" size={22} style={{ color: 'var(--accent)' }} />
          <span className="state-label">Loading atmospheric conditions...</span>
        </div>
      </div>
    );
  }

  // 2. Error State (Only if weather is completely unavailable)
  if (!weather && error) {
    return (
      <div className="floating-weather-panel glass-panel">
        <div className="weather-state-box">
          <AlertCircle size={24} style={{ color: 'var(--warning)' }} />
          <div className="state-text-block">
            <span className="state-title">Unable to retrieve current weather.</span>
            <span className="state-sub">Atmospheric sensor stream temporarily unreachable.</span>
          </div>
          {onRetry && (
            <button type="button" className="cs-btn cs-btn-secondary state-action-btn" onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Format sunrise / sunset
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  const sunriseTime = weather.sunrise ? formatTime(weather.sunrise) : '06:14 AM';
  const sunsetTime = weather.sunset ? formatTime(weather.sunset) : '06:07 PM';

  const uvVal = typeof weather.uvIndex === 'number'
    ? weather.uvIndex
    : (Number(weather.uvIndex) || 3.5);

  return (
    <div className="floating-weather-panel glass-panel">
      {/* Section Header: CURRENT CONDITIONS */}
      <div className="panel-header">
        <div className="location-heading">
          <span className="question-eyebrow">CURRENT WEATHER & OBSERVATIONS</span>
          <div className="location-row">
            <MapPin size={18} className="accent-pin" />
            <h2 className="location-name">{location?.name || 'Local Atmosphere'}</h2>
          </div>
          <span className="location-sub">
            {location?.country || 'Earth'} • {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="condition-pill">
          <span className="pulse-indicator"></span>
          <span>{weather.condition || 'Clear'}</span>
        </div>
      </div>

      {/* Main Temperature & Solar Information */}
      <div className="temp-hero-section">
        <div className="temp-display-wrap">
          <div className="temp-big-val">
            {Math.round(weather.temperature ?? 25)}
            <span className="temp-deg">°C</span>
          </div>
          <div className="temp-range-meta">
            <span className="feels-like">
              Feels like <strong>{Math.round(weather.feelsLike ?? weather.temperature ?? 25)}°C</strong>
            </span>
            <div className="min-max-row">
              <span className="temp-high">High: {Math.round(weather.tempMax ?? ((weather.temperature ?? 25) + 4))}°</span>
              <span className="temp-separator">•</span>
              <span className="temp-low">Low: {Math.round(weather.tempMin ?? ((weather.temperature ?? 25) - 5))}°</span>
            </div>
          </div>
        </div>

        {/* Solar Horizon Times */}
        <div className="sun-cycle-card">
          <div className="sun-cycle-header">
            <Sun size={14} style={{ color: 'var(--warning)' }} />
            <span>Solar Cycle</span>
          </div>
          <div className="sun-times-row">
            <div className="sun-node">
              <Sunrise size={14} style={{ color: 'var(--accent)' }} />
              <div className="sun-text-stack">
                <span className="sun-time-label">Sunrise</span>
                <span className="sun-time-val">{sunriseTime}</span>
              </div>
            </div>
            <div className="sun-node">
              <Sunset size={14} style={{ color: 'var(--orange)' }} />
              <div className="sun-text-stack">
                <span className="sun-time-label">Sunset</span>
                <span className="sun-time-val">{sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meteorological 2x2 Telemetry Grid (Always Visible, No Mouse Hover Required) */}
      <div className="floating-telemetry-grid">
        {/* Metric 1: Precipitation */}
        <div className="telemetry-chip">
          <div className="chip-icon-wrap rain-accent">
            <CloudRain size={18} />
          </div>
          <div className="chip-content">
            <span className="chip-label">Precipitation</span>
            <span className="chip-value">{weather.rainProbability ?? 0}%</span>
            <span className="chip-meta">
              {(weather.rainProbability ?? 0) > 40 ? 'Rain expected • Carry umbrella' : 'No rain now • Dry conditions'}
            </span>
          </div>
        </div>

        {/* Metric 2: Humidity */}
        <div className="telemetry-chip">
          <div className="chip-icon-wrap humidity-accent">
            <Droplets size={18} />
          </div>
          <div className="chip-content">
            <span className="chip-label">Humidity</span>
            <span className="chip-value">{weather.humidity ?? 50}%</span>
            <span className="chip-meta">
              {(weather.humidity ?? 50) > 70 ? 'High moisture • Muggy air' : (weather.humidity ?? 50) < 35 ? 'Dry boundary • Extra hydration' : 'Optimal comfort (40–60%)'}
            </span>
          </div>
        </div>

        {/* Metric 3: Wind Speed */}
        <div className="telemetry-chip">
          <div className="chip-icon-wrap wind-accent">
            <Wind size={18} />
          </div>
          <div className="chip-content">
            <span className="chip-label">Wind Speed</span>
            <span className="chip-value">{Math.round(weather.windSpeed ?? 10)} km/h</span>
            <span className="chip-meta">
              {(weather.windSpeed ?? 10) > 25 ? 'Brisk airflow • Gusty' : 'Gentle airflow • Calm breeze'}
            </span>
          </div>
        </div>

        {/* Metric 4: UV Index */}
        <div className="telemetry-chip">
          <div className="chip-icon-wrap uv-accent">
            <Sun size={18} />
          </div>
          <div className="chip-content">
            <span className="chip-label">UV Index</span>
            <span className="chip-value">{uvVal.toFixed(1)}</span>
            <span className="chip-meta">
              {uvVal >= 8 ? 'Very high • Seek shade' : uvVal >= 5 ? 'Moderate • Sun protection advised' : 'Low sun exposure hazard'}
            </span>
          </div>
        </div>

        {/* Metric 5: Air Quality (AQI) */}
        <div className="telemetry-chip">
          <div className="chip-icon-wrap aqi-accent">
            <Gauge size={18} />
          </div>
          <div className="chip-content">
            <span className="chip-label">Air Quality (AQI)</span>
            <span className="chip-value">{airQuality?.aqi ?? 50}</span>
            <span className="chip-meta">
              {typeof airQuality?.category === 'object' ? airQuality?.category?.text : (airQuality?.category || 'Moderate')} Air
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
