"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { isDarkMode } = useTheme();
  const { title, description, tags, image } = project;
  const imageUrl = image.toLowerCase().endsWith(".tif")
    ? "/project-images/default-project.jpg"
    : image;

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-cyan cursor-pointer ${
        isDarkMode
          ? "bg-ai-charcoal border border-ai-slate/50 hover:border-ai-cyan/30"
          : "bg-white border border-gray-200 hover:border-cyan-300 shadow-md hover:shadow-xl"
      }`}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-ai-cyan/5 to-ai-purple/5"
          : "bg-gradient-to-br from-cyan-50/50 to-purple-50/50"
      }`}></div>

      {/* Image Container */}
      <div className={`relative h-48 w-full overflow-hidden ${isDarkMode ? "bg-ai-navy" : "bg-gray-100"}`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Image overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
          isDarkMode ? "from-ai-charcoal" : "from-white"
        }`}></div>
      </div>

      {/* Content Container */}
      <div className="relative p-5">
        {/* Title */}
        <h3 className={`text-lg font-semibold mb-2 transition-colors ${
          isDarkMode
            ? "text-ai-text group-hover:text-ai-cyan"
            : "text-gray-900 group-hover:text-cyan-600"
        }`}>
          {title}
        </h3>

        {/* Description (kept concise, full text is in the detail view) */}
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
          isDarkMode ? "text-ai-text-muted" : "text-gray-600"
        }`}>
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {tags?.slice(0, 4).map((tech, index) => (
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
          {tags && tags.length > 4 && (
            <span className={`px-2.5 py-1 text-xs font-medium ${isDarkMode ? "text-ai-text-muted" : "text-gray-500"}`}>
              +{tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ai-cyan via-ai-blue to-ai-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}
