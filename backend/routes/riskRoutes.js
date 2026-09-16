import express from 'express';
import { evaluateRisk } from '../controllers/riskController.js';

const router = express.Router();

// Evaluate climate risk with deterministic engine + Gemini AI briefing
router.post('/evaluate', evaluateRisk);

export default router;
