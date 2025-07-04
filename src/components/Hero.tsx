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
      className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* About Text */}
          <div className="flex-1 min-w-0 w-full md:w-1/2 mb-10 md:mb-0 order-2 md:order-1">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight ${
                isDarkMode ? "text-blue-500" : "text-blue-700"
              }`}
            >
              <TypeWriter />
            </h1>
            <div
              className={`prose prose-lg max-w-none mb-10 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              } animate-fade-in-delay`}
            >
              <p className="mb-4 text-base sm:text-lg md:text-xl leading-relaxed">
                Results-driven Computer Engineering student at NUST,
                specializing in artificial intelligence, machine learning, and
                image processing. Expert in developing complex algorithms for
                data analysis and predictive modeling.
              </p>
              <p className="mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
                My expertise spans biomedical AI research, computer vision, and
                data science. With hands-on experience in industry-standard
                tools and frameworks, I transform technical concepts into
                innovative solutions that drive real-world impact.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
              <Link
                href="#projects"
                className="flex-1 text-center px-6 py-3 rounded-lg font-bold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="flex-1 text-center px-6 py-3 rounded-lg font-bold transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Contact Me
              </Link>
            </div>
          </div>
          {/* About Image */}
          <div className="flex-1 max-w-xs w-full mx-auto flex justify-center order-1 md:order-2 mb-10 md:mb-0">
            <div
              className={`rounded-2xl overflow-hidden shadow-xl w-full max-w-xs aspect-square border-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-blue-900 shadow-blue-900/40 hover:shadow-2xl hover:shadow-blue-800/60"
                  : "bg-white border-blue-200 shadow-blue-200/40 hover:shadow-2xl hover:shadow-blue-300/60"
              } group`}
              tabIndex={0}
              aria-label="Muzammil Nawaz Khan portrait"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 aspect-square">
                <Image
                  src="/portfolio.jpg"
                  alt="Muzammil Nawaz Khan"
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
