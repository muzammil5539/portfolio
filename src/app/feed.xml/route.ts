import { getBlogPosts } from "@/lib/mdx";

export const dynamic = "force-static";

const baseUrl = "https://muzammil5539.vercel.app";
const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getBlogPosts()
    .map(
      (p) => `<item><title>${escapeXml(p.title)}</title><link>${baseUrl}/blog/${p.slug}</link><guid>${baseUrl}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${escapeXml(p.excerpt)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Muzammil Nawaz Khan — AI &amp; Engineering</title><link>${baseUrl}/blog</link><description>Notes on LLMs, agents and evaluation.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
