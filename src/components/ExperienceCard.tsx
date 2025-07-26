"use client";
import { useState, useEffect } from "react";

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  technologies: string[];
  video?: string;
}

export default function ExperienceCard({
  title,
  company,
  date,
  description,
  technologies,
  video,
}: ExperienceCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white border-2 border-gray-300 shadow-sm">
      {/* Academic Header */}
      <div className="bg-gray-100 border-b border-gray-300 p-4">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-blue-900 font-semibold mt-1">{company}</p>
        <p className="text-gray-600 text-sm font-medium">{date}</p>
      </div>

      {video && isClient && (
        <div className="relative">
          <video
            className="w-full h-48 object-cover"
            controls
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="p-5">
        {/* Research Accomplishments */}
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Key Accomplishments:
        </h4>
        <ul className="space-y-2 mb-4">
          {description.map((item, index) => (
            <li key={index} className="flex items-start text-gray-700 text-sm">
              <span className="mr-2 mt-1.5 text-blue-900">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Used */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Technologies & Methods:
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
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
