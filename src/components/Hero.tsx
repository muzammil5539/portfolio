"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import TypeWriter from "./TypeWriter";

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="about"
      className={`py-16 md:py-24 relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* About Text */}
          <div className="flex-1 min-w-0 w-full md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
            <div className="space-y-6">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Hi, I&apos;m{" "}
                <span className="text-shimmer">
                  Muzammil
                </span>
                <br />
                <TypeWriter />
              </h1>
              
              <div
                className={`space-y-4 animate-fade-in-delay ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  Results-driven Computer Engineering student at NUST,
                  specializing in <span className="font-semibold text-blue-500">artificial intelligence</span>, 
                  <span className="font-semibold text-purple-500"> machine learning</span>, and
                  <span className="font-semibold text-green-500"> image processing</span>. 
                  Expert in developing complex algorithms for data analysis and predictive modeling.
                </p>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  My expertise spans <span className="font-semibold text-pink-500">biomedical AI research</span>, 
                  computer vision, and data science. With hands-on experience in 
                  industry-standard tools and frameworks, I transform technical concepts into 
                  innovative solutions that drive real-world impact.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
              <Link
                href="#projects"
                className="group flex-1 text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-[1.02]"
              >
                <span className="relative z-10">View My Work</span>
              </Link>
              <Link
                href="#contact"
                className="group flex-1 text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-[1.02]"
              >
                <span className="relative z-10">Contact Me</span>
              </Link>
            </div>
          </div>

          {/* About Image */}
          <div className="flex-1 max-w-xs w-full mx-auto flex justify-center order-1 md:order-2 mb-10 md:mb-0">
            <div
              className={`relative rounded-2xl overflow-hidden shadow-lg w-full max-w-xs aspect-square border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 shadow-gray-900/40 hover:shadow-lg"
                  : "bg-white border-gray-200 shadow-gray-200/40 hover:shadow-lg"
              } group`}
              tabIndex={0}
              aria-label="Muzammil Nawaz Khan portrait"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 aspect-square">
                <Image
                  src="/portfolio.jpg"
                  alt="Muzammil Nawaz Khan - AI Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
