// Preconfigured Hyperlocal Scenarios for Academic Demonstration & Testing
export const MOCK_SCENARIOS = [
  {
    id: 'delhi-extreme',
    label: 'New Delhi (Severe Heat + AQI Crisis)',
    location: { name: 'Connaught Place, New Delhi', latitude: 28.6139, longitude: 77.2090, country: 'India' },
    weather: {
      temperature: 39.4,
      feelsLike: 43.8,
      humidity: 62,
      rainProbability: 25,
      precipitation: 0.0,
      windSpeed: 14.2,
      condition: 'Hazy & Hot',
      uvIndex: 9.4
    },
    airQuality: {
      aqi: 245,
      pm25: 148.5,
      pm10: 275.0,
      category: 'Very Unhealthy'
    },
    forecastReliability: {
      score: 86,
      level: 'HIGH',
      explanation: 'High confidence based on stable multi-model thermal persistence across northern plains.'
    }
  },
  {
    id: 'mumbai-monsoon',
    label: 'Mumbai (Monsoon Downpour & Waterlogging)',
    location: { name: 'Bandra West, Mumbai', latitude: 19.0596, longitude: 72.8295, country: 'India' },
    weather: {
      temperature: 28.2,
      feelsLike: 33.1,
      humidity: 94,
      rainProbability: 92,
      precipitation: 38.4,
      windSpeed: 38.0,
      condition: 'Heavy Monsoon Rain',
      uvIndex: 2.1
    },
    airQuality: {
      aqi: 42,
      pm25: 16.2,
      pm10: 38.0,
      category: 'Good'
    },
    forecastReliability: {
      score: 79,
      level: 'MODERATE',
      explanation: 'Moderate confidence; high precipitation convection leads to localized radar variances.'
    }
  },
  {
    id: 'bengaluru-spring',
    label: 'Bengaluru (Mild & Pleasant Morning)',
    location: { name: 'Indiranagar, Bengaluru', latitude: 12.9716, longitude: 77.5946, country: 'India' },
    weather: {
      temperature: 24.5,
      feelsLike: 25.0,
      humidity: 55,
      rainProbability: 10,
      precipitation: 0.0,
      windSpeed: 11.5,
      condition: 'Partly Cloudy',
      uvIndex: 5.2
    },
    airQuality: {
      aqi: 38,
      pm25: 14.0,
      pm10: 32.0,
      category: 'Good'
    },
    forecastReliability: {
      score: 91,
      level: 'HIGH',
      explanation: 'Very high confidence; strong atmospheric equilibrium and low pressure gradient variance.'
    }
  },
  {
    id: 'jaipur-dry',
    label: 'Jaipur (Dry Heat & Gusty Winds)',
    location: { name: 'C-Scheme, Jaipur', latitude: 26.9124, longitude: 75.7873, country: 'India' },
    weather: {
      temperature: 36.8,
      feelsLike: 37.2,
      humidity: 28,
      rainProbability: 5,
      precipitation: 0.0,
      windSpeed: 24.5,
      condition: 'Sunny & Gusty',
      uvIndex: 8.8
    },
    airQuality: {
      aqi: 128,
      pm25: 48.0,
      pm10: 162.0,
      category: 'Moderate'
    },
    forecastReliability: {
      score: 84,
      level: 'HIGH',
      explanation: 'Stable desert boundary layer model ensures high short-term predictability.'
    }
  }
];

