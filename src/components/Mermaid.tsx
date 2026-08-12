"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Maximize2, Minimize2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Mirrors the site's CSS variable palette (globals.css) so diagrams match the
// active theme instead of mermaid's default dark/purple look.
function mermaidThemeVariables(dark: boolean) {
  return dark
    ? {
        background: "#22302a",
        primaryColor: "#2a3932",
        primaryTextColor: "#f2f2e9",
        primaryBorderColor: "#c6f36b",
        lineColor: "#abb6ae",
        secondaryColor: "#33443b",
        tertiaryColor: "#202c27",
        textColor: "#f2f2e9",
        fontFamily: "Inter, sans-serif",
      }
    : {
        background: "#fffefa",
        primaryColor: "#f8f7f1",
        primaryTextColor: "#18211f",
        primaryBorderColor: "#25483d",
        lineColor: "#66716c",
        secondaryColor: "#eeeee6",
        tertiaryColor: "#e9e8e1",
        textColor: "#18211f",
        fontFamily: "Inter, sans-serif",
      };
}

interface MermaidProps {
  chart: string;
}

// This component handles ONLY the Mermaid rendering and never updates its DOM via React after the first mount.
// This prevents React and Mermaid from fighting over the same elements.
const MermaidRenderer = React.memo(({ chart, isDarkMode }: { chart: string; isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        themeVariables: mermaidThemeVariables(isDarkMode),
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
          
          // Manually expand the viewBox to ensure outer strokes are never clipped!
          const viewBox = svgElement.getAttribute('viewBox');
          if (viewBox) {
            const [x = 0, y = 0, w = 0, h = 0] = viewBox.split(' ').map(Number);
            // Expand the box by 20px on all sides
            svgElement.setAttribute('viewBox', `${x - 20} ${y - 20} ${w + 40} ${h + 40}`);
            // Mermaid's own width/height attrs are frequently way smaller than the
            // viewBox (a scale mismatch that shrinks every node/label). Derive the
            // rendered size from the viewBox itself so 1 SVG unit = 1 px.
            svgElement.setAttribute('width', String(w + 40));
            svgElement.setAttribute('height', String(h + 40));
          }
        }
      }).catch(() => {});
    }
  }, [chart, id, isDarkMode]);

  return <div ref={containerRef} className="flex justify-center p-8" />;
});
MermaidRenderer.displayName = 'MermaidRenderer';

export default function Mermaid({ chart }: MermaidProps) {
  const { isDarkMode } = useTheme();
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
            <MermaidRenderer chart={chart} isDarkMode={isDarkMode} />
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
