"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  // ⚡ Bolt: Using framer-motion's useScroll instead of React state for the scroll listener.
  // 🎯 Why: Updating React state on every scroll event forces continuous re-renders of the component tree, leading to main thread blocking and layout thrashing.
  // 📊 Impact: Bypasses the React render cycle entirely. The progress bar animation is delegated to the compositor via CSS transforms, resulting in 60fps scrolling and zero React re-renders during scroll.
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="origin-left h-full bg-accent-text transition-[width] duration-100"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
    </div>
  );
}
