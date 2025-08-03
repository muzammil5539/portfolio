"use client";
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/use3d-animations';
import { optimizeForDevice, isWebGLSupported } from '../utils/webgl-utils';
import { useTheme } from '@/context/ThemeContext';
import ClientOnly from '../utils/ClientOnly';

const skillsData = {
  "AI & Machine Learning": {
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
    color: "#ef4444"
  },
  "Programming & Tools": {
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
    color: "#3b82f6"
  },
  "Domain Expertise": {
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
    color: "#10b981"
  },
  "Frameworks & Libraries": {
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
    color: "#8b5cf6"
  },
};

function SkillOrb({ skill, position, color, onClick, isSelected }: {
  skill: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Orbital motion
    const radius = 4;
    const speed = 0.5;
    const angle = time * speed + position[0];
    
    meshRef.current.position.x = Math.cos(angle) * radius * Math.cos(position[1]);
    meshRef.current.position.y = Math.sin(position[1]) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius * Math.cos(position[1]);
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.02;
    
    // Scale animation
    const targetScale = hovered || isSelected ? 1.5 : 1;
    const currentScale = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.1));
  });

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
        emissive={hovered || isSelected ? color : "#000000"}
        emissiveIntensity={hovered || isSelected ? 0.3 : 0}
      />
      <Html distanceFactor={10} position={[0, 0.4, 0]}>
        <div className={`text-xs font-semibold text-center pointer-events-none transition-opacity duration-300 ${
          hovered || isSelected ? 'opacity-100' : 'opacity-70'
        }`} style={{ color }}>
          {skill}
        </div>
      </Html>
    </mesh>
  );
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#1e293b"
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.8}
        wireframe
      />
      <Text
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
      >
        SKILLS
      </Text>
    </mesh>
  );
}

function SkillsGlobe3D({ onSkillSelect, selectedSkill }: {
  onSkillSelect: (category: string, skill: string) => void;
  selectedSkill: { category: string; skill: string } | null;
}) {
  const allSkills = useMemo(() => {
    const skills: Array<{ skill: string; category: string; color: string; position: [number, number, number] }> = [];
    let index = 0;
    
    Object.entries(skillsData).forEach(([category, data]) => {
      data.skills.forEach((skill) => {
        const phi = Math.acos(-1 + (2 * index) / (data.skills.length * Object.keys(skillsData).length));
        const theta = Math.sqrt(data.skills.length * Math.PI) * phi;
        
        skills.push({
          skill,
          category,
          color: data.color,
          position: [theta, phi, 0]
        });
        index++;
      });
    });
    
    return skills;
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <CentralSphere />
      
      {allSkills.map((skillData) => (
        <SkillOrb
          key={`${skillData.category}-${skillData.skill}`}
          skill={skillData.skill}
          position={skillData.position}
          color={skillData.color}
          onClick={() => onSkillSelect(skillData.category, skillData.skill)}
          isSelected={selectedSkill?.skill === skillData.skill}
        />
      ))}
    </>
  );
}

function SkillDetailPanel({ selectedSkill, onClose }: {
  selectedSkill: { category: string; skill: string } | null;
  onClose: () => void;
}) {
  if (!selectedSkill) return null;

  const categoryData = skillsData[selectedSkill.category as keyof typeof skillsData];
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="absolute top-4 right-4 bg-white border-2 border-gray-300 shadow-lg p-4 max-w-sm z-10"
      >
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-bold text-gray-900">{selectedSkill.skill}</h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="mb-2">
          <span 
            className="inline-block px-2 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: categoryData.color }}
          >
            {selectedSkill.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Expertise in {selectedSkill.skill} as part of {selectedSkill.category.toLowerCase()} domain.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

function FallbackSkills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.entries(skillsData).map(([category, data]) => (
        <motion.div 
          key={category} 
          className="bg-white border-2 border-gray-300 shadow-sm"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-100 border-b border-gray-300 p-4">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              {category}
            </h3>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 gap-3">
              {data.skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-gray-700 font-medium">{skill}</span>
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: data.color }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills3DGlobe() {
  const { isDarkMode } = useTheme();
  const { isIntersecting, targetRef } = useIntersectionObserver();
  const [selectedSkill, setSelectedSkill] = useState<{ category: string; skill: string } | null>(null);

  const handleSkillSelect = (category: string, skill: string) => {
    setSelectedSkill({ category, skill });
  };

  const closeSkillDetail = () => {
    setSelectedSkill(null);
  };

  return (
    <section
      ref={targetRef}
      id="skills"
      className={`py-16 relative ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Academic Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -40, opacity: 0 }}
          animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold mb-2 uppercase tracking-wide ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Technical Competencies
          </h2>
          <div className="w-20 h-0.5 bg-blue-900 mx-auto"></div>
          <p className={`mt-4 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Interactive 3D visualization of technical skills and expertise acquired through academic coursework and research projects
          </p>
        </motion.div>

        {/* 3D Skills Globe or Fallback */}
        <ClientOnly fallback={
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FallbackSkills />
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
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ 
                  antialias: optimizeForDevice().antialias,
                  alpha: true,
                  powerPreference: optimizeForDevice().powerPreference as WebGLPowerPreference
                }}
                dpr={optimizeForDevice().pixelRatio}
              >
                <Suspense fallback={null}>
                  <SkillsGlobe3D 
                    onSkillSelect={handleSkillSelect}
                    selectedSkill={selectedSkill}
                  />
                </Suspense>
              </Canvas>
              
              <SkillDetailPanel 
                selectedSkill={selectedSkill}
                onClose={closeSkillDetail}
              />
              
              <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                Click on skill orbs to explore • Drag to rotate view
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={isIntersecting ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <FallbackSkills />
            </motion.div>
          )}
        </ClientOnly>
      </div>
    </section>
  );
}