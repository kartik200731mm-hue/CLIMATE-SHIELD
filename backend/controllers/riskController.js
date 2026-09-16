import { evaluateClimateRisk } from '../services/riskService.js';
import { generateGeminiAdvice } from '../services/geminiService.js';
import { addHistoryItem } from '../services/historyService.js';

/**
 * @desc    Evaluate climate risk & synthesize contextual Gemini AI advice
 * @route   POST /api/risk/evaluate
 * @access  Public
 */
export const evaluateRisk = async (req, res, next) => {
  try {
    const { weather, airQuality, mode = 'Student', activity = 'College', location, saveToHistory = false } = req.body;

    if (!weather) {
      return res.status(400).json({
        success: false,
        message: 'Weather payload is required for risk assessment.'
      });
    }

    // 1. Authoritative Deterministic Computation
    const riskAssessment = evaluateClimateRisk({
      weather,
      airQuality,
      mode,
      activity
    });

    // 2. Synthesize Gemini AI Contextual Explanation
    const aiExplanation = await generateGeminiAdvice({
      weather,
      airQuality,
      mode,
      activity,
      riskAssessment,
      locationName: location?.name || 'Selected Location'
    });

    const fullResult = {
      ...riskAssessment,
      aiExplanation
    };

    // 3. Optional automatic audit history capture
    if (saveToHistory) {
      addHistoryItem({
        location: location?.name || 'Live Location',
        mode,
        activity,
        overallScore: fullResult.overallScore,
        status: fullResult.status,
        verdict: fullResult.decision.verdict,
        aqi: airQuality?.aqi ?? 50,
        temp: Math.round(weather.feelsLike ?? weather.temperature ?? 25)
      });
    }

    res.status(200).json({
      success: true,
      data: fullResult
    });
  } catch (error) {
    next(error);
  }
};
