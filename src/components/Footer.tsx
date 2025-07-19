"use client";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const { isDarkMode } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 relative overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="group">
              <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-105">
                <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                  M
                </span>
                <div className="flex flex-col">
                  <span
                    className={`text-xl font-medium transition-colors duration-300 ${
                      isDarkMode ? "text-white group-hover:text-blue-300" : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    uzammil
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI Engineer
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <Link
                  href="#about"
                  className={`relative py-2 group transition-all duration-300 ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className={`relative py-2 group transition-all duration-300 ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">Projects</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className={`relative py-2 group transition-all duration-300 ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">Experience</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className={`relative py-2 group transition-all duration-300 ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">Skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`relative py-2 group transition-all duration-300 ${
                    isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">Contact</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex gap-6 mb-8">
            <a
              href="https://github.com/muzammil5539"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? "text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-lg" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-lg"
              }`}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mnk539/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? "text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-lg" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-lg"
              }`}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:mnk.muzammil86@gmail.com"
              className={`text-2xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? "text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-lg" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-lg"
              }`}
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Copyright */}
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © {currentYear} Muzammil Nawaz Khan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
