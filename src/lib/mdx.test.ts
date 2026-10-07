import { describe, it, expect } from 'vitest';
import { stripLeadingTitle, normalizeFrontmatter, extractHeadings, estimateReadTime, slugify } from './mdx';

describe('blog frontmatter', () => {
  it('accepts description or excerpt, ISO-normalises dates and ignores hand-written readTime', () => {
    const body = 'word '.repeat(400);
    const a = normalizeFrontmatter({ title: 'A', excerpt: 'd', date: '2026-06-26', tags: ['AI'], readTime: '15 min read' }, body);
    const b = normalizeFrontmatter({ title: 'B', description: 'e', date: 'August 2025' }, body);
    expect(a).toMatchObject({ excerpt: 'd', date: '2026-06-26', readTime: '2 min read', tags: ['ai'] });
    expect(b.excerpt).toBe('e');
    expect(b.date).toBe('2025-08-01');
    expect(a.draft).toBe(false);
    expect(normalizeFrontmatter({ title: 'C', draft: true, cover: '/blog/c.png' }, body)).toMatchObject({ draft: true, cover: '/blog/c.png' });
  });
  it('estimates at least one minute', () => expect(estimateReadTime('hi')).toBe('1 min read'));
});

describe('headings', () => {
  it('extracts h2/h3 and skips fenced code', () => {
    const md = '# T\n## One\ntext\n```\n## not a heading\n```\n### Two: Deep?\n';
    expect(extractHeadings(md)).toEqual([
      { id: 'one', text: 'One', level: 2 },
      { id: 'two-deep', text: 'Two: Deep?', level: 3 },
    ]);
    expect(slugify('Hello, World')).toBe('hello-world');
  });
});

describe('stripLeadingTitle', () => {
  it('removes only a leading h1', () => {
    expect(stripLeadingTitle('\n# Title\n\ntext\n# Later')).toBe('\ntext\n# Later');
    expect(stripLeadingTitle('### Intro\ntext')).toBe('### Intro\ntext');
  });
});
