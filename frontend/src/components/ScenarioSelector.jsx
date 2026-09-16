import React from 'react';
import { Sliders, MapPin } from 'lucide-react';
import { MOCK_SCENARIOS } from '../utils/mockData';

export default function ScenarioSelector({ activeScenarioId, onSelectScenario }) {
  return (
    <div className="scenario-bar">
      <div className="scenario-label">
        <Sliders size={16} color="var(--primary)" />
        <span>Academic Review Simulation Scenarios:</span>
      </div>

      <div className="scenario-buttons">
        {MOCK_SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            className={`scenario-btn ${activeScenarioId === scenario.id ? 'active' : ''}`}
            onClick={() => onSelectScenario(scenario.id)}
          >
            <MapPin size={13} />
            {scenario.label}
          </button>
        ))}
      </div>
    </div>
  );
}
