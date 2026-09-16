// ClimateShield System Constants & Mappings

// WMO Weather Interpretation Codes (World Meteorological Organization)
export const WMO_WEATHER_CODES = {
  0: { condition: 'Clear Sky', icon: 'Sun' },
  1: { condition: 'Mainly Clear', icon: 'Sun' },
  2: { condition: 'Partly Cloudy', icon: 'CloudSun' },
  3: { condition: 'Overcast', icon: 'Cloud' },
  45: { condition: 'Foggy', icon: 'CloudFog' },
  48: { condition: 'Depositing Rime Fog', icon: 'CloudFog' },
  51: { condition: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { condition: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { condition: 'Dense Drizzle', icon: 'CloudDrizzle' },
  61: { condition: 'Slight Rain', icon: 'CloudRain' },
  63: { condition: 'Moderate Rain', icon: 'CloudRain' },
  65: { condition: 'Heavy Rain', icon: 'CloudRain' },
  71: { condition: 'Slight Snow', icon: 'CloudSnow' },
  73: { condition: 'Moderate Snow', icon: 'CloudSnow' },
  75: { condition: 'Heavy Snow', icon: 'CloudSnow' },
  80: { condition: 'Slight Rain Showers', icon: 'CloudRain' },
  81: { condition: 'Moderate Rain Showers', icon: 'CloudRain' },
  82: { condition: 'Violent Rain Showers', icon: 'CloudRain' },
  95: { condition: 'Thunderstorm', icon: 'CloudLightning' },
  96: { condition: 'Thunderstorm with Slight Hail', icon: 'CloudLightning' },
  99: { condition: 'Thunderstorm with Heavy Hail', icon: 'CloudLightning' }
};

export const DEFAULT_COORDINATES = {
  name: 'New Delhi',
  latitude: 28.6139,
  longitude: 77.2090,
  country: 'India'
};

export const RISK_LEVELS = {
  LOW: { label: 'LOW', min: 0, max: 30, color: '#10b981' },
  MODERATE: { label: 'MODERATE', min: 31, max: 60, color: '#f59e0b' },
  HIGH: { label: 'HIGH', min: 61, max: 80, color: '#f97316' },
  SEVERE: { label: 'SEVERE', min: 81, max: 100, color: '#ef4444' }
};

export const DECISIONS = {
  RECOMMENDED: {
    verdict: 'RECOMMENDED',
    badgeText: 'Safe to Go Outside',
    color: '#10b981'
  },
  CAUTION: {
    verdict: 'CAUTION',
    badgeText: 'Proceed with Caution',
    color: '#f59e0b'
  },
  NOT_RECOMMENDED: {
    verdict: 'NOT_RECOMMENDED',
    badgeText: 'Avoid Outdoor Activity',
    color: '#ef4444'
  }
};

// User Profile Mode Weights for Deterministic Multi-Criteria Decision Making
export const USER_MODE_WEIGHTS = {
  Student: { heat: 0.25, rain: 0.25, aqi: 0.20, outdoor: 0.15, travel: 0.15 },
  Fitness: { heat: 0.25, rain: 0.10, aqi: 0.35, outdoor: 0.25, travel: 0.05 },
  'Daily Commuter': { heat: 0.15, rain: 0.35, aqi: 0.15, outdoor: 0.10, travel: 0.25 },
  Traveller: { heat: 0.20, rain: 0.25, aqi: 0.20, outdoor: 0.20, travel: 0.15 },
  Farmer: { heat: 0.35, rain: 0.30, aqi: 0.10, outdoor: 0.15, travel: 0.10 }
};

// Activity Multipliers
export const ACTIVITY_PROFILES = {
  College: { outdoorMultiplier: 1.0, travelRainBoost: 15 },
  Exercise: { outdoorMultiplier: 1.25, highExertion: true },
  Travel: { outdoorMultiplier: 1.0, travelRainBoost: 15 },
  Cycling: { outdoorMultiplier: 1.25, travelMultiplier: 1.30 },
  'Outdoor Event': { outdoorMultiplier: 1.20, travelRainBoost: 10 }
};

/**
 * Returns US EPA Air Quality category from AQI numerical index
 */
export const getAqiCategory = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};
