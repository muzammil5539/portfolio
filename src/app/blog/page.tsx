import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <div className="container py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-blue">
            Engineering Blog
          </h1>
          <p className="text-text-secondary text-lg">
            Deep dives into AI architecture, Rust performance, and Python systems.
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group block p-6 sm:p-8 rounded-2xl border border-border/50 bg-surface-elevated/30 hover:bg-surface-elevated transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-glow-cyan-intense relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4 text-sm text-text-muted">
                    <time dateTime={post.metadata.publishDate}>
                      {new Date(post.metadata.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <div className="flex gap-2">
                      {post.metadata.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-surface-hover text-accent-cyan text-xs font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-cyan transition-colors">
                    {post.metadata.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    {post.metadata.description}
                  </p>

                  <div className="mt-6 flex items-center text-accent-cyan text-sm font-medium">
                    Read Article
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 text-text-muted">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
