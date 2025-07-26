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
    className={
      `sticky top-0 z-30 w-full shadow-md border-b flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 md:py-4 ` +
      (isDarkMode
        ? "bg-gray-900/95 border-gray-700"
        : "bg-white/95 border-gray-200")
    }
  >
    {/* Top Row - Logo and Controls */}
    <div className="flex items-center justify-between w-full md:w-auto">
      <div className="flex items-center gap-3">
        {/* Enhanced Tech Icon */}
        <div className={`relative p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
          <svg
            className={`w-6 h-6 md:w-8 md:h-8 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
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
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 rounded-lg opacity-20 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} blur-sm -z-10`}></div>
        </div>
        <div className="hidden sm:block">
          <h1
            className={`text-lg md:text-2xl lg:text-3xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IBM AI Engineering
            </span>
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}> Certification</span>
          </h1>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex gap-2 items-center md:hidden">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-5 rounded-full p-[2px] transition-all duration-300 ease-in-out relative overflow-hidden
          ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}
          aria-label="Toggle theme"
        >
          {/* Sun Icon */}
          <svg
            viewBox="0 0 24 24"
            className={`w-3 h-3 absolute left-[2px] top-[3px] transition-all duration-500 transform z-20 ${
              isDarkMode ? "opacity-0 rotate-90 translate-y-2" : "opacity-100"
            }`}
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="5" className="text-yellow-500" />
            <path
              className="text-yellow-500"
              d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.83-7.17l-1.42 1.42M6.25 6.25L4.83 4.83m12.92 12.92l1.42 1.42M6.25 17.75l-1.42 1.42"
            />
          </svg>

          {/* Moon Icon */}
          <svg
            viewBox="0 0 24 24"
            className={`w-3 h-3 absolute left-[2px] top-[3px] transition-all duration-500 transform z-20 ${
              isDarkMode ? "opacity-100" : "opacity-0 -rotate-90 -translate-y-2"
            }`}
            fill="currentColor"
          >
            <path
              className="text-blue-300"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            />
          </svg>

          <div
            className={`w-4 h-4 rounded-full transform duration-500 ease-spring relative z-30
              ${
                isDarkMode
                  ? "translate-x-5 bg-gray-800 shadow-moon"
                  : "translate-x-0 bg-white shadow-sun"
              }`}
          />
        </button>

        {/* Mobile nav toggles */}
        <button
          className={`px-2 py-1 rounded border ${
            isDarkMode
              ? "bg-blue-900 text-blue-200 border-blue-700"
              : "bg-blue-100 text-blue-700 border-blue-300"
          }`}
          onClick={() => setShowLeftNav((v) => !v)}
          aria-label="Toggle course navigation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button
          className={`px-2 py-1 rounded border ${
            isDarkMode
              ? "bg-blue-900 text-blue-200 border-blue-700"
              : "bg-blue-100 text-blue-700 border-blue-300"
          }`}
          onClick={() => setShowRightNav((v) => !v)}
          aria-label="Toggle module navigation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4v16M12 4v16M18 4v16"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Bottom Row - Mobile Title and Desktop Controls */}
    <div className="flex items-center justify-between mt-2 md:mt-0 md:gap-4">
      {/* Mobile Title */}
      <div className="sm:hidden">
        <h1
          className={`text-base font-bold leading-tight ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IBM AI Engineering
          </span>
        </h1>
        <span
          className={`text-xs font-medium tracking-wide ${
            isDarkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Professional Certificate Journey
        </span>
      </div>

      {/* Desktop Subtitle */}
      <div className="hidden sm:block md:hidden lg:block">
        <span
          className={`text-sm font-medium tracking-wide ${
            isDarkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Professional Certificate Journey
        </span>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex gap-2 lg:gap-4 items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full p-[2px] transition-all duration-300 ease-in-out relative overflow-hidden
          ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}
          aria-label="Toggle theme"
        >
          {/* Sun Icon */}
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 absolute left-[2px] top-[4px] transition-all duration-500 transform z-20 ${
              isDarkMode ? "opacity-0 rotate-90 translate-y-2" : "opacity-100"
            }`}
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="5" className="text-yellow-500" />
            <path
              className="text-yellow-500"
              d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.83-7.17l-1.42 1.42M6.25 6.25L4.83 4.83m12.92 12.92l1.42 1.42M6.25 17.75l-1.42 1.42"
            />
          </svg>

          {/* Moon Icon */}
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 absolute left-[2px] top-[4px] transition-all duration-500 transform z-20 ${
              isDarkMode ? "opacity-100" : "opacity-0 -rotate-90 -translate-y-2"
            }`}
            fill="currentColor"
          >
            <path
              className="text-blue-300"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            />
          </svg>

          <div
            className={`w-5 h-5 rounded-full transform duration-500 ease-spring relative z-30
              ${
                isDarkMode
                  ? "translate-x-6 bg-gray-800 shadow-moon"
                  : "translate-x-0 bg-white shadow-sun"
              }`}
          />
        </button>

        <Link
          href="/"
          className={`px-3 lg:px-4 py-2 rounded-lg font-semibold shadow transition-all border-2 text-sm lg:text-base ${
            isDarkMode
              ? "bg-gray-800 text-blue-200 hover:bg-blue-900 border-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
          }`}
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Mobile Back Button */}
      <div className="md:hidden">
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-lg font-semibold shadow transition-all border text-sm ${
            isDarkMode
              ? "bg-gray-800 text-blue-200 hover:bg-blue-900 border-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
          }`}
        >
          ← Back
        </Link>
      </div>
    </div>
  </header>
);

export default CertificationHeader;
