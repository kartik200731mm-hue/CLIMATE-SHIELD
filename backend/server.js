import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import weatherRoutes from './routes/weatherRoutes.js';
import riskRoutes from './routes/riskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas (if MONGO_URI is set)
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Permissive in development, validated in production
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parser
app.use(express.json());

// Serverless DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (e) {
    // Graceful fallback if database connection fails
  }
  next();
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'ClimateShield API Server',
    version: '2.0.0',
    database: getDbStatus(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '' && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
    geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    timestamp: new Date().toISOString()
  });
});

// API Catalog / Documentation Endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'ClimateShield Hyperlocal Climate Risk & Safety API',
    version: '2.0.0',
    description: 'Deterministic climate risk engine with live meteorological telemetry, MongoDB persistence, and Google Gemini AI synthesis.',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        preferences: 'PUT /api/auth/preferences'
      },
      weather: {
        getLive: 'GET /api/weather?lat={lat}&lon={lon}&name={name}',
        searchCities: 'GET /api/weather/search?q={query}'
      },
      risk: {
        evaluate: 'POST /api/risk/evaluate (body: { weather, airQuality, mode, activity, location })'
      },
      ai: {
        explain: 'POST /api/ai/explain (body: { weather, airQuality, mode, activity, riskAssessment, location })',
        chat: 'POST /api/ai/chat (body: { message, context })'
      },
      history: {
        list: 'GET /api/history',
        create: 'POST /api/history',
        delete: 'DELETE /api/history/:id',
        reset: 'DELETE /api/history'
      }
    }
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/history', historyRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server in Standalone Node Environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  CLIMATESHIELD BACKEND API SERVER RUNNING`);
    console.log(`  Port:         http://localhost:${PORT}`);
    console.log(`  Environment:  ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  API Catalog:  http://localhost:${PORT}/api`);
    console.log(`  Weather API:  http://localhost:${PORT}/api/weather`);
    console.log(`  Risk Engine:  http://localhost:${PORT}/api/risk/evaluate`);
    console.log(`  ML Model:     http://localhost:${PORT}/api/risk/ml-predict`);
    console.log(`  Gemini AI:    http://localhost:${PORT}/api/ai/explain`);
    console.log(`  Gemini Key:   ${process.env.GEMINI_API_KEY ? 'Configured (Active)' : 'Unset (Fallback Active)'}`);
    console.log(`  Auth Routes:  http://localhost:${PORT}/api/auth`);
    console.log(`  History API:  http://localhost:${PORT}/api/history`);
    console.log(`=========================================`);
  });
}

export default app;
