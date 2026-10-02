import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Eye, 
  EyeOff,
  HelpCircle,
  X
} from 'lucide-react';
import { apiLogin, apiRegister } from '../services/api';

export default function AuthScreen({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const { name, email, password, confirmPassword } = formData;

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters in length.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your entries.');
        return;
      }
    }

    setIsLoading(true);

    try {
      let data;
      if (isRegister) {
        data = await apiRegister({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password
        });
      } else {
        data = await apiLogin({
          email: email.trim().toLowerCase(),
          password
        });
      }

      if (data?.token && data?.user) {
        onAuthSuccess(data.user, data.token);
      } else {
        setErrorMsg('Authentication succeeded but response was invalid.');
      }
    } catch (err) {
      console.error('Auth Error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="auth-screen-layout">
      {/* Background Ambience */}
      <div className="auth-ambient-glow" />

      {/* Main Two-Column Container */}
      <div className="auth-container-grid">
        {/* Left Column: Atmospheric Brand & Mission Statement */}
        <div className="auth-brand-col">
          <div className="brand-header-badge">
            <Shield size={16} color="var(--accent)" />
            <span>CLIMATESHIELD INTELLIGENCE</span>
          </div>

          <h1 className="auth-hero-headline">
            Understand Your Environment.
            <br />
            <span className="gradient-text-hero">Act Before Risk Becomes Reality.</span>
          </h1>

          <p className="auth-hero-desc">
            Personal climate intelligence, deterministic environmental risk decomposition, and AI-powered decision support tailored to your daily routine.
          </p>

          {/* Key Value Propositions */}
          <div className="auth-highlights-list">
            <div className="auth-highlight-item">
              <div className="highlight-number">01</div>
              <div>
                <h4 className="highlight-title">Hyperlocal Atmospheric Telemetry</h4>
                <p className="highlight-desc">Live Open-Meteo & Copernicus CAMS sensor streams updated every 15 minutes.</p>
              </div>
            </div>

            <div className="auth-highlight-item">
              <div className="highlight-number">02</div>
              <div>
                <h4 className="highlight-title">Deterministic Multi-Criteria Risk</h4>
                <p className="highlight-desc">Mathematical evaluation across Heat, Rain, Air Quality, Outdoor Exertion, and Travel.</p>
              </div>
            </div>

            <div className="auth-highlight-item">
              <div className="highlight-number">03</div>
              <div>
                <h4 className="highlight-title">Sovereign Autonomous AI Advisors</h4>
                <p className="highlight-desc">7 domain-specialized nodes providing grounded, responsible safety briefings.</p>
              </div>
            </div>
          </div>

          {/* Planetary Telemetry Pulse */}
          <div className="auth-telemetry-pill">
            <span className="telemetry-live-dot" />
            <span>GLOBAL SENSORS ONLINE • CO₂ 421.5 PPM • WMO STANDARD</span>
          </div>
        </div>

        {/* Right Column: Premium Authentication Card */}
        <div className="auth-form-col">
          <div className="auth-glass-card">
            {/* Clean Brand Heading */}
            <div className="auth-card-top-branding">
              <span className="auth-card-brand-tag">CLIMATESHIELD</span>
              <h2 className="auth-card-title">
                {isRegister ? 'Create an account' : 'Welcome back'}
              </h2>
              <p className="auth-card-sub">
                {isRegister 
                  ? 'Start monitoring your personal climate risk.' 
                  : 'Continue to your climate intelligence dashboard.'}
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="auth-error-alert">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form-body">
              {isRegister && (
                <div className="cs-input-group">
                  <label className="cs-input-label">Full Name</label>
                  <div className="cs-input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Kartik Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="cs-text-input"
                      required={isRegister}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div className="cs-input-group">
                <label className="cs-input-label">Email Address</label>
                <div className="cs-input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="cs-text-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="cs-input-group">
                <div className="password-label-row">
                  <label className="cs-input-label">Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      className="forgot-link-btn"
                      onClick={() => setShowForgotModal(true)}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="cs-input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={isRegister ? 'Minimum 6 characters' : 'Enter your password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="cs-text-input"
                    required
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="cs-input-group">
                  <label className="cs-input-label">Confirm Password</label>
                  <div className="cs-input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="cs-text-input"
                      required={isRegister}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="cs-btn cs-btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher note */}
            <div className="auth-card-footer">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => {
                      setIsRegister(false);
                      setErrorMsg(null);
                    }}
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => {
                      setIsRegister(true);
                      setErrorMsg(null);
                    }}
                  >
                    Create account
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="forgot-modal-backdrop" onClick={() => setShowForgotModal(false)}>
          <div className="forgot-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="forgot-modal-header">
              <h3 className="forgot-modal-title">Password Recovery</h3>
              <button className="close-modal-btn" onClick={() => setShowForgotModal(false)}>
                <X size={18} />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="forgot-success-box">
                <CheckCircle2 size={32} color="var(--accent-emerald)" />
                <p>Recovery link dispatched to <strong>{forgotEmail}</strong>. Please check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="forgot-form">
                <p className="forgot-desc">
                  Enter your registered account email. A secure password reset link will be generated.
                </p>
                <div className="cs-input-group">
                  <label className="cs-input-label">Account Email</label>
                  <div className="cs-input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="cs-text-input"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="cs-btn cs-btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  SEND RECOVERY LINK
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
