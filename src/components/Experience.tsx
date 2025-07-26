"use client";
import { useTheme } from "@/context/ThemeContext";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const { isDarkMode } = useTheme();

  const experiences = [
    {
      title: "Biomedical AI Research and Development Intern",
      company: "RiseTech - Islamabad, Pakistan",
      date: "July 2024 - Sept 2024",
      description: [
        "Developed 3D medical image segmentation models using BraTS2020 dataset for brain tumor diagnosis",
        "Implemented SegFormer3D and UNet 3D architectures using TensorFlow and PyTorch",
        "Optimized deep learning models for improved accuracy in tumor segmentation",
        "Evaluated model performance using dice scores and IoU metrics",
        "Streamlined workflows by establishing models as benchmarks for future comparisons",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Medical Imaging",
        "3D Segmentation",
        "Deep Learning",
      ],
      video: "/projects/Segformer3D.mp4",
    },
  ];

  return (
    <section
      id="experience"
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Academic Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
