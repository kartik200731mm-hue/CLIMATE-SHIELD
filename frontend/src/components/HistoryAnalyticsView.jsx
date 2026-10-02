import React, { useState, useMemo } from 'react';
import { 
  History, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Wind,
  Flame,
  CloudRain,
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getRiskLevel } from '../utils/formatters';

export default function HistoryAnalyticsView({ 
  historyItems = [], 
  isLoading = false,
  error = null,
  onRetry,
  onDeleteEntry, 
  onClearAll 
}) {
  const [activeMetricTab, setActiveMetricTab] = useState('risk-trend'); // 'risk-trend' | 'temp-risk' | 'aqi-risk'

  // Loading State
  if (isLoading) {
    return (
      <div className="history-analytics-page glass-panel">
        <div className="history-state-box">
          <RefreshCw className="animate-spin" size={22} style={{ color: 'var(--accent)' }} />
          <span className="state-label">Loading historical climate records...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="history-analytics-page glass-panel">
        <div className="history-state-box">
          <AlertCircle size={24} style={{ color: 'var(--warning)' }} />
          <div className="state-text-block">
            <span className="state-title">Unable to load historical data.</span>
            <span className="state-sub">Could not retrieve audit trail from persistence store.</span>
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

  // Empty State (No records yet)
  if (!historyItems || historyItems.length === 0) {
    return (
      <div className="history-analytics-page glass-panel">
        <div className="section-head-row">
          <div>
            <div className="tag-row">
              <History size={16} className="accent-pin" />
              <span className="section-eyebrow">Audit & Longitudinal Intelligence</span>
            </div>
            <h2 className="section-title">Risk History & Personal Climate Insights</h2>
          </div>
        </div>

        <div className="history-empty-state-card">
          <div className="empty-icon-wrap">
            <Calendar size={32} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="empty-title">No historical assessments yet.</h3>
          <p className="empty-desc">Your future climate assessments will appear here as you evaluate daily conditions.</p>
        </div>
      </div>
    );
  }

  // Computed Personal Climate Insights based purely on actual stored records
  const insights = useMemo(() => {
    const total = historyItems.reduce((acc, item) => acc + (item.overallScore || 0), 0);
    const avgRisk = Math.round(total / historyItems.length);
    const severeCount = historyItems.filter((i) => i.overallScore > 75).length;
    const safeCount = historyItems.filter((i) => i.overallScore <= 35).length;

    // Check AQI vs Heat prevalence
    const highAqiCount = historyItems.filter((i) => (i.aqi || 0) > 100).length;
    const highTempCount = historyItems.filter((i) => (i.temp || 0) > 35).length;
    const primaryHazard = highAqiCount >= highTempCount ? 'Air Quality Exceedances' : 'Thermal Heat Stress';

    let insightQuote = `Your average outdoor risk across recorded sessions was ${avgRisk}/100. `;
    if (avgRisk > 60) {
      insightQuote += `${primaryHazard} contributed significantly to elevated risk scores. Consider morning or late evening transit windows.`;
    } else {
      insightQuote += `Overall conditions were generally safe across ${safeCount} of your evaluated periods.`;
    }

    return { avgRisk, primaryHazard, severeCount, safeCount, insightQuote };
  }, [historyItems]);

  // SVG Chart Dimensions
  const chartWidth = 700;
  const chartHeight = 220;
  const padding = { top: 25, right: 30, bottom: 35, left: 45 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  // Chart data points
  const points = useMemo(() => {
    const sorted = [...historyItems].reverse();
    return sorted.map((item, idx) => {
      const x = padding.left + (idx / Math.max(1, sorted.length - 1)) * innerW;
      const score = item.overallScore ?? 50;
      const y = padding.top + innerH - (score / 100) * innerH;
      return {
        x,
        y,
        score,
        temp: item.temp ?? 25,
        aqi: item.aqi ?? 50,
        label: new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        location: item.location
      };
    });
  }, [historyItems, innerW, innerH]);

  // Create SVG path string for spline line
  const svgPath = useMemo(() => {
    if (points.length < 2) return '';
    return points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
  }, [points]);

  const svgArea = useMemo(() => {
    if (points.length < 2) return '';
    const firstX = points[0].x.toFixed(1);
    const lastX = points[points.length - 1].x.toFixed(1);
    const bottomY = (padding.top + innerH).toFixed(1);
    return `${svgPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [svgPath, points, innerH]);

  return (
    <div className="history-analytics-page glass-panel">
      {/* Page Header */}
      <div className="section-head-row">
        <div>
          <div className="tag-row">
            <History size={16} className="accent-pin" />
            <span className="section-eyebrow">Audit & Longitudinal Intelligence</span>
          </div>
          <h2 className="section-title">Risk History & Personal Climate Insights</h2>
        </div>

        {historyItems.length > 0 && onClearAll && (
          <button 
            type="button"
            className="clear-history-btn"
            onClick={onClearAll}
            title="Reset assessment history log"
          >
            <RotateCcw size={13} />
            <span>Reset History</span>
          </button>
        )}
      </div>

      {/* 1. Personal Climate Insights Summary Cards */}
      <div className="insights-metrics-grid">
        <div className="insight-card">
          <span className="insight-card-label">Average Risk Index</span>
          <div className="insight-card-val" style={{ color: getRiskLevel(insights.avgRisk).color }}>
            {insights.avgRisk}
            <span className="unit-denom">/100</span>
          </div>
          <span className="insight-card-meta">{getRiskLevel(insights.avgRisk).label} Baseline</span>
        </div>

        <div className="insight-card">
          <span className="insight-card-label">Primary Hazard Driver</span>
          <div className="insight-card-val text-primary" style={{ fontSize: '1.25rem' }}>
            {insights.primaryHazard}
          </div>
          <span className="insight-card-meta">Based on ambient sensor thresholds</span>
        </div>

        <div className="insight-card">
          <span className="insight-card-label">Safe vs. Severe Sessions</span>
          <div className="safe-severe-ratio">
            <span className="safe-badge-pill">{insights.safeCount} Safe</span>
            <span className="severe-badge-pill">{insights.severeCount} Severe</span>
          </div>
          <span className="insight-card-meta">Recorded assessment periods</span>
        </div>
      </div>

      {/* AI Data-Driven Insight Callout */}
      <div className="data-driven-insight-box">
        <div className="insight-pill-tag">
          <Sparkles size={13} />
          <span>Longitudinal Observation</span>
        </div>
        <p className="insight-quote-text">"{insights.insightQuote}"</p>
      </div>

      {/* 2. Interactive Analytical Charts */}
      {points.length >= 2 ? (
        <div className="chart-wrapper-card">
          <div className="chart-header-row">
            <div className="chart-title-wrap">
              <BarChart3 size={16} className="text-accent" />
              <h3 className="chart-heading">Environmental Risk Dynamics</h3>
            </div>

            <div className="tab-pill-switcher">
              <button 
                type="button"
                className={`tab-pill-btn ${activeMetricTab === 'risk-trend' ? 'active' : ''}`}
                onClick={() => setActiveMetricTab('risk-trend')}
              >
                Risk Over Time
              </button>
              <button 
                type="button"
                className={`tab-pill-btn ${activeMetricTab === 'temp-risk' ? 'active' : ''}`}
                onClick={() => setActiveMetricTab('temp-risk')}
              >
                Temp vs Risk
              </button>
              <button 
                type="button"
                className={`tab-pill-btn ${activeMetricTab === 'aqi-risk' ? 'active' : ''}`}
                onClick={() => setActiveMetricTab('aqi-risk')}
              >
                AQI vs Risk
              </button>
            </div>
          </div>

          {/* SVG Visualization */}
          <div className="svg-chart-container">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="analytics-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="risk-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#607D68" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#607D68" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#607D68" />
                  <stop offset="50%" stopColor="#8A9A83" />
                  <stop offset="100%" stopColor="#B58A45" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = padding.top + innerH - (val / 100) * innerH;
                return (
                  <g key={val}>
                    <line 
                      x1={padding.left} 
                      y1={y} 
                      x2={chartWidth - padding.right} 
                      y2={y} 
                      stroke="var(--border-soft)" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x={padding.left - 10} 
                      y={y + 4} 
                      textAnchor="end" 
                      fontSize="10" 
                      fill="var(--text-muted)"
                      fontFamily="var(--font-mono)"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {svgArea && (
                <path d={svgArea} fill="url(#risk-gradient)" />
              )}

              {/* Spline Line */}
              {svgPath && (
                <path d={svgPath} fill="none" stroke="url(#line-gradient)" strokeWidth="2.5" strokeLinecap="round" />
              )}

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx} className="chart-point-group">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4.5" 
                    fill="var(--surface)" 
                    stroke="#607D68" 
                    strokeWidth="2" 
                  />
                  <text 
                    x={p.x} 
                    y={padding.top + innerH + 18} 
                    textAnchor="middle" 
                    fontSize="10" 
                    fill="var(--text-muted)"
                    fontFamily="var(--font-mono)"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      ) : (
        <div className="chart-empty-state">
          <Info size={16} style={{ color: 'var(--accent)' }} />
          <span>Record at least 2 environmental assessments to unlock dynamic trend analytics.</span>
        </div>
      )}

      {/* 3. Detailed History Log Table */}
      <div className="history-table-section">
        <h3 className="table-heading">Historical Audit Trail</h3>
        <div className="table-responsive-wrapper">
          <table className="history-table-modern">
            <thead>
              <tr>
                <th>Recorded Time</th>
                <th>Location</th>
                <th>Persona & Activity</th>
                <th>Telemetry</th>
                <th>Risk Index</th>
                <th>Verdict</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {historyItems.map((item) => {
                const riskLevel = getRiskLevel(item.overallScore);
                const dateStr = new Date(item.timestamp).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <tr key={item.id}>
                    <td className="font-mono text-muted">{dateStr}</td>
                    <td>
                      <div className="location-cell">
                        <MapPin size={13} className="text-muted" />
                        <span className="font-medium">{item.location}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-accent">{item.mode}</span>
                      <span className="text-muted"> • {item.activity}</span>
                    </td>
                    <td>
                      <div className="telemetry-cell-wrap">
                        <span className="telemetry-pill">{item.temp}°C</span>
                        <span className="telemetry-pill">AQI {item.aqi}</span>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="risk-tag-cell"
                        style={{ color: riskLevel.color, borderColor: `${riskLevel.color}40`, background: `${riskLevel.color}15` }}
                      >
                        {item.overallScore}/100 ({item.status})
                      </span>
                    </td>
                    <td>
                      {item.verdict === 'RECOMMENDED' ? (
                        <span className="verdict-safe-cell"><CheckCircle2 size={13} /> Safe</span>
                      ) : item.verdict === 'NOT_RECOMMENDED' ? (
                        <span className="verdict-avoid-cell"><XCircle size={13} /> Avoid</span>
                      ) : (
                        <span className="verdict-caution-cell"><AlertTriangle size={13} /> Caution</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {onDeleteEntry && (
                        <button 
                          type="button"
                          className="delete-row-btn"
                          onClick={() => onDeleteEntry(item.id)}
                          title="Delete entry"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
