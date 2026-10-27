"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt: Use `useScroll` from framer-motion to bypass React state updates on scroll.
  // This prevents constant re-renders and potential layout thrashing, delegating the
  // animation directly to the GPU/compositor for a smooth 60fps progress bar.
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
