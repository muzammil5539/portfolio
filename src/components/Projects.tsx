"use client";
import ProjectCard from "./ProjectCard";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Luggage Threat Detection",
    description:
      "Developed ANN architecture for image classification of potential threats in luggage images with high accuracy in threat identification.",
    image: "/projects/luggage.jpg",
    tags: ["Python", "ANN", "OpenCV", "Image Classification"],
  },
  {
    title: "License Plate Recognition",
    description:
      "Created pipeline for license plate localization using edge detection and implemented robust plate isolation system.",
    image: "/projects/licencse_plate.png",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
  },
  {
    title: "Braille Digits Recognition",
    description:
      "Built system to recognize Braille characters through dot pattern analysis and distance metrics for character differentiation.",
    image: "/projects/Braille.png",
    tags: ["Python", "OpenCV", "Pattern Recognition"],
  },
  {
    title: "Cat Dog Classification",
    description:
      "Implemented CNN models with and without pooling and dropout layers, demonstrating regularization techniques.",
    image: "/projects/classification.png",
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
  },
  {
    title: "Skin Image Segmentation",
    description:
      "Designed segmentation system using Connected Component Labeling and achieved accurate results with IoU metrics.",
    image: "/projects/skin.png",
    tags: ["Python", "OpenCV", "Image Segmentation"],
  },
  {
    title: "Retinal Image Segmentation",
    description:
      "Developed method for segmenting retinal structures using point and multi-level thresholding techniques.",
    image: "/projects/retinal.png",
    tags: ["Python", "OpenCV", "Medical Imaging"],
  },
];

export default function Projects() {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden holographic-bg"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-40 h-40 border border-pink-500/20 rotate-3d"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-green-400/20 rotate-3d" 
          style={{ animationDelay: '7s' }}></div>
      </div>

      {/* Parallax Background Pattern */}
      <div 
        className="absolute inset-0 geometric-pattern opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px) translateZ(-30px)`
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 perspective-container">
          <div className="layer-2">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Featured <span className="gradient-text text-glow">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore my portfolio of AI and machine learning projects, showcasing 
              cutting-edge solutions in computer vision, deep learning, and data science.
            </p>
            
            {/* Animated Divider */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45 animate-pulse"></div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 neon-glow"></div>
              <div className="w-3 h-3 border-2 border-pink-500 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
          {projects.map((project, index) => (
            <div
              key={index}
              className="layer-3"
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: `translateZ(${index * 5}px)`
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.tags || []}
                image={project.image}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 layer-4">
          <div className="inline-block">
            <button className="px-8 py-4 rounded-lg font-bold transition-all duration-300
              bg-gradient-to-r from-cyan-500 to-blue-600 text-black
              hover:from-cyan-400 hover:to-blue-500 btn-3d neon-glow
              transform hover:scale-105 shadow-lg">
              View All Projects
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full float-3d opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}