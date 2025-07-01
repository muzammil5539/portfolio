"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

const skillsData = {
  "AI & Machine Learning": [
    "TensorFlow",
    "PyTorch", 
    "Deep Learning",
    "Computer Vision",
    "CNN",
    "RNN",
    "Transfer Learning",
  ],
  "Programming & Tools": ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
  "Domain Expertise": [
    "Medical Imaging",
    "Image Segmentation", 
    "Pattern Recognition",
    "3D Segmentation",
    "Edge Detection",
    "Morphological Operations",
  ],
  "Frameworks & Libraries": [
    "Scikit-learn",
    "LangChain",
    "Streamlit", 
    "Google Colab",
    "MongoDB",
    "MySQL",
  ],
};

export default function Skills() {
  const { isDarkMode } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden holographic-bg"
    >
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 geometric-pattern opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.05}px) translateZ(-20px)`
        }}
      ></div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-24 h-24 border border-cyan-400/30 rotate-3d"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-pink-500/30 rotate-3d" 
          style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-green-400/30 rotate-3d" 
          style={{ animationDelay: '8s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 perspective-container">
          <div className="layer-2">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Skills & <span className="gradient-text text-glow">Technologies</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive expertise across AI/ML technologies, programming languages, 
              and cutting-edge frameworks for building intelligent systems.
            </p>
            
            {/* Animated Divider */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 bg-cyan-400 rotate-45 animate-pulse"></div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 neon-glow"></div>
              <div className="w-3 h-3 bg-pink-500 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto perspective-container">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <div
              key={category}
              className="layer-3"
              style={{
                animationDelay: `${categoryIndex * 0.2}s`,
                transform: `translateZ(${categoryIndex * 10}px)`
              }}
            >
              <div className="relative group">
                {/* Floating Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                  rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Main Card */}
                <div className="relative rounded-lg p-8 transition-all duration-500 ease-out
                  bg-gray-900/90 backdrop-blur-md border border-cyan-400/30
                  card-3d depth-shadow hover:depth-shadow-intense">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 geometric-pattern opacity-5 rounded-lg"></div>
                  
                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full 
                        animate-pulse"></div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 
                        transition-colors duration-300 text-glow">
                        {category}
                      </h3>
                    </div>
                    
                    {/* Skills Grid */}
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="relative"
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {/* Skill Badge */}
                          <span
                            className={`
                              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                              cursor-default transform hover:scale-105 hover:-translate-y-1
                              ${hoveredSkill === skill 
                                ? 'bg-cyan-400 text-black neon-glow shadow-lg' 
                                : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400/50'
                              }
                            `}
                            style={{
                              transform: hoveredSkill === skill 
                                ? `translateZ(15px) scale(1.05)` 
                                : `translateZ(${skillIndex * 2}px)`,
                              transitionDelay: `${skillIndex * 30}ms`
                            }}
                          >
                            {skill}
                          </span>
                          
                          {/* Floating Tooltip */}
                          {hoveredSkill === skill && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                              bg-black/90 backdrop-blur-md rounded-lg px-3 py-1 border border-cyan-400/50
                              text-cyan-400 text-xs font-medium whitespace-nowrap z-50
                              animate-fade-in">
                              Expert Level
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400/50"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-6 flex items-center gap-2">
                      <span className="text-gray-400 text-xs">Proficiency:</span>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full
                          transition-all duration-1000 ease-out group-hover:w-full"
                          style={{ width: `${85 + Math.random() * 15}%` }}></div>
                      </div>
                      <span className="text-cyan-400 text-xs font-medium">Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Projects", value: "25+", color: "cyan" },
            { label: "Technologies", value: "20+", color: "blue" },
            { label: "Experience", value: "2+ Years", color: "pink" },
            { label: "Certifications", value: "5+", color: "green" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center layer-4"
              style={{ transform: `translateZ(${index * 5}px)` }}>
              <div className="bg-gray-900/50 backdrop-blur-md rounded-lg p-6 border border-cyan-400/20
                hover:border-cyan-400/50 transition-all duration-300 card-3d">
                <div className={`text-3xl font-bold mb-2 text-${stat.color}-400 text-glow`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full float-3d opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}