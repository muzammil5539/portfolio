"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatBlogDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

interface BlogListProps {
  posts: Omit<BlogPost, "content">[];
}

const chip = (active: boolean) =>
  `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border text-text-secondary hover:border-foreground hover:text-foreground"
  }`;

export default function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Supports the WebSite SearchAction: /blog?q=term pre-fills the search box.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  // Only tags shared by 2+ posts make useful filters; the rest stay searchable.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.flatMap((p) => p.tags).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
    return [...counts].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!activeTag || p.tags.includes(activeTag)) &&
        (!q || `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q)),
    );
  }, [posts, activeTag, query]);

  const [featured, ...rest] = filtered;
  const showFeatured = featured && !activeTag && !query.trim();
  const list = showFeatured ? rest : filtered;

  return (
    <>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
          <button onClick={() => setActiveTag(null)} className={chip(activeTag === null)} aria-pressed={activeTag === null}>
            All
          </button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)} className={chip(activeTag === tag)} aria-pressed={activeTag === tag}>
              {tag}
            </button>
          ))}
        </div>
        <label className="flex min-h-11 w-full items-center gap-3 rounded-full border border-border bg-surface px-4 sm:w-72">
          <span className="text-sm text-text-muted">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="titles and tags"
            className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-text-muted"
          />
        </label>
      </div>

      {showFeatured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-12 grid gap-8 rounded-3xl bg-ai-navy-light p-8 md:grid-cols-[1.6fr_1fr] md:p-10"
        >
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent-text">
              Latest · {formatBlogDate(featured.date)} · {featured.readTime}
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{featured.title}</h2>
            <p className="text-text-secondary">{featured.excerpt}</p>
          </div>
          <div className="flex flex-wrap content-end items-end gap-2 font-mono text-xs">
            {featured.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-surface-hover px-3 py-1 text-text-secondary">{tag}</span>
            ))}
          </div>
        </Link>
      )}

      <div className="flex flex-col">
        {list.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group grid gap-3 border-t border-border py-8 last:border-b md:grid-cols-[10rem_1fr_auto] md:gap-10"
          >
            <div className="font-mono text-sm text-text-muted">
              {formatBlogDate(blog.date)}
              <br />
              {blog.readTime}
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-text">{blog.title}</h3>
              <p className="mb-3 text-text-secondary">{blog.excerpt}</p>
              <span className="font-mono text-xs text-text-muted">{blog.tags.join(" · ")}</span>
            </div>
            <ArrowUpRight className="hidden h-5 w-5 text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" aria-hidden="true" />
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-text-muted">No posts match your search.</p>}
      </div>
    </>
  );
}
