import { fetchWeatherData } from '../services/weatherService.js';

export const getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  try {
    const weatherData = await fetchWeatherData(city);

    res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
