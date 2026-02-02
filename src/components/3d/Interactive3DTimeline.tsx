"use client";
import React, { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGLSupport, useReducedMotion, useMousePosition } from './hooks';
import Experience from '../Experience';
import Scene3D from './Scene3D';
import { useTheme } from "@/context/ThemeContext";

const experiences = [
  {
    title: "Biomedical AI Research and Development Intern",
    company: "RiseTech - Islamabad, Pakistan",
    date: "July 2024 - Sept 2024",
    description: [
      "Developed 3D medical image segmentation models using BraTS2020 dataset for brain tumor diagnosis",
      "Implemented SegFormer3D and UNet 3D architectures using TensorFlow and PyTorch",
      "Optimized deep learning models for improved accuracy in tumor segmentation",
      "Evaluated model performance using dice scores and IoU metrics",
      "Streamlined workflows by establishing models as benchmarks for future comparisons",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Medical Imaging",
      "3D Segmentation",
      "Deep Learning",
    ],
    position: [0, 0, 0] as [number, number, number],
    color: "#3b82f6",
  },
  // Adding some dummy future experiences for demonstration
  {
    title: "Machine Learning Engineer",
    company: "Future Tech Company",
    date: "Expected 2025",
    description: [
      "Developing advanced AI systems for real-world applications",
      "Leading research in computer vision and deep learning",
      "Collaborating with cross-functional teams",
    ],
    technologies: ["AI/ML", "Computer Vision", "Research"],
    position: [0, 3, 0] as [number, number, number],
    color: "#10b981",
  },
  {
    title: "Bachelor's in Computer Science",
    company: "University Education",
    date: "2021 - 2025",
    description: [
      "Specialized in Artificial Intelligence and Machine Learning",
      "Focused on Computer Vision and Medical Imaging",
      "Research projects in deep learning applications",
    ],
    technologies: ["Academic Research", "AI/ML", "Computer Vision"],
    position: [0, -3, 0] as [number, number, number],
    color: "#8b5cf6",
  },
];

interface TimelineMilestoneProps {
  experience: typeof experiences[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
  totalCount: number;
}

function TimelineMilestone({ experience, index, isSelected, onClick, totalCount }: TimelineMilestoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Floating animation
    const floatIntensity = isSelected ? 0.3 : 0.1;
    groupRef.current.position.y = experience.position[1] + Math.sin(time + index * 1.5) * floatIntensity;
    
    // Gentle rotation when selected
    if (isSelected) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
    
    // Scale based on selection and hover
    const targetScale = isSelected ? 1.5 : (hovered ? 1.1 : 1);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group 
      ref={groupRef}
      position={experience.position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main milestone sphere */}
      <Sphere args={[0.3, 16, 16]}>
        <meshPhongMaterial 
          color={experience.color}
          transparent
          opacity={isSelected ? 1 : 0.8}
          emissive={hovered || isSelected ? experience.color : "#000000"}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0}
        />
      </Sphere>

      {/* Inner core */}
      <Sphere args={[0.15, 16, 16]}>
        <meshPhongMaterial 
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Company/Title label */}
      <Text
        position={[1, 0.5, 0]}
        fontSize={0.12}
        color={isSelected ? experience.color : "#374151"}
        anchorX="left"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={3}
      >
        {experience.title}
      </Text>

      {/* Date label */}
      <Text
        position={[1, 0.2, 0]}
        fontSize={0.08}
        color="#6b7280"
        anchorX="left"
        anchorY="middle"
        maxWidth={3}
      >
        {experience.date}
      </Text>

      {/* Company label */}
      <Text
        position={[1, -0.1, 0]}
        fontSize={0.08}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
        maxWidth={3}
      >
        {experience.company}
      </Text>

      {/* Selection ring */}
      {isSelected && (
        <group>
          {/* Outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshBasicMaterial 
              color={experience.color}
              transparent
              opacity={0.5}
            />
          </mesh>
          
          {/* Animated particles */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(
                  Array.from({ length: 48 }, (_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const radius = 0.6;
                    return [
                      Math.cos(angle) * radius,
                      (Math.random() - 0.5) * 0.2,
                      Math.sin(angle) * radius
                    ];
                  }).flat()
                ), 3]}
              />
            </bufferGeometry>
            <pointsMaterial 
              color={experience.color}
              size={0.03}
              transparent
              opacity={0.8}
            />
          </points>
        </group>
      )}

      {/* Connection line to next milestone */}
      {(() => {
        const nextExperience = experiences[index + 1];
        if (index < totalCount - 1 && nextExperience) {
          return (
            <Line
              points={[
                experience.position,
                nextExperience.position
              ]}
              color="#d1d5db"
              lineWidth={2}
              transparent
              opacity={0.5}
            />
          );
        }
        return null;
      })()}
    </group>
  );
}

