"use client";
import SectionHeader from "./SectionHeader";
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
        <SectionHeader index="01" label="Selected work" title="Projects with real constraints" intro="AI, ML and computer vision projects, from production healthcare systems to from-scratch RAG." />

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
