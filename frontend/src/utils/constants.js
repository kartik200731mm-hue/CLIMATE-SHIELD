// ClimateShield System Constants & Configuration

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

export const USER_MODES = [
  {
    id: 'Student',
    name: 'Student',
    icon: 'GraduationCap',
    tagline: 'Campus commutes, classes & exams',
    description: 'Prioritizes transit reliability, rain protection, and study commute safety.',
    weights: { heat: 0.25, rain: 0.25, aqi: 0.20, outdoor: 0.15, travel: 0.15 }
  },
  {
    id: 'Fitness',
    name: 'Fitness',
    icon: 'Activity',
    tagline: 'Running, outdoor workouts & sports',
    description: 'Strict thresholds for respiratory safety, heat exhaustion, and air quality index.',
    weights: { heat: 0.30, rain: 0.10, aqi: 0.35, outdoor: 0.20, travel: 0.05 }
  },
  {
    id: 'Daily Commuter',
    name: 'Daily Commuter',
    icon: 'Briefcase',
    tagline: 'Office transit & public transport',
    description: 'Focuses on road safety, heavy precipitation, wind disruptions, and delays.',
    weights: { heat: 0.15, rain: 0.35, aqi: 0.15, outdoor: 0.10, travel: 0.25 }
  },
  {
    id: 'Traveller',
    name: 'Traveller',
    icon: 'Compass',
    tagline: 'Sightseeing, day trips & exploration',
    description: 'Monitors sudden weather shifts, UV exposure, and extended outdoor feasibility.',
    weights: { heat: 0.20, rain: 0.25, aqi: 0.20, outdoor: 0.20, travel: 0.15 }
  },
  {
    id: 'Farmer',
    name: 'Farmer',
    icon: 'Sprout',
    tagline: 'Field work, crop safety & heat stress',
    description: 'Assesses prolonged direct sun exposure, wind gusts, and precipitation volume.',
    weights: { heat: 0.35, rain: 0.30, aqi: 0.10, outdoor: 0.15, travel: 0.10 }
  }
];

export const ACTIVITIES = [
  { id: 'College', name: 'College / School', icon: 'BookOpen', category: 'routine' },
  { id: 'Exercise', name: 'Outdoor Exercise', icon: 'Dumbbell', category: 'high-exertion' },
  { id: 'Travel', name: 'City Commute', icon: 'Car', category: 'transit' },
  { id: 'Cycling', name: 'Cycling / Bike', icon: 'Bike', category: 'exposed-transit' },
  { id: 'Outdoor Event', name: 'Outdoor Event', icon: 'Calendar', category: 'social' }
];

export const RISK_LEVELS = {
  LOW: {
    label: 'LOW RISK',
    min: 0,
    max: 30,
    color: '#4F8061',
    bgColor: '#E8EFE9',
    borderColor: '#E1E5E1',
    description: 'Environmental conditions are safe and comfortable for general activities.'
  },
  MODERATE: {
    label: 'MODERATE RISK',
    min: 31,
    max: 60,
    color: '#B58A45',
    bgColor: 'rgba(181, 138, 69, 0.12)',
    borderColor: '#ECEFEC',
    description: 'Mild environmental stress detected. Exercise standard precautions.'
  },
  HIGH: {
    label: 'HIGH RISK',
    min: 61,
    max: 80,
    color: '#D97706',
    bgColor: 'rgba(217, 119, 6, 0.12)',
    borderColor: '#ECEFEC',
    description: 'Adverse weather or elevated air pollution. Caution or rescheduling advised.'
  },
  SEVERE: {
    label: 'SEVERE RISK',
    min: 81,
    max: 100,
    color: '#B95F5F',
    bgColor: 'rgba(185, 95, 95, 0.12)',
    borderColor: '#ECEFEC',
    description: 'Hazardous environmental strain. Outdoor exposure strongly discouraged.'
  }
};

export const DECISIONS = {
  RECOMMENDED: {
    text: 'RECOMMENDED',
    badgeText: 'Safe to Go Outside',
    color: '#4F8061',
    bgColor: '#E8EFE9',
    borderColor: '#E1E5E1',
    icon: 'CheckCircle2'
  },
  CAUTION: {
    text: 'CAUTION ADVISED',
    badgeText: 'Proceed with Caution',
    color: '#B58A45',
    bgColor: 'rgba(181, 138, 69, 0.12)',
    borderColor: '#ECEFEC',
    icon: 'AlertTriangle'
  },
  NOT_RECOMMENDED: {
    text: 'NOT RECOMMENDED',
    badgeText: 'Avoid Outdoor Activity',
    color: '#B95F5F',
    bgColor: 'rgba(185, 95, 95, 0.12)',
    borderColor: '#ECEFEC',
    icon: 'XCircle'
  }
};
