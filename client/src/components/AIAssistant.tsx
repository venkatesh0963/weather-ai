"use client";

import { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import { fetchInsights } from "@/lib/api";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIAssistant() {
  const { weatherData } = useWeather();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Weather Assistant. Ask me anything about the forecast, travel plans, or what to wear today.' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !weatherData) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetchInsights(userMessage, weatherData);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.error || error.message || 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
    } finally {
      setLoading(false);
    }
  };

  if (!weatherData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass p-6 rounded-3xl mt-6 max-w-4xl mx-auto w-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4 text-white shrink-0">
        <Sparkles className="w-5 h-5 text-yellow-300" />
        <h3 className="text-xl font-semibold">Gemini Weather Insights</h3>
      </div>

      <div className="overflow-y-auto pr-4 mb-4 max-h-[400px] w-full flex-1 min-h-0 custom-scrollbar">
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600/80 text-white rounded-tr-sm' : 'glass-panel text-slate-100 rounded-tl-sm'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 bg-purple-500">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 rounded-2xl glass-panel text-slate-100 rounded-tl-sm flex items-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSend} className="relative flex items-center mt-auto shrink-0">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the weather..."
          className="pr-12 py-6 rounded-2xl glass-panel border-white/20 text-white placeholder:text-slate-300 focus-visible:ring-white/30"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-xl transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </motion.div>
  );
}
