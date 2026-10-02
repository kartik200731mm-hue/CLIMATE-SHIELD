import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ClimateNodesBar from './components/ClimateNodesBar';
import AtmosphericBackground from './components/AtmosphericBackground';
import LocationSearchBar from './components/LocationSearchBar';
import ScenarioSelector from './components/ScenarioSelector';
import HeroCommandCenter from './components/HeroCommandCenter';
import FloatingWeatherPanel from './components/FloatingWeatherPanel';
import ForecastTimeline from './components/ForecastTimeline';
import HistoryAnalyticsView from './components/HistoryAnalyticsView';
import StrategicNodesSimulator from './components/StrategicNodesSimulator';
import AuthProfileModal from './components/AuthProfileModal';
import AIChatDrawer from './components/AIChatDrawer';
import AICommandHero from './components/AICommandHero';
import AgentsDirectory from './components/AgentsDirectory';
import SystemGroundingCard from './components/SystemGroundingCard';
import AuthScreen from './components/AuthScreen';
import PersonaSelectionScreen from './components/PersonaSelectionScreen';
import PersonalizedGreetingBanner from './components/PersonalizedGreetingBanner';
import ActionableRecommendationCard from './components/ActionableRecommendationCard';
import { USER_PERSONAS } from './utils/personas';

