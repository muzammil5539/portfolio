"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/use3d-animations';
import { optimizeForDevice, isWebGLSupported } from '../utils/webgl-utils';
import { useTheme } from '@/context/ThemeContext';
import ClientOnly from '../utils/ClientOnly';
import Image from 'next/image';

const projects = [
  {
    title: "Luggage Threat Detection",
    description: "Developed ANN architecture for image classification of potential threats in luggage images with high accuracy in threat identification.",
    image: "/projects/luggage.jpg",
    tags: ["Python", "ANN", "OpenCV", "Image Classification"],
    color: "#ef4444"
  },
  {
    title: "License Plate Recognition",
    description: "Created pipeline for license plate localization using edge detection and implemented robust plate isolation system.",
    image: "/projects/licencse_plate.png",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    color: "#3b82f6"
  },
  {
    title: "Braille Digits Recognition",
    description: "Built system to recognize Braille characters through dot pattern analysis and distance metrics for character differentiation.",
    image: "/projects/Braille.png",
    tags: ["Python", "OpenCV", "Pattern Recognition"],
    color: "#10b981"
  },
  {
    title: "Cat Dog Classification",
    description: "Implemented CNN models with and without pooling and dropout layers, demonstrating regularization techniques.",
    image: "/projects/classification.png",
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    color: "#8b5cf6"
  },
  {
    title: "Skin Image Segmentation",
    description: "Designed segmentation system using Connected Component Labeling and achieved accurate results with IoU metrics.",
    image: "/projects/skin.png",
    tags: ["Python", "OpenCV", "Image Segmentation"],
    color: "#f59e0b"
  },
  {
    title: "Retinal Image Segmentation",
    description: "Developed method for segmenting retinal structures using point and multi-level thresholding techniques.",
    image: "/projects/retinal.png",
    tags: ["Python", "OpenCV", "Medical Imaging"],
    color: "#06b6d4"
  },
];

function Project3DCard({ project, position, index, onHover, onLeave, onClick, isHovered }: {
  project: typeof projects[0];
  position: [number, number, number];
  index: number;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(time + index) * 0.2;
    
    // Rotation on hover
    const targetRotationY = isHovered ? Math.PI : 0;
    cardRef.current.rotation.y = THREE.MathUtils.lerp(
      cardRef.current.rotation.y,
      targetRotationY,
      0.1
    );
    
    // Scale on hover
    const targetScale = isHovered ? 1.2 : 1;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
    );
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Front Side */}
      <mesh
        ref={cardRef}
        onPointerOver={onHover}
        onPointerOut={onLeave}
        onClick={onClick}
      >
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial
          color={project.color}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Back Side - Project Details */}
      <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Front Content */}
      <Html
        distanceFactor={5}
        position={[0, 0, 0.06]}
        transform
        occlude
      >
        <div className="w-48 h-60 p-4 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="w-16 h-16 mb-3 relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-sm font-bold text-white mb-2 leading-tight">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1 justify-center">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Html>
      
      {/* Back Content */}
      <Html
        distanceFactor={5}
        position={[0, 0, -0.06]}
        transform
        rotation={[0, Math.PI, 0]}
        occlude
      >
        <div className="w-48 h-60 p-4 flex flex-col justify-center text-center pointer-events-none">
          <h3 className="text-sm font-bold text-white mb-3 leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-gray-300 mb-3 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 justify-center">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Projects3DScene({ onProjectSelect }: { onProjectSelect: (project: typeof projects[0]) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projectPositions: [number, number, number][] = [
    [-4, 2, 0],
    [0, 2, 0],
    [4, 2, 0],
    [-4, -1, 0],
    [0, -1, 0],
    [4, -1, 0],
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      {projects.map((project, index) => (
        <Project3DCard
          key={index}
          project={project}
          position={projectPositions[index]}
          index={index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          onClick={() => onProjectSelect(project)}
          isHovered={hoveredIndex === index}
        />
      ))}
    </>
  );
}

function ProjectDetailModal({ project, onClose }: {
  project: typeof projects[0] | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.7, opacity: 0, rotateY: 90 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity"
            >
              ×
            </button>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {project.title}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-white rounded-full"
                  style={{ backgroundColor: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FallbackProjects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectShowcase3D() {
  const { isDarkMode } = useTheme();
  const { isIntersecting, targetRef } = useIntersectionObserver();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectSelect = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <section
      ref={targetRef}
      id="projects"
      className={`py-16 md:py-24 relative ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ y: -40, opacity: 0 }}
          animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Featured Projects
          </h2>
          <div className="w-20 md:w-24 h-1 bg-blue-600 mx-auto"></div>
          <p
            className={`text-base sm:text-xl mt-6 mb-0 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Interactive 3D showcase of AI and machine learning projects with immersive hover effects
          </p>
        </motion.div>

        {/* 3D Projects Showcase or Fallback */}
        <ClientOnly fallback={
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FallbackProjects />
          </motion.div>
        }>
          {isWebGLSupported() && isIntersecting ? (
            <motion.div 
              className="relative h-96 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
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
                  <Projects3DScene onProjectSelect={handleProjectSelect} />
                </Suspense>
              </Canvas>
              
              <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                Hover over project cards to flip • Click to view details
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <FallbackProjects />
            </motion.div>
          )}
        </ClientOnly>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        onClose={closeProjectDetail}
      />
    </section>
  );
}