"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className="fixed w-full backdrop-blur-md z-50 transition-all duration-500"
      style={{
        background: `rgba(10, 10, 10, ${Math.min(scrollY / 100, 0.95)})`,
        transform: `translateZ(${Math.min(scrollY / 10, 50)}px)`,
      }}
    >
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* 3D Logo */}
          <Link href="/" className="group perspective-container">
            <div className="flex items-center gap-2 nav-3d">
              <div className="relative">
                <span className="text-5xl font-black text-cyan-400 text-glow rotate-3d block">
                  M
                </span>
                <div className="absolute inset-0 text-5xl font-black text-cyan-400 opacity-30 blur-sm">
                  M
                </div>
              </div>
              <div className="flex flex-col layer-2">
                <span className="text-xl font-bold text-white">uzammil</span>
                <span className="text-sm font-medium gradient-text">AI Engineer</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {/* 3D Theme Toggle */}
            <div className="relative perspective-container">
              <button
                onClick={toggleTheme}
                className="w-16 h-8 rounded-full p-1 transition-all duration-500 ease-in-out relative overflow-hidden
                bg-gray-800 border-2 border-cyan-400 neon-glow btn-3d"
                aria-label="Toggle theme"
              >
                {/* Holographic Toggle */}
                <div className="absolute inset-0 holographic-bg opacity-30 rounded-full"></div>
                
                {/* Toggle Knob */}
                <div
                  className="w-6 h-6 rounded-full transform duration-500 ease-spring relative z-30 layer-3
                  bg-gradient-to-r from-cyan-400 to-blue-500 neon-glow shadow-lg"
                  style={{
                    transform: `translateX(${isDarkMode ? '32px' : '0px'}) translateZ(10px) rotateY(${isDarkMode ? '180deg' : '0deg'})`
                  }}
                />
              </button>
            </div>

            {/* 3D Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative py-2 group nav-3d"
                  style={{ transform: `translateZ(${index * 5}px)` }}
                >
                  <span className="text-white hover:text-cyan-400 transition-colors duration-300 text-glow">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                    transition-all duration-300 group-hover:w-full neon-glow"></span>
                  <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 
                    transition-opacity duration-300 rounded-lg blur-sm"></div>
                </Link>
              ))}
              <a
                href="/Muzammil Nawaz Khan Resume.pdf"
                download
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 
                transform hover:scale-105 border-2 border-cyan-400 text-cyan-400 
                hover:bg-cyan-400 hover:text-black btn-3d neon-glow layer-4
                bg-gradient-to-r from-transparent to-cyan-400/10"
              >
                Resume
              </a>
            </div>

            {/* 3D Mobile Menu Button */}
            <button
              className="md:hidden btn-3d p-2 rounded-lg border border-cyan-400 neon-glow"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-cyan-400"
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

        {/* 3D Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 bg-black/90 backdrop-blur-md rounded-lg mt-4 
            border border-cyan-400/30 contrast-bg perspective-container">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 rounded-lg transition-all duration-300 
                text-white hover:text-cyan-400 hover:bg-cyan-400/10 nav-3d"
                onClick={() => setIsMenuOpen(false)}
                style={{ transform: `translateZ(${index * 3}px)` }}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/Muzammil Nawaz Khan Resume.pdf"
              download
              className="block py-3 px-4 rounded-lg transition-all duration-300 mt-2 border-t 
              border-cyan-400/30 text-cyan-400 hover:text-white hover:bg-cyan-400/10 nav-3d layer-5"
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