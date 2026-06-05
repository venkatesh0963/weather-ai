import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeatherProvider } from "@/context/WeatherContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather AI - Premium Forecast",
  description: "Get real-time weather forecasts, AI insights, and interactive maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen antialiased bg-slate-950 text-slate-50 transition-colors duration-500`}>
        <WeatherProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </WeatherProvider>
      </body>
    </html>
  );
}
