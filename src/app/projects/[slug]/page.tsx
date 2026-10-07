import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryBadge from "@/components/projects/CategoryBadge";
import ProjectGallery from "@/components/projects/ProjectGallery";
import JsonLd from "@/components/ui/JsonLd";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: `${project.title} — case study`,
    description: `${project.outcome}. ${project.description}`.slice(0, 300),
    path: `/projects/${project.id}`,
  });
}

const h2 = "mb-4 font-display text-2xl font-semibold tracking-tight text-foreground";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { previous, next } = getAdjacentProjects(project.id);

  const schema = {
    "@context": "https://schema.org",
    "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.id}`),
    author: { "@id": absoluteUrl("/#person") },
    keywords: project.tags.join(", "),
    ...(project.github ? { codeRepository: project.github } : {}),
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background px-6 pb-24 pt-32">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-text-muted">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/projects" className="hover:text-foreground">Projects</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <header className="mb-12 flex flex-col gap-5">
            <CategoryBadge category={project.category} />
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">{project.title}</h1>
            <p className="font-mono text-lg text-accent-text">{project.outcome}</p>
            <p className="max-w-3xl text-lg text-text-secondary">{project.description}</p>
            {(project.github || project.live) && (
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-primary px-5 text-sm font-semibold text-on-accent">
                    <Github size={16} aria-hidden="true" /> Code
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground px-5 text-sm font-semibold text-foreground hover:bg-surface-hover">
                    <ExternalLink size={16} aria-hidden="true" /> Live demo
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="grid gap-12">
            <section aria-labelledby="problem">
              <h2 id="problem" className={h2}>Problem</h2>
              <p className="max-w-3xl text-text-secondary">{project.problem}</p>
            </section>

            <section aria-labelledby="approach">
              <h2 id="approach" className={h2}>Approach</h2>
              <ol className="flex max-w-3xl list-decimal flex-col gap-2 pl-5 text-text-secondary marker:text-accent-text">
                {project.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <figure>
              <Image src={project.workflow} alt={`${project.title} workflow: ${project.approach.length} stages from input to result`} width={800} height={500} className="h-auto w-full rounded-2xl border border-border" priority />
              <figcaption className="mt-2 font-mono text-xs text-text-muted">Workflow</figcaption>
            </figure>

            {project.images && project.images.length > 0 && (
              <section aria-labelledby="screens">
                <h2 id="screens" className={h2}>Screens</h2>
                <ProjectGallery images={project.images} alt={project.title} />
              </section>
            )}

            {project.video && (
              <section aria-labelledby="demo">
                <h2 id="demo" className={h2}>Demo</h2>
                <video className="w-full rounded-2xl border border-border" controls muted playsInline preload="metadata" aria-label={`${project.title} demo video`}>
                  <source src={project.video} type="video/mp4" />
                </video>
              </section>
            )}

            <section aria-labelledby="results">
              <h2 id="results" className={h2}>Results</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.results.map((result) => (
                  <li key={result} className="rounded-2xl border border-border bg-surface p-5 text-foreground">
                    {result}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="stack">
              <h2 id="stack" className={h2}>Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="rounded-full bg-surface-hover px-3.5 py-1.5 font-mono text-sm text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <nav aria-label="More projects" className="mt-20 grid gap-6 border-t border-foreground pt-8 sm:grid-cols-2">
            {previous ? (
              <Link href={`/projects/${previous.id}`} className="group flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted"><ArrowLeft size={12} className="mr-1 inline" aria-hidden="true" />Previous</span>
                <span className="font-display text-xl font-semibold text-foreground group-hover:text-accent-text">{previous.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/projects/${next.id}`} className="group flex flex-col gap-1 sm:text-right">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted">Next →</span>
                <span className="font-display text-xl font-semibold text-foreground group-hover:text-accent-text">{next.title}</span>
              </Link>
            )}
          </nav>
          <p className="mt-10 text-sm text-text-muted">By {site.name}, {site.role}.</p>
        </article>
      </main>
      <Footer />
      <JsonLd
        data={[
          schema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        ]}
      />
    </>
  );
}
