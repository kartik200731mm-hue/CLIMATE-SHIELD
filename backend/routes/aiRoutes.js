import express from 'express';
import { explainRisk, chatAdvisor } from '../controllers/aiController.js';

const router = express.Router();

// Generate contextual AI safety briefing
router.post('/explain', explainRisk);

// Interactive conversational assistant grounded in climate telemetry
router.post('/chat', chatAdvisor);

export default router;
