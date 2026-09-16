import { RISK_LEVELS } from './constants';

export const getRiskLevel = (score) => {
  if (score <= 30) return RISK_LEVELS.LOW;
  if (score <= 60) return RISK_LEVELS.MODERATE;
  if (score <= 80) return RISK_LEVELS.HIGH;
  return RISK_LEVELS.SEVERE;
};

export const getAqiCategory = (aqi) => {
  if (aqi == null) return { text: 'Unavailable', color: '#94a3b8', badgeClass: 'aqi-unknown' };
  if (aqi <= 50) return { text: 'Good', color: '#10b981', badgeClass: 'aqi-good' };
  if (aqi <= 100) return { text: 'Moderate', color: '#f59e0b', badgeClass: 'aqi-moderate' };
  if (aqi <= 150) return { text: 'Unhealthy for Sensitive Groups', color: '#f97316', badgeClass: 'aqi-sensitive' };
  if (aqi <= 200) return { text: 'Unhealthy', color: '#ef4444', badgeClass: 'aqi-unhealthy' };
  if (aqi <= 300) return { text: 'Very Unhealthy', color: '#8b5cf6', badgeClass: 'aqi-very-unhealthy' };
  return { text: 'Hazardous', color: '#b91c1c', badgeClass: 'aqi-hazardous' };
};

export const formatTemperature = (val) => {
  if (val == null) return '--';
  return `${Math.round(val)}°C`;
};

export const formatPercent = (val) => {
  if (val == null) return '--';
  return `${Math.round(val)}%`;
};

export const formatTime = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
