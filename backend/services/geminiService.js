import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Helper to get the active Gemini generative model instance
 */
const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey.trim());
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  return genAI.getGenerativeModel({ model: modelName });
};

/**
 * Intelligent deterministic fallback synthesizer when API key is not present or API fails
 */
export const generateFallbackAdvice = ({ weather, airQuality, mode = 'Student', activity = 'College', riskAssessment }) => {
  const verdict = riskAssessment?.decision?.verdict || 'CAUTION';
  const overallScore = riskAssessment?.overallScore ?? 50;
  const temp = Math.round(weather?.feelsLike ?? weather?.temperature ?? 28);
  const aqi = airQuality?.aqi ?? 50;
  const rainProb = weather?.rainProbability ?? 10;

  let summary = '';
  const actionableAdvice = [];

  if (verdict === 'NOT_RECOMMENDED') {
    summary = `Under ${mode} mode for ${activity}, current conditions present elevated environmental hazards (Risk Score: ${overallScore}/100). High thermal and atmospheric stress (Feels like ${temp}°C, AQI ${aqi}) makes prolonged outdoor exertion unsafe. Indoor alternatives or rescheduling are strongly recommended.`;
    actionableAdvice.push('Postpone non-essential outdoor travel until atmospheric parameters stabilize.');
    actionableAdvice.push(aqi > 150 ? 'Wear an N95 respirator mask if stepping out is unavoidable.' : 'Keep indoor spaces ventilated with air purifiers.');
    actionableAdvice.push('Maintain active hydration and avoid direct midday solar exposure.');
  } else if (verdict === 'CAUTION') {
    summary = `Conditions are manageable for ${activity}, but environmental factors require active caution (Risk Score: ${overallScore}/100). With temperatures at ${temp}°C and rain probability at ${rainProb}%, carry necessary protective gear and monitor local weather updates.`;
    actionableAdvice.push(rainProb > 40 ? 'Carry an umbrella or rain-resistant outer shell.' : 'Keep a water bottle and sunglasses handy.');
    actionableAdvice.push(`Adjust pace and duration to reduce fatigue in ${mode.toLowerCase()} mode.`);
    actionableAdvice.push('Review transit routes for possible rain or traffic slowdowns.');
  } else {
    summary = `Atmospheric conditions are optimal for ${activity} (Risk Score: ${overallScore}/100)! Comfortable temperatures around ${temp}°C and clean air (AQI ${aqi}) make this an ideal window for your planned outdoor schedule.`;
    actionableAdvice.push('Excellent window for outdoor pursuits and transit.');
    actionableAdvice.push('Standard sun protection and light hydration recommended.');
    actionableAdvice.push('Enjoy your outdoor activities without weather-related hindrances.');
  }

  return {
    summary,
    actionableAdvice,
    keyRisks: riskAssessment?.decision?.reasons || ['No critical environmental threats detected.'],
    isAiGenerated: false,
    engine: 'ClimateShield Deterministic Synthesis (Gemini fallback)',
    disclaimer: 'Deterministic synthesis generated from real-time meteorological metrics. Not official medical or meteorological advice.'
  };
};

/**
 * Synthesizes natural language climate advice using Google Gemini AI
 * Grounded strictly in deterministic calculations to ensure Responsible AI compliance
 */
