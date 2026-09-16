import express from 'express';
import { getWeather, searchLocations } from '../controllers/weatherController.js';

const router = express.Router();

// Search locations / cities
router.get('/search', searchLocations);

// Fetch live weather data
router.get('/', getWeather);

export default router;
