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
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed w-full backdrop-blur-lg border-b z-50 transition-colors duration-300 ${
      isDarkMode 
        ? "bg-ai-navy/90 border-ai-charcoal/50" 
        : "bg-white/90 border-gray-200"
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with gradient accent */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 bg-gradient-to-br from-ai-cyan to-ai-blue rounded-lg flex items-center justify-center font-bold text-lg shadow-glow-cyan ${
                  isDarkMode ? "text-ai-navy" : "text-white"
                }`}>
                  M
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-ai-cyan to-ai-blue rounded-lg opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-semibold tracking-tight transition-colors ${
                  isDarkMode 
                    ? "text-ai-text group-hover:text-ai-cyan" 
                    : "text-gray-900 group-hover:text-cyan-600"
                }`}>
                  Muzammil Nawaz Khan
                </span>
                <span className={`text-xs font-medium tracking-wider uppercase ${
                  isDarkMode ? "text-ai-cyan" : "text-cyan-600"
                }`}>
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
                    className={`relative px-4 py-2 font-medium text-sm transition-colors duration-200 group ${
                      isDarkMode 
                        ? "text-ai-text-muted hover:text-ai-text" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r group-hover:w-4/5 transition-all duration-300 ${
                      isDarkMode ? "from-ai-cyan to-ai-blue" : "from-cyan-500 to-blue-500"
                    }`}></span>
                  </Link>
                ))}
              </nav>
              
              {/* Theme Toggle Button */}
              <div className={`ml-4 pl-4 border-l ${isDarkMode ? "border-ai-charcoal" : "border-gray-200"}`}>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-ai-charcoal border border-ai-slate" 
                      : "bg-gray-200 border border-gray-300"
                  }`}
                  aria-label="Toggle theme"
                >
                  {/* Sun Icon */}
                  <svg
                    className={`absolute left-1.5 top-1.5 w-4 h-4 transition-all duration-300 ${
                      isDarkMode ? "opacity-0 scale-50" : "opacity-100 scale-100 text-amber-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  {/* Moon Icon */}
                  <svg
                    className={`absolute right-1.5 top-1.5 w-4 h-4 transition-all duration-300 ${
                      isDarkMode ? "opacity-100 scale-100 text-ai-cyan" : "opacity-0 scale-50"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  {/* Toggle Ball */}
                  <div
                    className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
                      isDarkMode 
                        ? "translate-x-7 bg-ai-navy" 
                        : "translate-x-0 bg-white"
                    }`}
                  />
                </button>
              </div>

              <div className={`ml-4 pl-4 border-l ${isDarkMode ? "border-ai-charcoal" : "border-gray-200"}`}>
                <a
                  href="/Muzammil Nawaz Khan Resume.pdf"
                  download
                  className={`relative inline-flex items-center gap-2 bg-gradient-to-r from-ai-cyan to-ai-blue px-5 py-2.5 text-sm font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 group overflow-hidden ${
                    isDarkMode ? "text-ai-navy" : "text-white"
                  }`}
                  aria-label="Download Resume PDF"
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
              className={`md:hidden p-2 transition-colors ${
                isDarkMode ? "text-ai-text-muted hover:text-ai-cyan" : "text-gray-600 hover:text-cyan-600"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
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
          <div className={`md:hidden pt-4 pb-3 border-t mt-4 ${
            isDarkMode ? "border-ai-charcoal" : "border-gray-200"
          }`}>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                    isDarkMode 
                      ? "text-ai-text-muted hover:text-ai-text hover:bg-ai-charcoal/50" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className={`flex items-center justify-between py-3 px-4 rounded-lg ${
                isDarkMode ? "bg-ai-charcoal/30" : "bg-gray-50"
              }`}>
                <span className={`text-sm font-medium ${isDarkMode ? "text-ai-text-muted" : "text-gray-600"}`}>
                  Theme
                </span>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full p-0.5 transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-ai-charcoal border border-ai-slate" 
                      : "bg-gray-200 border border-gray-300"
                  }`}
                  aria-label="Toggle theme"
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                      isDarkMode 
                        ? "translate-x-6 bg-ai-navy" 
                        : "translate-x-0 bg-white"
                    }`}
                  >
                    {isDarkMode ? (
                      <svg className="w-3 h-3 text-ai-cyan" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
              
              <div className={`pt-4 mt-4 border-t ${isDarkMode ? "border-ai-charcoal" : "border-gray-200"}`}>
                <a
                  href="/Muzammil Nawaz Khan Resume.pdf"
                  download
                  className={`flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-ai-cyan to-ai-blue rounded-lg font-semibold text-sm ${
                    isDarkMode ? "text-ai-navy" : "text-white"
                  }`}
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
