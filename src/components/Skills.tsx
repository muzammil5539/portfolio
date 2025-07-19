"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const skillsData = {
  "AI & Machine Learning": {
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
    color: "from-blue-500 to-purple-500"
  },
  "Programming & Tools": {
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
    color: "from-green-500 to-teal-500"
  },
  "Domain Expertise": {
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
    color: "from-purple-500 to-pink-500"
  },
  "Frameworks & Libraries": {
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
    color: "from-orange-500 to-red-500"
  },
};

export default function Skills() {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-16 md:py-24 relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Skills & Technologies
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p
            className={`text-base sm:text-lg mt-6 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A comprehensive toolkit of cutting-edge technologies and frameworks for AI and software development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {Object.entries(skillsData).map(([category, { skills, color }], index) => (
            <div
              key={category}
              className={`group rounded-xl shadow-lg transition-all duration-500 ease-in-out w-full backdrop-blur-sm border card-3d ${
                isDarkMode
                  ? "bg-gray-800/80 shadow-gray-900/50 border-gray-700/30 hover:bg-gray-800/90"
                  : "bg-white/80 shadow-gray-200/50 border-gray-200/30 hover:bg-white/90"
              } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="p-4 sm:p-6 relative">
                {/* Category Header with Icon */}
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-8 rounded-full bg-gradient-to-b ${color} mr-3 shadow-lg`}></div>
                  <h3
                    className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                      isDarkMode 
                        ? "text-white group-hover:text-blue-300" 
                        : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    {category}
                  </h3>
                </div>

                {/* Skills Tags with Animation */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`px-3 py-2 text-xs sm:text-sm rounded-full font-medium
                        transition-all duration-500 transform hover:scale-110 cursor-default
                        ${isDarkMode
                          ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 border border-gray-600 hover:border-blue-500/50"
                          : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200 hover:border-blue-400/50"
                        }
                        ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}
                      style={{ 
                        animationDelay: `${(index * 200) + (skillIndex * 100)}ms`,
                        boxShadow: isDarkMode 
                          ? '0 4px 15px rgba(0,0,0,0.2)' 
                          : '0 4px 15px rgba(0,0,0,0.1)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom Accent Line */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
