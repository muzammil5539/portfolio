"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/mdx";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">On this page</p>
      <ul className="flex flex-col border-l border-border text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-1.5 pr-2 transition-colors ${h.level === 3 ? "pl-8" : "pl-4"} ${
                active === h.id
                  ? "border-accent-text font-semibold text-foreground"
                  : "border-transparent text-text-muted hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