export const generateGeminiAdvice = async ({
  weather,
  airQuality,
  mode = 'Student',
  activity = 'College',
  riskAssessment,
  locationName = 'Current Location'
}) => {
  const model = getGeminiModel();

  // If Gemini is not configured, gracefully use the fallback synthesizer
  if (!model) {
    return generateFallbackAdvice({ weather, airQuality, mode, activity, riskAssessment });
  }

  const prompt = `
You are the ClimateShield AI Environmental Safety Assistant.
Provide an actionable, persona-tailored climate risk briefing for a user.

STRICT CONSTRAINTS (Responsible AI):
1. You MUST respect the calculated deterministic verdict: "${riskAssessment?.decision?.verdict || 'CAUTION'}".
2. If verdict is NOT_RECOMMENDED, do NOT encourage outdoor activity without critical safety warnings.
3. Keep the briefing concise, human-centric, empathetic, and highly actionable.
4. Output MUST be valid JSON only (no markdown code blocks, no backticks, no extra text).

CURRENT DATA:
- Location: ${locationName}
- User Persona Mode: ${mode}
- Planned Activity: ${activity}
- Overall Risk Score: ${riskAssessment?.overallScore}/100 (${riskAssessment?.status})
- Deterministic Verdict: ${riskAssessment?.decision?.verdict}
- Temperature: ${weather?.temperature}°C (Feels like: ${weather?.feelsLike}°C)
- Weather Condition: ${weather?.condition}
- Rain Probability: ${weather?.rainProbability}% (Precipitation: ${weather?.precipitation} mm)
- Wind Speed: ${weather?.windSpeed} km/h, UV Index: ${weather?.uvIndex}
- Air Quality: AQI ${airQuality?.aqi} (${airQuality?.category}), PM2.5: ${airQuality?.pm25} µg/m³
- Identified Deterministic Risk Factors: ${JSON.stringify(riskAssessment?.decision?.reasons || [])}

Required JSON format:
{
  "summary": "2-3 sentences explaining whether the user should go outside and why, tailored directly to their persona mode (${mode}) and activity (${activity}).",
  "actionableAdvice": [
    "Specific practical step 1 for this persona",
    "Specific practical step 2",
    "Specific practical step 3"
  ],
  "keyRisks": [
    "Brief hazard 1",
    "Brief hazard 2"
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean JSON response (strip markdown wrappers if Gemini returned them)
    let cleanedJson = responseText;
    if (cleanedJson.startsWith('```json')) {
      cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanedJson);

    return {
      summary: parsed.summary || 'Conditions evaluated based on atmospheric telemetry.',
      actionableAdvice: Array.isArray(parsed.actionableAdvice) ? parsed.actionableAdvice : [],
      keyRisks: Array.isArray(parsed.keyRisks) ? parsed.keyRisks : (riskAssessment?.decision?.reasons || []),
      isAiGenerated: true,
      engine: `Google Gemini AI (${process.env.GEMINI_MODEL || 'gemini-3.5-flash'})`,
      disclaimer: 'AI-assisted synthesis from deterministic sensor computations. Not official meteorological or medical advice.'
    };
  } catch (error) {
    console.error('[Gemini Service Error]', error.message, '- Falling back to deterministic synthesis');
    const fallback = generateFallbackAdvice({ weather, airQuality, mode, activity, riskAssessment });
    fallback.fallbackNotice = `Gemini API call encountered an error (${error.message}); deterministic fallback served.`;
    return fallback;
  }
};

/**
 * Conversational Climate Advisory Assistant with Gemini AI
 */
export const chatWithClimateAssistant = async ({ message, context = {} }) => {
  const model = getGeminiModel();

  if (!model) {
    return {
      reply: `I received your question: "${message}". Live Gemini API key is currently not configured in .env. Based on the active telemetry (${context?.location || 'your area'}: Temp ${context?.temp || '28'}°C, AQI ${context?.aqi || '45'}), always maintain hydration and check precipitation alerts before heading out.`,
      isAiGenerated: false,
      engine: 'ClimateShield Offline Assistant'
    };
  }

  const systemContext = `
You are the ClimateShield Personal Climate & Safety Advisor.
Answer user questions regarding weather safety, travel planning, air quality precautions, exercise timing, and clothing tips.
Current active environmental state:
- Location: ${context.location || 'Local Area'}
- Temperature: ${context.temp ?? 28}°C (Feels like: ${context.feelsLike ?? 29}°C)
- Weather: ${context.condition || 'Clear'}
- Rain Probability: ${context.rainProbability ?? 10}%
- AQI: ${context.aqi ?? 50} (${context.aqiCategory || 'Moderate'})
- User Mode: ${context.mode || 'Student'}
- Activity: ${context.activity || 'College'}
- Risk Status: ${context.riskStatus || 'LOW'}

Keep your response friendly, clear, concise, and prioritize health and safety.
`;

  try {
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `System Context:\n${systemContext}` }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am ready to advise you based on current atmospheric conditions.' }]
        }
      ]
    });

    const result = await chat.sendMessage(message);
    return {
      reply: result.response.text(),
      isAiGenerated: true,
      engine: `Google Gemini AI (${process.env.GEMINI_MODEL || 'gemini-3.5-flash'})`
    };
  } catch (error) {
    console.error('[Gemini Chat Error]', error.message);
    return {
      reply: `Sorry, I could not reach Gemini AI at the moment (${error.message}). Please ensure safe hydration and check your local forecast.`,
      isAiGenerated: false,
      error: error.message
    };
  }
};
