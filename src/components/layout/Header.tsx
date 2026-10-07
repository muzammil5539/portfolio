"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemePicker from "@/components/ui/ThemePicker";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";

const navItems = [
  { label: "Work", hash: "#projects" },
  { label: "Experience", hash: "#experience" },
  { label: "Skills", hash: "#skills" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", hash: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";

  const hrefFor = (item: (typeof navItems)[number]) => item.href ?? `${isHome ? "" : "/"}${item.hash}`;
  const linkClass = "inline-flex min-h-11 items-center text-[15px] text-text-secondary transition-colors hover:text-foreground";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5">
        <Link href="/" className="font-mono text-[15px] font-medium tracking-wide text-foreground">
          MNK<span className="text-accent-text">/</span>portfolio
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={hrefFor(item)} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <div className="flex items-center">
            <ThemePicker />
            <ThemeToggle />
          </div>
          <Magnetic strength={0.25}>
            <a
              href={site.links.resume}
              download
              className="inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Résumé
            </a>
          </Magnetic>
        </nav>

        <div className="flex items-center md:hidden">
          <ThemePicker />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-6 pb-6 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link key={item.label} href={hrefFor(item)} onClick={() => setOpen(false)} className={`${linkClass} w-full border-b border-border text-base`}>
              {item.label}
            </Link>
          ))}
          <a
            href={site.links.resume}
            download
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background"
          >
            Download résumé
          </a>
        </nav>
      )}
    </header>
  );
}
