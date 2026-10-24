"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: useScroll delegates scroll-bound animations to the compositor
  // preventing constant React re-renders and main thread blocking on scroll
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
