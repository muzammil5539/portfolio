"use client";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";
import { categories, type Project, type ProjectCategory } from "@/data/projects";

const chip = (active: boolean) =>
  `inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
    active ? "border-foreground bg-foreground text-background" : "border-border text-text-secondary hover:border-foreground hover:text-foreground"
  }`;

/** Bento grid: featured (lg) tiles are big, medium tiles wide, small tiles compact. Optional category filter. */
export default function ProjectGrid({ projects, filterable = false }: { projects: Project[]; filterable?: boolean }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const counts = useMemo(() => {
    const map = new Map<ProjectCategory, number>();
    projects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, [projects]);
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {filterable && (
        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          <button type="button" onClick={() => setActive("all")} aria-pressed={active === "all"} className={chip(active === "all")}>
            All <span className="font-mono text-xs opacity-70">{projects.length}</span>
          </button>
          {(Object.keys(categories) as ProjectCategory[])
            .filter((key) => counts.has(key))
            .map((key) => (
              <button key={key} type="button" onClick={() => setActive(key)} aria-pressed={active === key} className={chip(active === key)}>
                <span className={`h-2 w-2 rounded-full ${categories[key].dot}`} aria-hidden="true" />
                {categories[key].label} <span className="font-mono text-xs opacity-70">{counts.get(key)}</span>
              </button>
            ))}
        </div>
      )}
      <Reveal as="ul" key={active} className="grid grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Reveal>
    </>
  );
}