interface Timeline3DSceneProps {
  selectedMilestone: number | null;
  onMilestoneClick: (index: number) => void;
}

function Timeline3DScene({ selectedMilestone, onMilestoneClick }: Timeline3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Subtle group rotation based on mouse
    groupRef.current.rotation.x = mousePosition.y * 0.1;
    groupRef.current.rotation.y = mousePosition.x * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Timeline backbone */}
      <Line
        points={experiences.map(exp => exp.position)}
        color="#9ca3af"
        lineWidth={4}
        transparent
        opacity={0.3}
      />

      {/* Milestones */}
      {experiences.map((experience, index) => (
        <TimelineMilestone
          key={`${experience.title}-${index}`}
          experience={experience}
          index={index}
          isSelected={selectedMilestone === index}
          onClick={() => onMilestoneClick(index)}
          totalCount={experiences.length}
        />
      ))}

      {/* Ambient lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#60a5fa" />
      <pointLight position={[-5, 0, 5]} intensity={0.3} color="#ec4899" />
      
      {/* Background particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(
              Array.from({ length: 150 }, () => (Math.random() - 0.5) * 20)
            ), 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#e5e7eb"
          size={0.02}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  );
}

export default function Interactive3DTimeline() {
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  const { isDarkMode } = useTheme();
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const handleMilestoneClick = useCallback((index: number) => {
    setSelectedMilestone(selectedMilestone === index ? null : index);
  }, [selectedMilestone]);

  // Fallback to original Experience component
  if (!hasWebGL || isLowEndDevice) {
    return <Experience />;
  }

  return (
    <section 
      id="experience" 
      className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} relative overflow-hidden`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-2 uppercase tracking-wide ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Interactive Experience Timeline
          </h2>
          <div className="w-20 h-0.5 bg-blue-600 mx-auto"></div>
          <p className={`mt-4 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Navigate through my professional journey in an immersive 3D timeline. Click on milestones to explore details.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* 3D Timeline */}
          <div className="lg:col-span-2 h-[600px] relative">
            <Scene3D 
              camera={{ position: [8, 0, 8], fov: 60 }}
              className="w-full h-full rounded-lg border border-gray-200"
              lights={true}
            >
              <Timeline3DScene
                selectedMilestone={selectedMilestone}
                onMilestoneClick={handleMilestoneClick}
              />
              <ambientLight intensity={0.3} />
            </Scene3D>
            
            {/* Instructions */}
            <div className={`absolute bottom-4 left-4 rounded-lg p-3 text-sm backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800/80 text-gray-200'
                : 'bg-white/80 text-gray-600'
            }`}>
              <p className="font-semibold">Timeline Controls:</p>
              <p>• Click milestones to explore</p>
              <p>• Mouse for 3D navigation</p>
              <p>• Floating spheres show progress</p>
            </div>
          </div>

          {/* Experience Details Panel */}
          <div className="space-y-6">
            {selectedMilestone !== null && (() => {
              const selectedExp = experiences[selectedMilestone];
              if (!selectedExp) return null;
              
              return (
                <div className={`rounded-lg p-6 shadow-lg border-2 ${
                  isDarkMode
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                  <div 
                    className="w-4 h-4 rounded-full mb-4"
                    style={{ backgroundColor: selectedExp.color }}
                  />
                  <h3 className={`text-lg font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedExp.title}
                  </h3>
                  <p className={`text-sm mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedExp.company}
                  </p>
                  <p className={`text-sm mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {selectedExp.date}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className={`font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {selectedExp.description.map((item, i) => (
                        <li key={i} className={`text-sm flex items-start gap-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: selectedExp.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs text-white"
                          style={{ backgroundColor: selectedExp.color }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Timeline Overview */}
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode
                ? 'bg-gray-900 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Career Timeline
              </h3>
              <div className="space-y-3">
                {experiences.map((exp, index) => (
                  <button
                    key={`${exp.title}-overview-${index}`}
                    onClick={() => handleMilestoneClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      selectedMilestone === index
                        ? isDarkMode
                          ? 'bg-gray-800 border-l-4'
                          : 'bg-blue-50 border-l-4'
                        : isDarkMode
                          ? 'hover:bg-gray-800'
                          : 'hover:bg-gray-50'
                    }`}
                    style={{
                      borderLeftColor: selectedMilestone === index ? exp.color : 'transparent'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: exp.color }}
                      />
                      <div>
                        <p className={`font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {exp.title}
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {exp.date}
                        </p>
                      </div>
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