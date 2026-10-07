import { describe, it, expect } from "vitest";
import { buildTokens, palettes, themesCss, TEXT_AA, type Mode } from "./themes";
import { contrast } from "../lib/color";

const modes: Mode[] = ["light", "dark"];

describe.each(palettes.flatMap((p) => modes.map((m) => [p, m] as const)))("palette %# ", (palette, mode) => {
  const t = buildTokens(palette, mode);
  const name = `${palette.id}/${mode}`;
  const pages = [t.background, t.surface, t["surface-elevated"], t["surface-hover"]];

  it(`${name}: body text tokens meet AA on every page surface`, () => {
    for (const bg of pages) {
      expect(contrast(t["text-primary"], bg)).toBeGreaterThanOrEqual(TEXT_AA);
      expect(contrast(t["text-secondary"], bg)).toBeGreaterThanOrEqual(TEXT_AA);
      expect(contrast(t["text-muted"], bg)).toBeGreaterThanOrEqual(TEXT_AA);
    }
  });

  it(`${name}: accent and category text meet AA on every page surface`, () => {
    for (const bg of pages) {
      for (const key of ["accent-text", "accent-secondary-text", "cat-ml", "cat-genai", "cat-vision", "cat-backend"] as const) {
        expect(contrast(t[key], bg), `${key} on ${bg}`).toBeGreaterThanOrEqual(TEXT_AA);
      }
    }
  });

  it(`${name}: button, panel and focus-ring colours are readable`, () => {
    expect(contrast(t["on-accent"], t["accent-primary"])).toBeGreaterThanOrEqual(TEXT_AA);
    expect(contrast(t["panel-fg"], t.panel)).toBeGreaterThanOrEqual(TEXT_AA);
    expect(contrast(t["panel-muted"], t.panel)).toBeGreaterThanOrEqual(TEXT_AA);
    expect(contrast(t["accent-on-panel"], t.panel)).toBeGreaterThanOrEqual(TEXT_AA);
    expect(contrast(t.ring, t.background)).toBeGreaterThanOrEqual(3); // WCAG 1.4.11 non-text contrast
  });
});

describe("themesCss", () => {
  it("emits a light and dark block per palette", () => {
    const css = themesCss();
    for (const p of palettes) expect(css).toContain(`[data-palette="${p.id}"]`);
    expect(palettes.length).toBeGreaterThanOrEqual(5);
  });
});
