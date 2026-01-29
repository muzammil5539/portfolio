"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface ModuleCardProps {
  module: {
    name: string;
    summary?: string;
    labs: { title: string; link: string }[];
  };
  idx: number;
  activeModuleIdx: number | null;
  moduleRef: (el: HTMLDivElement | null) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  idx,
  activeModuleIdx,
  moduleRef,
}) => {
  const { isDarkMode } = useTheme();
  const isActive = activeModuleIdx === idx;
  
  return (
    <div
      ref={moduleRef}
      className={`group relative rounded-2xl transition-all duration-300 ease-out border ${
        isActive
          ? isDarkMode
            ? "border-ai-cyan/50 bg-ai-charcoal shadow-glow-cyan"
            : "border-cyan-400 bg-white shadow-lg shadow-cyan-100"
          : isDarkMode
            ? "border-ai-slate/50 bg-ai-charcoal/50 hover:border-ai-cyan/30 hover:bg-ai-charcoal"
            : "border-gray-200 bg-white hover:border-cyan-200 hover:shadow-md"
      }`}
      tabIndex={0}
      aria-label={`Module: ${module.name}`}
      style={{
        padding: "1.5rem",
      }}
    >
      {/* Active indicator line */}
      {isActive && (
        <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${
          isDarkMode ? "bg-ai-cyan" : "bg-cyan-500"
        }`}></div>
      )}

      {/* Content */}
      <div className={`relative z-10 ${isActive ? "pl-4" : ""}`}>
        {/* Module Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-xl sm:text-2xl font-bold leading-tight ${
            isDarkMode ? "text-ai-text" : "text-gray-900"
          }`}>
            {module.name}
          </h3>
          <div
            className={`ml-4 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              isActive
                ? isDarkMode
                  ? "bg-ai-cyan text-ai-navy shadow-glow-cyan"
                  : "bg-cyan-500 text-white shadow-lg"
                : isDarkMode
                  ? "bg-ai-slate text-ai-text-muted group-hover:bg-ai-charcoal-light group-hover:text-ai-cyan"
                  : "bg-gray-100 text-gray-600 group-hover:bg-cyan-50 group-hover:text-cyan-600"
            }`}
          >
            {idx + 1}
          </div>
        </div>

        {/* Module Summary */}
        {module.summary && (
          <div className={`mb-6 p-4 rounded-xl ${
            isDarkMode 
              ? "bg-ai-navy/50 border border-ai-slate/30" 
              : "bg-gray-50 border border-gray-100"
          }`}>
            <p className={`text-base md:text-lg leading-relaxed ${
              isDarkMode ? "text-ai-text-muted" : "text-gray-600"
            }`}>
              {module.summary}
            </p>
          </div>
        )}

        {/* Labs Section */}
        <div className="space-y-3">
          <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center ${
            isDarkMode ? "text-ai-text-muted" : "text-gray-500"
          }`}>
            <div className={`w-5 h-5 mr-2 rounded flex items-center justify-center ${
              isActive 
                ? isDarkMode ? "bg-ai-cyan/20" : "bg-cyan-100"
                : isDarkMode ? "bg-ai-slate" : "bg-gray-100"
            }`}>
              <svg
                className={`w-3 h-3 ${
                  isDarkMode ? "text-ai-cyan" : "text-cyan-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            Labs & Exercises
          </h4>

          <div className="grid gap-2">
            {module.labs.map((lab, labIdx) => (
              <Link
                key={lab.title}
                href={lab.link}
                target="_blank"
                className={`group/lab flex items-center p-3 rounded-xl border transition-all duration-200 ${
                  isDarkMode
                    ? "bg-ai-navy/30 border-ai-slate/30 hover:bg-ai-navy hover:border-ai-cyan/50 focus:ring-ai-cyan"
                    : "bg-gray-50/80 border-gray-100 hover:bg-cyan-50 hover:border-cyan-300 focus:ring-cyan-400"
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mr-3 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-ai-slate text-ai-text-muted group-hover/lab:bg-ai-cyan group-hover/lab:text-ai-navy"
                    : "bg-gray-200 text-gray-600 group-hover/lab:bg-cyan-500 group-hover/lab:text-white"
                }`}>
                  {labIdx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm md:text-base truncate transition-colors duration-300 ${
                    isDarkMode
                      ? "text-ai-text-muted group-hover/lab:text-ai-text"
                      : "text-gray-700 group-hover/lab:text-gray-900"
                  }`}>
                    {lab.title.replace(/\.ipynb$/, "")}
                  </p>
                </div>

                <svg
                  className={`w-4 h-4 transition-all duration-300 transform group-hover/lab:translate-x-1 ${
                    isDarkMode
                      ? "text-ai-text-dim group-hover/lab:text-ai-cyan"
                      : "text-gray-400 group-hover/lab:text-cyan-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
