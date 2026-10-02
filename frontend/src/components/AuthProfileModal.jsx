import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Bell,
  Heart
} from 'lucide-react';
import { USER_MODES, ACTIVITIES } from '../utils/constants';

export default function AuthProfileModal({ 
  isOpen, 
  onClose, 
  user, 
  onLogin, 
  onRegister, 
  onLogout, 
  onUpdatePreferences 
}) {
  const [activeView, setActiveView] = useState(user ? 'profile' : 'login'); // 'login' | 'register' | 'profile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User Preferences State
  const [prefs, setPrefs] = useState({
    defaultLocation: user?.preferences?.defaultLocation || 'New Delhi',
    mode: user?.preferences?.mode || 'Student',
    activity: user?.preferences?.activity || 'College',
    commuteType: user?.preferences?.commuteType || 'Public Transit',
    sensitiveAirQuality: user?.preferences?.sensitiveAirQuality || false,
    notificationAlerts: user?.preferences?.notificationAlerts !== false
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      await onLogin({ email, password });
      setSuccessMsg('Signed in successfully.');
      setTimeout(() => {
        setActiveView('profile');
        setSuccessMsg(null);
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      await onRegister({ name, email, password, preferences: prefs });
      setSuccessMsg('Account registered successfully.');
      setTimeout(() => {
        setActiveView('profile');
        setSuccessMsg(null);
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      await onUpdatePreferences(prefs);
      setSuccessMsg('Climate preferences saved.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save preferences.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop-overlay">
      <div className="auth-profile-modal glass-panel">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <ShieldCheck size={20} className="text-accent" />
            <h3 className="modal-heading">
              {user ? 'Personal Climate Profile' : activeView === 'login' ? 'Sign In to ClimateShield' : 'Create ClimateShield Account'}
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close window">
            <X size={18} />
          </button>
        </div>

        {/* View Switcher if not authenticated */}
        {!user && (
          <div className="auth-tab-row">
            <button 
              className={`auth-tab-pill ${activeView === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveView('login'); setErrorMsg(null); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-pill ${activeView === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveView('register'); setErrorMsg(null); }}
            >
              Register Account
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {errorMsg && (
          <div className="modal-alert-error">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="modal-alert-success">
            <CheckCircle2 size={15} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {!user && activeView === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrap">
                <Mail size={15} className="input-icon" />
                <input 
                  type="email" 
                  required 
                  placeholder="name@organization.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field-wrap">
                <Lock size={15} className="input-icon" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="auth-primary-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {!user && activeView === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-field-wrap">
                <User size={15} className="input-icon" />
                <input 
                  type="text" 
                  required 
                  placeholder="Jane Miller" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field-wrap">
                <Mail size={15} className="input-icon" />
                <input 
                  type="email" 
                  required 
                  placeholder="name@organization.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Secure Password (min 6 characters)</label>
              <div className="input-field-wrap">
                <Lock size={15} className="input-icon" />
                <input 
                  type="password" 
                  required 
                  minLength={6}
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="auth-primary-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Register Secure Account'}
            </button>
          </form>
        )}

        {/* 3. PROFILE & PREFERENCES VIEW */}
        {user && (
          <div className="profile-content-wrap">
            <div className="profile-identity-card">
              <div className="profile-avatar-large">
                <User size={26} />
              </div>
              <div className="profile-text-meta">
                <h4 className="user-name">{user.name || 'Active User'}</h4>
                <span className="user-email">{user.email}</span>
                <span className="user-badge">Standard Account • Protected Session</span>
              </div>
            </div>

            <form onSubmit={handleSavePreferences} className="preferences-form">
              <div className="prefs-section-title">
                <Settings size={14} className="text-accent" />
                <span>Risk Engine Calibration Preferences</span>
              </div>

              <div className="input-group">
                <label>Default Location</label>
                <div className="input-field-wrap">
                  <MapPin size={15} className="input-icon" />
                  <input 
                    type="text" 
                    value={prefs.defaultLocation}
                    onChange={(e) => setPrefs({ ...prefs, defaultLocation: e.target.value })}
                  />
                </div>
              </div>

              <div className="two-col-grid">
                <div className="input-group">
                  <label>Default Persona Mode</label>
                  <select 
                    value={prefs.mode} 
                    onChange={(e) => setPrefs({ ...prefs, mode: e.target.value })}
                    className="select-field"
                  >
                    {USER_MODES.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Daily Commute Type</label>
                  <select 
                    value={prefs.commuteType} 
                    onChange={(e) => setPrefs({ ...prefs, commuteType: e.target.value })}
                    className="select-field"
                  >
                    <option value="Public Transit">Public Transit</option>
                    <option value="Walk / Cycle">Walk / Cycle</option>
                    <option value="Two Wheeler">Two Wheeler</option>
                    <option value="Car / Cab">Car / Cab</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="toggle-row-card">
                <div className="toggle-meta">
                  <Heart size={15} className="text-accent" />
                  <div>
                    <span className="toggle-title">Respiratory Sensitivity</span>
                    <span className="toggle-sub">Elevate AQI warning thresholds for asthma/allergies</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefs.sensitiveAirQuality}
                  onChange={(e) => setPrefs({ ...prefs, sensitiveAirQuality: e.target.checked })}
                  className="toggle-checkbox"
                />
              </div>

              <div className="toggle-row-card">
                <div className="toggle-meta">
                  <Bell size={15} className="text-accent" />
                  <div>
                    <span className="toggle-title">Severe Weather Alerts</span>
                    <span className="toggle-sub">Highlight convective storms and heat alerts in hero</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={prefs.notificationAlerts}
                  onChange={(e) => setPrefs({ ...prefs, notificationAlerts: e.target.checked })}
                  className="toggle-checkbox"
                />
              </div>

              <div className="modal-actions-row">
                <button type="submit" className="save-prefs-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Preferences'}
                </button>
                <button type="button" className="logout-btn" onClick={onLogout}>
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
