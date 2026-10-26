"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt: Prevent synchronous React re-renders on scroll by delegating progress bar animation to Framer Motion's CSS transforms via useScroll.
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
