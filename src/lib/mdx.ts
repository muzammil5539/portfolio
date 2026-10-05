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

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** h2/h3 headings of an MDX body, skipping fenced code blocks. */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const text = m[2]!.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '');
      headings.push({ id: slugify(text), text, level: m[1]!.length as 2 | 3 });
    }
  }
  return headings;
}

/** Normalises mixed frontmatter (excerpt/description, free-form dates) into one schema. */
export function normalizeFrontmatter(
  data: Record<string, unknown>,
  content: string,
): Omit<BlogPost, 'slug' | 'content'> {
  const parsed = new Date(String(data.date ?? ''));
  const date = Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
  const tags = Array.isArray(data.tags) ? data.tags.map((t) => String(t).toLowerCase()) : [];
  return {
    title: String(data.title ?? ''),
    excerpt: String(data.description ?? data.excerpt ?? ''),
    date,
    readTime: estimateReadTime(content), // always derived: a hand-written readTime drifts
    tags,
  };
}

/** Drops a leading `# Title` line: the post page renders the frontmatter title itself. */
export function stripLeadingTitle(content: string): string {
  return content.replace(/^\s*#\s+.+\n/, '');
}

function readPost(slug: string): BlogPost | null {
  try {
    let fullPath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) fullPath = path.join(contentDirectory, `${slug}.md`);
    const parsed = matter(fs.readFileSync(fullPath, 'utf8'));
    const { data } = parsed;
    const content = stripLeadingTitle(parsed.content); // the page header already renders the title
    return { slug, ...normalizeFrontmatter(data, content), content };
  } catch {
    return null;
  }
}

export function getBlogPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => readPost(f.replace(/\.mdx?$/, '')))
    .filter((p): p is BlogPost => p !== null)
    .map(({ content: _content, ...meta }) => meta) // eslint-disable-line @typescript-eslint/no-unused-vars
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string): BlogPost | null {
  return readPost(slug);
}
