"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Optimization: Bypass React's render loop by delegating scroll
  // tracking directly to framer-motion and the compositor thread via scaleX.
  // This eliminates continuous re-renders and main-thread blocking during scrolling.
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
