"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isHome = usePathname() === "/";

  return (
    <footer className={`py-16 relative overflow-hidden transition-colors duration-300 bg-surface`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid opacity-5`}></div>
      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent via-accent-blue`}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="group">
              <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <span className="text-4xl font-bold gradient-text">M</span>
                  <div className={`absolute -inset-2 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity bg-accent-cyan/20`}></div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-medium transition-colors text-foreground group-hover:text-accent-blue`}>
                    uzammil
                  </span>
                  <span className={`text-sm font-medium text-accent-blue`}>
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
                    href={`${isHome ? "" : "/"}#${item.toLowerCase()}`}
                    className={`relative py-2 transition-colors group text-text-secondary hover:text-foreground`}
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ai-cyan transition-all duration-300 group-hover:w-full"></span>
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
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 bg-background-secondary border-border text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:shadow-lg`}
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mnk539/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 bg-background-secondary border-border text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:shadow-lg`}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="mailto:mnk.7muzammil86@gmail.com"
              className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 bg-background-secondary border-border text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:shadow-lg`}
              aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>

          {/* Divider */}
          <div className={`w-full max-w-md h-px bg-gradient-to-r from-transparent to-transparent mb-8 via-border`}></div>

          {/* Copyright */}
          <div className={`text-sm text-center text-text-secondary`}>
            <p>© {currentYear} Muzammil Nawaz Khan. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Built with <span className="text-accent-blue">Next.js</span> & <span className="text-accent-blue">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
