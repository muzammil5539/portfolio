import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-panel text-panel-muted">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-panel-line px-6 py-6 text-sm">
        <span>© {new Date().getFullYear()} Muzammil Nawaz Khan</span>
        <span className="flex flex-wrap gap-x-5">
          <Link href="/blog" className="hover:text-ai-cyan">Writing</Link>
          <a href="/feed.xml" className="hover:text-ai-cyan">RSS</a>
          <span>Built with Next.js · Vercel &amp; Azure</span>
        </span>
      </div>
    </footer>
  );
}
