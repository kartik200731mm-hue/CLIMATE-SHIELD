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
          className="ai-chat-trigger-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Ask ClimateShield AI"
        >
          <Sparkles size={16} />
          <span>Ask ClimateShield AI</span>
        </button>
      )}

      {/* Slide-out / Popover Chat Window */}
      {isOpen && (
        <div className="ai-chat-popover">
          {/* Chat Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-brand">
              <div className="ai-chat-icon-badge">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="ai-chat-title">ClimateShield AI Advisor</h4>
                <span className="ai-chat-subtitle">
                  Grounded in live telemetry • Gemini AI
                </span>
              </div>
            </div>
            <button
              className="ai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Questions Pill Bar */}
          <div className="ai-chat-chips-bar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                className="ai-chat-chip"
                onClick={() => handleSendMessage(q)}
                disabled={isSending}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="ai-chat-messages-container">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`chat-msg-row ${isUser ? 'user-align' : 'ai-align'}`}
                >
                  <div className={`chat-bubble-wrap ${isUser ? 'user-reverse' : ''}`}>
                    <div className={`chat-avatar-badge ${isUser ? 'avatar-user' : 'avatar-bot'}`}>
                      {isUser ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
                      {msg.text}
                    </div>
                  </div>
                  <span className={`chat-meta-time ${isUser ? 'meta-right' : 'meta-left'}`}>
                    {msg.time} {msg.engine ? `• ${msg.engine}` : ''}
                  </span>
                </div>
              );
            })}
            {isSending && (
              <div className="ai-chat-typing-indicator">
                <Loader2 size={14} className="spin-icon" />
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
            className="ai-chat-input-row"
          >
            <input
              type="text"
              placeholder="Ask about weather, safety, or timing..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isSending}
              className="ai-chat-text-input"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="ai-chat-send-btn"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
