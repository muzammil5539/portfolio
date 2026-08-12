"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { formatBlogDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/mdx";

interface BlogListProps {
  posts: Omit<BlogPost, "content">[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTag === null
                ? "border-ai-cyan bg-ai-cyan/10 text-ai-cyan"
                : "border-ai-charcoal text-ai-text-muted hover:border-ai-cyan/50 hover:text-ai-text"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTag === tag
                  ? "border-ai-cyan bg-ai-cyan/10 text-ai-cyan"
                  : "border-ai-charcoal text-ai-text-muted hover:border-ai-cyan/50 hover:text-ai-text"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8">
        {filteredPosts.map((blog, index) => (
          <div
            key={blog.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/blog/${blog.slug}`}>
              <div className="group relative bg-ai-charcoal/30 border border-ai-charcoal rounded-2xl p-8 hover:bg-ai-charcoal/50 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ai-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-ai-text-muted">
                      <span>{formatBlogDate(blog.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-ai-cyan/50" />
                      <span>{blog.readTime}</span>
                      <span className="w-1 h-1 rounded-full bg-ai-cyan/50" />
                      <div className="flex gap-2 flex-wrap">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-md bg-ai-navy text-ai-cyan text-xs font-medium border border-ai-cyan/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-ai-text group-hover:text-ai-cyan transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-ai-text-muted leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center text-ai-cyan group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium mr-2 whitespace-nowrap">Read Article</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-ai-text-muted">No posts tagged &ldquo;{activeTag}&rdquo; yet.</p>
        )}
      </div>
    </>
  );
}
