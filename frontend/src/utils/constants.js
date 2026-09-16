// ClimateShield System Constants & Configuration

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
    color: '#10b981', // Emerald
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    description: 'Environmental conditions are safe and comfortable for general activities.'
  },
  MODERATE: {
    label: 'MODERATE RISK',
    min: 31,
    max: 60,
    color: '#f59e0b', // Amber
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    description: 'Mild environmental stress detected. Exercise standard precautions.'
  },
  HIGH: {
    label: 'HIGH RISK',
    min: 61,
    max: 80,
    color: '#f97316', // Orange
    bgColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.35)',
    description: 'Adverse weather or elevated air pollution. Caution or rescheduling advised.'
  },
  SEVERE: {
    label: 'SEVERE RISK',
    min: 81,
    max: 100,
    color: '#ef4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.45)',
    description: 'Hazardous environmental conditions. Avoid non-essential outdoor exposure.'
  }
};

export const DECISIONS = {
  RECOMMENDED: {
    text: 'RECOMMENDED',
    badgeText: 'Safe to Go Outside',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
    icon: 'CheckCircle2'
  },
  CAUTION: {
    text: 'CAUTION ADVISED',
    badgeText: 'Proceed with Caution',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#f59e0b',
    icon: 'AlertTriangle'
  },
  NOT_RECOMMENDED: {
    text: 'NOT RECOMMENDED',
    badgeText: 'Avoid Outdoor Activity',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.18)',
    borderColor: '#ef4444',
    icon: 'XCircle'
  }
};
