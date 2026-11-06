import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import WorkflowDiagram from "./WorkflowDiagram";
import { RevealItem } from "@/components/ui/Reveal";
import { type Project } from "@/data/projects";

const span: Record<Project["size"], string> = {
  lg: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  md: "sm:col-span-2 lg:col-span-2",
  sm: "lg:col-span-1",
};

/**
 * The whole card is one link (the title's ::after covers it), so it uses the native pointer.
 * Hover is a short CSS lift and a border highlight; the lift is skipped for reduced motion.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { size } = project;

  return (
    <RevealItem as="li" className={`relative ${span[size]}`}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface transition-[transform,border-color,box-shadow] duration-200 hover:border-accent-primary/60 hover:shadow-[0_14px_32px_-14px_var(--shadow-strong)] focus-within:border-accent-primary/60 motion-safe:hover:-translate-y-1">
        {size !== "sm" && (
          <div className={`relative overflow-hidden ${size === "lg" ? "aspect-[8/5]" : "aspect-[16/7]"}`}>
            <WorkflowDiagram id={project.id} title={project.title} className="h-full w-full" />
          </div>
        )}
        <div className={`flex flex-1 flex-col gap-3 ${size === "sm" ? "p-5" : "p-6"}`}>
          <CategoryBadge category={project.category} />
          <h3 className={`font-display font-semibold leading-tight text-foreground ${size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-lg"}`}>
            <Link href={`/projects/${project.id}`} className="after:absolute after:inset-0 after:z-10 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <p className="font-mono text-[13px] text-accent-text">{project.outcome}</p>
          {size === "lg" && <p className="line-clamp-3 text-[15px] text-text-secondary">{project.description}</p>}
          {size !== "sm" && (
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, size === "lg" ? 5 : 3).map((tag) => (
                <li key={tag} className="rounded-full bg-surface-hover px-2.5 py-0.5 font-mono text-xs text-text-secondary">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span aria-hidden="true" className="mt-auto pt-2 text-sm font-medium text-accent-text group-hover:underline">
            Open case study →
          </span>
        </div>
      </article>
    </RevealItem>
  );
}
