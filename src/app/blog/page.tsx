import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
  title: 'Blog | AI & Engineering',
  description: 'Thoughts, tutorials, and deep dives into Artificial Intelligence, Machine Learning, and modern software engineering.',
};

export default function BlogIndex() {
  const blogs = getBlogPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">Writing — {blogs.length} posts</p>
          <h1 className="mb-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Notes on LLMs, agents and how to evaluate them.
          </h1>
          <p className="max-w-2xl text-lg text-text-secondary">
            Long-form analysis from the systems I build. <a href="/feed.xml" className="underline underline-offset-4 hover:text-foreground">RSS feed</a>
          </p>
        </div>

        <BlogList posts={blogs} />
      </main>
      <Footer />
    </>
  );
}