import { MOCK_SCENARIOS, MOCK_HISTORY, evaluateClimateRisk } from './utils/mockData';
import { 
  getLiveWeather, 
  evaluateRiskBackend, 
  getHistoryRecords, 
  saveHistoryRecord,
  deleteHistoryRecord,
  clearAllHistoryRecords,
  apiLogin,
  apiRegister,
  apiUpdatePreferences
} from './services/api';
import { AlertCircle, Radio, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'agents' | 'forecast' | 'risk' | 'history'

  // User Auth & Session State (Persisted in localStorage)
  const [authToken, setAuthToken] = useState(() => {
    try {
      return localStorage.getItem('climateshield_token');
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('climateshield_user');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return (parsed && typeof parsed === 'object') ? parsed : null;
    } catch {
      return null;
    }
  });

  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Scenario & Persona State
  const [selectedScenarioId, setSelectedScenarioId] = useState('delhi-extreme');
  const [selectedMode, setSelectedMode] = useState(() => user?.preferences?.mode || 'Student');
  const [selectedActivity, setSelectedActivity] = useState(() => user?.preferences?.activity || 'College');
  const [historyItems, setHistoryItems] = useState(MOCK_HISTORY);

  // Live Location Mode State
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

  // Active Persona Definition (dynamically synchronized with user profile & selectedMode)
  const activePersona = useMemo(() => {
    const pId = user?.preferences?.personaId;
    if (pId) {
      const match = USER_PERSONAS.find((p) => (p.id || '').toLowerCase() === String(pId).toLowerCase());
      if (match) return match;
    }
    const modeMatch = USER_PERSONAS.find(
      (p) => (p.title || '').toLowerCase() === (selectedMode || '').toLowerCase() ||
             (p.name || '').toLowerCase() === (selectedMode || '').toLowerCase() ||
             (p.id || '').toLowerCase() === (selectedMode || '').toLowerCase()
    );
    return modeMatch || USER_PERSONAS[0];
  }, [user, selectedMode]);

  // Initialize live weather and history on initial mount
  useEffect(() => {
    // 1. Fetch persistent history from backend
    getHistoryRecords().then((records) => {
      if (records && records.length > 0) {
        setHistoryItems(records);
      }
    });

    // 2. Load live weather for default location (Bhopal)
    const defLocation = user?.preferences?.defaultLocation || 'Bhopal';
    handleSelectLocation({
      name: defLocation,
      latitude: defLocation === 'Bhopal' ? 23.2599 : 28.6139,
      longitude: defLocation === 'Bhopal' ? 77.4126 : 77.2090,
      country: 'India',
      state: defLocation === 'Bhopal' ? 'Madhya Pradesh' : 'Delhi'
    });
  }, []);

  // Current active scenario preset (for comparison or simulation)
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
      setLiveError('Live climate telemetry temporarily unavailable. Displaying baseline observations.');
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

  // Active environmental state with safe non-null fallback guarantees
  const activeLocation = (isLiveMode && liveLocation) ? liveLocation : (currentScenario?.location || MOCK_SCENARIOS[0].location);
  const activeWeather = (isLiveMode && liveWeather) ? liveWeather : (currentScenario?.weather || MOCK_SCENARIOS[0].weather);
  const activeAQI = (isLiveMode && liveAirQuality) ? liveAirQuality : (currentScenario?.airQuality || MOCK_SCENARIOS[0].airQuality);
  const activeReliability = (isLiveMode && liveReliability) ? liveReliability : (currentScenario?.forecastReliability || MOCK_SCENARIOS[0].forecastReliability);

  // Instant client-side deterministic evaluation for zero-lag UI feedback
  const localEvaluation = useMemo(() => {
    const targetWeather = activeWeather || MOCK_SCENARIOS[0].weather;
    const targetAQI = activeAQI || MOCK_SCENARIOS[0].airQuality;
    return evaluateClimateRisk({
      weather: targetWeather,
      airQuality: targetAQI,
      mode: selectedMode || 'Student',
      activity: selectedActivity || 'College'
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
        console.warn('Backend Gemini briefing fallback active:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingAi(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeWeather, activeAQI, selectedMode, selectedActivity, activeLocation]);

  // Combined evaluation
  const evaluationResult = useMemo(() => {
    if (!localEvaluation) return null;
    return {
      ...localEvaluation,
      aiExplanation: aiBriefing || localEvaluation.aiExplanation
    };
  }, [localEvaluation, aiBriefing]);

  // Record an audit snapshot into history
  const handleRecordAssessment = async () => {
    if (!evaluationResult || !activeWeather) return;

    const newRecord = {
      location: activeLocation?.name || 'Local Atmosphere',
      mode: selectedMode,
      activity: selectedActivity,
      overallScore: evaluationResult.overallScore,
      status: evaluationResult.status,
      verdict: evaluationResult.decision?.verdict || 'CAUTION',
      aqi: activeAQI?.aqi ?? 50,
      temp: Math.round(activeWeather.feelsLike ?? activeWeather.temperature ?? 25),
      timestamp: new Date().toISOString()
    };

    const saved = await saveHistoryRecord(newRecord);
    if (saved) {
      setHistoryItems((prev) => [saved, ...prev]);
    } else {
      setHistoryItems((prev) => [{ id: `hist-${Date.now()}`, ...newRecord }, ...prev]);
    }
  };

  const handleDeleteHistoryEntry = async (id) => {
    await deleteHistoryRecord(id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllHistory = async () => {
    await clearAllHistoryRecords();
    setHistoryItems([]);
  };

  // Auth Handlers
  const handleLogin = async (credentials) => {
    const data = await apiLogin(credentials);
    if (data?.token && data?.user) {
      setUser(data.user);
      setAuthToken(data.token);
      try {
        localStorage.setItem('climateshield_token', data.token);
        localStorage.setItem('climateshield_user', JSON.stringify(data.user));
      } catch (e) {}
      if (data.user.preferences?.mode) setSelectedMode(data.user.preferences.mode);
      if (data.user.preferences?.activity) setSelectedActivity(data.user.preferences.activity);
    }
    return data;
  };

  const handleRegister = async (registrationData) => {
    const data = await apiRegister(registrationData);
    if (data?.token && data?.user) {
      setUser(data.user);
      setAuthToken(data.token);
      try {
        localStorage.setItem('climateshield_token', data.token);
        localStorage.setItem('climateshield_user', JSON.stringify(data.user));
      } catch (e) {}
      if (data.user.preferences?.mode) setSelectedMode(data.user.preferences.mode);
      if (data.user.preferences?.activity) setSelectedActivity(data.user.preferences.activity);
    }
    return data;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('climateshield_token');
      localStorage.removeItem('climateshield_user');
    } catch (e) {}
    setUser(null);
    setAuthToken(null);
    setIsPersonalizing(false);
  };

  const handleUpdatePreferences = async (newPrefs) => {
    try {
      const data = await apiUpdatePreferences(newPrefs, authToken);
      const updatedUser = { ...user, preferences: data.preferences };
      setUser(updatedUser);
      try {
        localStorage.setItem('climateshield_user', JSON.stringify(updatedUser));
      } catch (e) {}
    } catch (err) {
      console.warn('Remote preferences update failed, storing locally:', err);
      const updatedUser = { ...user, preferences: { ...(user?.preferences || {}), ...newPrefs } };
      setUser(updatedUser);
      try {
        localStorage.setItem('climateshield_user', JSON.stringify(updatedUser));
      } catch (e) {}
    }
    if (newPrefs.mode) setSelectedMode(newPrefs.mode);
    if (newPrefs.activity) setSelectedActivity(newPrefs.activity);
  };

  // ============================================================
  // SCREEN 1: UNAUTHENTICATED USERS (LOGIN / REGISTER SCREEN)
  // ============================================================
  if (!authToken || !user) {
    return (
      <div className="app-container auth-mode">
        <AtmosphericBackground
          weather={activeWeather}
          condition={activeWeather?.condition}
          weatherCode={activeWeather?.weatherCode}
        />
        <AuthScreen
          onAuthSuccess={(userData, token) => {
            setUser(userData);
            setAuthToken(token);
            try {
              localStorage.setItem('climateshield_token', token);
              localStorage.setItem('climateshield_user', JSON.stringify(userData));
            } catch (e) {
              console.warn(e);
            }
            if (userData.preferences?.mode) setSelectedMode(userData.preferences.mode);
            if (userData.preferences?.activity) setSelectedActivity(userData.preferences.activity);

            // If user has not yet set up their persona, show personalization screen
            if (!userData.preferences?.personaId) {
              setIsPersonalizing(true);
            } else {
              setIsPersonalizing(false);
            }
          }}
        />
      </div>
    );
  }

  // Check if authenticated user has a saved persona
  const hasSavedPersona = Boolean(user?.preferences?.personaId);

  // ============================================================
  // SCREEN 2: USER PROFILE / PERSONA SELECTION SCREEN
  // ============================================================
  if (!hasSavedPersona || isPersonalizing) {
    return (
      <div className="app-container">
        <AtmosphericBackground
          weather={activeWeather}
          condition={activeWeather?.condition}
          weatherCode={activeWeather?.weatherCode}
        />
        <PersonaSelectionScreen
          user={user}
          currentPersonaId={user?.preferences?.personaId || 'student'}
          activeLocation={activeLocation}
          onSavePersona={async ({ personaId, mode, activity }) => {
            try {
              await apiUpdatePreferences({ personaId, mode, activity }, authToken);
            } catch (err) {
              console.warn('Backend preferences save error, falling back locally:', err);
            }
            const updatedUser = {
              ...user,
              preferences: { ...(user?.preferences || {}), personaId, mode, activity }
            };
            setUser(updatedUser);
            try {
              localStorage.setItem('climateshield_user', JSON.stringify(updatedUser));
            } catch (e) {}
            setSelectedMode(mode);
            setSelectedActivity(activity);
            setIsPersonalizing(false);
          }}
          onSkipToDashboard={() => {
            // Assign default student persona if skipping
            const updatedUser = {
              ...user,
              preferences: { ...(user?.preferences || {}), personaId: 'student', mode: 'Student', activity: 'College' }
            };
            setUser(updatedUser);
            try {
              localStorage.setItem('climateshield_user', JSON.stringify(updatedUser));
            } catch (e) {}
            setIsPersonalizing(false);
          }}
        />
      </div>
    );
  }

  // ============================================================
  // SCREEN 3: AUTHENTICATED CLIMATESHIELD DASHBOARD
  // ============================================================
  return (
    <div className="app-container">
      {/* 1. Dynamic Atmospheric Background System */}
      <AtmosphericBackground
        weather={activeWeather}
        condition={activeWeather?.condition}
        weatherCode={activeWeather?.weatherCode}
        sunrise={activeWeather?.sunrise}
        sunset={activeWeather?.sunset}
      />

      {/* 5. MAIN DASHBOARD CONTAINER */}
      <main className="dashboard-container">
        {/* 1. Top Navigation Bar with Profile Avatar, Persona & Location */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeLocation={activeLocation}
          onSelectLocation={handleSelectLocation}
          isLiveMode={isLiveMode}
          user={user}
          selectedPersona={activePersona}
          onOpenPersonaModal={() => setIsPersonalizing(true)}
          onLogout={handleLogout}
        />

        {liveError && (
          <div className="modal-alert-error" style={{ margin: '0' }}>
            <AlertCircle size={16} />
            <span>{liveError}</span>
          </div>
        )}

        {/* VIEW A: OVERVIEW COMMAND CENTER */}
        {activeTab === 'overview' && (
          <>
            {/* 1. Personalized Greeting / Location & Persona Context */}
            <PersonalizedGreetingBanner
              user={user}
              selectedPersona={activePersona}
              activeLocation={activeLocation}
              isLiveMode={isLiveMode}
              onChangePersona={() => setIsPersonalizing(true)}
            />

            {/* 2. AI Climate Command Center */}
            <AICommandHero
              location={activeLocation}
              weather={activeWeather}
              airQuality={activeAQI}
              mode={selectedMode}
              activity={selectedActivity}
              riskStatus={evaluationResult?.status}
              onNavigateToAgents={() => setActiveTab('agents')}
            />

            {/* 3. Risk Intelligence (Left) + Current Weather (Right) */}
            <div className="risk-weather-grid">
              {evaluationResult && (
                <HeroCommandCenter
                  overallScore={evaluationResult.overallScore}
                  status={evaluationResult.status}
                  risks={evaluationResult.risks}
                  decision={evaluationResult.decision}
                  mode={selectedMode}
                  activity={selectedActivity}
                  weather={activeWeather}
                  airQuality={activeAQI}
                  aiExplanation={evaluationResult.aiExplanation}
                  selectedMode={selectedMode}
                  setSelectedMode={setSelectedMode}
                  selectedActivity={selectedActivity}
                  setSelectedActivity={setSelectedActivity}
                  onRecordAssessment={handleRecordAssessment}
                  isLoading={isLoadingLive}
                />
              )}

              <FloatingWeatherPanel
                weather={activeWeather}
                location={activeLocation}
                airQuality={activeAQI}
                isLoading={isLoadingLive}
                error={liveError}
                onRetry={() => handleSelectLocation(activeLocation)}
              />
            </div>

            {/* 4. Forecast Timeline (Full Width) */}
            <ForecastTimeline
              hourlyForecast={activeWeather?.hourlyForecast || []}
              dailyForecast={activeWeather?.dailyForecast || []}
            />

            {/* 5. Actionable Recommendation */}
            <ActionableRecommendationCard
              evaluationResult={evaluationResult}
              isLoadingAi={isLoadingAi}
              onRefreshAi={() => {
                if (activeWeather && activeAQI) {
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
                      if (res?.aiExplanation) setAiBriefing(res.aiExplanation);
                    })
                    .catch((err) => console.warn('AI briefing refresh error:', err))
                    .finally(() => setIsLoadingAi(false));
                }
              }}
            />

            {/* 6. System Status / Data Grounding */}
            <SystemGroundingCard
              location={activeLocation}
              weather={activeWeather}
              airQuality={activeAQI}
              reliability={activeReliability}
            />

            {/* 7. History / Analytics */}
            <HistoryAnalyticsView
              historyItems={historyItems}
              onDeleteEntry={handleDeleteHistoryEntry}
              onClearAll={handleClearAllHistory}
            />
          </>
        )}

        {/* VIEW B: SOVEREIGN AI AGENTS DIRECTORY */}
        {activeTab === 'agents' && activeWeather && (
          <AgentsDirectory
            weather={activeWeather}
            airQuality={activeAQI}
            location={activeLocation}
            mode={selectedMode}
            activity={selectedActivity}
            riskAssessment={evaluationResult}
          />
        )}

        {/* VIEW C: DETAILED FORECAST TIMELINE */}
        {activeTab === 'forecast' && activeWeather && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <FloatingWeatherPanel
              weather={activeWeather}
              location={activeLocation}
              airQuality={activeAQI}
            />
            <ForecastTimeline
              hourlyForecast={activeWeather?.hourlyForecast || []}
              dailyForecast={activeWeather?.dailyForecast || []}
            />
          </div>
        )}

        {/* VIEW D: RISK ANALYSIS DEEP-DIVE & STRATEGIC SIMULATOR */}
        {activeTab === 'risk' && evaluationResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <HeroCommandCenter
              overallScore={evaluationResult.overallScore}
              status={evaluationResult.status}
              risks={evaluationResult.risks}
              decision={evaluationResult.decision}
              mode={selectedMode}
              activity={selectedActivity}
              weather={activeWeather}
              airQuality={activeAQI}
              aiExplanation={evaluationResult.aiExplanation}
            />

            <StrategicNodesSimulator
              baseWeather={activeWeather}
              baseAirQuality={activeAQI}
              mode={selectedMode}
              activity={selectedActivity}
            />

            <SystemGroundingCard
              location={activeLocation}
              weather={activeWeather}
              airQuality={activeAQI}
              reliability={activeReliability}
            />
          </div>
        )}

        {/* VIEW E: HISTORY & LONGITUDINAL INSIGHTS */}
        {(activeTab === 'history' || activeTab === 'insights') && (
          <HistoryAnalyticsView
            historyItems={historyItems}
            onDeleteEntry={handleDeleteHistoryEntry}
            onClearAll={handleClearAllHistory}
          />
        )}
      </main>

      {/* 6. Auth & Profile Modal */}
      <AuthProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onUpdatePreferences={handleUpdatePreferences}
      />

      {/* 7. Floating Conversational Gemini AI Advisor */}
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
