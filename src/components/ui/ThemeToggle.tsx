"use client";
import { useEffect, useId, useState } from "react";
import { m } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Sun and moon are one shape: the disc grows and a mask circle bites into it, rays fold away. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const maskId = useId();
  // Snap to the saved mode on first paint; only animate real toggles.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const spring = ready ? { type: "spring" as const, stiffness: 220, damping: 18 } : { duration: 0 };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label="Dark mode"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <m.circle r="7" fill="black" initial={false} animate={{ cx: isDarkMode ? 17 : 30, cy: isDarkMode ? 7 : 0 }} transition={spring} />
        </mask>
        <m.circle cx="12" cy="12" fill="currentColor" mask={`url(#${maskId})`} initial={false} animate={{ r: isDarkMode ? 8.5 : 5 }} transition={spring} />
        <m.g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ transformOrigin: "12px 12px" }}
          initial={false}
          animate={{ opacity: isDarkMode ? 0 : 1, scale: isDarkMode ? 0.4 : 1, rotate: isDarkMode ? 70 : 0 }}
          transition={spring}
        >
          {RAYS.map((deg) => (
            <line key={deg} x1="12" y1="2.2" x2="12" y2="4.4" transform={`rotate(${deg} 12 12)`} />
          ))}
        </m.g>
      </svg>
    </button>
  );
}
