"use client";
import ProjectCard from "./ProjectCard";

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
  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-ai-navy-light relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ai-cyan"></div>
            <span className="text-ai-cyan text-sm font-medium tracking-wider uppercase">Portfolio</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ai-cyan"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ai-text mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-ai-text-muted text-lg max-w-2xl mx-auto">
            Explore my portfolio of AI and machine learning projects, showcasing
            cutting-edge solutions in computer vision, deep learning, and data science.
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
