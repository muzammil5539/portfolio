"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/use3d-animations';
import { useReducedMotion } from '../hooks/useAccessibility';
import { optimizeForDevice, isWebGLSupported } from '../utils/webgl-utils';
import ClientOnly from '../utils/ClientOnly';

const experienceData = {
  title: "Biomedical AI Research and Development Intern",
  company: "RiseTech - Islamabad, Pakistan",
  period: "July 2024 - Sept 2024",
  accomplishments: [
    "Developed 3D medical image segmentation models using BraTS2020 dataset for brain tumor diagnosis",
    "Implemented SegFormer3D and UNet 3D architectures using TensorFlow and PyTorch",
    "Optimized deep learning models for improved accuracy in tumor segmentation",
    "Evaluated model performance using dice scores and IoU metrics",
    "Streamlined workflows by establishing models as benchmarks for future comparisons"
  ],
  technologies: ["Python", "TensorFlow", "PyTorch", "Medical Imaging", "3D Segmentation", "Deep Learning"]
};

function TimelineNode({ position, index, isActive }: {
  position: [number, number, number];
  index: number;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle pulsing animation
    const scale = isActive ? 1.2 + Math.sin(time * 2) * 0.1 : 1;
    meshRef.current.scale.setScalar(scale);
    
    // Subtle rotation
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <Sphere args={[0.15, 16, 16]}>
          <meshStandardMaterial
            color={isActive ? "#3b82f6" : "#64748b"}
            metalness={0.6}
            roughness={0.2}
            emissive={isActive ? "#1e40af" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
          />
        </Sphere>
      </mesh>
      
      {/* Connection line to next node */}
      {index < 4 && (
        <Cylinder
          args={[0.02, 0.02, 1, 8]}
          position={[0, -0.5, 0]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
      )}
    </group>
  );
}

function TimelineText({ position, text, isTitle = false }: {
  position: [number, number, number];
  text: string;
  isTitle?: boolean;
}) {
  return (
    <Text
      position={position}
      fontSize={isTitle ? 0.2 : 0.15}
      color={isTitle ? "#1e40af" : "#64748b"}
      anchorX="left"
      anchorY="middle"
      maxWidth={4}
    >
      {text}
    </Text>
  );
}

function Timeline3DScene() {
  const { enableShadows } = optimizeForDevice();
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} castShadow={enableShadows} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#3b82f6" />
      
      {/* Timeline nodes */}
      {experienceData.accomplishments.map((_, index) => (
        <TimelineNode
          key={index}
          position={[-2, 2 - index * 1, 0]}
          index={index}
          isActive={index === 0}
        />
      ))}
      
      {/* Timeline text */}
      <TimelineText
        position={[-1.5, 2.5, 0]}
        text={experienceData.title}
        isTitle={true}
      />
      
      <TimelineText
        position={[-1.5, 2.2, 0]}
        text={experienceData.company}
      />
      
      <TimelineText
        position={[-1.5, 1.9, 0]}
        text={experienceData.period}
      />
      
      {experienceData.accomplishments.map((accomplishment, index) => (
        <TimelineText
          key={index}
          position={[-1.5, 2 - index * 1, 0]}
          text={accomplishment}
        />
      ))}
    </>
  );
}

function FallbackExperience() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="bg-white border-2 border-gray-300 shadow-sm">
      <div className="bg-gray-100 border-b border-gray-300 p-4">
        <motion.h3 
          className="text-lg font-bold text-gray-900 uppercase tracking-wide"
          initial={prefersReducedMotion ? {} : { x: -20, opacity: 0 }}
          animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {experienceData.title}
        </motion.h3>
        <p className="text-gray-600">{experienceData.company}</p>
        <p className="text-gray-500 text-sm">{experienceData.period}</p>
      </div>
      
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Key Accomplishments:</h4>
        <ul className="space-y-3 mb-6">
          {experienceData.accomplishments.map((accomplishment, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={prefersReducedMotion ? {} : { x: -20, opacity: 0 }}
              animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="text-blue-600 mr-3 text-xl">•</span>
              <span className="text-gray-700">{accomplishment}</span>
            </motion.li>
          ))}
        </ul>
        
        <h4 className="text-lg font-bold text-gray-900 mb-3">Technologies & Methods:</h4>
        <div className="flex flex-wrap gap-2">
          {experienceData.technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={prefersReducedMotion ? {} : { scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Interactive3DTimeline() {
  const { isIntersecting, targetRef } = useIntersectionObserver();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={targetRef}
      id="experience"
      className="py-16 bg-gray-50 relative"
      aria-label="Professional Experience"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={prefersReducedMotion ? {} : { y: -40, opacity: 0 }}
          animate={isIntersecting && !prefersReducedMotion ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto"></div>
        </motion.div>

        {/* 3D Timeline or Fallback */}
        <ClientOnly fallback={<FallbackExperience />}>
          {isWebGLSupported() && isIntersecting && !prefersReducedMotion ? (
            <motion.div 
              className="relative h-96 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ 
                  antialias: optimizeForDevice().antialias,
                  alpha: true,
                  powerPreference: optimizeForDevice().powerPreference as WebGLPowerPreference
                }}
                dpr={optimizeForDevice().pixelRatio}
              >
                <Suspense fallback={null}>
                  <Timeline3DScene />
                </Suspense>
              </Canvas>
              
              <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                Interactive 3D timeline • Scroll to explore experience
              </div>
            </motion.div>
          ) : (
            <FallbackExperience />
          )}
        </ClientOnly>
      </div>
    </section>
  );
}