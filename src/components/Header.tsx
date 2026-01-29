"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
    {
      name: "Certifications",
      href: "/certification-journey",
    },
  ];

  return (
    <header className="fixed w-full bg-ai-navy/90 backdrop-blur-lg border-b border-ai-charcoal/50 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with gradient accent */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-ai-cyan to-ai-blue rounded-lg flex items-center justify-center font-bold text-lg text-ai-navy shadow-glow-cyan">
                  M
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-ai-cyan to-ai-blue rounded-lg opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-ai-text tracking-tight group-hover:text-ai-cyan transition-colors">
                  Muzammil Nawaz Khan
                </span>
                <span className="text-xs text-ai-cyan font-medium tracking-wider uppercase">
                  AI Engineer
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2 text-ai-text-muted hover:text-ai-text font-medium text-sm transition-colors duration-200 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-ai-cyan to-ai-blue group-hover:w-4/5 transition-all duration-300"></span>
                  </Link>
                ))}
              </nav>
              <div className="ml-6 pl-6 border-l border-ai-charcoal">
                <a
                  href="/Muzammil Nawaz Khan Resume.pdf"
                  download
                  className="relative inline-flex items-center gap-2 bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy px-5 py-2.5 text-sm font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10">Resume</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-ai-text-muted hover:text-ai-cyan transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-ai-charcoal mt-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-ai-text-muted hover:text-ai-text hover:bg-ai-charcoal/50 rounded-lg font-medium text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-ai-charcoal">
                <a
                  href="/Muzammil Nawaz Khan Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy rounded-lg font-semibold text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
