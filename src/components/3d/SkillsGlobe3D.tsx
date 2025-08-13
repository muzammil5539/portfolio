"use client";
import React, { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGLSupport, useReducedMotion } from './hooks';
import Skills from '../Skills';
import Scene3D from './Scene3D';

const skillsData = {
  "AI & Machine Learning": {
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
    color: "#3b82f6"
  },
  "Programming & Tools": {
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
    color: "#10b981"
  },
  "Domain Expertise": {
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
    color: "#8b5cf6"
  },
  "Frameworks & Libraries": {
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
    color: "#f59e0b"
  },
};

interface SkillNodeProps {
  skill: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
  isSelected: boolean;
}

function SkillNode({ skill, position, color, onClick, isSelected }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    const scale = isSelected ? 1.3 : (hovered ? 1.1 : 1);
    meshRef.current.scale.setScalar(scale);
    
    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhongMaterial 
          color={color} 
          transparent 
          opacity={isSelected ? 0.9 : 0.7}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Skill label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color={isSelected ? color : "#374151"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={2}
        textAlign="center"
      >
        {skill}
      </Text>
      
      {/* Connection line to center when selected */}
      {isSelected && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...position, 0, 0, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.5} transparent />
        </line>
      )}
    </group>
  );
}

interface SkillsGlobeProps {
  selectedCategory: string | null;
  onSkillClick: (skill: string) => void;
}

function SkillsGlobe({ selectedCategory, onSkillClick }: SkillsGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Gentle rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  // Generate positions for skills on a sphere
  const generateSpherePositions = (count: number, radius: number = 4) => {
    const positions: [number, number, number][] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < count; i++) {
      const t = i / goldenRatio;
      const angle1 = 2 * Math.PI * t;
      const angle2 = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.sin(angle2) * Math.cos(angle1);
      const y = radius * Math.sin(angle2) * Math.sin(angle1);
      const z = radius * Math.cos(angle2);
      
      positions.push([x, y, z]);
    }
    
    return positions;
  };

  // Flatten all skills with their categories
  const allSkills = Object.entries(skillsData).flatMap(([category, data]) =>
    data.skills.map(skill => ({ skill, category, color: data.color }))
  );
  
  const positions = generateSpherePositions(allSkills.length);

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.3}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Skill nodes */}
      {allSkills.map(({ skill, category, color }, index) => (
        <SkillNode
          key={skill}
          skill={skill}
          position={positions[index]}
          color={color}
          onClick={() => onSkillClick(skill)}
          isSelected={selectedCategory === category}
        />
      ))}

      {/* Ambient particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(
              Array.from({ length: 300 }, () => (Math.random() - 0.5) * 20)
            ), 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#60a5fa" size={0.05} transparent opacity={0.4} />
      </points>
    </group>
  );
}

export default function SkillsGlobe3D() {
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillClick = useCallback((skill: string) => {
    setSelectedSkill(skill);
    // Find the category of the clicked skill
    const category = Object.entries(skillsData).find(([, data]) =>
      data.skills.includes(skill)
    )?.[0];
    setSelectedCategory(category || null);
  }, []);

  // Fallback to original Skills component
  if (!hasWebGL || isLowEndDevice) {
    return <Skills />;
  }

  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Interactive Skills Universe
          </h2>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore my technical competencies in an interactive 3D space. Click on any skill to learn more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Skills Globe */}
          <div className="h-[600px] relative">
            <Scene3D 
              camera={{ position: [0, 0, 12], fov: 60 }}
              className="w-full h-full rounded-lg"
              lights={true}
            >
              <SkillsGlobe 
                selectedCategory={selectedCategory}
                onSkillClick={handleSkillClick}
              />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -5]} intensity={0.3} />
            </Scene3D>
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600">
              <p className="font-semibold">Interactive Controls:</p>
              <p>• Click skills to select category</p>
              <p>• Hover for highlights</p>
            </div>
          </div>

          {/* Skills Information Panel */}
          <div className="space-y-6">
            {selectedSkill && selectedCategory && (
              <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {selectedSkill}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Category: <span className="font-semibold">{selectedCategory}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillsData[selectedCategory as keyof typeof skillsData]?.skills.map((relatedSkill) => (
                    <span
                      key={relatedSkill}
                      className={`px-3 py-1 rounded-full text-sm ${
                        relatedSkill === selectedSkill
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {relatedSkill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Overview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Skill Categories</h3>
              {Object.entries(skillsData).map(([category, data]) => (
                <div
                  key={category}
                  className={`border-2 rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category === selectedCategory ? null : category);
                    setSelectedSkill(null);
                  }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {data.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{data.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}