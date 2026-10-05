"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 bg-background-secondary`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid opacity-10`}></div>
      <div className={`absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl bg-accent-cyan/20`}></div>
      <div className={`absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl bg-accent-cyan/20`}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`h-px w-12 bg-gradient-to-r from-transparent to-accent-blue`}></div>
            <span className={`text-sm font-medium tracking-wider uppercase text-accent-blue`}>Portfolio</span>
            <div className={`h-px w-12 bg-gradient-to-l from-transparent to-accent-blue`}></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground`}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto text-text-secondary`}>
            Explore my portfolio of AI and machine learning projects, showcasing
            cutting-edge solutions in computer vision, deep learning, and data science.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
