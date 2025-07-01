"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
}: ProjectCardProps) {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = image.toLowerCase().endsWith(".tif")
    ? "/project-images/default-project.jpg"
    : image;

  return (
    <div 
      className="perspective-container group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Floating Glow Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
          rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        {/* Main Card */}
        <div className={`
          relative rounded-lg overflow-hidden transition-all duration-500 ease-out
          bg-gray-900/90 backdrop-blur-md border border-cyan-400/30
          card-3d depth-shadow hover:depth-shadow-intense
          ${isHovered ? 'neon-glow' : ''}
        `}>
          
          {/* Image Container */}
          <div className="relative h-52 w-full overflow-hidden">
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-pink-500/20 
              opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
            
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              priority
            />
            
            {/* Scan Lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Tech Badge Overlay */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-full px-3 py-1 
              border border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500
              transform translate-y-2 group-hover:translate-y-0">
              <span className="text-cyan-400 text-xs font-medium">
                {technologies?.[0] || 'AI/ML'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 geometric-pattern opacity-5"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 
                transition-colors duration-300 text-glow">
                {title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {description}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                    bg-cyan-400/10 text-cyan-400 border border-cyan-400/30
                    hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:text-white
                    transform hover:scale-105 cursor-default"
                    style={{
                      transform: isHovered ? `translateZ(${index * 2}px)` : 'translateZ(0)',
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center">
                <button className="text-cyan-400 text-sm font-medium hover:text-white 
                  transition-colors duration-300 flex items-center gap-2 group/btn">
                  <span>View Details</span>
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Corner Elements */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/50 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/50 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
}