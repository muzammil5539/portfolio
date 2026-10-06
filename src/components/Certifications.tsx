import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { certificates } from "@/data/certificates";
import { education, honors } from "@/data/education";

export default function Certifications() {
  return (
    <section id="certifications" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="05" label="Education & credentials" title="Education, honors and certifications" />
        <div className="flex flex-wrap gap-x-16 gap-y-12">
          <div className="min-w-0 flex-[1_1_320px]">
            <h3 className="font-display text-2xl font-semibold text-foreground">{education.degree}</h3>
            <p className="mt-1 text-text-secondary">{education.school}</p>
            <p className="mt-1 font-mono text-[13px] text-text-muted">
              {education.period} · CGPA {education.cgpa} · {education.location}
            </p>
            <p className="mt-4 text-text-secondary">{education.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {honors.map((honor) => (
                <li key={honor} className="rounded-full bg-ai-cyan px-3.5 py-1 text-sm font-medium text-on-accent">
                  {honor}
                </li>
              ))}
            </ul>
          </div>

          <ul className="min-w-0 flex-[2_1_480px] border-t border-foreground">
            {certificates.map((cert) => (
              <li key={cert.id} className="border-b border-border">
                <a
                  href={encodeURI(cert.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-surface-hover"
                >
                  <span className="min-w-0">
                    <span className="font-medium text-foreground">{cert.title}</span>
                    <span className="block text-sm text-text-muted">{cert.issuer}</span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-label="Open certificate PDF" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
