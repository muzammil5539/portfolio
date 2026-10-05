"use client";
import SectionHeader from "./SectionHeader";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className={`py-20 md:py-28 relative overflow-hidden transition-colors duration-300 bg-background-secondary`}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid opacity-10`}></div>
      <div className={`absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl bg-accent-cyan/20`}></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <SectionHeader index="02" label="Experience" title="Where I've worked" />

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline line - visible vertical line connecting experience items */}
          <div 
            className={`absolute left-4 md:left-1/2 w-1 transform md:-translate-x-1/2 z-0 ${
              "bg-border"
            }`}
            style={{ top: '10px', bottom: '10px' }}
          ></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              {/* Timeline dot */}
              <div className={`absolute left-4 md:left-1/2 w-5 h-5 border-2 rounded-full transform -translate-x-1/2 shadow-glow-cyan z-10 bg-surface border-accent-blue`}></div>
              
              {/* Alternating Cards - Even indices on right, Odd on left */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                index % 2 === 0 
                  ? "md:ml-auto md:pl-12" // Right side
                  : "md:mr-auto md:pr-12" // Left side
              }`}>
                <ExperienceCard {...exp} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
