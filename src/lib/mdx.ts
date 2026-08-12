import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

const WORDS_PER_MINUTE = 200;

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function getBlogPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const fileNames = fs.readdirSync(contentDirectory);

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt || matterResult.data.description || '',
        date: matterResult.data.date,
        readTime: matterResult.data.readTime || estimateReadTime(matterResult.content),
        tags: matterResult.data.tags || [],
      };
    });

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    let fullPath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(contentDirectory, `${slug}.md`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt || matterResult.data.description || '',
      date: matterResult.data.date,
      readTime: matterResult.data.readTime || estimateReadTime(matterResult.content),
      tags: matterResult.data.tags || [],
      content: matterResult.content,
    };
  } catch {
    return null;
  }
}
