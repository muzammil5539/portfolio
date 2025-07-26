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
    <div className="bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Academic Header */}
      <div className="bg-gray-100 border-b border-gray-300 p-4">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
      </div>

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-102 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
          {description}
        </p>

        {/* Technology Tags - Academic Style */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium border border-gray-300 uppercase tracking-wide"
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
