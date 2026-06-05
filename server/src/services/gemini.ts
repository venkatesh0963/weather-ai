import { GoogleGenAI } from '@google/genai';

export async function getWeatherInsights(prompt: string, weatherData: any) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined');
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  
  const systemInstruction = `You are a helpful and intelligent AI Weather Assistant. 
You will be provided with real-time weather data and the user's query. 
Use the weather data to give accurate, relevant, and conversational answers. 
If the user asks about activities (like travel or hiking), base your recommendations on the provided weather conditions (e.g. rain, UV index, wind speed).`;

  const context = weatherData ? `Current Weather Context: ${JSON.stringify(weatherData)}` : '';

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${context}\n\nUser Question: ${prompt}`,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text;
}
