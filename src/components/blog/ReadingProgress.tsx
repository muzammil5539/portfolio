"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: useScroll bypasses the React render cycle on every scroll event
  // by piping scroll values directly to the compositor. This avoids massive
  // re-rendering overhead and layout thrashing.
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
