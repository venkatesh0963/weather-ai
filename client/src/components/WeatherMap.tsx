"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWeather } from "@/context/WeatherContext";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Dynamically import React Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export function WeatherMap() {
  const { weatherData } = useWeather();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!weatherData || !mounted) return null;

  const position: [number, number] = [weatherData.location.lat, weatherData.location.lon];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass p-6 rounded-3xl mt-6 max-w-4xl mx-auto w-full"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">Interactive Map</h3>
      <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/20">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Cloud/Precipitation layer can be added via OpenWeatherMap tile endpoints if desired */}
          <TileLayer
            url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_OWM_KEY"
            opacity={0.5}
          />
          <Marker position={position}>
            <Popup>
              {weatherData.location.name} <br /> Temp: {weatherData.current.temp_c}&deg;C
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}
