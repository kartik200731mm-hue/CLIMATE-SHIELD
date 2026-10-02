import React from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ClimateShield ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('climateshield_user');
      localStorage.removeItem('climateshield_token');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#F6F7F5',
          color: '#202522',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            maxWidth: '520px',
            background: '#FFFFFF',
            border: '1px solid #E1E5E1',
            borderRadius: '1.25rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 30px rgba(32, 37, 34, 0.08)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#F0F2EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: '#B95F5F'
            }}>
              <ShieldAlert size={28} />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#202522' }}>
              Dashboard Telemetry Interrupted
            </h2>

            <p style={{ fontSize: '0.92rem', color: '#68716B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              An environmental calculation encountered an unexpected state. Your telemetry session can be recovered immediately.
            </p>

            {this.state.error && (
              <div style={{
                background: '#F0F2EF',
                border: '1px solid #E1E5E1',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1.5rem',
                fontSize: '0.78rem',
                color: '#B95F5F',
                fontFamily: 'monospace',
                textAlign: 'left',
                overflowX: 'auto',
                maxHeight: '120px'
              }}>
                <strong>Error:</strong> {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: '#607D68',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={15} />
                <span>Reload Dashboard</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Home size={15} />
                <span>Reset Session</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
