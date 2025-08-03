"use client";
import * as THREE from 'three';

/**
 * Utility to safely dispose of 3D objects and clean up memory
 */
export function dispose3DObject(object: THREE.Object3D) {
  if (!object) return;

  // Dispose geometry
  const mesh = object as THREE.Mesh;
  if (mesh.geometry && typeof mesh.geometry.dispose === 'function') {
    mesh.geometry.dispose();
  }

  // Dispose material(s)
  if (mesh.material) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(material => {
        if (typeof material.dispose === 'function') {
          material.dispose();
        }
      });
    } else if (typeof mesh.material.dispose === 'function') {
      mesh.material.dispose();
    }
  }

  // Remove from parent
  if (object.parent) {
    object.parent.remove(object);
  }
}

/**
 * Generate particle system for background effects
 */
export function createParticleSystem(count: number = 1000) {
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    // Random positions
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;

    // Random colors
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return particles;
}

/**
 * Create floating animation for 3D objects
 */
export function createFloatingAnimation(object: THREE.Object3D, amplitude: number = 0.5, speed: number = 1) {
  const initialY = object.position.y;
  
  const animate = () => {
    object.position.y = initialY + Math.sin(Date.now() * 0.001 * speed) * amplitude;
    requestAnimationFrame(animate);
  };
  
  return animate;
}

/**
 * Linear interpolation utility
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Map value from one range to another
 */
export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random color palette
 */
export function generateColorPalette(): string[] {
  const hues = [210, 220, 240, 260, 280]; // Blue spectrum
  return hues.map(hue => `hsl(${hue}, 70%, 60%)`);
}

/**
 * Create gradient material
 */
export function createGradientMaterial(color1: string) {
  const material = new THREE.MeshPhongMaterial({
    color: color1,
    transparent: true,
    opacity: 0.8,
  });

  return material;
}