"use client";

import { useWeather } from "@/context/WeatherContext";
import { motion } from "framer-motion";
import { Droplets, Sunrise, Sunset } from "lucide-react";

export function SevenDayForecast() {
  const { weatherData } = useWeather();
  if (!weatherData) return null;

  const forecastDays = weatherData.forecast.forecastday;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass p-6 rounded-3xl mt-6 max-w-4xl mx-auto w-full"
    >
      <h3 className="text-xl font-semibold mb-6 text-white">7-Day Forecast</h3>
      <div className="flex flex-col gap-4">
        {forecastDays.map((day: any, i: number) => {
          const date = new Date(day.date);
          const dayName = i === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'long' });

          return (
            <div key={day.date_epoch} className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-1/4 text-lg font-medium text-white">{dayName}</div>
              
              <div className="flex items-center gap-4 w-full md:w-2/4">
                <img src={day.day.condition.icon} alt="icon" className="w-12 h-12" />
                <div className="flex-1">
                  <p className="text-slate-200 capitalize">{day.day.condition.text}</p>
                  <div className="flex items-center gap-2 text-xs text-blue-300">
                    <Droplets className="w-3 h-3" />
                    <span>{day.day.daily_chance_of_rain}% rain</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-1/4">
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{Math.round(day.day.maxtemp_c)}&deg;</span>
                  <span className="text-sm text-slate-400 ml-2">/ {Math.round(day.day.mintemp_c)}&deg;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
