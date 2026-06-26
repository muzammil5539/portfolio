"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Maximize2, Minimize2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: false, // We will manually start it
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

interface MermaidProps {
  chart: string;
}

// This component handles ONLY the Mermaid rendering and never updates its DOM via React after the first mount.
// This prevents React and Mermaid from fighting over the same elements.
const MermaidRenderer = React.memo(({ chart }: { chart: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    if (containerRef.current) {
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
            const [x, y, w, h] = viewBox.split(' ').map(Number);
            // Expand the box by 20px on all sides
            svgElement.setAttribute('viewBox', `${x - 20} ${y - 20} ${w + 40} ${h + 40}`);
            // Also increase the explicit height/width attributes so the parent scroll container grows
            const width = parseFloat(svgElement.getAttribute('width') || String(w));
            const height = parseFloat(svgElement.getAttribute('height') || String(h));
            svgElement.setAttribute('width', String(width + 40));
            svgElement.setAttribute('height', String(height + 40));
          }
        }
      }).catch(() => {});
    }
  }, [chart, id]);

  return <div ref={containerRef} className="flex justify-center p-8" />;
});
MermaidRenderer.displayName = 'MermaidRenderer';

export default function Mermaid({ chart }: MermaidProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setScale(1); // Reset zoom
  };

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));

  return (
    <div className={`my-8 relative group ${isFullscreen ? 'fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8' : 'w-full overflow-x-auto custom-scrollbar'}`}>
      
      <div className={`absolute top-4 right-4 z-[110] flex gap-2 transition-all ${!isFullscreen ? 'opacity-0 group-hover:opacity-100' : ''}`}>
        {isFullscreen && (
          <>
            <button onClick={zoomOut} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg text-xl leading-none w-10 h-10 flex items-center justify-center">-</button>
            <button onClick={zoomIn} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg text-xl leading-none w-10 h-10 flex items-center justify-center">+</button>
          </>
        )}
        <button 
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg flex items-center justify-center w-10 h-10"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      <div className={`bg-slate-900/50 border border-slate-700/50 rounded-xl transition-all duration-300 ${isFullscreen ? 'w-full h-full overflow-auto shadow-2xl shadow-cyan-900/20' : 'w-full overflow-x-auto'}`}>
        <div className={`min-w-max ${!isFullscreen ? 'flex justify-center p-4' : 'p-8 md:p-16'}`}>
          <div 
            className="transition-all duration-200"
            style={isFullscreen ? { zoom: scale } as React.CSSProperties : {}}
          >
            {/* The isolated renderer ensures React state changes (like zooming/fullscreen) NEVER destroy the SVG */}
            <MermaidRenderer chart={chart} />
          </div>
        </div>
      </div>
      
      {isFullscreen && (
        <p className="text-slate-400 text-sm mt-4 text-center shrink-0">
          Use the + / - buttons to zoom. Click the minimize button to return.
        </p>
      )}
    </div>
  );
}
