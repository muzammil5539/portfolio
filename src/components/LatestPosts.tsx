import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getBlogPosts } from "@/lib/mdx";
import { formatBlogDate } from "@/lib/utils";

export default function LatestPosts() {
  const posts = getBlogPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="bg-background-secondary py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader index="04" label="Writing" title="Notes on LLMs and agents" />
          <Link href="/blog" className="mb-12 border-b border-foreground pb-0.5 font-medium text-foreground hover:text-accent-blue md:mb-16">
            All posts →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-3 border-t-2 border-foreground pt-5">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
                {formatBlogDate(post.date)} · {post.readTime}
              </span>
              <h3 className="text-2xl font-semibold leading-snug text-foreground group-hover:text-accent-blue">{post.title}</h3>
              <p className="text-text-secondary">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
