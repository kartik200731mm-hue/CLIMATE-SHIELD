import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScenarioSelector from './components/ScenarioSelector';
import LocationSearchBar from './components/LocationSearchBar';
import ModeSelector from './components/ModeSelector';
import ActivitySelector from './components/ActivitySelector';
import OutdoorDecisionCard from './components/OutdoorDecisionCard';
import RiskScoreGauge from './components/RiskScoreGauge';
import WeatherCard from './components/WeatherCard';
import AQICard from './components/AQICard';
import ForecastReliabilityCard from './components/ForecastReliabilityCard';
import HistorySection from './components/HistorySection';
import AIChatDrawer from './components/AIChatDrawer';
import { MOCK_SCENARIOS, MOCK_HISTORY, evaluateClimateRisk } from './utils/mockData';
import { getLiveWeather, evaluateRiskBackend, getHistoryRecords } from './services/api';
import { Radio, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('delhi-extreme');
  const [selectedMode, setSelectedMode] = useState('Student');
  const [selectedActivity, setSelectedActivity] = useState('College');
  const [historyItems, setHistoryItems] = useState(MOCK_HISTORY);

  // Live Location Mode state
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveLocation, setLiveLocation] = useState(null);
  const [liveWeather, setLiveWeather] = useState(null);
  const [liveAirQuality, setLiveAirQuality] = useState(null);
  const [liveReliability, setLiveReliability] = useState(null);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [liveError, setLiveError] = useState(null);

  // Gemini AI synthesis from backend
  const [aiBriefing, setAiBriefing] = useState(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Fetch persistent history from backend on initial mount
  useEffect(() => {
    getHistoryRecords().then((records) => {
      if (records && records.length > 0) {
        setHistoryItems(records);
      }
    });
  }, []);

  // Current active scenario preset
  const currentScenario = useMemo(() => {
    return MOCK_SCENARIOS.find((s) => s.id === selectedScenarioId) || MOCK_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Handle live location selection from search bar
  const handleSelectLocation = async (loc) => {
    setIsLoadingLive(true);
    setLiveError(null);
    try {
      const data = await getLiveWeather(loc.latitude, loc.longitude, loc.name, loc.country);
      setLiveLocation(data.location);
      setLiveWeather(data.weather);
      setLiveAirQuality(data.airQuality);
      setLiveReliability(data.forecastReliability);
      setIsLiveMode(true);
    } catch (err) {
      console.error(err);
      setLiveError('Could not fetch live weather. Verify that the backend is running on port 5000.');
    } finally {
      setIsLoadingLive(false);
    }
  };

  // Switch back to simulation scenario
  const handleSelectScenario = (scenarioId) => {
    setIsLiveMode(false);
    setLiveError(null);
    setSelectedScenarioId(scenarioId);
  };

  // Active environmental state (Live data or Scenario preset)
  const activeLocation = isLiveMode ? liveLocation : currentScenario.location;
  const activeWeather = isLiveMode ? liveWeather : currentScenario.weather;
  const activeAQI = (isLiveMode && liveAirQuality) ? liveAirQuality : currentScenario.airQuality;
  const activeReliability = (isLiveMode && liveReliability) ? liveReliability : currentScenario.forecastReliability;

  // Instant client-side deterministic evaluation for zero-lag UI feedback
  const localEvaluation = useMemo(() => {
    if (!activeWeather) return null;
    return evaluateClimateRisk({
      weather: activeWeather,
      airQuality: activeAQI,
      mode: selectedMode,
      activity: selectedActivity
    });
  }, [activeWeather, activeAQI, selectedMode, selectedActivity]);

  // Query Backend Gemini AI briefing whenever environment or persona changes
  useEffect(() => {
    if (!activeWeather || !activeAQI) return;

    let isMounted = true;
    setIsLoadingAi(true);

    evaluateRiskBackend({
      weather: activeWeather,
      airQuality: activeAQI,
      mode: selectedMode,
      activity: selectedActivity,
      location: activeLocation,
      saveToHistory: false
    })
      .then((res) => {
        if (isMounted && res?.aiExplanation) {
          setAiBriefing(res.aiExplanation);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch backend Gemini briefing:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingAi(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeWeather, activeAQI, selectedMode, selectedActivity, activeLocation]);

  // Combined evaluation: prefer rich Gemini AI briefing from backend when available
  const evaluationResult = useMemo(() => {
    if (!localEvaluation) return null;
    return {
      ...localEvaluation,
      aiExplanation: aiBriefing || localEvaluation.aiExplanation
    };
  }, [localEvaluation, aiBriefing]);

  return (
    <div className="app-container">
      {/* 1. Header Navigation */}
      <Navbar locationName={activeLocation?.name} />

      {/* 2. Top Bar: Live City Search & Academic Scenarios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <LocationSearchBar 
            onSelectLocation={handleSelectLocation} 
            isSearching={isLoadingLive} 
          />
          
          {/* Live vs Simulated status pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              className="nav-pill"
              style={{
                background: isLiveMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.1)',
                borderColor: isLiveMode ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                color: isLiveMode ? 'var(--accent-emerald)' : 'var(--text-secondary)'
              }}
            >
              <Radio size={14} className={isLiveMode ? 'pulse-dot' : ''} />
              <span>
                {isLiveMode ? `Live Telemetry: ${activeLocation?.name}` : 'Simulation Presets Active'}
              </span>
            </div>

            {/* Gemini AI status badge */}
            <div 
              className="nav-pill"
              style={{
                background: 'rgba(99, 102, 241, 0.12)',
                borderColor: 'rgba(99, 102, 241, 0.35)',
                color: '#818cf8'
              }}
              title="Backend Gemini 1.5/2.0 Flash AI Integration Active"
            >
              <Sparkles size={13} className={isLoadingAi ? 'pulse-dot' : ''} />
              <span>{isLoadingAi ? 'Synthesizing...' : 'Gemini AI Active'}</span>
            </div>
          </div>
        </div>

        {/* Preset Selector */}
        <ScenarioSelector
          activeScenarioId={isLiveMode ? null : selectedScenarioId}
          onSelectScenario={handleSelectScenario}
        />

        {liveError && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>{liveError}</span>
          </div>
        )}
      </div>

      {/* 3. Context Selectors: User Mode & Activity */}
      <div className="glass-card controls-card">
        <ModeSelector 
          selectedMode={selectedMode} 
          onSelectMode={setSelectedMode} 
        />
        <ActivitySelector 
          selectedActivity={selectedActivity} 
          onSelectActivity={setSelectedActivity} 
        />
      </div>

      {/* 4. Core Environmental & Risk Intelligence Grid */}
      {evaluationResult && activeWeather && (
        <div className="dashboard-grid">
          {/* Left Column: Decision Hero & Atmospheric Readings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* HERO FEATURE: "Should I Go Outside?" */}
            <OutdoorDecisionCard
              decision={evaluationResult.decision}
              mode={selectedMode}
              activity={selectedActivity}
              aiExplanation={evaluationResult.aiExplanation}
            />

            {/* Real-time Environmental Metric Cards */}
            <div className="env-cards-row">
              <WeatherCard weather={activeWeather} />
              <AQICard airQuality={activeAQI} />
            </div>

            {/* Differentiating Feature: Forecast Reliability vs Probability */}
            <ForecastReliabilityCard reliability={activeReliability} />
          </div>

          {/* Right Column: Deterministic Risk Gauge & Sub-Risk Breakdown */}
          <div className="metrics-column">
            <RiskScoreGauge
              overallScore={evaluationResult.overallScore}
              status={evaluationResult.status}
              risks={evaluationResult.risks}
            />
          </div>
        </div>
      )}

      {/* 5. MongoDB History Snapshot Log */}
      <HistorySection historyItems={historyItems} />

      {/* 6. Academic Transparency & Ethics Footer */}
      <footer className="footer">
        <p>
          <strong className="footer-highlight">ClimateShield MVP (Full-Stack Phase 2)</strong> — Academic Capstone / Review Project.
        </p>
        <p style={{ marginTop: '0.25rem' }}>
          Backend API active on port 5000 with Open-Meteo Weather & Air Quality Network. Authoritative Risk Engine + Google Gemini AI Synthesis.
        </p>
      </footer>

      {/* 7. Interactive Floating Gemini AI Climate Advisor */}
      <AIChatDrawer
        location={activeLocation}
        weather={activeWeather}
        airQuality={activeAQI}
        mode={selectedMode}
        activity={selectedActivity}
        riskStatus={evaluationResult?.status}
      />
    </div>
  );
}
