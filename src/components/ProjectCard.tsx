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
      className={`rounded-lg shadow-lg transition-all duration-500 ease-in-out w-full max-w-full
        ${
          isDarkMode
            ? "bg-gray-800 shadow-gray-900/30"
            : "bg-white shadow-gray-200/50"
        }`}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3
          className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed`}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech, index) => (
            <span
              key={index}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode
                  ? "bg-blue-900/30 text-blue-300"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
