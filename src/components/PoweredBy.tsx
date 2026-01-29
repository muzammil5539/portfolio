"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const PoweredBy: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`mt-auto pt-6 border-t text-xs text-center ${
      isDarkMode ? "border-ai-slate/30" : "border-gray-200"
    }`}>
      <div className={`flex items-center justify-center gap-2 ${
        isDarkMode ? "text-ai-text-dim" : "text-gray-500"
      }`}>
        <span>Powered by</span>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 bg-gradient-to-r from-ai-cyan to-ai-purple rounded-full ${
            isDarkMode ? "animate-pulse" : ""
          }`}></div>
          <span className={`font-semibold gradient-text`}>
            AI
          </span>
        </div>
        <span>&</span>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${
            isDarkMode ? "bg-white" : "bg-gray-800"
          }`}></div>
          <span className={`font-semibold ${
            isDarkMode ? "text-ai-text" : "text-gray-800"
          }`}>
            Next.js
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoweredBy;
