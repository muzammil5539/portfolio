import { getBlogPost, getBlogPosts } from "@/lib/mdx";
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
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-12 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          
          <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-img:rounded-xl">
            <header className="mb-12 not-prose">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-slate-400 text-sm gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <time>{post.date}</time>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs font-medium text-cyan-300">
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
