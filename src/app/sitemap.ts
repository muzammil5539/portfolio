import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/mdx';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  return [
    { url: site.url, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/projects`, lastModified: latest, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.id}`,
      lastModified: latest,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
