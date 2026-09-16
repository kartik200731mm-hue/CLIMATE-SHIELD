import React from 'react';
import { Shield, Sparkles, MapPin } from 'lucide-react';

export default function Navbar({ locationName }) {
  return (
    <header className="navbar">
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="brand-title">CLIMATESHIELD</h1>
          <p className="brand-subtitle">Hyperlocal Climate Risk & Safety Assistant</p>
        </div>
      </div>

      <div className="nav-actions">
        {locationName && (
          <div className="nav-pill">
            <MapPin size={14} />
            <span>{locationName}</span>
          </div>
        )}

        <div className="nav-pill">
          <span className="pulse-dot"></span>
          <span>Risk Engine v1.0 (Active)</span>
        </div>

        <div className="nav-pill" style={{ background: 'rgba(129, 140, 248, 0.1)', borderColor: 'rgba(129, 140, 248, 0.25)', color: '#818cf8' }}>
          <Sparkles size={14} />
          <span>Gemini AI Ready</span>
        </div>
      </div>
    </header>
  );
}
