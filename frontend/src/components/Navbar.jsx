import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Radio, 
  LayoutDashboard, 
  CalendarDays, 
  Activity, 
  History, 
  Sparkles,
  Cpu,
  ChevronDown,
  LogOut,
  UserCheck,
  Settings,
  Layers
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import LocationSelector from './LocationSelector';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  activeLocation,
  onSelectLocation,
  isLiveMode, 
  user, 
  selectedPersona,
  onOpenPersonaModal,
  onLogout 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'forecast', label: 'Forecast', icon: CalendarDays },
    { id: 'risk', label: 'Risk Analysis', icon: Activity },
    { id: 'history', label: 'History', icon: History },
    { id: 'insights', label: 'Insights', icon: Sparkles }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="navbar">
      {/* Brand Logo & Title */}
      <div className="brand-section" onClick={() => setActiveTab('overview')}>
        <div className="brand-icon-wrapper">
          <Shield size={20} className="brand-shield" />
        </div>
        <div className="brand-text-block">
          <div className="brand-title-row">
            <h1 className="brand-title">ClimateShield</h1>
          </div>
          <p className="brand-subtitle">Climate Intelligence</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links-track">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={15} />
              <span>{item.label}</span>
              {isActive && <div className="nav-tab-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* Right Side Actions: Location Selector, Live Status, User Profile */}
      <div className="nav-actions">
        {/* Modern Location Selector Dropdown */}
        <LocationSelector
          currentLocation={activeLocation}
          onSelectLocation={onSelectLocation}
        />

        {/* Live Telemetry Status Pill */}
        <div 
          className="nav-meta-chip status-chip"
          style={{
            borderColor: isLiveMode ? 'var(--success)' : 'var(--border)',
            background: isLiveMode ? 'var(--accent-soft)' : 'var(--surface-soft)'
          }}
        >
          <span className={`live-pulse-dot ${isLiveMode ? 'pulse-green' : 'pulse-gray'}`} />
          <span style={{ color: isLiveMode ? 'var(--success)' : 'var(--text-secondary)' }}>
            {isLiveMode ? 'Live Telemetry' : 'Simulation'}
          </span>
        </div>

        {/* Profile / Account Area with Visible Avatar & Persona */}
        <div className="navbar-account-wrap" ref={dropdownRef}>
          <button 
            type="button"
            className="navbar-profile-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title={user ? `Signed in as ${user.name || user.email}` : 'Account'}
          >
            <UserAvatar user={user} size="sm" />
            <div className="profile-text-col">
              <span className="profile-user-name">
                {typeof user?.name === 'string' && user.name.trim() ? user.name.trim().split(' ')[0] : 'User'}
              </span>
              <span className="profile-user-persona">
                {selectedPersona?.name || user?.preferences?.mode || 'STUDENT'}
              </span>
            </div>
            <ChevronDown size={14} className={`profile-chevron ${isDropdownOpen ? 'open' : ''}`} />
          </button>

          {/* Account Dropdown Menu */}
          {isDropdownOpen && (
            <div className="account-dropdown-panel glass-panel">
              <div className="dropdown-user-header">
                <UserAvatar user={user} size="md" />
                <div className="header-details">
                  <div className="dropdown-name">{user?.name || 'User Profile'}</div>
                  <div className="dropdown-email">{user?.email || 'user@climateshield.io'}</div>
                  <div className="dropdown-persona-tag">
                    {selectedPersona?.name || 'STUDENT'} PROFILE
                  </div>
                </div>
              </div>

              <div className="dropdown-actions-list">
                <button
                  type="button"
                  className="dropdown-action-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenPersonaModal();
                  }}
                >
                  <UserCheck size={16} color="var(--accent)" />
                  <div className="action-text">
                    <span className="action-title">Personalize Persona</span>
                    <span className="action-sub">Switch between 12 specialized profiles</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-action-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setActiveTab('history');
                  }}
                >
                  <History size={16} color="var(--text-secondary)" />
                  <div className="action-text">
                    <span className="action-title">Assessment History</span>
                    <span className="action-sub">View past climate audit logs</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-action-item logout-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} color="var(--danger)" />
                  <div className="action-text">
                    <span className="action-title">Sign Out</span>
                    <span className="action-sub">End session & return to login</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
