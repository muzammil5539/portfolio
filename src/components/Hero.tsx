"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import TypeWriter from "./TypeWriter";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden 
      holographic-bg perspective-container">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/30 rotate-3d"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-pink-500/30 rotate-3d" 
          style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-green-400/30 rotate-3d" 
          style={{ animationDelay: '10s' }}></div>
      </div>

      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 geometric-pattern opacity-20"
        style={{
          transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px) translateZ(-50px)`
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full float-3d opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div 
            className="flex-1 max-w-2xl parallax-layer"
            style={{
              transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px) translateZ(30px)`
            }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 text-white">
              <span className="block mb-4">Hi, I'm</span>
              <span className="block gradient-text text-glow">Muzammil</span>
              <TypeWriter />
            </h1>

            <div className="prose prose-lg mb-10 text-gray-300 space-y-6">
              <p className="text-xl leading-relaxed layer-2">
                Results-driven Computer Engineering student at NUST, 
                specializing in <span className="text-cyan-400 text-glow">artificial intelligence</span>, 
                <span className="text-pink-500 text-glow"> machine learning</span>, and 
                <span className="text-green-400 text-glow"> image processing</span>.
              </p>
              <p className="text-lg leading-relaxed layer-3">
                Expert in developing complex algorithms for data analysis and predictive modeling. 
                My expertise spans biomedical AI research, computer vision, and data science with 
                hands-on experience in industry-standard tools and frameworks.
              </p>
            </div>

            <div className="flex gap-6 layer-4">
              <Link
                href="#projects"
                className="px-8 py-4 rounded-lg font-bold transition-all duration-300
                bg-gradient-to-r from-cyan-500 to-blue-600 text-black
                hover:from-cyan-400 hover:to-blue-500 btn-3d neon-glow
                transform hover:scale-105 shadow-lg"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 rounded-lg font-bold transition-all duration-300
                border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black
                btn-3d neon-glow transform hover:scale-105"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* 3D Image Section */}
          <div 
            className="flex-1 max-w-md parallax-layer"
            style={{
              transform: `translateX(${-mousePosition.x * 15}px) translateY(${-mousePosition.y * 15}px) translateZ(20px)`
            }}
          >
            <div className="relative perspective-container">
              {/* Floating Frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 
                rounded-lg blur-lg opacity-30 float-3d"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-lg overflow-hidden card-3d depth-shadow-intense
                border-2 border-cyan-400/50 bg-black/50 backdrop-blur-sm">
                
                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-pink-500/20 
                  opacity-50 mix-blend-overlay"></div>
                
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/portfolio.jpg"
                    alt="Muzammil Nawaz Khan"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                  
                  {/* Scan Lines Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent 
                    opacity-30 animate-pulse"></div>
                </div>

                {/* Floating Info Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md 
                  rounded-lg p-3 border border-cyan-400/30 layer-5">
                  <p className="text-cyan-400 text-sm font-medium">AI Engineer</p>
                  <p className="text-white text-xs">NUST Student</p>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 border-2 border-pink-500/50 
                rounded-full rotate-3d neon-glow-secondary"></div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 border-2 border-green-400/50 
                rounded-full rotate-3d neon-glow-tertiary" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4 pulse-3d">
          <p className="text-cyan-400 text-sm font-medium">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Ambient Lighting Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}