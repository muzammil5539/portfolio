"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ModuleNavProps {
  modules: { name: string }[];
  activeModuleIdx: number | null;
  handleModuleClick: (idx: number) => void;
}

const ModuleNav: React.FC<ModuleNavProps> = ({
  modules,
  activeModuleIdx,
  handleModuleClick,
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-ai-purple" : "bg-purple-500"}`}></div>
        <h4 className={`text-lg font-bold uppercase tracking-wider ${
          isDarkMode ? "text-ai-text" : "text-gray-900"
        }`}>
          Modules
        </h4>
      </div>
      <ul className={`space-y-1.5 pl-3 border-l-2 ${
        isDarkMode ? "border-ai-slate" : "border-gray-200"
      }`}>
        {modules.map((module, i) => (
          <li
            key={module.name}
            className={`px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              activeModuleIdx === i
                ? isDarkMode
                  ? "bg-ai-charcoal text-ai-cyan border-l-2 border-ai-cyan -ml-[2px] shadow-sm"
                  : "bg-cyan-50 text-cyan-700 border-l-2 border-cyan-500 -ml-[2px] shadow-sm"
                : isDarkMode
                  ? "text-ai-text-muted hover:text-ai-text hover:bg-ai-charcoal/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            } ${isDarkMode ? "focus:ring-ai-cyan" : "focus:ring-cyan-400"}`}
            onClick={() => handleModuleClick(i)}
            tabIndex={0}
            aria-label={`Go to module: ${module.name}`}
          >
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold ${
                activeModuleIdx === i
                  ? isDarkMode
                    ? "bg-ai-cyan text-ai-navy"
                    : "bg-cyan-500 text-white"
                  : isDarkMode
                    ? "bg-ai-slate text-ai-text-muted"
                    : "bg-gray-200 text-gray-600"
              }`}>
                {i + 1}
              </span>
              <span className="truncate">{module.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleNav;
