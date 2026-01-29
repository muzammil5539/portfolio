"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  technologies: string[];
  video?: string;
}

export default function ExperienceCard({
  title,
  company,
  date,
  description,
  technologies,
  video,
}: ExperienceCardProps) {
  const { isDarkMode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
      isDarkMode 
        ? "glass-card hover:border-ai-cyan/30" 
        : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:border-cyan-300"
    }`}>
      {/* Header */}
      <div className={`p-6 border-b ${isDarkMode ? "border-ai-slate/50" : "border-gray-200"}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-lg font-semibold transition-colors ${
              isDarkMode ? "text-ai-text group-hover:text-ai-cyan" : "text-gray-900 group-hover:text-cyan-600"
            }`}>
              {title}
            </h3>
            <p className={`font-medium mt-1 ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>{company}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full border whitespace-nowrap ${
            isDarkMode 
              ? "bg-ai-navy text-ai-text-muted border-ai-slate/50" 
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}>
            {date}
          </span>
        </div>
      </div>

      {video && isClient && (
        <div className="relative">
          <video
            className="w-full h-48 object-cover"
            controls
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={`absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none ${
            isDarkMode ? "from-ai-charcoal" : "from-white"
          }`}></div>
        </div>
      )}

      <div className="p-6">
        {/* Accomplishments */}
        <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          isDarkMode ? "text-ai-text-muted" : "text-gray-600"
        }`}>
          Key Accomplishments
        </h4>
        <ul className="space-y-3 mb-6">
          {description.map((item, index) => (
            <li key={index} className={`flex items-start text-sm ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
              <span className={`mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDarkMode ? "bg-ai-cyan" : "bg-cyan-500"}`}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className={`pt-4 border-t ${isDarkMode ? "border-ai-slate/50" : "border-gray-200"}`}>
          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
            isDarkMode ? "text-ai-text-muted" : "text-gray-600"
          }`}>
            Technologies & Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                  isDarkMode 
                    ? "bg-ai-navy/80 text-ai-cyan border-ai-cyan/20" 
                    : "bg-cyan-50 text-cyan-700 border-cyan-200"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
