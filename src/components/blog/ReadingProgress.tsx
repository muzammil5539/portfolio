"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/*
        Optimization: Bypassing React render cycle during scrolling.
        Using framer-motion's useScroll with scaleX delegates the animation to the compositor,
        eliminating continuous React state updates and re-renders.
      */}
      <m.div
        className="h-full origin-left bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
