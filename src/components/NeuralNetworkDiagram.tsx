"use client";
import { useEffect, useRef } from "react";

interface NeuralNetworkDiagramProps {
  className?: string;
  nodeCount?: number[];
  animated?: boolean;
}

export default function NeuralNetworkDiagram({
  className = "",
  nodeCount = [4, 6, 6, 4, 2],
  animated = true,
}: NeuralNetworkDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated || !svgRef.current) return;

    const connections = svgRef.current.querySelectorAll(".neural-connection");
    connections.forEach((connection, index) => {
      const line = connection as SVGLineElement;
      const length = Math.sqrt(
        Math.pow(parseFloat(line.getAttribute("x2") || "0") - parseFloat(line.getAttribute("x1") || "0"), 2) +
        Math.pow(parseFloat(line.getAttribute("y2") || "0") - parseFloat(line.getAttribute("y1") || "0"), 2)
      );
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      line.style.animation = `lineFlow 3s ${index * 0.05}s ease-in-out infinite`;
    });
  }, [animated]);

  const width = 600;
  const height = 400;
  const layerSpacing = width / (nodeCount.length + 1);

  const getNodePosition = (layerIndex: number, nodeIndex: number, totalNodes: number) => {
    const x = layerSpacing * (layerIndex + 1);
    const nodeSpacing = height / (totalNodes + 1);
    const y = nodeSpacing * (nodeIndex + 1);
    return { x, y };
  };

  const layers = nodeCount.map((count, layerIndex) => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const { x, y } = getNodePosition(layerIndex, i, count);
      nodes.push({ x, y, layerIndex, nodeIndex: i });
    }
    return nodes;
  });

  const connections: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  for (let i = 0; i < layers.length - 1; i++) {
    const currentLayer = layers[i];
    const nextLayer = layers[i + 1];
    currentLayer.forEach((node, ni) => {
      nextLayer.forEach((nextNode, nj) => {
        connections.push({
          x1: node.x,
          y1: node.y,
          x2: nextNode.x,
          y2: nextNode.y,
          key: `${i}-${ni}-${nj}`,
        });
      });
    });
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 8px rgba(0, 217, 255, 0.2))" }}
      >
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>
            {`
              @keyframes lineFlow {
                0% { stroke-dashoffset: 100; opacity: 0.2; }
                50% { opacity: 0.6; }
                100% { stroke-dashoffset: 0; opacity: 0.2; }
              }
              @keyframes nodePulse {
                0%, 100% { r: 8; opacity: 0.8; }
                50% { r: 10; opacity: 1; }
              }
            `}
          </style>
        </defs>

        {/* Connections */}
        {connections.map((conn) => (
          <line
            key={conn.key}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            className="neural-connection"
            stroke="url(#nodeGradient)"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Nodes */}
        {layers.map((layer, layerIndex) =>
          layer.map((node, nodeIndex) => (
            <g key={`node-${layerIndex}-${nodeIndex}`}>
              {/* Outer glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1"
                opacity="0.2"
                filter="url(#glow)"
              />
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="#1A1F2E"
                stroke="url(#nodeGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                style={{
                  animation: animated
                    ? `nodePulse 2s ${(layerIndex * 0.2 + nodeIndex * 0.1)}s ease-in-out infinite`
                    : undefined,
                }}
              />
              {/* Inner highlight */}
              <circle
                cx={node.x - 2}
                cy={node.y - 2}
                r="3"
                fill="#00D9FF"
                opacity="0.4"
              />
            </g>
          ))
        )}

        {/* Layer labels */}
        {["Input", "Hidden", "Hidden", "Hidden", "Output"].slice(0, nodeCount.length).map((label, i) => (
          <text
            key={`label-${i}`}
            x={layerSpacing * (i + 1)}
            y={height - 20}
            textAnchor="middle"
            fill="#64748B"
            fontSize="12"
            fontFamily="Inter, sans-serif"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
