"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { searchLocation } = useWeather();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchLocation(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <MapPin className="absolute left-3 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12 py-6 text-lg rounded-2xl glass-panel border-white/20 text-white placeholder:text-slate-300 focus-visible:ring-white/30"
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="absolute right-2 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          suppressHydrationWarning
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}
