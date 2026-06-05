import axios from 'axios';

const BASE_URL = 'http://api.weatherapi.com/v1';

export async function getWeatherData(query: string) {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  if (!WEATHER_API_KEY) {
    throw new Error('WEATHER_API_KEY is not defined');
  }

  // Fetch forecast data (includes current, alerts, aqi, and forecast for 7 days)
  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: WEATHER_API_KEY,
      q: query,
      days: 7,
      aqi: 'yes',
      alerts: 'yes'
    }
  });

  return response.data;
}
