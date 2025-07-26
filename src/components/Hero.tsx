"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Academic Profile Information */}
          <div className="flex-1 order-2 md:order-1">
            <div className="space-y-8">
              {/* Academic Header */}
              <div className="border-l-4 border-blue-900 pl-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Muzammil Nawaz Khan
                </h1>
                <h2 className="text-xl md:text-2xl text-blue-900 font-semibold mb-2">
                  Computer Engineering Graduate
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  National University of Sciences and Technology (NUST)
                </p>
              </div>

              {/* Academic Focus Areas */}
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Research Interests
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Artificial Intelligence:</strong> Specializing in machine learning algorithms, 
                    deep learning architectures, and neural network optimization for real-world applications.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Computer Vision:</strong> Developing advanced image processing techniques 
                    and pattern recognition systems for medical imaging and security applications.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Biomedical AI:</strong> Applying artificial intelligence in healthcare, 
                    focusing on medical image segmentation and diagnostic support systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="#projects"
                className="bg-blue-900 text-white px-6 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                View Research Projects
              </Link>
              <Link
                href="#contact"
                className="border-2 border-blue-900 text-blue-900 px-6 py-3 font-semibold uppercase tracking-wide hover:bg-blue-900 hover:text-white transition-colors duration-200 text-center"
              >
                Academic Contact
              </Link>
            </div>
          </div>

          {/* Professional Portrait */}
          <div className="flex-1 max-w-md order-1 md:order-2">
            <div className="relative">
              {/* Academic Frame */}
              <div className="bg-white border-2 border-gray-300 shadow-lg p-4">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/portfolio.jpg"
                    alt="Muzammil Nawaz Khan - Computer Engineering Graduate"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    priority
                  />
                </div>
                {/* Academic Caption */}
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-900">Muzammil Nawaz Khan</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">B.E. Computer Engineering</p>
                  <p className="text-xs text-gray-600">NUST, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
