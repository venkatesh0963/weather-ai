import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchWeather = async (query: string) => {
  const { data } = await axios.get(`${API_URL}/weather`, { params: { q: query } });
  return data;
};

export const fetchInsights = async (prompt: string, weatherData: any) => {
  const { data } = await axios.post(`${API_URL}/weather/insights`, { prompt, weatherData });
  return data;
};
