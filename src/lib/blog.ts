import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'src/content/posts')

export interface PostMetadata {
  title: string
  publishDate: string
  description: string
  tags: string[]
}

export interface Post {
  slug: string
  metadata: PostMetadata
}

function extractMetadata(source: string): PostMetadata | null {
  // Simple regex to extract the exported metadata object
  const match = source.match(/export const metadata = ({[\s\S]*?});/)
  if (!match) return null

  try {
    // Note: Using new Function is generally not recommended for untrusted input,
    // but since we author these MDX files, it's safe for extracting the static object.
    return new Function(`return ${match[1]}`)() as PostMetadata
  } catch (err) {
    console.error('Failed to parse metadata:', err)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await fs.promises.readdir(postsDir)

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (filename) => {
          const filePath = path.join(postsDir, filename)
          const source = await fs.promises.readFile(filePath, 'utf8')
          const metadata = extractMetadata(source)

          return {
            slug: path.basename(filename, '.mdx'),
            metadata,
          }
        })
    )

    // Filter out posts without metadata and sort by date descending
    return (posts.filter((post) => post.metadata !== null) as Post[]).sort(
      (a, b) => new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime()
    )
  } catch (error) {
    console.error("Error reading posts directory:", error)
    return []
  }
}
