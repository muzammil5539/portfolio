"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

/** Chips fade up one after another inside each card once it scrolls into view. */
const chipItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 180, damping: 16 } },
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader id="skills-title" index="03" label="Skills" title="What I build with" />
        <Reveal as="div" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <RevealItem key={group.title} className="min-w-0 rounded-[20px] border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-semibold text-foreground">{group.title}</h3>
              <motion.ul className="mt-4 flex flex-wrap gap-2" variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}>
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={chipItem}
                    whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                    className="rounded-full bg-surface-hover px-3 py-1 text-[13px] text-text-secondary transition-shadow hover:text-foreground hover:shadow-[0_0_16px_-2px_var(--accent-primary)]"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
