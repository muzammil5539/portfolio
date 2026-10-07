"use client";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { experiences } from "@/data/experience";

const spring = { type: "spring", stiffness: 260, damping: 26 } as const;
const bar: Variants = { rest: { scaleX: 0, transition: spring }, hover: { scaleX: 1, transition: spring } };

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-surface-elevated py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-16 gap-y-8 px-6">
        <div className="min-w-0 flex-[1_1_260px]">
          <SectionHeader id="experience-title" index="02" label="Experience" title="Where I've worked" />
        </div>
        <Reveal as="ol" className="flex min-w-0 flex-[2_1_520px] flex-col">
          {experiences.map((exp, i) => (
            <RevealItem key={`${exp.company}-${exp.date}`} as="li" className={`border-t ${i === 0 ? "border-foreground" : "border-border"} ${i === experiences.length - 1 ? "border-b" : ""}`}>
              <motion.div initial="rest" whileHover="hover" whileFocus="hover" className="relative flex flex-wrap gap-x-8 gap-y-2 py-6 pl-4">
                <motion.span
                  aria-hidden="true"
                  variants={bar}
                  style={{ transformOrigin: "left" }}
                  className="absolute left-0 top-0 h-[3px] w-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                />
                <p className="w-40 shrink-0 font-mono text-[13px] text-text-muted">{exp.date}</p>
                <div className="min-w-0 flex-[1_1_320px]">
                  <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-text-muted">{exp.company}</p>
                  <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-text-secondary marker:text-accent-text">
                    {exp.description.slice(0, 3).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
