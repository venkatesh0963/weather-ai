"use client";

import { useWeather } from "@/context/WeatherContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export function HourlyForecast() {
  const { weatherData } = useWeather();
  if (!weatherData) return null;

  // WeatherAPI gives 24 hours of data inside forecastday[0].hour
  // But we want the next 24 hours starting from current time
  const currentEpoch = weatherData.location.localtime_epoch;
  const hoursData = weatherData.forecast.forecastday.flatMap((day: any) => day.hour);
  const next24Hours = hoursData.filter((hour: any) => hour.time_epoch >= currentEpoch).slice(0, 24);

  const chartData = next24Hours.map((hour: any) => ({
    time: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(hour.temp_c)
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass p-6 rounded-3xl mt-6 max-w-4xl mx-auto w-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">Hourly Forecast</h3>
      
      {/* Chart */}
      <div className="h-40 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Scrollable Cards */}
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4 px-2">
          {next24Hours.map((hour: any, i: number) => (
            <div key={i} className="glass-panel p-4 rounded-2xl flex flex-col items-center min-w-[100px] shrink-0">
              <span className="text-sm text-slate-300">{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <img src={hour.condition.icon} alt="icon" className="w-12 h-12 my-2" />
              <span className="text-xl font-bold text-white">{Math.round(hour.temp_c)}&deg;</span>
              <span className="text-xs text-blue-300 mt-1">{hour.chance_of_rain}% rain</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}
