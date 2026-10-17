"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Use Framer Motion's useScroll to bind scroll progress directly to animation primitive.
  // This bypasses the React render cycle and avoids layout thrashing during scroll,
  // drastically improving Time to Interactive (TTI) and scroll performance.
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
