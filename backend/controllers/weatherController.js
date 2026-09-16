import { fetchWeatherByCoordinates, searchCities, reverseGeocodeCoordinates } from '../services/weatherService.js';
import { DEFAULT_COORDINATES } from '../config/constants.js';

/**
 * @desc    Get live weather, air quality, and reliability for given coordinates
 * @route   GET /api/weather
 * @access  Public
 */
export const getWeather = async (req, res, next) => {
  try {
    let lat = parseFloat(req.query.lat);
    let lon = parseFloat(req.query.lon);

    // Fall back to default location if query params are missing or invalid
    if (isNaN(lat) || isNaN(lon)) {
      lat = DEFAULT_COORDINATES.latitude;
      lon = DEFAULT_COORDINATES.longitude;
    }

    // Basic coordinate boundary validation
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinate range: latitude must be between -90 and 90, longitude between -180 and 180.'
      });
    }

    let locationName = req.query.name;
    let countryName = req.query.country;

    // Dynamically reverse geocode if no city name is supplied (e.g., GPS coordinates)
    if (!locationName) {
      const resolved = await reverseGeocodeCoordinates(lat, lon);
      locationName = resolved.name;
      countryName = countryName || resolved.country;
    }

    locationName = locationName || DEFAULT_COORDINATES.name;
    countryName = countryName || DEFAULT_COORDINATES.country;

    const weatherData = await fetchWeatherByCoordinates(lat, lon);

    res.status(200).json({
      success: true,
      data: {
        location: {
          name: locationName,
          latitude: lat,
          longitude: lon,
          country: countryName
        },
        weather: {
          temperature: weatherData.temperature,
          feelsLike: weatherData.feelsLike,
          humidity: weatherData.humidity,
          rainProbability: weatherData.rainProbability,
          precipitation: weatherData.precipitation,
          windSpeed: weatherData.windSpeed,
          condition: weatherData.condition,
          weatherCode: weatherData.weatherCode,
          uvIndex: weatherData.uvIndex,
          tempMax: weatherData.tempMax,
          tempMin: weatherData.tempMin,
          source: weatherData.source,
          fetchedAt: weatherData.fetchedAt
        },
        airQuality: weatherData.airQuality,
        forecastReliability: weatherData.forecastReliability
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search city names for autocomplete
 * @route   GET /api/weather/search
 * @access  Public
 */
export const searchLocations = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query || query.trim().length < 2) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    const results = await searchCities(query);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};
