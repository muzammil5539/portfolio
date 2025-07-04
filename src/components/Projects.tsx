"use client";
import ProjectCard from "./ProjectCard";
import { useTheme } from "@/context/ThemeContext";

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

  return (
    <section
      id="projects"
      className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Featured Projects
          </h2>
          <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
          <p
            className={`text-base sm:text-xl mt-6 mb-0 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore my portfolio of AI and machine learning projects, showcasing
            cutting-edge solutions in computer vision, deep learning, and data
            science.
          </p>
        </div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.tags || []}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
