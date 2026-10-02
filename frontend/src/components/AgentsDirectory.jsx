import React, { useState } from 'react';
import { 
  CloudRain, 
  Wind, 
  ShieldAlert, 
  Activity, 
  Navigation, 
  TrendingUp, 
  Leaf, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  X, 
  RefreshCw, 
  Send,
  Layers,
  Sparkles
} from 'lucide-react';
import { executeAgentAnalysis } from '../services/api';

export const AGENT_DEFINITIONS = [
  {
    id: 'weather-analyst',
    code: 'NODE-01 // WX-MESO',
    name: 'Weather & Atmospheric Analyst',
    shortRole: 'Mesoscale Dynamics & Precipitation Kinetics',
    icon: CloudRain,
    color: '#607D68',
    description: 'Deconstructs barometric gradients, dew point depression, convective cloud instability, and solar UV irradiance flux.'
  },
  {
    id: 'air-quality-analyst',
    code: 'NODE-02 // AQ-AEROSOL',
    name: 'Aerosol & Air Quality Analyst',
    shortRole: 'Particulate Burden & Inhalation Kinetics',
    icon: Wind,
    color: '#718274',
    description: 'Tracks respirable particulate loading (PM2.5 / PM10) relative to WHO 24h limits and evaluates alveolar deposition risks.'
  },
  {
    id: 'risk-analyst',
    code: 'NODE-03 // RSK-DET',
    name: 'Institutional Climate Risk Architect',
    shortRole: 'Multi-Factor Deterministic Decomposition',
    icon: ShieldAlert,
    color: '#B95F5F',
    description: 'Analyzes deterministic 5-vector matrix, compound risk multipliers, and stress-tests safety margins against historical baselines.'
  },
  {
    id: 'outdoor-advisor',
    code: 'NODE-04 // BIO-EXP',
    name: 'Outdoor Activity & Bio-Safety Advisor',
    shortRole: 'Exertion Limits & Physiological Windows',
    icon: Activity,
    color: '#4F8061',
    description: 'Calculates metabolic thermal stress, dehydration rates, and defines optimal diurnal windows for exercise, sports, and commute.'
  },
  {
    id: 'travel-analyst',
    code: 'NODE-05 // MOB-TRANS',
    name: 'Transit & Urban Mobility Risk Analyst',
    shortRole: 'Road Grip Kinetics & Commuter Safety',
    icon: Navigation,
    color: '#B58A45',
    description: 'Models braking distance multipliers on wet asphalt, atmospheric visibility horizons, and transit route delay buffers.'
  },
  {
    id: 'climate-trend',
    code: 'NODE-06 // GEO-TREND',
    name: 'Geophysical & Longitudinal Trend Analyst',
    shortRole: 'Multi-Day Trajectory & Thermal Anomalies',
    icon: TrendingUp,
    color: '#8A9A83',
    description: 'Identifies climatological anomalies (+1.15°C baseline deviation), synoptic pressure ridges, and 7-day atmospheric persistence.'
  },
  {
    id: 'carbon-calculator',
    code: 'NODE-07 // CARB-FOOT',
    name: 'Sovereign Carbon & Personal Impact Analyst',
    shortRole: 'Commute Footprint & Cooling Demand',
    icon: Leaf,
    color: '#22c55e',
    description: 'Calculates lifecycle transit emissions, cooling degree thermal loads (kWh/day), and tactical personal mitigation strategies.'
  }
];

