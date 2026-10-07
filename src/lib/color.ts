/** Small colour toolkit: just enough for deriving accessible theme tokens. */
export type RGB = [number, number, number];

export const hexToRgb = (hex: string): RGB => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbToHex = ([r, g, b]: RGB): string =>
  "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

const channel = (v: number) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export const luminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/** WCAG 2.x contrast ratio between two hex colours. */
export const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

/** Linear mix: t=0 returns a, t=1 returns b. */
export const mix = (a: string, b: string, t: number): string => {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
};

export const rgba = (hex: string, alpha: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type HSL = [number, number, number];

export const hexToHsl = (hex: string): HSL => {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255) as RGB;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  return [h, s, l];
};

export const hslToHex = ([h, s, l]: HSL): string => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return rgbToHex([(r + m) * 255, (g + m) * 255, (b + m) * 255]);
};

const minContrast = (fg: string, backgrounds: string[]) => Math.min(...backgrounds.map((bg) => contrast(fg, bg)));

/**
 * Nudges `color` lighter or darker (keeping hue and saturation) until it reaches
 * `target` contrast against every background. Returns the input untouched if it already passes.
 */
export function ensureContrast(color: string, backgrounds: string[], target: number, direction: "lighter" | "darker"): string {
  if (minContrast(color, backgrounds) >= target) return color;
  const [h, s, l] = hexToHsl(color);
  const step = direction === "lighter" ? 0.01 : -0.01;
  let next = l;
  for (let i = 0; i < 100; i++) {
    next = Math.min(1, Math.max(0, next + step));
    const candidate = hslToHex([h, s, next]);
    if (minContrast(candidate, backgrounds) >= target) return candidate;
  }
  return direction === "lighter" ? "#ffffff" : "#000000";
}

/** Mixes `from` toward `to` as far as possible while keeping `target` contrast on every background. */
export function fadeWithContrast(from: string, to: string, backgrounds: string[], target: number): string {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (minContrast(mix(from, to, mid), backgrounds) >= target) lo = mid;
    else hi = mid;
  }
  return mix(from, to, lo);
}

export const rotateHue = (hex: string, degrees: number): string => {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex([(h + degrees + 360) % 360, s, l]);
};
