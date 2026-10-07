"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { heroMetrics, site, stackStrip } from "@/data/site";

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Decorative glows drift a few pixels against the scroll; capped well under 20px.
  const driftA = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -16]);
  const driftB = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 12]);

  return (
    <section id="about" aria-labelledby="hero-title" className="relative overflow-hidden bg-background pt-28 md:pt-36">
      <motion.div aria-hidden="true" style={{ y: driftA }} className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent-primary/15 blur-3xl" />
      <motion.div aria-hidden="true" style={{ y: driftB }} className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 rounded-full bg-accent-secondary/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-stretch gap-12 px-6 pb-20">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col justify-center gap-7">
          <p className="flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-primary ring-2 ring-accent-primary/30" aria-hidden="true" />
            {site.location.city} · {site.availability}
          </p>
          <h1 id="hero-title" className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.5rem]">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
            I&apos;m Muzammil, an AI engineer with 1+ year in production ML, LLM and RAG. I classify healthcare claims at 95% accuracy, build voice
            agents, and segment 3D MRI scans.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link href="#projects" className="inline-flex min-h-12 items-center rounded-full bg-accent-primary px-6 font-semibold text-on-accent shadow-[0_8px_30px_-8px_var(--accent-primary)] transition-shadow hover:shadow-[0_12px_40px_-6px_var(--accent-primary)]">
                See selected work
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#contact" className="inline-flex min-h-12 items-center rounded-full border border-foreground px-6 font-medium text-foreground transition-colors hover:bg-surface-hover">
                Start a conversation
              </Link>
            </Magnetic>
          </div>
        </div>

        <aside aria-label="Production snapshot" className="flex min-w-0 flex-[1_1_360px] flex-col justify-between gap-7 rounded-3xl bg-panel p-8 text-panel-fg sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-panel-muted">
            <span className="flex items-center gap-3 whitespace-nowrap">
              <Image src={site.photo} alt={`Portrait of ${site.name}`} width={40} height={40} priority className="h-10 w-10 rounded-full object-cover" />
              Production snapshot
            </span>
            <span className="whitespace-nowrap text-accent-on-panel">CareCloud</span>
          </div>
          {heroMetrics.map((item) => (
            <div key={item.value} className="flex flex-col gap-1.5 border-t border-panel-line pt-5">
              <div className="font-display text-5xl font-semibold leading-none text-accent-on-panel">{item.value}</div>
              <div className="text-panel-muted">{item.label}</div>
            </div>
          ))}
        </aside>
      </div>

      <div className="relative border-y border-border bg-surface-elevated">
        <ul aria-label="Core stack" className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 px-6 py-4 font-mono text-[13px] text-text-secondary">
          {stackStrip.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
