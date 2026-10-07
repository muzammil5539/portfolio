import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared social card: dark neutral ground, one blue accent, big title. Fonts are bundled by next/og. */
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const long = title.length > 70;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0A0B",
          color: "#FAFAF9",
          borderTop: "10px solid #3B82F6",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#60A5FA", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: long ? 56 : 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>{title}</div>
          {subtitle ? <div style={{ display: "flex", fontSize: 30, color: "#A1A1AA", lineHeight: 1.35 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A1A1AA" }}>
          <span>Muzammil Nawaz Khan · AI Engineer</span>
          <span>muzammil5539.vercel.app</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
