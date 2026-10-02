import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  User, 
  Layers,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { USER_PERSONAS } from '../utils/personas';

export default function PersonaSelectionScreen({ 
  user, 
  currentPersonaId = 'student', 
  activeLocation, 
  onSavePersona,
  onSkipToDashboard 
}) {
  const [selectedId, setSelectedId] = useState(
    currentPersonaId || user?.preferences?.personaId || 'student'
  );
  const [isSaving, setIsSaving] = useState(false);

  const selectedPersona = USER_PERSONAS.find((p) => p.id === selectedId) || USER_PERSONAS[0];

  const handleConfirm = async (targetPersona = selectedPersona) => {
    // Prevent SyntheticEvent from replacing the persona
    const persona = (targetPersona && typeof targetPersona.id === 'string') ? targetPersona : selectedPersona;
    setIsSaving(true);
    try {
      await onSavePersona({
        personaId: persona.id,
        mode: persona.defaultMode || persona.title || 'Student',
        activity: persona.defaultActivity || 'College'
      });
    } catch (err) {
      console.error('Error saving persona:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="persona-screen-layout">
      {/* Ambient background lighting */}
      <div className="persona-ambient-glow" />

      <div className="persona-screen-inner">
        {/* Top Header */}
        <div className="persona-header-section">
          <div className="step-badge">
            <Sparkles size={14} color="var(--accent)" />
            <span>STEP 02 • PERSONALIZATION</span>
          </div>

          <h1 className="persona-screen-title">
            Personalize Your ClimateShield
          </h1>

          <p className="persona-screen-subtitle">
            Tell us how you use your environment so we can prioritize relevant recommendations.
          </p>
        </div>

        {/* Selected User Profile Summary Card */}
        <div className="selected-profile-summary-card">
          <div className="summary-left">
            <UserAvatar user={user} size="lg" />
            <div className="summary-details">
              <div className="summary-name-row">
                <h3 className="summary-user-name">{user?.name || user?.email || 'User Profile'}</h3>
                <span className="summary-status-pill">
                  <CheckCircle2 size={13} color="var(--success)" />
                  <span>Profile Ready</span>
                </span>
              </div>
              <div className="summary-meta-row">
                <span className="summary-persona-tag">
                  {selectedPersona.name}
                </span>
                <span className="meta-separator">•</span>
                <span className="summary-location">
                  <MapPin size={13} color="var(--accent)" />
                  {activeLocation?.name || user?.preferences?.defaultLocation || 'Current Region'}
                </span>
              </div>
              <p className="summary-hint">
                {selectedPersona.recommendationHint}
              </p>
            </div>
          </div>

          <div className="summary-action">
            <button
              className="cs-btn cs-btn-primary enter-dashboard-btn"
              onClick={() => handleConfirm(selectedPersona)}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <span>Continue to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* 12 Personas Grid (3 Columns x 4 Rows) */}
        <div className="persona-grid-section">
          <div className="persona-grid-label-row">
            <span className="grid-label">Choose your routine profile</span>
            <span className="grid-count">12 Personas Available</span>
          </div>

          <div className="persona-grid">
            {USER_PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const isSelected = selectedId === persona.id;

              return (
                <div
                  key={persona.id}
                  className={`persona-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedId(persona.id)}
                  onDoubleClick={() => handleConfirm(persona)}
                >
                  {/* Top indicator: Check if selected */}
                  <div className="persona-card-header">
                    <span className="persona-number">{persona.number}</span>
                    {isSelected && (
                      <span className="persona-selected-badge">
                        <Check size={13} strokeWidth={2.5} />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>

                  {/* Card Icon, Title & Description */}
                  <div className="persona-card-body">
                    <div 
                      className="persona-icon-box"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-soft)',
                        color: isSelected ? 'var(--accent)' : 'var(--text-primary)'
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <h3 className="persona-name">{persona.name}</h3>
                    <p className="persona-description">{persona.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Confirm Bar */}
        <div className="persona-bottom-action-bar">
          <button
            className="cs-btn cs-btn-ghost"
            onClick={onSkipToDashboard}
          >
            Skip for now & use default
          </button>

          <button
            className="cs-btn cs-btn-primary"
            onClick={() => handleConfirm(selectedPersona)}
            disabled={isSaving}
          >
            {isSaving ? (
              <span>SAVING...</span>
            ) : (
              <>
                <span>SAVE & CONTINUE TO DASHBOARD</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
