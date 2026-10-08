"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt: Optimize scroll progress bar to prevent re-renders on scroll
  // By using framer-motion's useScroll and a CSS transform (scaleX),
  // we bypass React's render cycle entirely and delegate animation
  // directly to the compositor. Impact: Eliminates main thread blocking
  // during scroll.
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div className="h-full bg-accent-text origin-left" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
