"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
    <header className="fixed w-full bg-white border-b-2 border-gray-200 shadow-sm z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Academic-style logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 text-white rounded-sm flex items-center justify-center font-bold text-lg">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Muzammil Nawaz Khan
                </span>
                <span className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  Computer Engineering Student
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-900 font-medium text-sm uppercase tracking-wide transition-colors duration-200 border-b-2 border-transparent hover:border-blue-900 pb-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="ml-8 pl-8 border-l border-gray-300">
                <a
                  href="/Muzammil Nawaz Khan Resume.pdf"
                  download
                  className="bg-blue-900 text-white px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200"
                >
                  Resume
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
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
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-gray-700 hover:text-blue-900 hover:bg-gray-50 font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/Muzammil Nawaz Khan Resume.pdf"
              download
              className="block py-2 px-4 text-blue-900 hover:text-gray-800 hover:bg-gray-50 font-medium text-sm uppercase tracking-wide border-t border-gray-200 mt-2 pt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Download Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
