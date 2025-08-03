"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import Scene3D from './Scene3D';
import { useMousePosition, useWebGLSupport, useReducedMotion } from './hooks';
import Link from 'next/link';
import Hero from '../Hero';

// Floating geometric avatar component
function GeometricAvatar({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (prefersReducedMotion) return;
    
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Gentle rotation and mouse tracking
      groupRef.current.rotation.y = t * 0.2 + mousePosition.x * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + mousePosition.y * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.5;
      torusRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
        <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshPhongMaterial 
            color="#2563eb" 
            transparent 
            opacity={0.8}
            shininess={100}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Torus 
          ref={torusRef} 
          args={[1.5, 0.2, 16, 100]} 
          position={[2, 0, 0]}
        >
          <meshPhongMaterial 
            color="#1d4ed8" 
            transparent 
            opacity={0.6}
          />
        </Torus>
      </Float>

      {/* Small floating cubes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.4}>
            <Box 
              args={[0.2, 0.2, 0.2]} 
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius
              ]}
            >
              <meshPhongMaterial 
                color={i % 2 === 0 ? "#3b82f6" : "#1e40af"} 
                transparent 
                opacity={0.7}
              />
            </Box>
          </Float>
        );
      })}
    </group>
  );
}

// Particle system component
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (prefersReducedMotion || !particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.05;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      (positions as Float32Array)[i] = Math.sin(time * 0.5 + i) * 0.1;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main Interactive3DHero component
export default function Interactive3DHero() {
  const mousePosition = useMousePosition();
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();

  // Fallback to original Hero component for unsupported devices
  if (!hasWebGL || isLowEndDevice) {
    return <Hero />;
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-br from-white via-blue-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          
          {/* 3D Interactive Avatar */}
          <div className="flex-1 order-1 lg:order-2 h-[500px] relative">
            <Scene3D
              camera={{ position: [0, 0, 8], fov: 50 }}
              className="w-full h-full"
            >
              <ParticleField />
              <GeometricAvatar mousePosition={mousePosition} />
              
              {/* Lighting setup */}
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, 5, -5]} intensity={0.5} color="#3b82f6" />
            </Scene3D>
          </div>

          {/* Academic Profile Information */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="space-y-8">
              {/* Academic Header */}
              <div className="border-l-4 border-blue-900 pl-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Muzammil Nawaz Khan
                </h1>
                <h2 className="text-xl md:text-2xl text-blue-900 font-semibold mb-2">
                  Computer Engineering Graduate
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  National University of Sciences and Technology (NUST)
                </p>
              </div>

              {/* Academic Focus Areas */}
              <div className="bg-white/80 backdrop-blur-sm p-6 border border-gray-200 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Research Interests
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Artificial Intelligence:</strong> Specializing in machine learning algorithms, 
                    deep learning architectures, and neural network optimization for real-world applications.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Computer Vision:</strong> Developing advanced image processing techniques 
                    and pattern recognition systems for medical imaging and security applications.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Biomedical AI:</strong> Applying artificial intelligence in healthcare, 
                    focusing on medical image segmentation and diagnostic support systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="#projects"
                className="bg-blue-900 text-white px-6 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Research Projects
              </Link>
              <Link
                href="#contact"
                className="border-2 border-blue-900 text-blue-900 px-6 py-3 font-semibold uppercase tracking-wide hover:bg-blue-900 hover:text-white transition-all duration-300 text-center transform hover:scale-105"
              >
                Academic Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}