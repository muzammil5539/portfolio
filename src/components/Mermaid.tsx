"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Diagrams read the active palette's CSS variables (src/data/themes.ts), so they match every palette and mode.
function mermaidThemeVariables() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(`--${name}`).trim();
  return {
    background: v("surface"),
    primaryColor: v("surface-elevated"),
    primaryTextColor: v("text-primary"),
    primaryBorderColor: v("accent-text"),
    lineColor: v("text-muted"),
    secondaryColor: v("surface-hover"),
    tertiaryColor: v("surface"),
    textColor: v("text-primary"),
    fontFamily: "var(--font-sans), system-ui, sans-serif",
  };
}

interface MermaidProps {
  chart: string;
}

// This component handles ONLY the Mermaid rendering and never updates its DOM via React after the first mount.
// This prevents React and Mermaid from fighting over the same elements.
// `themeKey` changes with mode or palette and forces a re-render in the new colours.
const MermaidRenderer = React.memo(({ chart, themeKey }: { chart: string; themeKey: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        themeVariables: mermaidThemeVariables(),
      });

      // Create a dedicated node for mermaid
      const targetNode = document.createElement('div');
      targetNode.id = id;
      // Provide raw text, stripping weird MDX artifacts
      targetNode.textContent = typeof chart === 'string' ? chart.trim() : String(chart).trim();

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(targetNode);

      // Run mermaid on this specific node
      mermaid.run({ nodes: [targetNode] }).then(() => {
        const svgElement = targetNode.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = 'none';
          svgElement.style.overflow = 'visible';
          
          // Size the viewBox from what was actually drawn. Mermaid's own viewBox can disagree with its content
          // (it measures labels before layout), which left blank space above and clipped the right edge.
          // 1 SVG unit = 1 px, plus padding so outer strokes are never clipped.
          const pad = 20;
          const box = svgElement.getBBox();
          svgElement.setAttribute('viewBox', `${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
          svgElement.setAttribute('width', String(box.width + 2 * pad));
          svgElement.setAttribute('height', String(box.height + 2 * pad));
        }
      }).catch(() => {});
    }
  }, [chart, id, themeKey]);

  return <div ref={containerRef} className="flex justify-center p-8" />;
});
MermaidRenderer.displayName = 'MermaidRenderer';

export default function Mermaid({ chart }: MermaidProps) {
  const { isDarkMode, palette } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setScale(1); // Reset zoom
  };

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));

  const btnClass = "p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-ai-cyan hover:border-ai-cyan/50 shadow-lg flex items-center justify-center w-10 h-10";

  return (
    <div className={`my-8 relative group ${isFullscreen ? 'fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8' : 'w-full overflow-x-auto custom-scrollbar'}`}>

      <div className={`absolute top-4 right-4 z-[110] flex gap-2 transition-opacity ${!isFullscreen ? 'opacity-70 group-hover:opacity-100' : ''}`}>
        {isFullscreen && (
          <>
            <button onClick={zoomOut} className={`${btnClass} text-xl leading-none`} aria-label="Zoom out">-</button>
            <button onClick={zoomIn} className={`${btnClass} text-xl leading-none`} aria-label="Zoom in">+</button>
          </>
        )}
        <button
          onClick={toggleFullscreen}
          className={btnClass}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      <div className={`bg-surface/50 border border-border rounded-xl transition-all duration-300 ${isFullscreen ? 'w-full h-full overflow-auto shadow-2xl' : 'w-full overflow-x-auto'}`}>
        <div className={`min-w-max ${!isFullscreen ? 'flex justify-center p-4' : 'p-8 md:p-16'}`}>
          <div
            className="transition-all duration-200"
            style={isFullscreen ? { zoom: scale } as React.CSSProperties : {}}
          >
            {/* The isolated renderer ensures React state changes (like zooming/fullscreen) NEVER destroy the SVG */}
            <MermaidRenderer chart={chart} themeKey={`${palette}-${isDarkMode}`} />
          </div>
        </div>
      </div>

      {isFullscreen && (
        <p className="text-white/60 text-sm mt-4 text-center shrink-0">
          Use the + / - buttons to zoom. Click the minimize button to return.
        </p>
      )}
    </div>
  );
}
