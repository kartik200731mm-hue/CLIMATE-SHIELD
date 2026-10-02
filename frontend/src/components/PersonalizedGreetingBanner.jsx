import React, { useMemo } from 'react';
import { MapPin, Sparkles, UserCheck, ShieldCheck, Radio } from 'lucide-react';

export default function PersonalizedGreetingBanner({
  user,
  selectedPersona,
  activeLocation,
  isLiveMode,
  onChangePersona
}) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const firstName = useMemo(() => {
    if (user?.name && typeof user.name === 'string' && user.name.trim()) {
      return user.name.trim().split(' ')[0];
    }
    return 'there';
  }, [user]);

  const personaTitle = selectedPersona?.title || selectedPersona?.name || user?.preferences?.mode || 'Student';
  const personaDesc = selectedPersona?.description || 'Personalized environmental safety thresholds';
  const locationName = activeLocation?.name || user?.preferences?.defaultLocation || 'Bhopal';

  return (
    <section className="personalized-greeting-card">
      <div className="greeting-content-left">
        <div className="greeting-eyebrow-row">
          <span className="greeting-mode-pill">
            <Sparkles size={12} style={{ color: 'var(--accent)' }} />
            <span>{personaTitle} Mode</span>
          </span>
          <span className="eyebrow-separator">•</span>
          <span className="greeting-persona-sub">{personaDesc}</span>
        </div>

        <h1 className="greeting-main-title">
          {greeting}, <span className="greeting-user-name">{firstName}</span>
        </h1>

        <div className="greeting-location-bar">
          <MapPin size={15} style={{ color: 'var(--accent)' }} />
          <span className="location-text-highlight">{locationName}</span>
          <span className="location-dot-sep">·</span>
          <span className="telemetry-source-text">
            {isLiveMode ? 'Live environmental intelligence' : 'Calibrated simulation telemetry'}
          </span>
        </div>
      </div>

      <div className="greeting-action-right">
        <button
          type="button"
          className="change-persona-chip-btn"
          onClick={onChangePersona}
          title="Switch between 12 specialized persona profiles"
        >
          <UserCheck size={14} />
          <span>Switch Persona</span>
        </button>
      </div>
    </section>
  );
}
