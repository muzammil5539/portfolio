"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Bypasses React render cycle for scroll events, updating compositor transform directly for 60fps
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full w-full origin-left bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
