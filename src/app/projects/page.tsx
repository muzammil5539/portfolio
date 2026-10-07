import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectGrid from "@/components/projects/ProjectGrid";
import JsonLd from "@/components/ui/JsonLd";
import { projects } from "@/data/projects";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Case studies in machine learning, GenAI agents, computer vision and backend systems by Muzammil Nawaz Khan.",
  path: "/projects",
});

export default function ProjectsIndex() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-text-muted">
            <ol className="flex gap-2">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Projects</li>
            </ol>
          </nav>
          <h1 className="mb-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {projects.length} projects, each with a case study.
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-text-secondary">
            Filter by category. Colours follow the active theme, and every card names its category in text.
          </p>
          <ProjectGrid projects={projects} filterable />
        </div>
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
    </>
  );
}
