# Premium Weather Forecasting Application 🌤️

A production-ready, full-stack weather forecasting application featuring a modern Glassmorphism UI, interactive charts, real-time maps, and an AI Weather Assistant powered by Google's Gemini API.

## Features ✨

- **Dynamic Dark Themes**: Beautiful gradient backgrounds that smoothly transition based on the real-time weather condition (Sunny, Rainy, Cloudy, Night) while maintaining high contrast.
- **Glassmorphism UI**: Premium frosted glass cards, dynamic blur effects, and smooth Framer Motion animations.
- **Comprehensive Dashboards**: 
  - **Current Conditions**: Temperature, Feels Like, UV Index, Humidity, Air Quality, Wind Speed, and Pressure.
  - **Hourly Forecast**: Interactive Recharts area graph alongside a scrollable strip of 24-hour weather predictions.
  - **7-Day Forecast**: Expandable daily highs, lows, and rain probabilities.
- **Interactive Weather Maps**: Dynamic Mapbox/Leaflet map pinpointing the searched location.
- **AI Weather Assistant**: A fully integrated chat interface that connects to the Gemini API to give intelligent travel, clothing, and health recommendations based on live weather data.

## Tech Stack 🛠️

- **Frontend (`/client`)**: Next.js 15, React 19, TypeScript, TailwindCSS v4, Shadcn UI, Framer Motion, Recharts, React-Leaflet.
- **Backend (`/server`)**: Node.js, Express, TypeScript, Axios, Google GenAI SDK.
- **APIs Used**: [WeatherAPI.com](https://www.weatherapi.com/) & [Google Gemini API](https://aistudio.google.com/).

---

## Getting Started 🚀

### Prerequisites 📦
Before you begin, ensure you have the following software installed on your machine:
- **[Node.js](https://nodejs.org/en/download/)** (v18.0.0 or higher) - Includes `npm` which is required to install dependencies and run the application.
- **[Git](https://git-scm.com/downloads)** - Required to clone the repository to your computer.
- A modern code editor like **[VS Code](https://code.visualstudio.com/)**.

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/MRVB96/weather-ai.git
cd weather-ai
```

### 2. Configure the Environment
Navigate to `server/.env` and add your real API keys:
```env
PORT=5000
WEATHER_API_KEY=your_weatherapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies & Start the Backend
Open a terminal and run:
```bash
cd server
npm install
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 4. Install Dependencies & Start the Frontend
Open a second terminal and run:
```bash
cd client
npm install
npm run dev
```
*The frontend will start on `http://localhost:3000`.*

### 5. Enjoy!
Open your browser to [http://localhost:3000](http://localhost:3000) and explore the app!
.......
