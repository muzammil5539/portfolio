"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface FlyingPlaneProps {
  isFlying: boolean;
  onFlightComplete?: () => void;
}

export default function FlyingPlane({ isFlying, onFlightComplete }: FlyingPlaneProps) {
  const planeRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Group>(null);
  
  // Enhanced plane geometry with better proportions and materials
  const PlaneGeometry = () => {
    return (
      <group ref={planeRef}>
        {/* Main fuselage with gradient */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.1, 2.5, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.3} 
            roughness={0.2}
            emissive="#e0f2fe"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Wings with swept design */}
        <group>
          {/* Main wings */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
            <boxGeometry args={[0.1, 0.05, 2.2]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.4} 
              roughness={0.3}
              emissive="#1e40af"
              emissiveIntensity={0.05}
            />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
            <boxGeometry args={[0.1, 0.05, 2.2]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.4} 
              roughness={0.3}
              emissive="#1e40af"
              emissiveIntensity={0.05}
            />
          </mesh>
        </group>
        
        {/* Cockpit */}
        <mesh position={[0.8, 0.1, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Vertical stabilizer */}
        <mesh position={[-1, 0.3, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.05]} />
          <meshStandardMaterial 
            color="#1e40af" 
            metalness={0.3} 
            roughness={0.4}
          />
        </mesh>
        
        {/* Horizontal stabilizers */}
        <mesh position={[-0.9, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.05, 0.8]} />
          <meshStandardMaterial 
            color="#1e40af" 
            metalness={0.3} 
            roughness={0.4}
          />
        </mesh>

        {/* Propeller */}
        <mesh position={[1.2, 0, 0]} rotation={[0, isFlying ? 0 : 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
        
        {/* Propeller blades */}
        <group position={[1.25, 0, 0]} rotation={[0, 0, 0]}>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <boxGeometry args={[0.02, 1.2, 0.01]} />
            <meshStandardMaterial color="#1f2937" metalness={0.7} />
          </mesh>
          <mesh rotation={[0, Math.PI/2, 0]}>
            <boxGeometry args={[0.02, 1.2, 0.01]} />
            <meshStandardMaterial color="#1f2937" metalness={0.7} />
          </mesh>
        </group>

        {/* Engine exhaust glow when flying */}
        {isFlying && (
          <>
            <pointLight 
              position={[-1.5, 0, 0]} 
              color="#fbbf24" 
              intensity={0.8} 
              distance={3} 
            />
            <mesh position={[-1.3, 0, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial 
                color="#fbbf24" 
                transparent 
                opacity={0.6}
              />
            </mesh>
          </>
        )}
      </group>
    );
  };

  // Enhanced spring animation with realistic flight path
  const { position, rotation, scale } = useSpring({
    position: isFlying ? [20, 12, 8] : [0, 0, 0],
    rotation: isFlying ? [0.1, 0.5, 0.3] : [0, 0, 0],
    scale: isFlying ? [0.4, 0.4, 0.4] : [1, 1, 1],
    config: { 
      tension: 60,
      friction: 25,
      duration: isFlying ? 4000 : 0
    },
    onRest: () => {
      if (isFlying && onFlightComplete) {
        setTimeout(() => onFlightComplete(), 800);
      }
    }
  });

  // Propeller rotation animation
  useFrame((state) => {
    if (planeRef.current) {
      const propeller = planeRef.current.children[5] as THREE.Group; // Propeller group
      if (propeller && isFlying) {
        propeller.rotation.z += 2; // Fast spin when flying
      } else if (propeller) {
        propeller.rotation.z += 0.1; // Slow idle spin
      }

      // Subtle floating animation when not flying
      if (!isFlying) {
        const time = state.clock.getElapsedTime();
        planeRef.current.position.y = Math.sin(time * 2) * 0.08;
        planeRef.current.rotation.z = Math.sin(time * 1.5) * 0.03;
        planeRef.current.rotation.x = Math.cos(time * 1.2) * 0.02;
      }
    }
  });

  return (
    <animated.group
      // @ts-expect-error - React Spring types conflict with Three.js types
      position={position}
      // @ts-expect-error - React Spring types conflict with Three.js types
      rotation={rotation}
      // @ts-expect-error - React Spring types conflict with Three.js types
      scale={scale}
    >
      <PlaneGeometry />
      
      {/* Enhanced particle trail when flying */}
      {isFlying && (
        <group ref={trailRef}>
          {/* Sparkle trail */}
          <Sparkles 
            count={50}
            scale={[2, 1, 1]}
            size={3}
            speed={0.8}
            opacity={0.8}
            color="#60a5fa"
            position={[-2, 0, 0]}
          />
          
          {/* Additional light effects */}
          <pointLight 
            position={[-1, 0, 0.5]} 
            color="#3b82f6" 
            intensity={0.6} 
            distance={4} 
          />
          <pointLight 
            position={[-1, 0, -0.5]} 
            color="#8b5cf6" 
            intensity={0.4} 
            distance={3} 
          />
        </group>
      )}
    </animated.group>
  );
}