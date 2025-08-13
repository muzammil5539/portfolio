"use client";
import React, { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGLSupport, useReducedMotion, useMousePosition } from './hooks';
import Projects from '../Projects';
import Scene3D from './Scene3D';
import { useTheme } from "@/context/ThemeContext";

const projects = [
  {
    title: "Luggage Threat Detection",
    description: "Developed ANN architecture for image classification of potential threats in luggage images with high accuracy in threat identification.",
    image: "/projects/luggage.jpg",
    tags: ["Python", "ANN", "OpenCV", "Image Classification"],
    color: "#ef4444",
    position: [-4, 2, 0] as [number, number, number],
  },
  {
    title: "License Plate Recognition",
    description: "Created pipeline for license plate localization using edge detection and implemented robust plate isolation system.",
    image: "/projects/licencse_plate.png",
    tags: ["Python", "OpenCV", "NumPy", "Computer Vision"],
    color: "#3b82f6",
    position: [0, 2, -3] as [number, number, number],
  },
  {
    title: "Braille Digits Recognition",
    description: "Built system to recognize Braille characters through dot pattern analysis and distance metrics for character differentiation.",
    image: "/projects/Braille.png",
    tags: ["Python", "OpenCV", "Pattern Recognition"],
    color: "#10b981",
    position: [4, 2, 0] as [number, number, number],
  },
  {
    title: "Cat Dog Classification",
    description: "Implemented CNN models with and without pooling and dropout layers, demonstrating regularization techniques.",
    image: "/projects/classification.png",
    tags: ["Python", "TensorFlow", "Keras", "CNN"],
    color: "#8b5cf6",
    position: [-2, -1, 2] as [number, number, number],
  },
  {
    title: "Skin Image Segmentation",
    description: "Designed segmentation system using Connected Component Labeling and achieved accurate results with IoU metrics.",
    image: "/projects/skin.png",
    tags: ["Python", "OpenCV", "Image Segmentation"],
    color: "#f59e0b",
    position: [2, -1, 2] as [number, number, number],
  },
  {
    title: "Retinal Image Segmentation",
    description: "Developed method for segmenting retinal structures using point and multi-level thresholding techniques.",
    image: "/projects/retinal.png",
    tags: ["Python", "OpenCV", "Medical Imaging"],
    color: "#ec4899",
    position: [0, -1, -2] as [number, number, number],
  },
];

