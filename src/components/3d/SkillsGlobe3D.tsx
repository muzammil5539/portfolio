"use client";
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Sparkles, Ring, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGLSupport, useReducedMotion } from './hooks';
import Skills from '../Skills';
import Scene3D from './Scene3D';

const skillsData = {
  "AI & Machine Learning": {
    skills: ["TensorFlow", "PyTorch", "Deep Learning", "Computer Vision", "CNN", "RNN", "Transfer Learning"],
    color: "#3b82f6",
    hue: 220
  },
  "Programming & Tools": {
    skills: ["Python", "OpenCV", "NumPy", "MATLAB", "C++", "Java"],
    color: "#10b981",
    hue: 160
  },
  "Domain Expertise": {
    skills: ["Medical Imaging", "Image Segmentation", "Pattern Recognition", "3D Segmentation", "Edge Detection", "Morphological Operations"],
    color: "#8b5cf6",
    hue: 270
  },
  "Frameworks & Libraries": {
    skills: ["Scikit-learn", "LangChain", "Streamlit", "Google Colab", "MongoDB", "MySQL"],
    color: "#f59e0b",
    hue: 45
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
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Enhanced scaling animation
    const baseScale = 0.8;
    const hoverScale = 1.3;
    const selectedScale = 1.1;
    
    let targetScale = baseScale;
    if (isSelected) targetScale = selectedScale;
    if (hovered) targetScale = hoverScale;
    
    // Smooth scale transition
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Gentle floating animation with variation based on position
    const floatOffset = Math.sin(time * 2 + position[0]) * 0.05 + Math.cos(time * 1.5 + position[2]) * 0.03;
    meshRef.current.position.y = position[1] + floatOffset;
    
    // Rotation for more dynamic feel
    meshRef.current.rotation.x = time * 0.2 + position[0] * 0.1;
    meshRef.current.rotation.z = time * 0.15 + position[2] * 0.1;
    
    // Glow effect
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (hovered || isSelected) ? 0.3 : 0.1;
      glowRef.current.scale.setScalar(targetScale * 1.5);
    }
  });

  return (
    <group position={position}>
      {/* Main skill sphere with enhanced materials */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={isSelected ? 0.9 : 0.7}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Skill label with better positioning */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color={isSelected ? "#ffffff" : "#e2e8f0"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={3}
        textAlign="center"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {skill}
      </Text>
      
      {/* Connection beam to center when selected */}
      {isSelected && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, Math.sqrt(position[0]**2 + position[1]**2 + position[2]**2)]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
          </mesh>
          
          {/* Particle trail */}
          <Sparkles 
            count={20}
            scale={[0.5, 0.5, 0.5]}
            size={2}
            speed={0.5}
            opacity={0.8}
            color={color}
          />
        </group>
      )}
      
      {/* Ring indicator when hovered */}
      {hovered && (
        <Ring args={[0.6, 0.8, 16]} rotation-x={Math.PI / 2}>
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </Ring>
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
  const coreRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Enhanced particle system
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const radius = 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Smooth, slow rotation
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    
    // Pulsing central core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.setScalar(scale);
    }
  });

  // Generate optimized sphere positions using golden spiral
  const generateSpherePositions = (count: number, radius: number = 5.5) => {
    const positions: [number, number, number][] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      
      const theta = goldenAngle * i;
      
      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      
      positions.push([x, y * radius, z]);
    }
    
    return positions;
  };

  // Flatten all skills with enhanced data
  const allSkills = Object.entries(skillsData).flatMap(([category, data]) =>
    data.skills.map(skill => ({ skill, category, color: data.color }))
  );
  
  const positions = generateSpherePositions(allSkills.length);

  return (
    <group ref={groupRef}>
      {/* Enhanced central core with distortion */}
      <Sphere ref={coreRef} args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1e293b" 
          transparent 
          opacity={0.4}
          distort={0.2}
          speed={1}
          roughness={0.4}
          metalness={0.6}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Energy rings around the core */}
      {[1.2, 1.6, 2.0].map((radius, index) => (
        <Ring key={index} args={[radius, radius + 0.05, 32]} rotation-x={Math.PI / 2}>
          <meshBasicMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.3 - index * 0.1} 
          />
        </Ring>
      ))}

      {/* Skill nodes with enhanced positioning */}
      {allSkills.map(({ skill, category, color }, index) => {
        const position = positions[index];
        if (!position) return null;
        
        return (
          <SkillNode
            key={skill}
            skill={skill}
            position={position}
            color={color}
            onClick={() => onSkillClick(skill)}
            isSelected={selectedCategory === category}
          />
        );
      })}

      {/* Enhanced particle field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#60a5fa" 
          size={0.03} 
          transparent 
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Distant stars for depth */}
      <Stars 
        radius={50} 
        depth={20} 
        count={200} 
        factor={2} 
        saturation={0.8} 
        fade 
        speed={0.2}
      />
      
      {/* Ambient sparkles */}
      <Sparkles 
        count={50}
        scale={[15, 15, 15]}
        size={3}
        speed={0.2}
        opacity={0.4}
        color="#8b5cf6"
      />
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

  // Get selected category data
  const selectedCategoryData = selectedCategory ? skillsData[selectedCategory as keyof typeof skillsData] : null;

  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Interactive Skills Universe
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
            Explore my technical competencies in an interactive 3D space. Click on any skill to discover detailed expertise areas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced 3D Skills Globe */}
          <div className="h-[700px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm border border-white/10"></div>
            <Scene3D 
              camera={{ position: [0, 0, 14], fov: 50 }}
              className="w-full h-full rounded-xl"
            >
              <SkillsGlobe 
                selectedCategory={selectedCategory} 
                onSkillClick={handleSkillClick} 
              />
              
              {/* Enhanced lighting setup */}
              <ambientLight intensity={0.3} color="#1e293b" />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1} 
                color="#ffffff"
                castShadow
              />
              <pointLight 
                position={[-10, 5, -5]} 
                intensity={0.8} 
                color="#3b82f6"
                distance={30}
                decay={2}
              />
              <pointLight 
                position={[5, -5, 10]} 
                intensity={0.6} 
                color="#8b5cf6"
                distance={25}
                decay={2}
              />
              <spotLight
                position={[0, 15, 0]}
                angle={Math.PI / 4}
                intensity={0.4}
                color="#10b981"
                penumbra={0.5}
                decay={2}
                distance={40}
              />
            </Scene3D>
          </div>
          {/* Enhanced Skills Information Panel */}
          <div className="space-y-6">
            {/* Interactive Instructions */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h4 className="font-semibold text-blue-300 mb-2">Interactive Controls:</h4>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Click on skill spheres to explore categories</li>
                <li>• Hover for glow effects and details</li>
                <li>• Watch the universe rotate and breathe</li>
              </ul>
            </div>

            {selectedSkill && selectedCategory && selectedCategoryData && (
              <div className="bg-white/10 backdrop-blur-md border-2 border-blue-400/50 rounded-xl p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedSkill}
                </h3>
                <p className="text-blue-200 mb-4">
                  Category: <span className="font-semibold text-purple-300">{selectedCategory}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategoryData.skills.map((relatedSkill) => (
                    <span
                      key={relatedSkill}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        relatedSkill === selectedSkill
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white/20 text-blue-100 hover:bg-white/30'
                      }`}
                    >
                      {relatedSkill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Categories Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Skill Categories</h3>
              {Object.entries(skillsData).map(([category, data]) => (
                <div
                  key={category}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer backdrop-blur-md ${
                    selectedCategory === category
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/20 bg-white/10 hover:border-blue-300 hover:bg-white/20'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category === selectedCategory ? null : category);
                    setSelectedSkill(null);
                  }}
                >
                  <h4 className="font-semibold text-white mb-3 text-lg" style={{color: data.color}}>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.slice(0, 4).map((skill) => (
                      <span 
                        key={skill} 
                        className="text-sm bg-white/20 text-blue-100 px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {data.skills.length > 4 && (
                      <span className="text-sm text-blue-300 font-medium">
                        +{data.skills.length - 4} more skills
                      </span>
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