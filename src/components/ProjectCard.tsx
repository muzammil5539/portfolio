"use client";
import Image from "next/image";

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
  const imageUrl = image.toLowerCase().endsWith(".tif")
    ? "/project-images/default-project.jpg"
    : image;

  return (
    <div className="group relative bg-ai-charcoal border border-ai-slate/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-ai-cyan/30 hover:shadow-glow-cyan">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-ai-cyan/5 to-ai-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ai-charcoal via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-ai-text mb-2 group-hover:text-ai-cyan transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-ai-text-muted text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-ai-navy/80 text-ai-cyan text-xs font-medium rounded-md border border-ai-cyan/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ai-cyan via-ai-blue to-ai-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}
