"use client";

import { useWeather } from "@/context/WeatherContext";
import { SearchBar } from "@/components/SearchBar";
import { CurrentWeather } from "@/components/CurrentWeather";
import { HourlyForecast } from "@/components/HourlyForecast";
import { SevenDayForecast } from "@/components/SevenDayForecast";
import { AIAssistant } from "@/components/AIAssistant";
import { WeatherMap } from "@/components/WeatherMap";
import { useEffect, useState } from "react";
import { Cloud, Droplets, Sun, Moon } from "lucide-react";

export default function Home() {
  const { weatherData } = useWeather();
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.current.condition.text.toLowerCase();
      const isDay = weatherData.current.is_day;
      
      if (!isDay) {
        setTheme("night");
      } else if (condition.includes("sun") || condition.includes("clear")) {
        setTheme("sunny");
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        setTheme("rainy");
      } else if (condition.includes("cloud") || condition.includes("overcast")) {
        setTheme("cloudy");
      } else {
        setTheme("default");
      }
    }
  }, [weatherData]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background Layers for smooth cross-fading gradients */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'night' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-slate-950 to-indigo-950`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'sunny' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-slate-900 via-amber-900/40 to-slate-950`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'rainy' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-slate-900 to-blue-950`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'cloudy' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-slate-800 to-slate-950`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'default' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-slate-900 to-cyan-950`} />
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sun className="w-8 h-8 text-yellow-300" />
            <h1 className="text-3xl font-bold text-white tracking-tight">WeatherAI</h1>
          </div>
          <SearchBar />
        </header>

        <CurrentWeather />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          <div className="space-y-6">
            <HourlyForecast />
            <SevenDayForecast />
          </div>
          <div className="space-y-6 h-full">
            <AIAssistant />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <WeatherMap />
        </div>
      </div>
    </main>
  );
}
