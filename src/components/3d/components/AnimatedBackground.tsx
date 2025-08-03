"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useScrollProgress } from '../hooks/use3d-animations';
import { optimizeForDevice, isWebGLSupported } from '../utils/webgl-utils';
import ClientOnly from '../utils/ClientOnly';

function FloatingGeometry({ position, color, size }: { position: [number, number, number], color: string, size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useScrollProgress();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.5;
    
    // Color morphing based on scroll
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const hue = (0.6 + scrollProgress * 0.4) % 1;
    material.color.setHSL(hue, 0.7, 0.5);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const { maxParticles } = optimizeForDevice();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(maxParticles * 3);
    
    for (let i = 0; i < maxParticles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [maxParticles]);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
    return geometry;
  }, [particlesPosition]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.x = time * 0.1;
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.05} color="#4f46e5" sizeAttenuation />
    </points>
  );
}

function Scene() {
  const { enableShadows } = optimizeForDevice();
  
  const geometries = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      color: `hsl(${220 + i * 20}, 70%, 60%)`,
      size: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow={enableShadows} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <ParticleSystem />
      
      {geometries.map((geom, index) => (
        <FloatingGeometry
          key={index}
          position={geom.position}
          color={geom.color}
          size={geom.size}
        />
      ))}
    </>
  );
}

function FallbackBackground() {
  const scrollProgress = useScrollProgress();
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `linear-gradient(${scrollProgress * 360}deg, 
          rgba(79, 70, 229, 0.1) 0%, 
          rgba(147, 51, 234, 0.1) 50%, 
          rgba(59, 130, 246, 0.1) 100%)`
      }}
    />
  );
}

export default function AnimatedBackground() {
  return (
    <ClientOnly fallback={<FallbackBackground />}>
      {isWebGLSupported() ? (
        <div className="fixed inset-0 pointer-events-none z-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ 
              antialias: optimizeForDevice().antialias,
              alpha: true,
              powerPreference: optimizeForDevice().powerPreference as WebGLPowerPreference
            }}
            dpr={optimizeForDevice().pixelRatio}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <FallbackBackground />
      )}
    </ClientOnly>
  );
}