import express from 'express';
import { evaluateRisk, predictRiskML } from '../controllers/riskController.js';

const router = express.Router();

// Evaluate climate risk with deterministic engine + ML prediction + Gemini AI briefing
router.post('/evaluate', evaluateRisk);

// Isolated ML inference endpoint (Random Forest model)
router.post('/ml-predict', predictRiskML);

export default router;
