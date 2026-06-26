import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: 'Blog | AI & Engineering',
  description: 'Thoughts, tutorials, and deep dives into Artificial Intelligence, Machine Learning, and modern software engineering.',
};

export default function BlogIndex() {
  const blogs = getBlogPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan to-ai-blue">
            AI & Engineering Blog
          </h1>
          <p className="text-lg text-ai-text-muted max-w-2xl">
            Thoughts, tutorials, and deep dives into Artificial Intelligence, Machine Learning, and modern software engineering.
          </p>
        </div>

        <div className="grid gap-8">
          {blogs.map((blog, index) => (
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
                        <span>{blog.date}</span>
                        <span className="w-1 h-1 rounded-full bg-ai-cyan/50" />
                        <span>{blog.readTime}</span>
                        <span className="w-1 h-1 rounded-full bg-ai-cyan/50" />
                        <div className="flex gap-2 flex-wrap">
                          {blog.tags.map(tag => (
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
        </div>
      </main>
      <Footer />
    </>
  );
}
