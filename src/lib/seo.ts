import type { Metadata } from "next";
import { faqs, site } from "@/data/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Per-page metadata with canonical URL and matching Open Graph / Twitter fields. Images come from opengraph-image routes. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      title,
      description,
      siteName: `${site.name} Portfolio`,
      locale: "en_US",
      ...(type === "article" ? { publishedTime, tags, authors: [site.name] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#person"),
  name: site.name,
  jobTitle: site.role,
  description: site.summary,
  url: site.url,
  image: absoluteUrl(site.photo),
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.countryCode },
  knowsAbout: site.knowsAbout,
  alumniOf: { "@type": "CollegeOrUniversity", name: site.alumniOf.name, url: site.alumniOf.url },
  sameAs: [site.links.linkedin, site.links.github],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: `${site.name} Portfolio`,
  url: site.url,
  inLanguage: "en",
  publisher: { "@id": absoluteUrl("/#person") },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/blog")}?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const blogPostingSchema = (post: { slug: string; title: string; excerpt: string; date: string; tags: string[]; cover?: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  keywords: post.tags.join(", "),
  image: absoluteUrl(post.cover ?? `/blog/${post.slug}/opengraph-image`),
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  author: { "@id": absoluteUrl("/#person") },
  publisher: { "@id": absoluteUrl("/#person") },
});

export const faqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