// Pure deterministic computation function for client-side instant responsiveness
export function evaluateClimateRisk({ weather, airQuality, mode, activity }) {
  // 1. Heat Risk (0-100)
  const effectiveTemp = weather.feelsLike || weather.temperature;
  let heatScore = 15;
  if (effectiveTemp > 42) heatScore = 95;
  else if (effectiveTemp > 38) heatScore = 80;
  else if (effectiveTemp > 33) heatScore = 60;
  else if (effectiveTemp > 28) heatScore = 40;
  else if (effectiveTemp < 10) heatScore = 55; // cold stress

  // 2. Rain Risk (0-100)
  const rainScore = Math.min(100, Math.round((weather.rainProbability * 0.6) + (Math.min(weather.precipitation, 30) * 1.33)));

  // 3. AQI Risk (0-100)
  let aqiScore = 20;
  const aqi = airQuality.aqi || 50;
  if (aqi > 200) aqiScore = 92;
  else if (aqi > 150) aqiScore = 78;
  else if (aqi > 100) aqiScore = 60;
  else if (aqi > 50) aqiScore = 38;
  else aqiScore = 18;

  // 4. Outdoor Risk (Activity-dependent)
  let outdoorScore = Math.round(heatScore * 0.35 + aqiScore * 0.40 + (weather.uvIndex * 8 * 0.15) + (weather.windSpeed * 0.1));
  if (activity === 'Exercise' || activity === 'Cycling') {
    outdoorScore = Math.min(100, Math.round(outdoorScore * 1.25));
  }

  // 5. Travel Risk (Transit-dependent)
  let travelScore = Math.round(rainScore * 0.50 + (weather.windSpeed * 1.2 * 0.30) + (heatScore * 0.20));
  if (activity === 'Cycling') {
    travelScore = Math.min(100, Math.round(travelScore * 1.30));
  } else if (activity === 'College' || activity === 'Travel') {
    if (rainScore > 70) travelScore = Math.min(100, travelScore + 15);
  }

  // Contextual Mode Weights
  let weights = { heat: 0.30, rain: 0.20, aqi: 0.25, outdoor: 0.15, travel: 0.10 };
  if (mode === 'Fitness') {
    weights = { heat: 0.25, rain: 0.10, aqi: 0.35, outdoor: 0.25, travel: 0.05 };
  } else if (mode === 'Daily Commuter') {
    weights = { heat: 0.15, rain: 0.35, aqi: 0.15, outdoor: 0.10, travel: 0.25 };
  } else if (mode === 'Student') {
    weights = { heat: 0.25, rain: 0.25, aqi: 0.20, outdoor: 0.15, travel: 0.15 };
  } else if (mode === 'Farmer') {
    weights = { heat: 0.35, rain: 0.30, aqi: 0.10, outdoor: 0.15, travel: 0.10 };
  }

  const overallScore = Math.min(100, Math.round(
    heatScore * weights.heat +
    rainScore * weights.rain +
    aqiScore * weights.aqi +
    outdoorScore * weights.outdoor +
    travelScore * weights.travel
  ));

  let status = 'LOW';
  if (overallScore > 80) status = 'SEVERE';
  else if (overallScore > 60) status = 'HIGH';
  else if (overallScore > 30) status = 'MODERATE';

  // Deterministic Decision Matrix
  let verdict = 'RECOMMENDED';
  const reasons = [];
  const recommendations = [];

  if (overallScore > 70 || heatScore >= 80 || aqiScore >= 80 || rainScore >= 85) {
    verdict = 'NOT_RECOMMENDED';
  } else if (overallScore > 40 || heatScore > 55 || aqiScore > 55 || rainScore > 50) {
    verdict = 'CAUTION';
  }

  // Compile explainable reasons
  if (heatScore >= 75) {
    reasons.push(`Extreme thermal stress detected (Feels like ${Math.round(effectiveTemp)}°C).`);
    recommendations.push('Maintain continuous hydration with electrolytes and avoid unshaded sunlight.');
  } else if (heatScore >= 55) {
    reasons.push(`Elevated temperature (${Math.round(effectiveTemp)}°C) may induce moderate heat fatigue.`);
    recommendations.push('Carry a water bottle and take periodic breaks in shaded or ventilated areas.');
  }

  if (aqiScore >= 75) {
    reasons.push(`Air quality index (${aqi}) is hazardous for prolonged respiratory exertion.`);
    recommendations.push('Wear an N95 respirator mask if outdoor exposure is unavoidable.');
  } else if (aqiScore >= 55) {
    reasons.push(`Moderate particulate pollution (${aqi} AQI) detected.`);
    recommendations.push('Sensitive individuals should limit strenuous outdoor workouts.');
  }

  if (rainScore >= 70) {
    reasons.push(`High precipitation probability (${weather.rainProbability}%) with waterlogging risk.`);
    recommendations.push('Carry robust rain gear and anticipate transit delays or road congestion.');
  } else if (rainScore >= 40) {
    reasons.push(`Possible passing showers (${weather.rainProbability}% rain chance).`);
    recommendations.push('Keep a compact umbrella handy before leaving.');
  }

  if (reasons.length === 0) {
    reasons.push('All environmental indices (Thermal, Air Quality, Precipitation) are well within comfort thresholds.');
    recommendations.push('Ideal atmospheric conditions for your planned schedule.');
  }

  // Synthesize AI explanation placeholder (simulating backend Gemini output)
  let aiSummary = '';
  if (verdict === 'NOT_RECOMMENDED') {
    aiSummary = `Under ${mode} mode for ${activity}, current conditions pose significant environmental risk. High ${heatScore > aqiScore ? 'heat index' : 'air pollution'} will likely impair comfort and safety. We strongly advise indoor alternatives or rescheduling.`;
  } else if (verdict === 'CAUTION') {
    aiSummary = `Conditions are manageable for ${activity}, but environmental factors require active mitigation. Stay mindful of ${rainScore > 50 ? 'rain disruptions' : 'heat & air quality'} and follow the checklist.`;
  } else {
    aiSummary = `Optimal conditions for ${activity}! Mild temperatures and clear air make this a great window for outdoor activities as a ${mode}.`;
  }

  return {
    overallScore,
    status,
    risks: {
      heat: { score: heatScore, level: heatScore > 75 ? 'HIGH' : heatScore > 50 ? 'MODERATE' : 'LOW' },
      rain: { score: rainScore, level: rainScore > 70 ? 'HIGH' : rainScore > 40 ? 'MODERATE' : 'LOW' },
      airQuality: { score: aqiScore, level: aqiScore > 75 ? 'HIGH' : aqiScore > 50 ? 'MODERATE' : 'LOW' },
      outdoor: { score: outdoorScore, level: outdoorScore > 70 ? 'HIGH' : outdoorScore > 45 ? 'MODERATE' : 'LOW' },
      travel: { score: travelScore, level: travelScore > 70 ? 'HIGH' : travelScore > 45 ? 'MODERATE' : 'LOW' }
    },
    decision: {
      verdict,
      reasons,
      recommendations
    },
    aiExplanation: {
      summary: aiSummary,
      isAiGenerated: true,
      disclaimer: 'AI-assisted synthesis from deterministic sensor computations. Not official meteorological or medical advice.'
    }
  };
}

export const MOCK_HISTORY = [
  {
    id: 'hist-1',
    timestamp: '2026-09-15T09:30:00Z',
    location: 'Connaught Place, New Delhi',
    mode: 'Fitness',
    activity: 'Outdoor Exercise',
    overallScore: 84,
    status: 'SEVERE',
    verdict: 'NOT_RECOMMENDED',
    aqi: 260,
    temp: 39
  },
  {
    id: 'hist-2',
    timestamp: '2026-09-14T17:15:00Z',
    location: 'Bandra West, Mumbai',
    mode: 'Daily Commuter',
    activity: 'City Commute',
    overallScore: 72,
    status: 'HIGH',
    verdict: 'NOT_RECOMMENDED',
    aqi: 45,
    temp: 29
  },
  {
    id: 'hist-3',
    timestamp: '2026-09-14T08:00:00Z',
    location: 'Indiranagar, Bengaluru',
    mode: 'Student',
    activity: 'College / School',
    overallScore: 24,
    status: 'LOW',
    verdict: 'RECOMMENDED',
    aqi: 35,
    temp: 24
  }
];
