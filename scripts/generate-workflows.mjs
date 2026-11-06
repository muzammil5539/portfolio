// Generates one workflow diagram (SVG) per project into public/projects/workflows/.
// Run: node --experimental-strip-types scripts/generate-workflows.mjs
// Steps live in src/data/workflows.ts. The site renders them inline (WorkflowDiagram.tsx); these SVGs are static copies.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../public/projects/workflows/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const { workflows } = await import("../src/data/workflows.ts");

const W = 800, H = 500, BW = 200, BH = 92, GAP = 70, COLS = 3;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function wrap(text, max = 17) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) { lines.push(line); line = word; }
    else line = line ? line + " " + word : word;
  }
  lines.push(line);
  return lines;
}

function svg(id, steps) {
  const rows = Math.ceil(steps.length / COLS);
  const rowY = (r) => (rows === 1 ? H / 2 - BH / 2 + 10 : 150 + r * (BH + 70));
  const left = (W - (COLS * BW + (COLS - 1) * GAP)) / 2;
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / COLS);
    let c = i % COLS;
    if (r % 2 === 1) c = COLS - 1 - c; // snake: second row runs right to left
    return { x: left + c * (BW + GAP), y: rowY(r), r };
  });
  const out = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(id)} workflow">`);
  out.push(`<defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#c6f36b"/></marker></defs>`);
  out.push(`<rect width="${W}" height="${H}" fill="#17211e"/>`);
  out.push(`<g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="13" fill="#abb6ae" letter-spacing="2"><text x="40" y="52">WORKFLOW</text></g>`);
  for (let i = 0; i < steps.length - 1; i++) {
    const a = pos[i], b = pos[i + 1];
    let x1, y1, x2, y2;
    if (a.r === b.r) {
      const ltr = b.x > a.x;
      x1 = ltr ? a.x + BW : a.x; x2 = ltr ? b.x - 2 : b.x + BW + 2;
      y1 = y2 = a.y + BH / 2;
    } else {
      x1 = x2 = a.x + BW / 2; y1 = a.y + BH; y2 = b.y - 2;
    }
    out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c6f36b" stroke-width="2" marker-end="url(#a)"/>`);
  }
  steps.forEach((label, i) => {
    const { x, y } = pos[i];
    const last = i === steps.length - 1;
    out.push(`<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="14" fill="${last ? "#c6f36b" : "#22302a"}" stroke="#c6f36b" stroke-opacity="${last ? 1 : 0.5}"/>`);
    out.push(`<text x="${x + 14}" y="${y + 24}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" fill="${last ? "#25483d" : "#c6f36b"}">${String(i + 1).padStart(2, "0")}</text>`);
    const lines = wrap(label);
    const start = y + 48 - ((lines.length - 1) * 9);
    out.push(`<text font-family="system-ui,Segoe UI,Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="${last ? "#18211f" : "#f2f2e9"}" text-anchor="middle">${lines.map((l, k) => `<tspan x="${x + BW / 2}" y="${start + k * 18}">${esc(l)}</tspan>`).join("")}</text>`);
  });
  out.push(`</svg>`);
  return out.join("\n");
}

for (const [id, steps] of Object.entries(workflows)) {
  writeFileSync(new URL(`${id}.svg`, OUT), svg(id, steps));
}
console.log(`wrote ${Object.keys(workflows).length} workflow diagrams`);
