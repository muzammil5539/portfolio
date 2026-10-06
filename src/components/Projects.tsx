"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectDetail from "./ProjectDetail";
import SectionHeader from "./SectionHeader";
import { projects, type Project } from "@/data/projects";

const featuredIds = ["verifiable-agent-kernel", "claims-classification", "rag-custom-engine"];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = featuredIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => Boolean(p));
  const rest = projects.filter((p) => !featuredIds.includes(p.id));

  return (
    <section id="projects" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Projects with real constraints"
          intro="From production healthcare systems to from-scratch RAG. Open any project for its workflow."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className={`group flex min-w-0 flex-col overflow-hidden rounded-[20px] border text-left transition-transform hover:-translate-y-1 ${
                i === 2 ? "border-transparent bg-panel text-panel-fg" : "border-border bg-surface text-foreground"
              }`}
            >
              <Image src={project.workflow} alt="" width={800} height={500} className="aspect-[8/5] w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={`rounded-full px-2.5 py-0.5 ${i === 2 ? "bg-panel-chip" : "bg-surface-hover"}`}>{tag}</span>
                  ))}
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight">{project.title}</h3>
                <p className={`line-clamp-4 text-[15px] ${i === 2 ? "text-panel-fg/80" : "text-text-secondary"}`}>{project.description}</p>
                <span className={`mt-auto font-medium ${i === 2 ? "text-ai-cyan" : "text-accent-blue"}`}>View workflow →</span>
              </div>
            </button>
          ))}
        </div>

        <ul className="mt-6 border-t border-border">
          {rest.map((project) => (
            <li key={project.id} className="border-b border-border">
              <button
                onClick={() => setSelected(project)}
                className="flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1 py-[18px] text-left transition-colors hover:bg-surface-hover"
              >
                <span className="font-semibold text-foreground">{project.title}</span>
                <span className="text-sm text-text-muted">{project.tags.slice(0, 4).join(" · ")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