export default function AgentsDirectory({ 
  weather, 
  airQuality, 
  location, 
  mode, 
  activity, 
  riskAssessment 
}) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentReport, setAgentReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSubmittingFollowup, setIsSubmittingFollowup] = useState(false);

  const handleEngageAgent = async (agent) => {
    setSelectedAgent(agent);
    setAgentReport(null);
    setIsLoading(true);
    setCustomQuestion('');

    try {
      const data = await executeAgentAnalysis({
        agentId: agent.id,
        telemetry: {
          weather,
          airQuality,
          location,
          mode,
          activity,
          riskAssessment
        }
      });
      setAgentReport(data);
    } catch (err) {
      console.error('Agent execution error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowupQuery = async () => {
    if (!customQuestion.trim() || !selectedAgent || isSubmittingFollowup) return;
    setIsSubmittingFollowup(true);

    try {
      const data = await executeAgentAnalysis({
        agentId: selectedAgent.id,
        telemetry: {
          weather,
          airQuality,
          location,
          mode,
          activity,
          riskAssessment
        },
        customQuery: customQuestion.trim()
      });
      setAgentReport(data);
      setCustomQuestion('');
    } catch (err) {
      console.error('Followup query error:', err);
    } finally {
      setIsSubmittingFollowup(false);
    }
  };

  return (
    <div className="agents-directory-container">
      {/* Header */}
      <div className="agents-header">
        <div>
          <div className="agents-badge">
            <Cpu size={14} />
            <span>SOVEREIGN CLIMATE INTELLIGENCE NODES</span>
          </div>
          <h2 className="agents-title">Autonomous Environmental Agents</h2>
          <p className="agents-subtitle">
            7 specialized analytical nodes processing real-time telemetry from Open-Meteo, Copernicus CAMS, and deterministic risk algorithms.
          </p>
        </div>
        <div className="nodes-status-indicator">
          <div className="ping-dot-container">
            <span className="ping-dot-wave"></span>
            <span className="ping-dot-solid"></span>
          </div>
          <span>ALL 7 NODES ACTIVE</span>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="agents-grid">
        {AGENT_DEFINITIONS.map((agent) => {
          const Icon = agent.icon;
          return (
            <div 
              key={agent.id} 
              className="agent-card glass-panel"
              onClick={() => handleEngageAgent(agent)}
            >
              <div className="agent-card-top">
                <span className="agent-code">{agent.code}</span>
                <span className="agent-status-badge">ONLINE</span>
              </div>

              <div className="agent-card-icon-title">
                <div 
                  className="agent-icon-box"
                  style={{ backgroundColor: `${agent.color}15`, borderColor: `${agent.color}40`, color: agent.color }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="agent-name">{agent.name}</h3>
                  <span className="agent-role">{agent.shortRole}</span>
                </div>
              </div>

              <p className="agent-desc">{agent.description}</p>

              <button 
                className="engage-agent-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEngageAgent(agent);
                }}
              >
                <span>ENGAGE NODE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Agent Execution Modal / Deep Inspection Console */}
      {selectedAgent && (
        <div className="agent-modal-backdrop" onClick={() => setSelectedAgent(null)}>
          <div className="agent-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="agent-modal-header">
              <div className="agent-modal-title-group">
                <div 
                  className="modal-agent-icon"
                  style={{ backgroundColor: `${selectedAgent.color}20`, color: selectedAgent.color }}
                >
                  {React.createElement(selectedAgent.icon, { size: 24 })}
                </div>
                <div>
                  <span className="modal-agent-code">{selectedAgent.code}</span>
                  <h3 className="modal-agent-name">{selectedAgent.name}</h3>
                  <span className="modal-agent-domain">{selectedAgent.shortRole}</span>
                </div>
              </div>

              <button 
                className="close-modal-btn"
                onClick={() => setSelectedAgent(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="agent-modal-body">
              {isLoading ? (
                <div className="agent-loading-state">
                  <RefreshCw className="animate-spin" size={32} color={selectedAgent.color} />
                  <p>Interrogating mesoscale sensor telemetry & running domain models...</p>
                </div>
              ) : agentReport ? (
                <div className="agent-report-content">
                  {/* Verdict & Classification Banner */}
                  <div className="agent-verdict-banner">
                    <div className="verdict-label">OPERATIONAL STATUS:</div>
                    <div className="verdict-value">
                      <span className="verdict-pill">{agentReport.verdict}</span>
                      <span className="verdict-location">• Grounded in {location?.name || 'Local Atmosphere'}</span>
                    </div>
                  </div>

                  {/* Quantitative Telemetry Matrix */}
                  <div className="agent-metrics-section">
                    <h4 className="section-title">
                      <Layers size={14} />
                      <span>Quantitative Sensor Metrics</span>
                    </h4>
                    <div className="agent-metrics-grid">
                      {agentReport.metrics && Object.entries(agentReport.metrics).map(([key, val]) => (
                        <div key={key} className="agent-metric-item">
                          <span className="metric-key">{key}</span>
                          <span className="metric-val">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scientific Findings */}
                  <div className="agent-findings-section">
                    <h4 className="section-title">
                      <CheckCircle2 size={14} color="var(--accent-emerald)" />
                      <span>Analytical Findings</span>
                    </h4>
                    <ul className="findings-list">
                      {agentReport.findings?.map((finding, idx) => (
                        <li key={idx} className="finding-item">
                          <span className="finding-bullet">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tactical Recommendations */}
                  <div className="agent-recommendations-section">
                    <h4 className="section-title">
                      <AlertTriangle size={14} color="var(--accent-amber)" />
                      <span>Tactical Mitigation Protocols</span>
                    </h4>
                    <ul className="recommendations-list">
                      {agentReport.recommendations?.map((rec, idx) => (
                        <li key={idx} className="rec-item">
                          <CheckCircle2 size={14} color="var(--accent-emerald)" className="rec-icon" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Custom Query Followup Input */}
                  <div className="agent-followup-box">
                    <label className="followup-label">
                      <Sparkles size={14} color="var(--accent)" />
                      <span>Direct Inquiries to {selectedAgent.name}</span>
                    </label>
                    <div className="followup-input-row">
                      <input 
                        type="text" 
                        className="followup-input"
                        placeholder={`Ask ${selectedAgent.name} a specific question about current conditions...`}
                        value={customQuestion}
                        onChange={(e) => setCustomQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleFollowupQuery();
                          }
                        }}
                      />
                      <button 
                        className="followup-send-btn"
                        onClick={handleFollowupQuery}
                        disabled={isSubmittingFollowup || !customQuestion.trim()}
                      >
                        {isSubmittingFollowup ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Grounding & Attribution Tag */}
                  <div className="agent-modal-footer">
                    <div className="footer-engine-info">
                      <Cpu size={14} />
                      <span>{agentReport.engine}</span>
                    </div>
                    <div className="footer-sources">
                      <span>Sources: Open-Meteo v1, Copernicus CAMS, WMO Standard</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="agent-error-state">
                  <p>Unable to retrieve agent telemetry report. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
