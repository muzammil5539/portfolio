import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
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

        <BlogList posts={blogs} />
      </main>
      <Footer />
    </>
  );
}
