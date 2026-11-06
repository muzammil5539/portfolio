import { workflows } from "@/data/workflows";

const W = 800;
const H = 500;
const BW = 200;
const BH = 92;
const GAP = 70;
const COLS = 3;

/** Greedy word wrap, so long step names fit the box. */
function wrap(text: string, max = 17): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && `${line} ${word}`.length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  lines.push(line);
  return lines;
}

/**
 * A project's workflow as inline SVG. Colours are the panel tokens from data/themes.ts, so the diagram
 * follows the active palette and mode (a static <img> SVG cannot read CSS variables).
 */
export default function WorkflowDiagram({ id, title, className }: { id: string; title: string; className?: string }) {
  const steps = workflows[id];
  if (!steps) return null;

  const rows = Math.ceil(steps.length / COLS);
  const top = (H - (rows * BH + (rows - 1) * GAP)) / 2;
  const left = (W - (COLS * BW + (COLS - 1) * GAP)) / 2;
  // Snake layout: every second row runs right to left.
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / COLS);
    const c = r % 2 === 1 ? COLS - 1 - (i % COLS) : i % COLS;
    return { x: left + c * (BW + GAP), y: top + r * (BH + GAP), r };
  });
  const marker = `wf-arrow-${id}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${title} workflow: ${steps.join(", then ")}`}
      className={className}
    >
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-accent-on-panel" />
        </marker>
      </defs>
      <rect width={W} height={H} className="fill-panel" />
      {pos.slice(0, -1).map((a, i) => {
        const b = pos[i + 1]!;
        const sameRow = a.r === b.r;
        const ltr = b.x > a.x;
        const x1 = sameRow ? (ltr ? a.x + BW : a.x) : a.x + BW / 2;
        const x2 = sameRow ? (ltr ? b.x - 2 : b.x + BW + 2) : x1;
        const y1 = sameRow ? a.y + BH / 2 : a.y + BH;
        const y2 = sameRow ? y1 : b.y - 2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} markerEnd={`url(#${marker})`} className="stroke-accent-on-panel" />;
      })}
      {steps.map((label, i) => {
        const { x, y } = pos[i]!;
        const last = i === steps.length - 1;
        const lines = wrap(label);
        const first = y + 48 - (lines.length - 1) * 9;
        return (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={BW}
              height={BH}
              rx={14}
              strokeOpacity={last ? 1 : 0.5}
              className={last ? "fill-accent-primary stroke-accent-primary" : "fill-panel-chip stroke-accent-on-panel"}
            />
            <text x={x + 14} y={y + 24} fontSize={12} className={`font-mono ${last ? "fill-on-accent" : "fill-accent-on-panel"}`}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text fontSize={14.5} fontWeight={600} textAnchor="middle" className={last ? "fill-on-accent" : "fill-panel-fg"}>
              {lines.map((l, k) => (
                <tspan key={k} x={x + BW / 2} y={first + k * 18}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
