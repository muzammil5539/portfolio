import { contrast, ensureContrast, fadeWithContrast, mix, rgba, rotateHue } from "../lib/color";

export type Mode = "light" | "dark";

/** Hand-picked colours for one palette in one mode. Everything else is derived and checked for AA. */
interface Seed {
  bg: string;
  surface: string;
  elevated: string;
  text: string;
  accent: string;
  accent2: string;
  border?: string;
}

export interface Palette {
  id: string;
  label: string;
  description: string;
  dark: Seed;
  light: Seed;
}

/** Add a palette here and it appears in the picker, the CSS and the contrast test. */
export const palettes: Palette[] = [
  {
    id: "default",
    label: "Graphite",
    description: "Neutral grayscale with a single blue accent",
    dark: { bg: "#0A0A0B", surface: "#111113", elevated: "#18181B", text: "#FAFAF9", accent: "#3B82F6", accent2: "#8B5CF6" },
    light: { bg: "#FAFAF9", surface: "#FFFFFF", elevated: "#F4F4F2", text: "#18181B", accent: "#2563EB", accent2: "#7C3AED", border: "#E5E5E3" },
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep indigo and violet",
    dark: { bg: "#0B0B1A", surface: "#12122A", elevated: "#1A1A3A", text: "#EEF0FF", accent: "#818CF8", accent2: "#C084FC" },
    light: { bg: "#F7F7FF", surface: "#FFFFFF", elevated: "#EFEFFC", text: "#1B1B3A", accent: "#7C7FF7", accent2: "#A855F7" },
  },
  {
    id: "ember",
    label: "Ember",
    description: "Warm amber and orange on charcoal",
    dark: { bg: "#121110", surface: "#1A1816", elevated: "#24211E", text: "#FAF5EE", accent: "#F59E0B", accent2: "#F97316" },
    light: { bg: "#FFFBF5", surface: "#FFFFFF", elevated: "#FFF1E0", text: "#2A2118", accent: "#F59E0B", accent2: "#EA580C" },
  },
  {
    id: "forest",
    label: "Forest",
    description: "Deep green with muted sage",
    dark: { bg: "#0D130F", surface: "#131C16", elevated: "#1B2720", text: "#EDF4EE", accent: "#5FBF84", accent2: "#A3B899" },
    light: { bg: "#F4F7F2", surface: "#FFFFFF", elevated: "#E9F0E6", text: "#14231A", accent: "#3E9B63", accent2: "#7D9A75" },
  },
  {
    id: "rose",
    label: "Rose",
    description: "Dusty pink with plum",
    dark: { bg: "#140F13", surface: "#1D151B", elevated: "#281C25", text: "#FBF1F6", accent: "#F0A1C4", accent2: "#B07CC6" },
    light: { bg: "#FFF8FB", surface: "#FFFFFF", elevated: "#FCEAF2", text: "#2B1624", accent: "#E27AA6", accent2: "#8E4A9E" },
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Teal and cyan",
    dark: { bg: "#08131A", surface: "#0D1C26", elevated: "#14293A", text: "#E8F7FB", accent: "#22D3EE", accent2: "#2DD4BF" },
    light: { bg: "#F2FAFC", surface: "#FFFFFF", elevated: "#E3F3F7", text: "#0B2530", accent: "#0EA5C6", accent2: "#14B8A6" },
  },
  {
    id: "mono",
    label: "Mono",
    description: "Pure black and white, no accent",
    dark: { bg: "#000000", surface: "#0A0A0A", elevated: "#141414", text: "#FFFFFF", accent: "#FFFFFF", accent2: "#A3A3A3", border: "#3A3A3A" },
    light: { bg: "#FFFFFF", surface: "#F5F5F5", elevated: "#EBEBEB", text: "#000000", accent: "#000000", accent2: "#525252", border: "#BDBDBD" },
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Pink to orange gradient accent",
    dark: { bg: "#140D12", surface: "#1D131A", elevated: "#291A24", text: "#FFF3EE", accent: "#FB7185", accent2: "#FB923C" },
    light: { bg: "#FFF7F3", surface: "#FFFFFF", elevated: "#FFE9E0", text: "#2A1620", accent: "#F43F5E", accent2: "#F97316" },
  },
  {
    id: "cyber",
    label: "Cyber",
    description: "Neon magenta and electric blue",
    dark: { bg: "#090714", surface: "#100C20", elevated: "#1A1333", text: "#F2EEFF", accent: "#FF2BD6", accent2: "#4D7CFF" },
    light: { bg: "#F8F5FF", surface: "#FFFFFF", elevated: "#EFE8FF", text: "#1A1033", accent: "#D946EF", accent2: "#3B82F6" },
  },
  {
    id: "paper",
    label: "Paper",
    description: "Warm cream, editorial feel",
    dark: { bg: "#17140F", surface: "#1F1B15", elevated: "#2A251D", text: "#F3EBDD", accent: "#D9A66B", accent2: "#A67C52" },
    light: { bg: "#F6F0E4", surface: "#FBF7EE", elevated: "#EFE6D4", text: "#2B2418", accent: "#C58A3D", accent2: "#8A6A3F" },
  },
];

