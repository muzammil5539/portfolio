"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      {/*
        Optimization: Replaced state-driven (useEffect/useState) width updates on every scroll
        with framer-motion's useScroll. This ties the scroll progress directly to CSS transforms
        via MotionValues, entirely bypassing React re-renders and eliminating layout thrashing.
      */}
      <m.div className="h-full bg-accent-text origin-left" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
