"use client";
import { useTheme } from "@/context/ThemeContext";

// Color mappings for Tailwind (full class names for purge)
const colorClasses = {
  "ai-cyan": {
    text: "text-ai-cyan",
    textLight: "text-cyan-600",
    hover: "hover:border-ai-cyan/50",
    hoverLight: "hover:border-cyan-400",
    shadow: "group-hover:shadow-glow-cyan",
    bgLight: "bg-cyan-50",
  },
  "ai-blue": {
    text: "text-ai-blue",
    textLight: "text-blue-600",
    hover: "hover:border-ai-blue/50",
    hoverLight: "hover:border-blue-400",
    shadow: "group-hover:shadow-glow-blue",
    bgLight: "bg-blue-50",
  },
  "ai-purple": {
    text: "text-ai-purple",
    textLight: "text-purple-600",
    hover: "hover:border-ai-purple/50",
    hoverLight: "hover:border-purple-400",
    shadow: "group-hover:shadow-glow-purple",
    bgLight: "bg-purple-50",
  },
  "ai-green": {
    text: "text-ai-green",
    textLight: "text-green-600",
    hover: "hover:border-ai-green/50",
    hoverLight: "hover:border-green-400",
    shadow: "group-hover:shadow-glow-green",
    bgLight: "bg-green-50",
  },
};

const skillsData = {
  "AI & Machine Learning": {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "ai-cyan" as const,
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
  },
  "Programming & Tools": {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "ai-blue" as const,
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
  },
  "Domain Expertise": {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: "ai-purple" as const,
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
  },
  "Frameworks & Libraries": {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: "ai-green" as const,
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
  },
};

export default function Skills() {
  const { isDarkMode } = useTheme();
  
  return (
    <section
      id="skills"
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-ai-charcoal" : "bg-white"
      }`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-20" : "opacity-10"}`}></div>
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-blue/5" : "bg-blue-200/30"
      }`}></div>
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-ai-green/5" : "bg-green-200/30"
      }`}></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>Expertise</span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent ${isDarkMode ? "to-ai-cyan" : "to-cyan-500"}`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
            Technical <span className="gradient-text">Competencies</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
            A comprehensive overview of technical skills and expertise acquired through academic coursework and research projects
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsData).map(([category, data]) => {
            const classes = colorClasses[data.color];
            return (
              <div 
                key={category} 
                className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  isDarkMode 
                    ? "glass-card hover:border-ai-cyan/30" 
                    : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:border-cyan-300"
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-shadow ${
                    isDarkMode 
                      ? `bg-ai-navy ${classes.text} ${classes.shadow}` 
                      : `${classes.bgLight} ${classes.textLight}`
                  }`}>
                    {data.icon}
                  </div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
                    {category}
                  </h3>
                </div>
                
                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
                        isDarkMode 
                          ? `bg-ai-navy/80 text-ai-text-muted border-ai-slate/50 ${classes.hover} hover:text-ai-text` 
                          : `bg-gray-50 text-gray-700 border-gray-200 ${classes.hoverLight} hover:text-gray-900`
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15+", label: "Technologies", colorClass: isDarkMode ? "text-ai-cyan" : "text-cyan-600" },
            { value: "6+", label: "Projects", colorClass: isDarkMode ? "text-ai-blue" : "text-blue-600" },
            { value: "4+", label: "Domains", colorClass: isDarkMode ? "text-ai-purple" : "text-purple-600" },
            { value: "1+", label: "Years Experience", colorClass: isDarkMode ? "text-ai-green" : "text-green-600" },
          ].map((stat, index) => (
            <div key={index} className={`text-center p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode 
                ? "glass-card group hover:border-ai-cyan/30" 
                : "bg-white border-gray-200 shadow-md hover:shadow-xl"
            }`}>
              <div className={`text-3xl md:text-4xl font-bold ${stat.colorClass} mb-2`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}