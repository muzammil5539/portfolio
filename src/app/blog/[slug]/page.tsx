import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const post = await import(`@/content/posts/${slug}.mdx`)
    const { default: Content, metadata } = post

    return (
      <article className="container py-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-accent-cyan hover:text-accent-blue transition-colors mb-8 text-sm font-medium">
            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          <header className="mb-12 border-b border-border/50 pb-8">
            <div className="flex gap-2 mb-6">
              {metadata.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-surface-elevated text-accent-cyan text-xs font-mono font-medium border border-border/50">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary leading-tight">
              {metadata.title}
            </h1>

            <div className="flex items-center text-text-muted">
              <time dateTime={metadata.publishDate}>
                {new Date(metadata.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="mx-3">•</span>
              <span>By AI Engineer</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-bold
            prose-a:text-accent-cyan hover:prose-a:text-accent-blue
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-code:text-accent-cyan prose-code:bg-surface-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface-elevated prose-pre:border prose-pre:border-border/50
            prose-blockquote:border-l-accent-cyan prose-blockquote:bg-surface-elevated/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
            text-text-secondary leading-relaxed">
            <Content />
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
