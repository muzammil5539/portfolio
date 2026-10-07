import Link from "next/link";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

/** Home page shows the featured and medium tiles plus a couple of small ones; /projects has everything. */
const HOME_COUNT = 9;

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            id="projects-title"
            index="01"
            label="Selected work"
            title="Projects with real constraints"
            intro="Production healthcare systems, from-scratch RAG, agents and vision. Each one has a case study."
          />
          <Link href="/projects" data-cursor="View" className="mb-12 border-b border-foreground pb-0.5 font-medium text-foreground hover:text-accent-text md:mb-16">
            All {projects.length} projects →
          </Link>
        </div>
        <ProjectGrid projects={projects.slice(0, HOME_COUNT)} />
      </div>
    </section>
  );
}
