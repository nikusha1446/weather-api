import axios from 'axios';

const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const fetchWeatherData = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Error: WEATHER_API_KEY environment variable is required');
  }

  try {
    const url = `${BASE_URL}/${encodeURIComponent(city)}/today`;

    const params = {
      key: apiKey,
      include: 'current',
      unitGroup: 'metric',
      contentType: 'json',
    };

    const response = await axios.get(url, { params });
    return formatWeatherData(response.data);
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(`Error: invalid city name: ${city}`);
    } else if (error.response?.status === 401) {
      throw new Error('Error: invalid API key or unauthorized access');
    } else if (error.response?.status === 429) {
      throw new Error('Error: API rate limit exceeded. Please try again later');
    } else if (error.response?.status >= 500) {
      throw new Error('Error: weather service is currently unavailable');
    } else {
      throw new Error('Error: failed to fetch weather data');
    }
  }
};

const formatWeatherData = (data) => {
  const current = data.currentConditions;

  if (!current) {
    throw new Error('No current weather conditions found in API response');
  }
  return {
    location: data.resolvedAddress,
    coordinates: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    temperature: current.temp,
    feelsLike: current.feelslike,
    humidity: current.humidity,
    description: current.conditions,
    windSpeed: current.windspeed,
    windDirection: current.winddir,
    pressure: current.pressure,
    visibility: current.visibility,
    uvIndex: current.uvindex,
    cloudCover: current.cloudcover,
    sunrise: current.sunrise,
    sunset: current.sunset,
    timezone: data.timezone,
    icon: current.icon,
  };
};
