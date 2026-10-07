"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE = "[data-cursor], a, button, [role='button'], input, textarea, select, summary";

/**
 * Dot + trailing ring. The ring grows over interactive elements and shows a label
 * when the element has data-cursor="View". Uses mix-blend-mode: difference so it
 * stays visible on any palette. Disabled for touch pointers and reduced motion.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [target, setTarget] = useState<{ label?: string } | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 170, damping: 19, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 19, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE);
      setTarget(el ? { label: el.getAttribute("data-cursor") ?? undefined } : null);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const size = target?.label ? 84 : target ? 52 : 34;
  const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-xs font-semibold text-black"
          animate={{ width: size, height: size, scale: pressed ? 0.88 : 1, backgroundColor: target?.label ? "#ffffff" : "rgba(255,255,255,0)" }}
          transition={spring}
        >
          {target?.label}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y, opacity: visible && !target?.label ? 1 : 0 }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}
