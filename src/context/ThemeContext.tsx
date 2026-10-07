"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { defaultPaletteId, isPaletteId } from "@/data/themes";
import { PALETTE_KEY } from "@/lib/palette-script";

/**
 * Two independent axes:
 *  - mode (light/dark/system) is handled by next-themes: class on <html>, persisted, no flash.
 *  - palette (data-palette on <html>) is ours: persisted, URL-shareable (?theme=ember), no flash
 *    thanks to the inline script in the root layout.
 */
interface PaletteContextValue {
  palette: string;
  setPalette: (id: string) => void;
}

const PaletteContext = createContext<PaletteContextValue | undefined>(undefined);

/** Adds a short-lived class so colours ease between themes, while the first paint stays instant. */
function withColorTransition(change: () => void) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  change();
  window.setTimeout(() => root.classList.remove("theme-transition"), 220);
}

function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState(defaultPaletteId);

  useEffect(() => {
    const current = document.documentElement.dataset.palette;
    if (isPaletteId(current)) setPaletteState(current);
  }, []);

  const setPalette = useCallback((id: string) => {
    if (!isPaletteId(id)) return;
    withColorTransition(() => {
      document.documentElement.dataset.palette = id;
    });
    setPaletteState(id);
    try {
      localStorage.setItem(PALETTE_KEY, id);
      const url = new URL(window.location.href);
      url.searchParams.set("theme", id);
      window.history.replaceState(null, "", url);
    } catch {
      // Storage or history can be unavailable (private mode); the palette still applies for this visit.
    }
  }, []);

  const value = useMemo(() => ({ palette, setPalette }), [palette, setPalette]);
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <PaletteProvider>{children}</PaletteProvider>
    </NextThemesProvider>
  );
}

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();
  const palette = useContext(PaletteContext);
  if (!palette) throw new Error("useTheme must be used within a ThemeProvider");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted && resolvedTheme === "dark";
  const toggleTheme = useCallback(() => {
    withColorTransition(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"));
  }, [resolvedTheme, setTheme]);

  return { isDarkMode, mounted, toggleTheme, palette: palette.palette, setPalette: palette.setPalette };
}
