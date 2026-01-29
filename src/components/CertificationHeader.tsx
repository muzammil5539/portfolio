"use client";
import React from "react";
import Link from "next/link";

interface CertificationHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setShowLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRightNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const CertificationHeader: React.FC<CertificationHeaderProps> = ({
  isDarkMode,
  toggleTheme,
  setShowLeftNav,
  setShowRightNav,
}) => (
  <header
    className={`sticky top-0 z-30 w-full border-b backdrop-blur-lg flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 md:py-4 transition-colors duration-300 ${
      isDarkMode
        ? "bg-ai-navy/95 border-ai-charcoal/50"
        : "bg-white/95 border-gray-200"
    }`}
  >
    {/* Top Row - Logo and Controls */}
    <div className="flex items-center justify-between w-full md:w-auto">
      <div className="flex items-center gap-3">
        {/* Enhanced Tech Icon */}
        <div className="relative">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDarkMode 
              ? "bg-gradient-to-br from-ai-cyan to-ai-blue" 
              : "bg-gradient-to-br from-cyan-500 to-blue-600"
          }`}>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className={`absolute -inset-0.5 rounded-lg opacity-30 blur-sm ${
            isDarkMode ? "bg-ai-cyan" : "bg-cyan-400"
          }`}></div>
        </div>
        <div className="hidden sm:block">
          <h1 className={`text-lg md:text-xl lg:text-2xl font-bold leading-tight ${
            isDarkMode ? "text-ai-text" : "text-gray-900"
          }`}>
            <span className="gradient-text">IBM AI Engineering</span>
            <span className={isDarkMode ? "text-ai-text-muted" : "text-gray-600"}> Certification</span>
          </h1>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex gap-2 items-center md:hidden">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full p-0.5 transition-all duration-300 ${
            isDarkMode ? "bg-ai-charcoal border border-ai-slate" : "bg-gray-200 border border-gray-300"
          }`}
          aria-label="Toggle theme"
        >
          <div
            className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
              isDarkMode ? "translate-x-6 bg-ai-navy" : "translate-x-0 bg-white"
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

        {/* Mobile nav toggles */}
        <button
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? "text-ai-text-muted hover:text-ai-cyan hover:bg-ai-charcoal"
              : "text-gray-600 hover:text-cyan-600 hover:bg-gray-100"
          }`}
          onClick={() => setShowLeftNav((v) => !v)}
          aria-label="Toggle course navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? "text-ai-text-muted hover:text-ai-cyan hover:bg-ai-charcoal"
              : "text-gray-600 hover:text-cyan-600 hover:bg-gray-100"
          }`}
          onClick={() => setShowRightNav((v) => !v)}
          aria-label="Toggle module navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 4v16M12 4v16M18 4v16" />
          </svg>
        </button>
      </div>
    </div>

    {/* Bottom Row - Mobile Title and Desktop Controls */}
    <div className="flex items-center justify-between mt-2 md:mt-0 md:gap-4">
      {/* Mobile Title */}
      <div className="sm:hidden">
        <h1 className={`text-base font-bold leading-tight ${isDarkMode ? "text-ai-text" : "text-gray-900"}`}>
          <span className="gradient-text">IBM AI Engineering</span>
        </h1>
        <span className={`text-xs font-medium tracking-wide ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
          Professional Certificate Journey
        </span>
      </div>

      {/* Desktop Subtitle */}
      <div className="hidden sm:block md:hidden lg:block">
        <span className={`text-sm font-medium tracking-wide ${isDarkMode ? "text-ai-cyan" : "text-cyan-600"}`}>
          Professional Certificate Journey
        </span>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex gap-3 lg:gap-4 items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${
            isDarkMode ? "bg-ai-charcoal border border-ai-slate" : "bg-gray-200 border border-gray-300"
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
              isDarkMode ? "translate-x-7 bg-ai-navy" : "translate-x-0 bg-white"
            }`}
          />
        </button>

        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy hover:shadow-glow-cyan"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Mobile Back Button */}
      <div className="md:hidden">
        <Link
          href="/"
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
          }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </div>
    </div>
  </header>
);

export default CertificationHeader;
