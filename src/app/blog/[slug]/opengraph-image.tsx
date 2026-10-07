import { notFound } from "next/navigation";
import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { formatBlogDate } from "@/lib/utils";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return ogImage({ eyebrow: `Blog · ${formatBlogDate(post.date)} · ${post.readTime}`, title: post.title });
}
