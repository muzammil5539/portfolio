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
    <div className="group glass-card overflow-hidden hover:border-ai-cyan/30 transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-ai-slate/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ai-text group-hover:text-ai-cyan transition-colors">
              {title}
            </h3>
            <p className="text-ai-cyan font-medium mt-1">{company}</p>
          </div>
          <span className="px-3 py-1 bg-ai-navy text-ai-text-muted text-sm font-medium rounded-full border border-ai-slate/50 whitespace-nowrap">
            {date}
          </span>
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-t from-ai-charcoal to-transparent pointer-events-none"></div>
        </div>
      )}

      <div className="p-6">
        {/* Accomplishments */}
        <h4 className="text-sm font-semibold text-ai-text-muted uppercase tracking-wider mb-4">
          Key Accomplishments
        </h4>
        <ul className="space-y-3 mb-6">
          {description.map((item, index) => (
            <li key={index} className="flex items-start text-ai-text-muted text-sm">
              <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-ai-cyan rounded-full flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="pt-4 border-t border-ai-slate/50">
          <h4 className="text-xs font-semibold text-ai-text-muted uppercase tracking-wider mb-3">
            Technologies & Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-ai-navy/80 text-ai-cyan text-xs font-medium rounded-md border border-ai-cyan/20"
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
