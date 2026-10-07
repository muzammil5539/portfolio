import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/mdx";
import { formatBlogDate } from "@/lib/utils";

export default function LatestPosts() {
  const posts = getBlogPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" aria-labelledby="writing-title" className="bg-surface-elevated py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader id="writing-title" index="04" label="Writing" title="Notes on LLMs and agents" />
          <Link href="/blog" data-cursor="View" className="mb-12 border-b border-foreground pb-0.5 font-medium text-foreground hover:text-accent-text md:mb-16">
            All posts →
          </Link>
        </div>
        <Reveal as="div" className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug} as="article">
              <Link href={`/blog/${post.slug}`} data-cursor="Read" className="group flex h-full flex-col gap-3 border-t-2 border-foreground pt-5">
                <time dateTime={post.date} className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
                  {formatBlogDate(post.date)} · {post.readTime}
                </time>
                <h3 className="font-display text-2xl font-semibold leading-snug text-foreground group-hover:text-accent-text">{post.title}</h3>
                <p className="text-text-secondary">{post.excerpt}</p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
