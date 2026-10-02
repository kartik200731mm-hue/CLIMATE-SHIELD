import express from 'express';
import { explainRisk, chatAdvisor, executeAgent } from '../controllers/aiController.js';

const router = express.Router();

// Generate contextual AI safety briefing
router.post('/explain', explainRisk);

// Interactive conversational assistant grounded in climate telemetry
router.post('/chat', chatAdvisor);

// Execute a Sovereign Intelligence Agent
router.post('/agent-analyze', executeAgent);

export default router;
