import React from 'react';
import { GraduationCap, Activity, Briefcase, Compass, Sprout } from 'lucide-react';
import { USER_MODES } from '../utils/constants';

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Activity: Activity,
  Briefcase: Briefcase,
  Compass: Compass,
  Sprout: Sprout
};

export default function ModeSelector({ selectedMode, onSelectMode }) {
  return (
    <div className="glass-card controls-card">
      <div>
        <div className="selector-group-title">
          <span>1. Select User Persona Context</span>
          <span style={{ color: 'var(--primary)' }}>Adapts Risk Weights</span>
        </div>
        <div className="mode-grid">
          {USER_MODES.map((mode) => {
            const IconComponent = ICON_MAP[mode.icon] || Activity;
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                className={`mode-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectMode(mode.id)}
              >
                <IconComponent size={24} color={isSelected ? 'var(--primary)' : 'var(--text-secondary)'} />
                <span className="mode-btn-name">{mode.name}</span>
                <span className="mode-btn-tagline">{mode.tagline}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
