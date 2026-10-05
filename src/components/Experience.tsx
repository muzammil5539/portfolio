"use client";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "@/data/experience";
import { useTheme } from "@/context/ThemeContext";

export default function Experience() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="experience"
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-ai-navy" : "bg-background-secondary"
      }`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
      <div className={`absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-cyan/5" : "bg-accent-cyan/20"
      }`}></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent ${isDarkMode ? "to-ai-cyan" : "to-accent-blue"}`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-ai-cyan" : "text-accent-blue"}`}>Career</span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent ${isDarkMode ? "to-ai-cyan" : "to-accent-blue"}`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-ai-text" : "text-foreground"}`}>
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline line - visible vertical line connecting experience items */}
          <div 
            className={`absolute left-4 md:left-1/2 w-1 transform md:-translate-x-1/2 z-0 ${
              isDarkMode ? "bg-accent-blue" : "bg-gray-300"
            }`}
            style={{ top: '10px', bottom: '10px' }}
          ></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              {/* Timeline dot */}
              <div className={`absolute left-4 md:left-1/2 w-5 h-5 border-2 rounded-full transform -translate-x-1/2 shadow-glow-cyan z-10 ${
                isDarkMode ? "bg-ai-charcoal border-ai-cyan" : "bg-surface border-accent-blue"
              }`}></div>
              
              {/* Alternating Cards - Even indices on right, Odd on left */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 
                  ? "md:ml-auto md:pl-12" // Right side
                  : "md:mr-auto md:pr-12" // Left side
              }`}>
                <ExperienceCard {...exp} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
