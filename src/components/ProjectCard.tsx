"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

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

  const imageUrl = image.toLowerCase().endsWith(".tif")
    ? "/project-images/default-project.jpg"
    : image;

  return (
    <div
      className={`group rounded-xl shadow-lg transition-all duration-500 ease-in-out w-full max-w-full cursor-pointer card-3d overflow-hidden
        ${
          isDarkMode
            ? "bg-gray-800/80 hover:bg-gray-800/90 shadow-gray-900/30"
            : "bg-white/80 hover:bg-white/90 shadow-gray-200/50"
        } backdrop-blur-sm border border-white/10`}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating Action Button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className={`p-2 rounded-full backdrop-blur-md ${
            isDarkMode 
              ? 'bg-white/20 text-white border border-white/30' 
              : 'bg-black/20 text-white border border-black/30'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-4 sm:p-6">
        {/* Title */}
        <h3
          className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
            isDarkMode 
              ? "text-white group-hover:text-blue-300" 
              : "text-gray-800 group-hover:text-blue-600"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm mb-3 sm:mb-4 leading-relaxed transition-colors duration-300 ${
            isDarkMode 
              ? "text-gray-300 group-hover:text-gray-200" 
              : "text-gray-600 group-hover:text-gray-700"
          }`}
        >
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech, index) => (
            <span
              key={index}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 transform group-hover:scale-105 ${
                isDarkMode
                  ? "bg-blue-900/40 text-blue-300 border border-blue-700/50 group-hover:bg-blue-800/60 group-hover:border-blue-600/70"
                  : "bg-blue-50 text-blue-600 border border-blue-200/50 group-hover:bg-blue-100 group-hover:border-blue-300/70"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
}
