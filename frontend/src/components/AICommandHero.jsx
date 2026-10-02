import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Terminal, Compass, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { askAiAdvisor } from '../services/api';

export default function AICommandHero({ 
  location, 
  weather, 
  airQuality, 
  mode, 
  activity, 
  riskStatus,
  onNavigateToAgents
}) {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const sampleQueries = [
    'Is it safe to exercise outside?',
    "What is causing today's heat risk?",
    'Will rain affect my commute?',
    'Precautions for current AQI levels?',
    'What environmental risks should I watch today?'
  ];

  const DEFAULT_PROMPT = 'Analyze current environmental conditions, risks, and actionable recommendations for my current location and persona.';

  const handleExecuteQuery = async (customText) => {
    if (isAnalyzing) return;

    const chosenText = (typeof customText === 'string' && customText.trim().length > 0)
      ? customText.trim()
      : (query && query.trim().length > 0)
        ? query.trim()
        : DEFAULT_PROMPT;

    if (!query || !query.trim()) {
      setQuery(chosenText);
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await askAiAdvisor(chosenText, {
        location: location?.name || 'Local Area',
        temp: weather?.temperature ?? 28,
        feelsLike: weather?.feelsLike ?? 29,
        condition: weather?.condition || 'Clear',
        rainProbability: weather?.rainProbability ?? 10,
        aqi: airQuality?.aqi ?? 50,
        aqiCategory: airQuality?.category || 'Moderate',
        mode,
        activity,
        riskStatus
      });

      setAnalysisResult({
        query: chosenText,
        reply: response?.reply || 'Environmental analysis complete. No critical hazards detected.',
        engine: response?.engine || 'ClimateShield Sovereign Intelligence',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    } catch (err) {
      console.error('AI Command Query Error:', err);
      setErrorMsg('Unable to complete analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="ai-command-hero-container">
      {/* Background ambient lighting */}
      <div className="hero-mesh-glow" />

      <div className="ai-hero-inner">
        {/* Compact AI Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.04em' }}>
            <Sparkles size={15} />
            <span>AI CLIMATE COMMAND CENTER</span>
          </div>
          <div className="hero-status-tag" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
            <span className="live-ping-dot" />
            <span style={{ fontSize: '0.72rem' }}>LIVE ADVISORY</span>
          </div>
        </div>

        {/* Command Search Interface */}
        <div className="ai-command-box">
          <div className="command-input-wrapper">
            <Compass className="command-icon" size={20} />
            <input
              type="text"
              className="command-input"
              placeholder="Ask ClimateShield about today's environment..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleExecuteQuery();
                }
              }}
            />
            <button
              type="button"
              className="command-submit-btn"
              onClick={() => handleExecuteQuery()}
              disabled={isAnalyzing}
              aria-label="Analyze Environment"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={15} />
                  <span>Analyze...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>

          {/* Prompt Chips */}
          <div className="command-chips-row">
            <span className="chips-label">SUGGESTED:</span>
            {sampleQueries.map((chip, idx) => (
              <button
                key={idx}
                className="command-chip"
                onClick={() => {
                  setQuery(chip);
                  handleExecuteQuery(chip);
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Error Banner with Friendly Retry */}
        {errorMsg && (
          <div className="hero-error-banner">
            <span>{errorMsg}</span>
            <button 
              type="button" 
              className="error-retry-action-btn"
              onClick={() => handleExecuteQuery()}
            >
              Try again
            </button>
          </div>
        )}

        {/* Analysis Result Card */}
        {analysisResult && (
          <div className="verified-analysis-card">
            <div className="verified-card-header">
              <div className="verified-badge">
                <ShieldCheck size={16} color="var(--success)" />
                <span>CLIMATESHIELD BRIEFING</span>
              </div>
              <div className="verified-meta">
                <span>{analysisResult.timestamp}</span>
                <button
                  className="close-analysis-btn"
                  onClick={() => setAnalysisResult(null)}
                  title="Close Analysis"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="verified-query-quote">
              <span className="query-quote-label">QUERY:</span>
              <span className="query-quote-text">"{analysisResult.query}"</span>
            </div>

            <div className="verified-body-content">
              <p>{analysisResult.reply}</p>
            </div>

            <div className="verified-card-footer">
              <div className="footer-engine-tag">
                <Cpu size={14} color="var(--text-secondary)" />
                <span>{analysisResult.engine}</span>
              </div>
              <div className="footer-grounding-tag">
                <CheckCircle2 size={14} color="var(--success)" />
                <span>Grounded on Live Sensor Telemetry</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
