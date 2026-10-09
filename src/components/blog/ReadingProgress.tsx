"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // Optimization: Instead of updating state on every scroll event (which triggers a React re-render
  // and potential layout thrashing), we use framer-motion's useScroll. This ties the scroll progress
  // directly to a motion value, bypassing the React render cycle and animating via CSS transforms on the compositor.
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
