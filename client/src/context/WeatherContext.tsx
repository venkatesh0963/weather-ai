"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWeather } from "@/lib/api";

type WeatherContextType = {
  weatherData: any;
  loading: boolean;
  error: string | null;
  searchLocation: (query: string) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(query);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Default location to fetch on load
    searchLocation("New York");
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, loading, error, searchLocation }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
