import { notFound } from "next/navigation";
import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { categories, getProject, projects } from "@/data/projects";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return ogImage({ eyebrow: `Case study · ${categories[project.category].label}`, title: project.title, subtitle: project.outcome });
}