export const defaultPaletteId = palettes[0]!.id;
export const isPaletteId = (id: string | null | undefined): id is string => palettes.some((p) => p.id === id);

export const TEXT_AA = 4.5;
const INK = "#0A0A0B";
const WHITE = "#FFFFFF";

export interface Tokens {
  background: string;
  surface: string;
  "surface-elevated": string;
  "surface-hover": string;
  "text-primary": string;
  "text-secondary": string;
  "text-muted": string;
  "accent-primary": string;
  "accent-secondary": string;
  /** Accent tuned for text/icons on the page surfaces (>= 4.5:1). */
  "accent-text": string;
  "accent-secondary-text": string;
  "on-accent": string;
  border: string;
  ring: string;
  shadow: string;
  "shadow-strong": string;
  /** Always-dark (or lifted, in dark mode) panel used for hero card and contact. */
  panel: string;
  "panel-fg": string;
  "panel-muted": string;
  "panel-chip": string;
  "panel-line": string;
  "accent-on-panel": string;
  "cat-ml": string;
  "cat-genai": string;
  "cat-vision": string;
  "cat-backend": string;
  gradient: string;
}

export function buildTokens(palette: Palette, mode: Mode): Tokens {
  const s = palette[mode];
  const dark = mode === "dark";
  const surfaces = [s.bg, s.surface, s.elevated];
  const hover = mix(s.elevated, s.text, 0.06);
  const allSurfaces = [...surfaces, hover];
  const toward = dark ? "lighter" : "darker";

  const accentText = ensureContrast(s.accent, allSurfaces, TEXT_AA + 0.1, toward);
  const accent2Text = ensureContrast(s.accent2, allSurfaces, TEXT_AA + 0.1, toward);
  const onAccent = contrast(INK, s.accent) >= contrast(WHITE, s.accent) ? INK : WHITE;

  // Panel: lifted surface in dark mode, inverted ink block in light mode.
  const panel = dark ? s.elevated : mix(s.text, s.bg, 0.08);
  const panelFg = dark ? s.text : s.bg;
  const panelMuted = fadeWithContrast(panelFg, panel, [panel], TEXT_AA + 0.1);
  const accentOnPanel = ensureContrast(s.accent, [panel], TEXT_AA + 0.1, "lighter");

  const catRotation = (deg: number) => ensureContrast(rotateHue(s.accent, deg), allSurfaces, TEXT_AA + 0.1, toward);

  return {
    background: s.bg,
    surface: s.surface,
    "surface-elevated": s.elevated,
    "surface-hover": hover,
    "text-primary": s.text,
    "text-secondary": fadeWithContrast(s.text, s.bg, allSurfaces, 8),
    "text-muted": fadeWithContrast(s.text, s.bg, allSurfaces, TEXT_AA + 0.1),
    "accent-primary": s.accent,
    "accent-secondary": s.accent2,
    "accent-text": accentText,
    "accent-secondary-text": accent2Text,
    "on-accent": onAccent,
    border: s.border ?? mix(s.bg, s.text, dark ? 0.14 : 0.12),
    ring: accentText,
    shadow: rgba(dark ? "#000000" : s.text, dark ? 0.5 : 0.1),
    "shadow-strong": rgba(dark ? "#000000" : s.text, dark ? 0.7 : 0.22),
    panel,
    "panel-fg": panelFg,
    "panel-muted": panelMuted,
    "panel-chip": mix(panel, panelFg, 0.12),
    "panel-line": rgba(panelFg, 0.18),
    "accent-on-panel": accentOnPanel,
    "cat-ml": accentText,
    "cat-genai": accent2Text,
    "cat-vision": catRotation(140),
    "cat-backend": catRotation(250),
    gradient: `linear-gradient(135deg, ${accentText}, ${accent2Text})`,
  };
}

const block = (selector: string, tokens: Tokens) =>
  `${selector}{${Object.entries(tokens)
    .map(([k, v]) => `--${k}:${v}`)
    .join(";")}}`;

/** CSS for every palette x mode. Light is the base; `.dark` on <html> switches mode. */
export function themesCss(): string {
  return palettes
    .map((p) => {
      const attr = `[data-palette="${p.id}"]`;
      const base = p.id === defaultPaletteId ? `:root,${attr}` : attr;
      return block(base, buildTokens(p, "light")) + block(`.dark${attr},.dark ${attr}`, buildTokens(p, "dark"));
    })
    .join("\n") +
    // Default palette in dark mode when no data-palette attribute is set yet.
    `\n${block(".dark", buildTokens(palettes[0]!, "dark"))}`;
}
