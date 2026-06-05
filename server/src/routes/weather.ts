import { Router } from 'express';
import { getWeatherData } from '../services/weather';
import { getWeatherInsights } from '../services/gemini';

const router = Router();

// Get weather data for a location
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const weatherData = await getWeatherData(q);
    res.json(weatherData);
  } catch (error: any) {
    console.error('Error fetching weather:', error.message);
    
    if (error.message === 'WEATHER_API_KEY is not defined' || process.env.WEATHER_API_KEY === 'YOUR_WEATHER_API_KEY') {
      return res.status(400).json({ error: "Missing API Key: Please add a valid WEATHER_API_KEY in the server/.env file." });
    }
    
    if (error.response?.data?.error?.message) {
      return res.status(error.response.status).json({ error: `WeatherAPI Error: ${error.response.data.error.message}` });
    }

    res.status(500).json({ error: 'Failed to fetch weather data. Please try again.' });
  }
});

// Get AI insights
router.post('/insights', async (req, res) => {
  try {
    const { prompt, weatherData } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const insights = await getWeatherInsights(prompt, weatherData);
    res.json({ response: insights });
  } catch (error: any) {
    console.error('Error fetching insights:', error.message, error.response?.data || '');
    
    if (error.message === 'GEMINI_API_KEY is not defined' || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      return res.status(400).json({ error: "Missing API Key: Please add a valid GEMINI_API_KEY in the server/.env file." });
    }

    let errorMessage = error.message;
    try {
      // The Gemini SDK throws error.message as a JSON string
      const parsed = JSON.parse(error.message);
      if (parsed.error && parsed.error.message) {
        errorMessage = parsed.error.message;
      }
    } catch (e) {}

    res.status(500).json({ error: `Gemini AI Error: ${errorMessage || 'Failed to fetch insights'}` });
  }
});

export default router;
