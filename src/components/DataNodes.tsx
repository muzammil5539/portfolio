"use client";
import { useMemo } from "react";

interface DataNodesProps {
  className?: string;
  count?: number;
}

export default function DataNodes({ className = "", count = 8 }: DataNodesProps) {
  // Use useMemo to ensure consistent node positions on server and client
  const nodes = useMemo(() => {
    const nodeArray = [];
    for (let i = 0; i < count; i++) {
      nodeArray.push({
        id: i,
        size: 8,
        delay: i * 0.3,
        x: 15 + (i % 4) * 25,
        y: 25 + Math.floor(i / 4) * 35,
      });
    }
    return nodeArray;
  }, [count]);

  // Generate connections only between valid node indices
  const connections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    for (let i = 0; i < count - 1; i++) {
      // Connect adjacent nodes
      if ((i + 1) % 4 !== 0) {
        conns.push({ from: i, to: i + 1 });
      }
      // Connect to node in next row if it exists
      if (i + 4 < count) {
        conns.push({ from: i, to: i + 4 });
      }
    }
    return conns;
  }, [count]);

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="dataNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="dataGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={`conn-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#dataNodeGradient)"
              strokeWidth="0.5"
              strokeDasharray="4 2"
              opacity="0.4"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Outer glow ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + 3}
              fill="none"
              stroke="#00D9FF"
              strokeWidth="0.5"
              opacity="0.3"
              filter="url(#dataGlow)"
            />
            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="#1A1F2E"
              stroke="url(#dataNodeGradient)"
              strokeWidth="1.5"
              filter="url(#dataGlow)"
            />
            {/* Inner highlight */}
            <circle
              cx={node.x - node.size * 0.2}
              cy={node.y - node.size * 0.2}
              r={node.size * 0.3}
              fill="#00D9FF"
              opacity="0.4"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
