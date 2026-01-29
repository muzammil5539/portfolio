"use client";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-16 relative overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-ai-navy" : "bg-white"
    }`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid ${isDarkMode ? "opacity-10" : "opacity-5"}`}></div>
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent ${
        isDarkMode ? "via-ai-cyan/30" : "via-cyan-300"
      }`}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="group">
              <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <span className="text-4xl font-bold gradient-text">M</span>
                  <div className={`absolute -inset-2 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? "bg-ai-cyan/10" : "bg-cyan-200/50"
                  }`}></div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-medium transition-colors ${
                    isDarkMode ? "text-ai-text group-hover:text-ai-cyan" : "text-gray-900 group-hover:text-cyan-600"
                  }`}>
                    uzammil
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
                    AI Engineer
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
              {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`relative py-2 transition-colors group ${
                      isDarkMode ? "text-ai-text-muted hover:text-ai-text" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-cyan to-ai-blue transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://github.com/muzammil5539"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-ai-charcoal border-ai-slate text-ai-text-muted hover:text-ai-cyan hover:border-ai-cyan/50 hover:shadow-glow-cyan" 
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-cyan-600 hover:border-cyan-300 hover:shadow-lg"
              }`}
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mnk539/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-ai-charcoal border-ai-slate text-ai-text-muted hover:text-ai-blue hover:border-ai-blue/50 hover:shadow-glow-blue" 
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg"
              }`}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="mailto:mnk.muzammil86@gmail.com"
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-ai-charcoal border-ai-slate text-ai-text-muted hover:text-ai-purple hover:border-ai-purple/50 hover:shadow-glow-purple" 
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-300 hover:shadow-lg"
              }`}
              aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>

          {/* Divider */}
          <div className={`w-full max-w-md h-px bg-gradient-to-r from-transparent to-transparent mb-8 ${
            isDarkMode ? "via-ai-slate" : "via-gray-300"
          }`}></div>

          {/* Copyright */}
          <div className={`text-sm text-center ${isDarkMode ? "text-ai-text-dim" : "text-gray-500"}`}>
            <p>© {currentYear} Muzammil Nawaz Khan. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Built with <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>Next.js</span> & <span className={isDarkMode ? "text-ai-cyan" : "text-cyan-600"}>Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
