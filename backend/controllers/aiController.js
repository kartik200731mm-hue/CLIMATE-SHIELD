import { generateGeminiAdvice, chatWithClimateAssistant, executeSovereignAgent } from '../services/geminiService.js';

/**
 * @desc    Generate tailored Gemini AI climate briefing
 * @route   POST /api/ai/explain
 * @access  Public
 */
export const explainRisk = async (req, res, next) => {
  try {
    const { weather, airQuality, mode, activity, riskAssessment, location } = req.body;

    const explanation = await generateGeminiAdvice({
      weather,
      airQuality,
      mode,
      activity,
      riskAssessment,
      locationName: location?.name || 'Selected Location'
    });

    res.status(200).json({
      success: true,
      data: explanation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Chat with ClimateShield Gemini AI Personal Advisor
 * @route   POST /api/ai/chat
 * @access  Public
 */
export const chatAdvisor = async (req, res, next) => {
  try {
    const { message, context } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required for chat.'
      });
    }

    const response = await chatWithClimateAssistant({
      message: message.trim(),
      context: context || {}
    });

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Execute a Sovereign Intelligence Agent Node
 * @route   POST /api/ai/agent-analyze
 * @access  Public
 */
export const executeAgent = async (req, res, next) => {
  try {
    const { agentId, telemetry, customQuery } = req.body;

    if (!agentId) {
      return res.status(400).json({
        success: false,
        message: 'agentId is required.'
      });
    }

    const report = await executeSovereignAgent({
      agentId,
      telemetry: telemetry || {},
      customQuery: customQuery || ''
    });

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};
