import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogList from "@/components/blog/BlogList";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Notes on LLMs, agents and how to evaluate them: deep dives into AI, machine learning and software engineering.",
  path: "/blog",
});

export default function BlogIndex() {
  const blogs = getBlogPosts();

  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen max-w-6xl px-6 pb-20 pt-32">
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </>
  );
}
