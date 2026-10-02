import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  ShieldCheck,
  Droplets,
  Wind,
  Info,
  X
} from 'lucide-react';

export default function ForecastTimeline({ hourlyForecast = [], dailyForecast = [] }) {
  const [viewMode, setViewMode] = useState('hourly'); // 'hourly' | 'daily'
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getWeatherIcon = (code) => {
    if ([95, 96, 99].includes(code)) return <CloudLightning size={20} className="weather-icon-storm" />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain size={20} className="weather-icon-rain" />;
    if ([2, 3].includes(code)) return <CloudSun size={20} className="weather-icon-cloud" />;
    return <Sun size={20} className="weather-icon-sun" />;
  };

  const getConditionText = (code) => {
    if ([95, 96, 99].includes(code)) return 'Storm';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Rain';
    if ([71, 73, 75, 85, 86].includes(code)) return 'Snow';
    if ([45, 48].includes(code)) return 'Fog';
    if ([2, 3].includes(code)) return 'Partly Cloudy';
    if (code === 1) return 'Mainly Clear';
    return 'Clear';
  };

  const getRiskTag = (temp, rainProb) => {
    if (temp >= 40 || rainProb >= 80) return { label: 'Severe', color: 'var(--danger)' };
    if (temp >= 35 || rainProb >= 50) return { label: 'High', color: 'var(--orange)' };
    if (temp >= 30 || rainProb >= 25) return { label: 'Moderate', color: 'var(--warning)' };
    return { label: 'Low', color: 'var(--success)' };
  };

  const currentList = viewMode === 'hourly' ? hourlyForecast.slice(0, 16) : dailyForecast;
  const activeItem = currentList[selectedIdx] || currentList[0];

  return (
    <div className="forecast-timeline-container glass-panel">
      {/* Header & Mode Switcher */}
      <div className="forecast-header">
        <div className="forecast-title-wrap">
          <Calendar size={18} className="accent-pin" />
          <h3 className="section-heading">Forecast Timeline</h3>
        </div>

        <div className="tab-pill-switcher">
          <button 
            type="button"
            className={`tab-pill-btn ${viewMode === 'hourly' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('hourly');
              setSelectedIdx(0);
            }}
          >
            <Clock size={13} />
            <span>24-Hour Radar</span>
          </button>
          <button 
            type="button"
            className={`tab-pill-btn ${viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('daily');
              setSelectedIdx(0);
            }}
          >
            <Calendar size={13} />
            <span>7-Day Outlook</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div className="timeline-scroll-track">
        {viewMode === 'hourly' ? (
          hourlyForecast.length > 0 ? (
            hourlyForecast.slice(0, 16).map((item, idx) => {
              const isCurrent = idx === 0;
              const isSelected = selectedIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`timeline-card ${isCurrent ? 'now-card' : ''} ${isSelected ? 'selected-period' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Forecast for ${item.timeLabel}`}
                >
                  <span className="timeline-time">{isCurrent ? 'Now' : item.timeLabel}</span>
                  <div className="timeline-icon-box">
                    {getWeatherIcon(item.weatherCode)}
                  </div>
                  <span className="timeline-temp">{Math.round(item.temp ?? 25)}°C</span>
                  <span className="timeline-condition-label">{getConditionText(item.weatherCode)}</span>
                  
                  {item.rainProb > 0 && (
                    <div className="timeline-rain-chip">
                      <Droplets size={11} />
                      <span>{item.rainProb}%</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="timeline-empty">Synthesizing live hourly radar...</div>
          )
        ) : (
          dailyForecast.length > 0 ? (
            dailyForecast.map((day, idx) => {
              const isToday = idx === 0;
              const isSelected = selectedIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`timeline-card daily-card ${isToday ? 'now-card' : ''} ${isSelected ? 'selected-period' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Forecast for ${day.dayName}`}
                >
                  <span className="timeline-time">{day.dayName}</span>
                  <span className="timeline-subdate">{day.dateLabel}</span>
                  <div className="timeline-icon-box">
                    {getWeatherIcon(day.weatherCode)}
                  </div>
                  <div className="timeline-daily-temps">
                    <span className="max-t">{Math.round(day.maxTemp ?? 30)}°</span>
                    <span className="min-t">{Math.round(day.minTemp ?? 20)}°</span>
                  </div>
                  <span className="timeline-condition-label">{getConditionText(day.weatherCode)}</span>

                  {day.rainProb > 0 && (
                    <div className="timeline-rain-chip">
                      <Droplets size={11} />
                      <span>{day.rainProb}%</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="timeline-empty">Synthesizing 7-day outlook...</div>
          )
        )}
      </div>

      {/* Interactive Expanded Detail Drawer */}
      {activeItem && (
        <div className="forecast-detail-drawer">
          <div className="drawer-left">
            <span className="drawer-period-label">
              {viewMode === 'hourly' 
                ? (selectedIdx === 0 ? 'Current Observation Window' : `Projection at ${activeItem.timeLabel}`)
                : `${activeItem.dayName} (${activeItem.dateLabel})`}
            </span>
            <div className="drawer-condition-row">
              <span className="drawer-condition-name">{getConditionText(activeItem.weatherCode)}</span>
              <span className="drawer-dot-sep">•</span>
              <span className="drawer-temp-stat">
                {viewMode === 'hourly' 
                  ? `${Math.round(activeItem.temp ?? 25)}°C` 
                  : `${Math.round(activeItem.maxTemp ?? 30)}°C high / ${Math.round(activeItem.minTemp ?? 20)}°C low`}
              </span>
              <span className="drawer-dot-sep">•</span>
              <span className="drawer-rain-stat">
                Rain chance: {activeItem.rainProb ?? 0}%
              </span>
            </div>
          </div>

          <div className="drawer-right">
            {(() => {
              const tempVal = viewMode === 'hourly' ? activeItem.temp : activeItem.maxTemp;
              const rTag = getRiskTag(tempVal ?? 25, activeItem.rainProb ?? 0);
              return (
                <div className="drawer-risk-chip" style={{ color: rTag.color, borderColor: rTag.color }}>
                  <ShieldCheck size={14} />
                  <span>{rTag.label} Risk Period</span>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
