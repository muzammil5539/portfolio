"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Scene3DProps {
  children: ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  lights?: boolean;
  shadows?: boolean;
  className?: string;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100 border border-gray-200 rounded">
      <div className="text-center p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">3D Content Unavailable</h3>
        <p className="text-sm text-gray-500 mb-4">
          Your device may not support WebGL or an error occurred loading 3D content.
        </p>
        <details className="text-xs text-gray-400">
          <summary className="cursor-pointer">Technical Details</summary>
          <pre className="mt-2 p-2 bg-gray-50 rounded text-left overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Loading 3D content...</p>
      </div>
    </div>
  );
}

export default function Scene3D({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  lights = true,
  shadows = true,
  className = "w-full h-full"
}: Scene3DProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={className}>
        <Canvas
          camera={camera}
          shadows={shadows}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]} // Pixel ratio range for performance
        >
          <Suspense fallback={null}>
            {lights && (
              <>
                <ambientLight intensity={0.3} />
                <directionalLight 
                  position={[10, 10, 5]} 
                  intensity={1}
                  castShadow={shadows}
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
              </>
            )}
            {children}
          </Suspense>
        </Canvas>
        
        {/* Loading overlay */}
        <Suspense fallback={<LoadingFallback />}>
          <div style={{ display: 'none' }}></div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}