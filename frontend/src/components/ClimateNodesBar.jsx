import React from 'react';
import { 
  Radio, 
  Cpu, 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Activity,
  Layers
} from 'lucide-react';

export default function ClimateNodesBar({ isLiveMode, activeLocation }) {
  return (
    <div className="climate-nodes-ticker glass-panel">
      <div className="ticker-inner">
        {/* Node 1: Operational Status */}
        <div className="ticker-item">
          <span className="ticker-beacon">
            <span className="beacon-ping"></span>
            <span className="beacon-dot"></span>
          </span>
          <span className="ticker-label">SOVEREIGN AI NODES:</span>
          <span className="ticker-val text-emerald">ALL NODES ONLINE</span>
        </div>

        <div className="ticker-divider"></div>

        {/* Node 2: Telemetry Pipeline */}
        <div className="ticker-item">
          <Globe2 size={13} className="ticker-icon text-accent" />
          <span className="ticker-label">TELEMETRY SYNC:</span>
          <span className="ticker-val">
            {isLiveMode ? `Open-Meteo Grounding (${activeLocation?.name || 'Local Area'})` : 'Synthetic Atmospheric Model'}
          </span>
        </div>

        <div className="ticker-divider"></div>

        {/* Node 3: Planetary Baseline Metrics (NASA / NOAA Reference) */}
        <div className="ticker-item">
          <Activity size={13} className="ticker-icon text-amber" />
          <span className="ticker-label">PLANETARY CO₂:</span>
          <span className="ticker-val">421.5 ppm</span>
        </div>

        <div className="ticker-divider"></div>

        {/* Node 4: Global Thermal Anomaly */}
        <div className="ticker-item">
          <Zap size={13} className="ticker-icon text-rose" />
          <span className="ticker-label">TEMP ANOMALY:</span>
          <span className="ticker-val text-rose">+1.15°C</span>
        </div>

        <div className="ticker-divider"></div>

        {/* Node 5: Dual Engine Core */}
        <div className="ticker-item">
          <Cpu size={13} className="ticker-icon text-purple" />
          <span className="ticker-label">CORE ENGINES:</span>
          <span className="ticker-val">Deterministic + Random Forest ML + Gemini AI</span>
        </div>
      </div>
    </div>
  );
}
