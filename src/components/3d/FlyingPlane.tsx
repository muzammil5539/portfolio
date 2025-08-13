"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface FlyingPlaneProps {
  isFlying: boolean;
  onFlightComplete?: () => void;
}

export default function FlyingPlane({ isFlying, onFlightComplete }: FlyingPlaneProps) {
  const planeRef = useRef<THREE.Group>(null);
  
  // Create plane geometry using basic shapes
  const PlaneGeometry = () => {
    return (
      <group ref={planeRef}>
        {/* Main body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshPhongMaterial color="#e5e7eb" />
        </mesh>
        
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 2]} />
          <meshPhongMaterial color="#d1d5db" />
        </mesh>
        
        {/* Tail */}
        <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshPhongMaterial color="#9ca3af" />
        </mesh>
        
        {/* Tail fin */}
        <mesh position={[-0.8, 0, 0.3]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
          <meshPhongMaterial color="#9ca3af" />
        </mesh>
      </group>
    );
  };

  // Spring animation for smooth flight
  const { position, rotation, scale } = useSpring({
    position: isFlying ? [15, 8, 5] : [0, 0, 0],
    rotation: isFlying ? [0, 0.3, 0.2] : [0, 0, 0],
    scale: isFlying ? [0.3, 0.3, 0.3] : [1, 1, 1],
    config: { 
      tension: 80,
      friction: 20,
      duration: isFlying ? 3000 : 0
    },
    onRest: () => {
      if (isFlying && onFlightComplete) {
        setTimeout(() => onFlightComplete(), 500);
      }
    }
  });

  // Add subtle floating animation when not flying
  useFrame((state) => {
    if (!isFlying && planeRef.current) {
      const time = state.clock.getElapsedTime();
      planeRef.current.position.y = Math.sin(time * 2) * 0.1;
      planeRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
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
      
      {/* Add some particle trail when flying */}
      {isFlying && (
        <pointLight 
          position={[-2, 0, 0]} 
          color="#60a5fa" 
          intensity={0.5} 
          distance={5} 
        />
      )}
    </animated.group>
  );
}