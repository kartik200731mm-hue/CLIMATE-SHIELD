import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Cpu, 
  Flame, 
  CloudRain, 
  Wind, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Activity, 
  Trees, 
  Car, 
  Zap,
  Info
} from 'lucide-react';
import { getRiskLevel } from '../utils/formatters';
import { evaluateClimateRisk } from '../utils/mockData';

export default function StrategicNodesSimulator({ baseWeather, baseAirQuality, mode, activity }) {
  // Simulator Adjustments
  const [simTemp, setSimTemp] = useState(baseWeather?.temperature ?? 30);
  const [simHumidity, setSimHumidity] = useState(baseWeather?.humidity ?? 60);
  const [simRainProb, setSimRainProb] = useState(baseWeather?.rainProbability ?? 20);
  const [simAqi, setSimAqi] = useState(baseAirQuality?.aqi ?? 85);
  const [mitigationFactor, setMitigationFactor] = useState('none'); // 'none' | 'n95' | 'shaded' | 'ac-transit'

  // Reset to live telemetry
  const handleReset = () => {
    setSimTemp(baseWeather?.temperature ?? 30);
    setSimHumidity(baseWeather?.humidity ?? 60);
    setSimRainProb(baseWeather?.rainProbability ?? 20);
    setSimAqi(baseAirQuality?.aqi ?? 85);
    setMitigationFactor('none');
  };

  // Re-run evaluation dynamically through simulated telemetry
  const simEvaluation = useMemo(() => {
    const simWeather = {
      ...baseWeather,
      temperature: simTemp,
      feelsLike: simTemp + (simHumidity > 60 ? (simHumidity - 60) * 0.15 : 0),
      humidity: simHumidity,
      rainProbability: simRainProb,
      precipitation: simRainProb > 60 ? (simRainProb - 60) * 0.4 : 0,
      windSpeed: baseWeather?.windSpeed ?? 12,
      uvIndex: baseWeather?.uvIndex ?? 6.0,
      weatherCode: simRainProb > 75 ? 65 : simRainProb > 45 ? 61 : 0
    };

    const simAQ = {
      ...baseAirQuality,
      aqi: simAqi,
      category: simAqi > 200 ? 'Very Unhealthy' : simAqi > 150 ? 'Unhealthy' : simAqi > 100 ? 'Moderate' : 'Good'
    };

    const evalResult = evaluateClimateRisk({
      weather: simWeather,
      airQuality: simAQ,
      mode,
      activity
    });

    // Apply mitigation reduction if selected
    let mitigatedScore = evalResult.overallScore;
    let mitigationNotice = 'No protective barrier active.';
    if (mitigationFactor === 'n95') {
      mitigatedScore = Math.max(10, Math.round(mitigatedScore * 0.78));
      mitigationNotice = 'N95 Respirator reduces inhaled particulate matter by ~95%, mitigating respiratory risk.';
    } else if (mitigationFactor === 'shaded') {
      mitigatedScore = Math.max(10, Math.round(mitigatedScore * 0.85));
      mitigationNotice = 'Continuous shade & electrolyte hydration reduces effective solar radiation load by 15%.';
    } else if (mitigationFactor === 'ac-transit') {
      mitigatedScore = Math.max(10, Math.round(mitigatedScore * 0.72));
      mitigationNotice = 'Enclosed air-conditioned vehicle eliminates precipitation and ambient particulate exposure during transit.';
    }

    const mitigatedStatus = mitigatedScore > 80 ? 'SEVERE' : mitigatedScore > 60 ? 'HIGH' : mitigatedScore > 30 ? 'MODERATE' : 'LOW';

    return {
      rawScore: evalResult.overallScore,
      mitigatedScore,
      mitigatedStatus,
      rawStatus: evalResult.status,
      risks: evalResult.risks,
      mitigationNotice
    };
  }, [simTemp, simHumidity, simRainProb, simAqi, mitigationFactor, baseWeather, baseAirQuality, mode, activity]);

  const rawLevel = getRiskLevel(simEvaluation.rawScore);
  const mitigatedLevel = getRiskLevel(simEvaluation.mitigatedScore);

  return (
    <div className="strategic-simulator-card glass-panel">
      {/* Header */}
      <div className="simulator-header">
        <div>
          <div className="tag-row">
            <Cpu size={16} className="text-accent" />
            <span className="section-eyebrow">Strategic Intelligence Node</span>
          </div>
          <h2 className="section-title">Climate Stress & Policy Impact Simulator</h2>
          <p className="simulator-subtitle">
            Simulate environmental stress anomalies and test personal climate resilience strategies in real time.
          </p>
        </div>

        <button className="clear-history-btn" onClick={handleReset} title="Reset to live observations">
          <RotateCcw size={13} />
          <span>Reset Telemetry</span>
        </button>
      </div>

      {/* Main Grid: Stress Sliders & Impact Output */}
      <div className="simulator-grid">
        {/* Left Column: Sliders */}
        <div className="controls-column">
          <h3 className="controls-heading">Environmental Stress Factors</h3>

          {/* Temperature Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Ambient Temperature</span>
              <span className="slider-val text-amber">{simTemp}°C</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={simTemp}
              onChange={(e) => setSimTemp(Number(e.target.value))}
              className="range-input"
            />
            <div className="slider-ticks">
              <span>10°C (Chill)</span>
              <span>30°C</span>
              <span>50°C (Extreme Heat)</span>
            </div>
          </div>

          {/* Humidity Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Relative Humidity</span>
              <span className="slider-val text-accent">{simHumidity}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={simHumidity}
              onChange={(e) => setSimHumidity(Number(e.target.value))}
              className="range-input"
            />
            <div className="slider-ticks">
              <span>10% (Arid)</span>
              <span>50% (Comfort)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* Air Quality Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Air Quality Index (AQI)</span>
              <span className="slider-val text-rose">{simAqi} AQI</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="450" 
              value={simAqi}
              onChange={(e) => setSimAqi(Number(e.target.value))}
              className="range-input"
            />
            <div className="slider-ticks">
              <span>20 (Good)</span>
              <span>150 (Unhealthy)</span>
              <span>450 (Hazardous)</span>
            </div>
          </div>

          {/* Rain Probability Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-name">Precipitation Probability</span>
              <span className="slider-val text-primary">{simRainProb}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={simRainProb}
              onChange={(e) => setSimRainProb(Number(e.target.value))}
              className="range-input"
            />
            <div className="slider-ticks">
              <span>0% (Dry)</span>
              <span>50%</span>
              <span>100% (Torrential)</span>
            </div>
          </div>

          {/* Mitigation Strategy Selector */}
          <div className="mitigation-picker-wrap">
            <label className="picker-label">Resilience Strategy & Protective Barrier</label>
            <div className="picker-options">
              <button 
                className={`picker-btn ${mitigationFactor === 'none' ? 'active' : ''}`}
                onClick={() => setMitigationFactor('none')}
              >
                No Barrier
              </button>
              <button 
                className={`picker-btn ${mitigationFactor === 'n95' ? 'active' : ''}`}
                onClick={() => setMitigationFactor('n95')}
              >
                N95 Mask
              </button>
              <button 
                className={`picker-btn ${mitigationFactor === 'shaded' ? 'active' : ''}`}
                onClick={() => setMitigationFactor('shaded')}
              >
                Shaded / Hydrated
              </button>
              <button 
                className={`picker-btn ${mitigationFactor === 'ac-transit' ? 'active' : ''}`}
                onClick={() => setMitigationFactor('ac-transit')}
              >
                Enclosed Transit
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Impact Outcome */}
        <div className="outcome-column">
          <h3 className="controls-heading">Simulated Stress Impact</h3>

          <div className="score-comparison-card">
            {/* Raw Stress Score */}
            <div className="comparison-cell">
              <span className="comp-label">Baseline Stress Risk</span>
              <div className="comp-score-big" style={{ color: rawLevel.color }}>
                {simEvaluation.rawScore}
                <span className="comp-denom">/100</span>
              </div>
              <span 
                className="comp-badge"
                style={{ color: rawLevel.color, background: `${rawLevel.color}15`, borderColor: `${rawLevel.color}40` }}
              >
                {simEvaluation.rawStatus} RISK
              </span>
            </div>

            <div className="comparison-arrow">
              <ArrowRight size={24} className="text-muted" />
            </div>

            {/* Mitigated Score */}
            <div className="comparison-cell">
              <span className="comp-label">With Resilience Barrier</span>
              <div className="comp-score-big" style={{ color: mitigatedLevel.color }}>
                {simEvaluation.mitigatedScore}
                <span className="comp-denom">/100</span>
              </div>
              <span 
                className="comp-badge"
                style={{ color: mitigatedLevel.color, background: `${mitigatedLevel.color}15`, borderColor: `${mitigatedLevel.color}40` }}
              >
                {simEvaluation.mitigatedStatus} RISK
              </span>
            </div>
          </div>

          {/* Mitigation Explanatory Notice */}
          <div className="mitigation-notice-box">
            <div className="notice-tag">
              <Sparkles size={13} />
              <span>Protective Adaptation Analysis</span>
            </div>
            <p className="notice-text">
              {simEvaluation.mitigationNotice}
            </p>
          </div>

          {/* Component Factors Breakdown under simulated stress */}
          <div className="simulated-factors-list">
            <span className="sim-factors-title">Decomposed Component Stress</span>
            {simEvaluation.risks && Object.entries(simEvaluation.risks).map(([key, item]) => {
              const lvl = getRiskLevel(item.score);
              return (
                <div key={key} className="sim-factor-item">
                  <span className="sim-factor-name">{key.toUpperCase()}</span>
                  <div className="sim-factor-bar-wrap">
                    <div className="sim-factor-fill" style={{ width: `${item.score}%`, backgroundColor: lvl.color }} />
                  </div>
                  <span className="sim-factor-val" style={{ color: lvl.color }}>{item.score}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
