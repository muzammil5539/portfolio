"use client";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {

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
      className="py-20 md:py-28 bg-ai-navy relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ai-cyan"></div>
            <span className="text-ai-cyan text-sm font-medium tracking-wider uppercase">Career</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ai-cyan"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ai-text mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ai-cyan via-ai-blue to-ai-purple transform md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-ai-charcoal border-2 border-ai-cyan rounded-full transform -translate-x-1/2 shadow-glow-cyan z-10"></div>
              
              <div className="ml-8 md:ml-0 md:w-1/2 md:odd:pr-12 md:even:pl-12 md:odd:ml-0 md:even:ml-auto">
                <ExperienceCard {...exp} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
