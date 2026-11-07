"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: Bind scroll progress to framer-motion's useScroll hook.
  // This bypasses React's render cycle completely, updating the DOM via
  // a CSS transform on the m.div below directly in the compositor,
  // eliminating layout thrashing and re-renders on every scroll event.
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full origin-left bg-accent-text"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
