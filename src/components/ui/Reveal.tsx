"use client";
import { m, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
};

type Tag = "div" | "ul" | "ol" | "section" | "nav";

/** Reveals its `RevealItem` children one after another when scrolled into view (once). */
export function Reveal({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: Tag }) {
  const reduce = useReducedMotion();
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Component = m[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
