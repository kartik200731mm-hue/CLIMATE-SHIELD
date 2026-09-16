import { USER_MODE_WEIGHTS, ACTIVITY_PROFILES } from '../config/constants.js';

/**
 * Deterministic calculation of Heat Risk (0 - 100)
 */
export const calculateHeatRisk = (weather) => {
  const effectiveTemp = weather.feelsLike ?? weather.temperature ?? 25;
  let heatScore = 15;

  if (effectiveTemp >= 42) {
    heatScore = 95;
  } else if (effectiveTemp >= 38) {
    heatScore = 80;
  } else if (effectiveTemp >= 33) {
    heatScore = 60;
  } else if (effectiveTemp >= 28) {
    heatScore = 40;
  } else if (effectiveTemp <= 8) {
    // Extreme cold stress
    heatScore = 65;
  } else if (effectiveTemp <= 14) {
    // Moderate chill
    heatScore = 35;
  }

  // Adjust for extreme UV index
  if (weather.uvIndex && weather.uvIndex >= 9) {
    heatScore = Math.min(100, heatScore + 10);
  }

  return heatScore;
};

/**
 * Deterministic calculation of Rain & Precipitation Risk (0 - 100)
 */
export const calculateRainRisk = (weather) => {
  const rainProb = weather.rainProbability ?? 0;
  const precip = weather.precipitation ?? 0;

  let rainScore = Math.round((rainProb * 0.6) + (Math.min(precip, 30) * 1.33));

  // Severe thunderstorm codes heavily spike rain/storm risk
  if ([95, 96, 99].includes(weather.weatherCode)) {
    rainScore = Math.max(rainScore, 85);
  } else if ([81, 82, 65].includes(weather.weatherCode)) {
    rainScore = Math.max(rainScore, 75);
  }

  return Math.min(100, Math.max(0, rainScore));
};

/**
 * Deterministic calculation of Air Quality Risk (0 - 100)
 */
export const calculateAqiRisk = (airQuality) => {
  const aqi = airQuality?.aqi ?? 50;
  let aqiScore = 20;

  if (aqi > 300) {
    aqiScore = 98; // Hazardous
  } else if (aqi > 200) {
    aqiScore = 90; // Very Unhealthy
  } else if (aqi > 150) {
    aqiScore = 78; // Unhealthy
  } else if (aqi > 100) {
    aqiScore = 60; // Unhealthy for Sensitive Groups
  } else if (aqi > 50) {
    aqiScore = 38; // Moderate
  } else {
    aqiScore = 18; // Good
  }

  // Boost if PM2.5 is dangerously elevated regardless of index
  if (airQuality?.pm25 && airQuality.pm25 > 60) {
    aqiScore = Math.max(aqiScore, 82);
  }

  return Math.min(100, aqiScore);
};

/**
 * Full Deterministic Risk Evaluation Engine
 * @param {Object} params
 * @param {Object} params.weather Meteorological snapshot
 * @param {Object} params.airQuality Air quality snapshot
 * @param {string} params.mode User mode (Student, Fitness, Daily Commuter, Traveller, Farmer)
 * @param {string} params.activity User planned activity
 * @returns {Object} Comprehensive evaluation result
 */
