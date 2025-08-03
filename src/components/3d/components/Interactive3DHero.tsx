"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useMouseParallax, useIntersectionObserver } from '../hooks/use3d-animations';
import { motion } from 'framer-motion';
import { optimizeForDevice, isWebGLSupported } from '../utils/webgl-utils';
import ClientOnly from '../utils/ClientOnly';
import Link from "next/link";
import Image from "next/image";

function Avatar3D() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useMouseParallax(0.3);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Floating animation
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    
    // Mouse parallax
    groupRef.current.rotation.x = mousePosition.y * 0.5;
    groupRef.current.rotation.y = mousePosition.x * 0.5;
    
    // Gentle rotation
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Core Avatar Sphere */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Orbiting Elements */}
      <group>
        <Torus args={[1.8, 0.1, 8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#06b6d4" />
        </Torus>
        <Torus args={[2.2, 0.08, 8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#8b5cf6" />
        </Torus>
      </group>
      
      {/* Floating Skill Icons */}
      {['AI', 'CV', 'ML', 'DL'].map((skill, index) => (
        <group key={skill} position={[
          Math.cos(index * Math.PI / 2) * 3,
          Math.sin(index * Math.PI / 3) * 2,
          Math.sin(index * Math.PI / 4) * 1.5
        ]}>
          <Cylinder args={[0.3, 0.3, 0.1, 8]}>
            <meshStandardMaterial color="#f59e0b" />
          </Cylinder>
          <Text
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.06]}
          >
            {skill}
          </Text>
        </group>
      ))}
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const { maxParticles } = optimizeForDevice();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(maxParticles * 3);
    
    for (let i = 0; i < maxParticles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
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
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < maxParticles; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.01;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.03} color="#818cf8" sizeAttenuation />
    </points>
  );
}

function Scene3D() {
  const { enableShadows } = optimizeForDevice();
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} castShadow={enableShadows} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />
      
      <ParticleField />
      <Avatar3D />
    </>
  );
}

function Fallback3DHero() {
  return (
    <div className="relative">
      <motion.div
        className="bg-white border-2 border-gray-300 shadow-lg p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/portfolio.jpg"
            alt="Muzammil Nawaz Khan - Computer Engineering Graduate"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
            priority
          />
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-gray-900">Muzammil Nawaz Khan</p>
          <p className="text-xs text-gray-600 uppercase tracking-wide">B.E. Computer Engineering</p>
          <p className="text-xs text-gray-600">NUST, Pakistan</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Interactive3DHero() {
  const { isIntersecting, targetRef } = useIntersectionObserver();
  
  return (
    <section
      ref={targetRef}
      id="about"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Academic Profile Information */}
          <motion.div 
            className="flex-1 order-2 md:order-1"
            initial={{ x: -100, opacity: 0 }}
            animate={isIntersecting ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Academic Header */}
              <div className="border-l-4 border-blue-900 pl-6">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Muzammil Nawaz Khan
                </motion.h1>
                <motion.h2 
                  className="text-xl md:text-2xl text-blue-900 font-semibold mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Computer Engineering Graduate
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  National University of Sciences and Technology (NUST)
                </motion.p>
              </div>

              {/* Academic Focus Areas */}
              <motion.div 
                className="bg-gray-50 p-6 border border-gray-200"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isIntersecting ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
              >
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
              </motion.div>
            </div>

            {/* Academic Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ y: 40, opacity: 0 }}
              animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Link
                href="#projects"
                className="bg-blue-900 text-white px-6 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 text-center transform hover:scale-105"
              >
                View Research Projects
              </Link>
              <Link
                href="#contact"
                className="border-2 border-blue-900 text-blue-900 px-6 py-3 font-semibold uppercase tracking-wide hover:bg-blue-900 hover:text-white transition-colors duration-200 text-center transform hover:scale-105"
              >
                Academic Contact
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Avatar or Fallback */}
          <motion.div 
            className="flex-1 max-w-md order-1 md:order-2"
            initial={{ x: 100, opacity: 0 }}
            animate={isIntersecting ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <ClientOnly fallback={<Fallback3DHero />}>
              {isWebGLSupported() ? (
                <div className="h-96 w-full">
                  <Canvas
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    gl={{ 
                      antialias: optimizeForDevice().antialias,
                      alpha: true,
                      powerPreference: optimizeForDevice().powerPreference as WebGLPowerPreference
                    }}
                    dpr={optimizeForDevice().pixelRatio}
                  >
                    <Suspense fallback={null}>
                      <Scene3D />
                    </Suspense>
                  </Canvas>
                </div>
              ) : (
                <Fallback3DHero />
              )}
            </ClientOnly>
          </motion.div>
        </div>
      </div>
    </section>
  );
}