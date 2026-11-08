"use client";
import { m, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  // ⚡ Bolt: By delegating the reading progress animation directly to the compositor via framer-motion's useScroll
  // and CSS transforms (scaleX) with an origin-left class, we eliminate constant React state updates and
  // main thread layout thrashing previously caused by listening to the scroll event.
  // Impact: Removes hundreds of React renders on blog pages during fast scrolling.

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-border" aria-hidden="true">
      <m.div
        className="h-full bg-accent-text origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
