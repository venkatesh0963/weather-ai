"use client";

import { useWeather } from "@/context/WeatherContext";
import { Cloud, Droplets, Wind, Sun, Sunrise, Sunset, Eye, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function CurrentWeather() {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <div className="animate-pulse glass h-64 rounded-3xl w-full max-w-4xl mx-auto mt-8"></div>;
  if (error) return <div className="text-red-400 text-center mt-8">{error}</div>;
  if (!weatherData) return null;

  const { location, current, forecast } = weatherData;
  const today = forecast?.forecastday?.[0]?.day;
  const astro = forecast?.forecastday?.[0]?.astro;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Temp & Location */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">{location.name}</h2>
          <p className="text-slate-300 mt-2">{location.region}, {location.country}</p>
          <div className="flex items-center mt-6">
            <img src={current.condition.icon} alt="Weather icon" className="w-24 h-24" />
            <div className="ml-4">
              <span className="text-7xl font-bold text-white">{Math.round(current.temp_c)}&deg;</span>
              <p className="text-xl text-slate-200 capitalize">{current.condition.text}</p>
            </div>
          </div>
          <p className="text-slate-300 mt-2">Feels like {Math.round(current.feelslike_c)}&deg;</p>
        </div>

        {/* Right Side: Grid of details */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <DetailCard icon={<Wind className="w-5 h-5 text-blue-300"/>} label="Wind" value={`${current.wind_kph} km/h`} />
          <DetailCard icon={<Droplets className="w-5 h-5 text-blue-400"/>} label="Humidity" value={`${current.humidity}%`} />
          <DetailCard icon={<Sun className="w-5 h-5 text-yellow-300"/>} label="UV Index" value={current.uv} />
          <DetailCard icon={<Eye className="w-5 h-5 text-slate-300"/>} label="Visibility" value={`${current.vis_km} km`} />
          <DetailCard icon={<Gauge className="w-5 h-5 text-red-300"/>} label="Pressure" value={`${current.pressure_mb} mb`} />
          <DetailCard icon={<Cloud className="w-5 h-5 text-gray-300"/>} label="Air Quality" value={`Index: ${current.air_quality?.['us-epa-index'] || 'N/A'}`} />
          {astro && (
            <>
              <DetailCard icon={<Sunrise className="w-5 h-5 text-orange-400"/>} label="Sunrise" value={astro.sunrise} />
              <DetailCard icon={<Sunset className="w-5 h-5 text-orange-600"/>} label="Sunset" value={astro.sunset} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
      <div className="p-2 bg-white/10 rounded-full">{icon}</div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