export const evaluateClimateRisk = ({ weather, airQuality, mode = 'Student', activity = 'College' }) => {
  if (!weather) {
    throw new Error('Weather data is required for risk evaluation.');
  }

  // 1. Calculate Component Risk Scores
  const heatScore = calculateHeatRisk(weather);
  const rainScore = calculateRainRisk(weather);
  const aqiScore = calculateAqiRisk(airQuality);

  // 2. Activity Multipliers
  const activityConfig = ACTIVITY_PROFILES[activity] || { outdoorMultiplier: 1.0, travelRainBoost: 0 };

  // 3. Outdoor Feasibility Risk
  const uvComponent = (weather.uvIndex ?? 5) * 8 * 0.15;
  const windComponent = (weather.windSpeed ?? 10) * 0.10;
  let outdoorScore = Math.round(heatScore * 0.35 + aqiScore * 0.40 + uvComponent + windComponent);
  if (activityConfig.outdoorMultiplier) {
    outdoorScore = Math.min(100, Math.round(outdoorScore * activityConfig.outdoorMultiplier));
  }

  // 4. Travel / Transit Disruption Risk
  let travelScore = Math.round(rainScore * 0.50 + ((weather.windSpeed ?? 10) * 1.2 * 0.30) + (heatScore * 0.20));
  if (activityConfig.travelMultiplier) {
    travelScore = Math.min(100, Math.round(travelScore * activityConfig.travelMultiplier));
  } else if (activityConfig.travelRainBoost && rainScore > 65) {
    travelScore = Math.min(100, travelScore + activityConfig.travelRainBoost);
  }

  // 5. Contextual Weights by User Mode
  const weights = USER_MODE_WEIGHTS[mode] || USER_MODE_WEIGHTS.Student;

  const overallScore = Math.min(100, Math.max(0, Math.round(
    heatScore * weights.heat +
    rainScore * weights.rain +
    aqiScore * weights.aqi +
    outdoorScore * weights.outdoor +
    travelScore * weights.travel
  )));

  // Categorical status mapping
  let status = 'LOW';
  if (overallScore > 80) status = 'SEVERE';
  else if (overallScore > 60) status = 'HIGH';
  else if (overallScore > 30) status = 'MODERATE';

  // Deterministic Decision Matrix
  let verdict = 'RECOMMENDED';
  if (overallScore > 70 || heatScore >= 80 || aqiScore >= 80 || rainScore >= 85) {
    verdict = 'NOT_RECOMMENDED';
  } else if (overallScore > 40 || heatScore > 55 || aqiScore > 55 || rainScore > 50) {
    verdict = 'CAUTION';
  }

  // Deterministic Explainable Reasons
  const reasons = [];
  const recommendations = [];
  const effectiveTemp = weather.feelsLike ?? weather.temperature;
  const aqiVal = airQuality?.aqi ?? 50;

  if (heatScore >= 75) {
    reasons.push(`Extreme thermal stress detected (Feels like ${Math.round(effectiveTemp)}°C).`);
    recommendations.push('Maintain continuous hydration with electrolytes and strictly avoid unshaded sun exposure.');
  } else if (heatScore >= 55) {
    reasons.push(`Elevated temperature (${Math.round(effectiveTemp)}°C) may induce moderate heat fatigue.`);
    recommendations.push('Carry water and schedule periodic rest in well-ventilated or shaded zones.');
  }

  if (aqiScore >= 75) {
    reasons.push(`Air quality index (${aqiVal} AQI) is hazardous for respiratory exertion.`);
    recommendations.push('Wear a certified N95 respirator mask if outdoor exposure is unavoidable.');
  } else if (aqiScore >= 55) {
    reasons.push(`Moderate particulate pollution (${aqiVal} AQI) detected.`);
    recommendations.push('Sensitive groups should reduce prolonged intense aerobic exercise.');
  }

  if (rainScore >= 70) {
    reasons.push(`High precipitation probability (${weather.rainProbability}%) with waterlogging and traffic delay risk.`);
    recommendations.push('Carry waterproof gear and allow extra commute transit buffer time.');
  } else if (rainScore >= 40) {
    reasons.push(`Passing showers possible (${weather.rainProbability}% precipitation chance).`);
    recommendations.push('Keep a compact umbrella or rain shell handy.');
  }

  if (weather.windSpeed && weather.windSpeed > 35) {
    reasons.push(`High wind gusts (${weather.windSpeed} km/h) impacting stability.`);
    recommendations.push('Exercise caution around trees, construction scaffoldings, and two-wheeler commuting.');
  }

  if (reasons.length === 0) {
    reasons.push('All environmental indices (Thermal, Air Quality, Precipitation) are well within safe thresholds.');
    recommendations.push('Ideal atmospheric conditions for your planned schedule.');
  }

  return {
    overallScore,
    status,
    risks: {
      heat: {
        score: heatScore,
        level: heatScore > 75 ? 'HIGH' : heatScore > 50 ? 'MODERATE' : 'LOW'
      },
      rain: {
        score: rainScore,
        level: rainScore > 70 ? 'HIGH' : rainScore > 40 ? 'MODERATE' : 'LOW'
      },
      airQuality: {
        score: aqiScore,
        level: aqiScore > 75 ? 'HIGH' : aqiScore > 50 ? 'MODERATE' : 'LOW'
      },
      outdoor: {
        score: outdoorScore,
        level: outdoorScore > 70 ? 'HIGH' : outdoorScore > 45 ? 'MODERATE' : 'LOW'
      },
      travel: {
        score: travelScore,
        level: travelScore > 70 ? 'HIGH' : travelScore > 45 ? 'MODERATE' : 'LOW'
      }
    },
    decision: {
      verdict,
      reasons,
      recommendations
    },
    evaluatedAt: new Date().toISOString()
  };
};
