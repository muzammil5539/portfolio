import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { formatBlogDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
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
    title: `${post.title} | AI & Engineering Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-ai-cyan hover:opacity-80 transition-opacity mb-12 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-text-secondary prose-strong:text-foreground prose-li:text-text-secondary prose-a:text-ai-cyan hover:prose-a:opacity-80 prose-img:rounded-xl prose-blockquote:border-ai-cyan prose-blockquote:text-text-secondary prose-code:text-ai-blue prose-pre:bg-surface prose-hr:border-border">
            <header className="mb-12 not-prose">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan to-ai-blue mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-text-muted text-sm gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-surface rounded-full border border-border text-xs font-medium text-ai-cyan">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <MDXRemote
              source={post.content}
              components={MDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex]
                }
              }}
            />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
