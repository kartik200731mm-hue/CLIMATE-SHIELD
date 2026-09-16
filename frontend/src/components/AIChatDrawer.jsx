import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, MessageSquare, Loader2 } from 'lucide-react';
import { askAiAdvisor } from '../services/api';

export default function AIChatDrawer({ location, weather, airQuality, mode, activity, riskStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I'm your ClimateShield AI Advisor. I'm actively monitoring environmental telemetry for ${location?.name || 'your area'}. Ask me anything about safety precautions, transit timing, or gear recommendations!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef(null);

  const quickQuestions = [
    'Can I go jogging now?',
    'What should I wear today?',
    'Precautions for high AQI?'
  ];

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query || query.trim() === '' || isSending) return;

    const userMsg = {
      role: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await askAiAdvisor(query.trim(), {
        location: location?.name || 'Selected Location',
        temp: weather?.temperature,
        feelsLike: weather?.feelsLike,
        condition: weather?.condition,
        rainProbability: weather?.rainProbability,
        aqi: airQuality?.aqi,
        aqiCategory: airQuality?.category,
        mode,
        activity,
        riskStatus
      });

      const aiMsg = {
        role: 'assistant',
        text: response.reply,
        engine: response.engine,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Unable to connect to the backend AI service. Please verify that the backend is running on port 5000.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.45)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            zIndex: 999,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 36px rgba(99, 102, 241, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.45)';
          }}
        >
          <Sparkles size={16} />
          <span>Ask ClimateShield AI</span>
        </button>
      )}

      {/* Slide-out / Popover Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 48px)',
            borderRadius: '16px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, transparent 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                  ClimateShield AI Advisor
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Grounded in live telemetry • Gemini AI
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Questions Pill Bar */}
          <div
            style={{
              padding: '8px 12px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}
          >
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isSending}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  cursor: isSending ? 'not-allowed' : 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      maxWidth: '88%',
                      flexDirection: isUser ? 'row-reverse' : 'row'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isUser ? 'var(--primary)' : 'rgba(99, 102, 241, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                        color: '#fff'
                      }}
                    >
                      {isUser ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        background: isUser
                          ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                          : 'rgba(30, 41, 59, 0.8)',
                        border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#f1f5f9',
                        fontSize: '0.84rem',
                        lineHeight: 1.45,
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: '#64748b',
                      marginTop: '4px',
                      marginLeft: isUser ? 0 : '32px',
                      marginRight: isUser ? '32px' : 0
                    }}
                  >
                    {msg.time} {msg.engine ? `• ${msg.engine}` : ''}
                  </span>
                </div>
              );
            })}
            {isSending && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '0.78rem' }}>
                <Loader2 size={14} className="pulse-dot" />
                <span>Gemini AI is analyzing climate conditions...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '10px 12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.6)'
            }}
          >
            <input
              type="text"
              placeholder="Ask about weather, safety, or timing..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isSending}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                background: inputMessage.trim() && !isSending ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                cursor: inputMessage.trim() && !isSending ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
