"use client";
import Link from "next/link";
import Image from "next/image";
import NeuralNetworkDiagram from "./NeuralNetworkDiagram";
import CodeSnippet from "./CodeSnippet";
import DataNodes from "./DataNodes";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-ai-navy"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30"></div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-ai-cyan to-transparent"></div>
                  <span className="text-ai-cyan text-sm font-medium tracking-wider uppercase">AI Engineer</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ai-text leading-tight">
                  Muzammil{" "}
                  <span className="gradient-text">Nawaz Khan</span>
                </h1>
                <p className="text-xl text-ai-text-muted max-w-lg">
                  Computer Engineering Graduate from{" "}
                  <span className="text-ai-cyan">NUST</span>, specializing in 
                  AI, Machine Learning, and Computer Vision.
                </p>
              </div>

              {/* Research Interests Card */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-ai-text mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-ai-cyan rounded-full animate-pulse-glow"></span>
                  Research Interests
                </h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-ai-charcoal flex items-center justify-center text-ai-cyan group-hover:shadow-glow-cyan transition-shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-ai-text font-medium">Artificial Intelligence</h4>
                      <p className="text-ai-text-muted text-sm">Deep learning architectures & neural network optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-ai-charcoal flex items-center justify-center text-ai-purple group-hover:shadow-glow-purple transition-shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-ai-text font-medium">Computer Vision</h4>
                      <p className="text-ai-text-muted text-sm">Image processing & pattern recognition systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-ai-charcoal flex items-center justify-center text-ai-green group-hover:shadow-glow-green transition-shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-ai-text font-medium">Biomedical AI</h4>
                      <p className="text-ai-text-muted text-sm">Medical image segmentation & diagnostic systems</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ai-cyan to-ai-blue text-ai-navy px-8 py-4 font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 group"
                >
                  View Projects
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 border border-ai-cyan/50 text-ai-cyan px-8 py-4 font-semibold rounded-lg hover:bg-ai-cyan/10 hover:border-ai-cyan transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Technical Visualizations */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Profile Image with Glow Effect */}
              <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-ai-cyan to-ai-purple rounded-2xl opacity-20 blur-2xl"></div>
                <div className="relative glass-card rounded-2xl overflow-hidden border border-ai-cyan/20">
                  <Image
                    src="/portfolio.jpg"
                    alt="Muzammil Nawaz Khan - AI Engineer"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative corner elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-ai-cyan rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-ai-cyan rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-ai-cyan rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-ai-cyan rounded-br-lg"></div>
              </div>

              {/* Neural Network Diagram */}
              <div className="hidden lg:block absolute -top-10 -right-20 w-64 h-48 opacity-60">
                <NeuralNetworkDiagram className="w-full h-full" nodeCount={[3, 4, 4, 2]} />
              </div>

              {/* Code Snippet - Positioned below on mobile, side on desktop */}
              <div className="lg:absolute lg:-bottom-10 lg:-left-20 lg:w-80">
                <CodeSnippet className="transform lg:scale-75 origin-top-left" />
              </div>

              {/* Data Nodes */}
              <div className="hidden lg:block absolute top-1/2 -right-10 w-32 h-32">
                <DataNodes className="w-full h-full" count={6} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ai-navy-light to-transparent"></div>
    </section>
  );
}
