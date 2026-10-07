import { extractHeadings, getBlogPost, getBlogPosts } from "@/lib/mdx";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import JsonLd from "@/components/ui/JsonLd";
import { blogPostingSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { mdxOptions } from "@/lib/mdx-plugins";
import { formatBlogDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "katex/dist/katex.min.css";
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    ...pageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    }),
    ...(post.cover ? { openGraph: { images: [post.cover] } } : {}),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index >= 0 ? posts[index + 1] : undefined;

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/blog"
            className="group mb-10 inline-flex min-h-11 items-center font-medium text-text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All posts
          </Link>

          <header className="mb-12 max-w-3xl">
            <h1 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mb-6 text-xl leading-relaxed text-text-secondary">{post.excerpt}</p>}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <div className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" />
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-hover px-3 py-1 font-mono text-xs text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-12 border-t border-foreground pt-10 lg:flex-row lg:items-start lg:gap-16">
            <aside className="lg:w-64 lg:shrink-0 order-first">
              <TableOfContents headings={headings} />
            </aside>

            <article className="prose prose-lg dark:prose-invert min-w-0 max-w-3xl flex-1 prose-headings:text-foreground prose-p:text-text-secondary prose-strong:text-foreground prose-li:text-text-secondary prose-a:text-accent-blue hover:prose-a:opacity-80 prose-img:rounded-xl prose-blockquote:border-accent-blue prose-blockquote:text-text-secondary prose-code:text-accent-blue prose-pre:bg-surface prose-hr:border-border">
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={{ mdxOptions }}
              />
            </article>
          </div>

          {(newer || older) && (
            <nav aria-label="More posts" className="mt-20 grid gap-6 border-t border-foreground pt-8 sm:grid-cols-2">
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="group flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted">Newer</span>
                  <span className="text-xl font-semibold leading-snug text-foreground group-hover:text-accent-blue">{newer.title}</span>
                </Link>
              ) : <span />}
              {older && (
                <Link href={`/blog/${older.slug}`} className="group flex flex-col gap-1 sm:text-right">
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted">Older</span>
                  <span className="text-xl font-semibold leading-snug text-foreground group-hover:text-accent-blue">{older.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </main>
      <Footer />
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
