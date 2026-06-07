with open("src/components/NeuralNetworkDiagram.tsx", "r") as f:
    content = f.read()

content = content.replace('          const lineStyle: CSSProperties = animated ? {\n            "--path-length": conn.length,\n            strokeDasharray: conn.length,\n            strokeDashoffset: conn.length,\n            animation: `lineFlow 3s ${conn.animationDelay}s ease-in-out infinite`,\n          } : {};', '          const lineStyle = animated ? {\n            "--path-length": conn.length,\n            strokeDasharray: conn.length,\n            strokeDashoffset: conn.length,\n            animation: `lineFlow 3s ${conn.animationDelay}s ease-in-out infinite`,\n          } as CSSProperties : {};')

with open("src/components/NeuralNetworkDiagram.tsx", "w") as f:
    f.write(content)
