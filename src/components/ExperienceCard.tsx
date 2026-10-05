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
    <div className={`group overflow-hidden rounded-2xl border transition-all duration-300 bg-surface border-border shadow-md hover:shadow-xl hover:border-accent-blue`}>
      {/* Header */}
      <div className={`p-6 border-b border-border`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-lg font-semibold transition-colors text-foreground group-hover:text-accent-blue`}>
              {title}
            </h3>
            <p className={`font-medium mt-1 text-accent-blue`}>{company}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full border whitespace-nowrap bg-background-secondary text-text-secondary border-border`}>
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
          <div className={`absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none from-surface`}></div>
        </div>
      )}

      <div className="p-6">
        {/* Accomplishments */}
        <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 text-text-secondary`}>
          Key Accomplishments
        </h4>
        <ul className="space-y-3 mb-6">
          {description.map((item, index) => (
            <li key={index} className={`flex items-start text-sm text-text-secondary`}>
              <span className={`mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent-blue`}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className={`pt-4 border-t border-border`}>
          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 text-text-secondary`}>
            Technologies & Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border bg-surface-hover text-accent-blue border-accent-blue/30`}
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
