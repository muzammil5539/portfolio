"use client";
import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "framer-motion";
import CategoryBadge from "./CategoryBadge";
import Magnetic from "@/components/ui/Magnetic";
import { RevealItem } from "@/components/ui/Reveal";
import { type Project } from "@/data/projects";

const spring = { type: "spring", stiffness: 320, damping: 24 } as const;

const lift: Variants = {
  rest: { y: 0, scale: 1, transition: spring },
  hover: { y: -6, scale: 1.025, transition: spring },
};
const bloom: Variants = { rest: { opacity: 0 }, hover: { opacity: 1, transition: spring } };
const cta: Variants = {
  rest: { opacity: 0, x: -8, transition: spring },
  hover: { opacity: 1, x: 0, transition: spring },
};

const span: Record<Project["size"], string> = {
  lg: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  md: "sm:col-span-2 lg:col-span-2",
  sm: "lg:col-span-1",
};

export default function ProjectCard({ project }: { project: Project }) {
  const { size } = project;

  return (
    <RevealItem as="li" className={`relative ${span[size]}`}>
      <Magnetic strength={0.05} className="block h-full">
        <m.article initial="rest" whileHover="hover" whileFocus="hover" variants={lift} className="group relative h-full">
          <m.span aria-hidden="true" variants={bloom} className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-accent-primary/20 opacity-0 blur-2xl" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface">
            <m.span
              aria-hidden="true"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={spring}
              className="gradient-border-ring pointer-events-none absolute inset-0 z-20 rounded-[20px]"
            />
            {size !== "sm" && (
              <div className={`relative overflow-hidden ${size === "lg" ? "aspect-[8/5]" : "aspect-[16/7]"}`}>
                <Image
                  src={project.workflow}
                  alt={`${project.title} workflow diagram`}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className={`flex flex-1 flex-col gap-3 ${size === "sm" ? "p-5" : "p-6"}`}>
              <CategoryBadge category={project.category} />
              <h3 className={`font-display font-semibold leading-tight text-foreground ${size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-lg"}`}>
                <Link href={`/projects/${project.id}`} data-cursor="View" className="after:absolute after:inset-0 after:z-30 after:content-['']">
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
              <m.span variants={cta} aria-hidden="true" className="mt-auto pt-2 text-sm font-medium text-accent-text [@media(hover:none)]:!opacity-100">
                Open case study →
              </m.span>
            </div>
          </div>
        </m.article>
      </Magnetic>
    </RevealItem>
  );
}
