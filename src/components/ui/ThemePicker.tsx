"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Palette as PaletteIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { buildTokens, palettes } from "@/data/themes";

const COLUMNS = 2;

/** Popover with one live-preview swatch per palette. Arrow keys move, Enter/Space selects, Esc closes. */
export default function ThemePicker() {
  const { palette, setPalette, isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const previews = useMemo(
    () => palettes.map((p) => ({ palette: p, tokens: buildTokens(p, isDarkMode ? "dark" : "light") })),
    [isDarkMode],
  );

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const selected = Math.max(0, palettes.findIndex((p) => p.id === palette));
    setFocusIndex(selected);
    requestAnimationFrame(() => optionRefs.current[selected]?.focus());
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, palette]);

  const move = (next: number) => {
    const clamped = Math.min(palettes.length - 1, Math.max(0, next));
    setFocusIndex(clamped);
    optionRefs.current[clamped]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: focusIndex + 1,
      ArrowLeft: focusIndex - 1,
      ArrowDown: focusIndex + COLUMNS,
      ArrowUp: focusIndex - COLUMNS,
      Home: 0,
      End: palettes.length - 1,
    };
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key in keys) {
      e.preventDefault();
      move(keys[e.key]!);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Choose color theme"
        title="Color theme"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
      >
        <PaletteIcon size={19} />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-label="Color theme"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-3 shadow-[0_20px_50px_-15px_var(--shadow-strong)]"
          >
            <div role="radiogroup" aria-label="Palette" className="grid grid-cols-2 gap-2">
              {previews.map(({ palette: p, tokens }, i) => {
                const selected = p.id === palette;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={i === focusIndex ? 0 : -1}
                    onClick={() => setPalette(p.id)}
                    className={`flex flex-col gap-2 rounded-xl border p-2 text-left transition-colors ${
                      selected ? "border-accent-text" : "border-border hover:border-text-muted"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-12 items-end gap-1.5 rounded-lg p-1.5"
                      style={{ background: tokens.background, border: `1px solid ${tokens.border}` }}
                    >
                      <span className="h-full flex-1 rounded-md" style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }} />
                      <span className="h-3/4 w-4 rounded-md" style={{ background: tokens["accent-primary"] }} />
                      <span className="h-1/2 w-4 rounded-md" style={{ background: tokens["accent-secondary"] }} />
                    </span>
                    <span className="flex items-center justify-between gap-1 text-sm font-medium text-foreground">
                      {p.label}
                      {selected && <Check size={14} aria-hidden="true" className="text-accent-text" />}
                    </span>
                    <span className="sr-only">{p.description}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 px-1 text-xs text-text-muted">Mode and palette are independent. Shareable via ?theme=</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