interface ProjectCard3DProps {
  project: typeof projects[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
  mousePosition: { x: number; y: number };
}

function ProjectCard3D({ project, index, isSelected, onClick, mousePosition }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    const floatOffset = Math.sin(time + index * 2) * 0.2;
    
    // Apply floating animation
    meshRef.current.position.y = project.position[1] + floatOffset;
    
    // Gentle rotation based on mouse position
    if (!isSelected) {
      meshRef.current.rotation.x = mousePosition.y * 0.1;
      meshRef.current.rotation.y = mousePosition.x * 0.1;
    } else {
      // Selected card faces the camera
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = Math.sin(time) * 0.1;
    }

    // Scale animation
    const targetScale = isSelected ? 1.2 : (hovered ? 1.05 : 1);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group 
      ref={meshRef}
      position={project.position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main card body */}
      <RoundedBox args={[2, 2.5, 0.2]} radius={0.1}>
        <meshPhongMaterial 
          color={isSelected ? project.color : "#f8fafc"}
          transparent
          opacity={isSelected ? 0.9 : 0.8}
          emissive={hovered ? project.color : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </RoundedBox>

      {/* Project title */}
      <Text
        position={[0, 0.8, 0.11]}
        fontSize={0.15}
        color={isSelected ? "#ffffff" : "#1f2937"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={1.8}
        textAlign="center"
      >
        {project.title}
      </Text>

      {/* Project description */}
      <Text
        position={[0, 0.2, 0.11]}
        fontSize={0.08}
        color={isSelected ? "#f1f5f9" : "#6b7280"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
      >
        {project.description.slice(0, 100) + (project.description.length > 100 ? '...' : '')}
      </Text>

      {/* Technology tags */}
      {project.tags.slice(0, 2).map((tag, tagIndex) => (
        <RoundedBox
          key={tag}
          args={[0.6, 0.2, 0.05]}
          position={[tagIndex === 0 ? -0.4 : 0.4, -0.7, 0.11]}
          radius={0.05}
        >
          <meshPhongMaterial 
            color={project.color}
            transparent
            opacity={0.7}
          />
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.06}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {tag}
          </Text>
        </RoundedBox>
      ))}

      {/* Selection indicator */}
      {isSelected && (
        <group>
          {/* Glowing outline */}
          <RoundedBox args={[2.2, 2.7, 0.1]} radius={0.1} position={[0, 0, -0.1]}>
            <meshPhongMaterial 
              color={project.color}
              transparent
              opacity={0.3}
              emissive={project.color}
              emissiveIntensity={0.5}
            />
          </RoundedBox>
          
          {/* Floating particles */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(
                  Array.from({ length: 60 }, (_, i) => {
                    const angle = (i / 20) * Math.PI * 2;
                    const radius = 1.5 + Math.random() * 0.5;
                    return [
                      Math.cos(angle) * radius,
                      Math.sin(angle) * radius,
                      (Math.random() - 0.5) * 0.5
                    ];
                  }).flat()
                ), 3]}
              />
            </bufferGeometry>
            <pointsMaterial 
              color={project.color} 
              size={0.05} 
              transparent 
              opacity={0.8}
            />
          </points>
        </group>
      )}
    </group>
  );
}

interface ProjectShowcase3DSceneProps {
  selectedProject: number | null;
  onProjectClick: (index: number) => void;
}

function ProjectShowcase3DScene({ selectedProject, onProjectClick }: ProjectShowcase3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Gentle group rotation
    if (selectedProject === null) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.title}
          project={project}
          index={index}
          isSelected={selectedProject === index}
          onClick={() => onProjectClick(index)}
          mousePosition={mousePosition}
        />
      ))}
      
      {/* Ambient lighting effects */}
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ec4899" />
    </group>
  );
}

export default function ProjectShowcase3D() {
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleProjectClick = useCallback((index: number) => {
    setSelectedProject(selectedProject === index ? null : index);
  }, [selectedProject]);

  // Fallback to original Projects component
  if (!hasWebGL || isLowEndDevice) {
    return <Projects />;
  }

  return (
    <section 
      id="projects" 
      className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-2 uppercase tracking-wide ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Interactive Project Gallery
          </h2>
          <div className="w-20 h-0.5 bg-blue-600 mx-auto"></div>
          <p className={`mt-4 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore my research projects in an immersive 3D environment. Click on any project to learn more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* 3D Scene */}
          <div className="lg:col-span-2 h-[600px] relative">
            <Scene3D 
              camera={{ position: [0, 0, 12], fov: 60 }}
              className="w-full h-full rounded-lg border border-gray-200"
              lights={true}
            >
              <ProjectShowcase3DScene
                selectedProject={selectedProject}
                onProjectClick={handleProjectClick}
              />
              <ambientLight intensity={0.4} />
            </Scene3D>
            
            {/* Instructions */}
            <div className={`absolute bottom-4 left-4 rounded-lg p-3 text-sm backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800/80 text-gray-200'
                : 'bg-white/80 text-gray-600'
            }`}>
              <p className="font-semibold">Interactive Controls:</p>
              <p>• Click projects to select</p>
              <p>• Mouse moves for parallax</p>
              <p>• Cards float and glow</p>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="space-y-6">
            {selectedProject !== null && (
              <div className={`rounded-lg p-6 shadow-lg border-2 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div 
                  className="w-4 h-4 rounded-full mb-4"
                  style={{ backgroundColor: projects[selectedProject].color }}
                />
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {projects[selectedProject].title}
                </h3>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {projects[selectedProject].description}
                </p>
                <div className="space-y-3">
                  <h4 className={`font-semibold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm text-white"
                        style={{ backgroundColor: projects[selectedProject].color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects Overview */}
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                All Projects ({projects.length})
              </h3>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    onClick={() => handleProjectClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedProject === index
                        ? isDarkMode
                          ? 'bg-gray-700 border-l-4'
                          : 'bg-blue-50 border-l-4'
                        : isDarkMode
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-100'
                    }`}
                    style={{
                      borderLeftColor: selectedProject === index ? project.color : 'transparent'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}