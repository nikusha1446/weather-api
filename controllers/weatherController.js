import {
  generateCacheKey,
  getCache,
  setCache,
} from '../services/cacheService.js';
import { fetchWeatherData } from '../services/weatherService.js';

export const getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  try {
    const cacheKey = generateCacheKey(city);
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        cached: true,
      });
    }

    const weatherData = await fetchWeatherData(city);
    const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION) || 43200;
    await setCache(cacheKey, weatherData, cacheExpiration);

    return res.status(200).json({
      success: true,
      data: weatherData,
      cached: false,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
