"use client";
import { useEffect, useState, useCallback, useRef } from 'react';
import * as THREE from 'three';

export function useMouseParallax(strength: number = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({ 
        x: x * strength, 
        y: y * strength 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return mousePosition;
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return { isIntersecting, hasIntersected, targetRef };
}

export function use3DAnimation() {
  const meshRef = useRef<THREE.Mesh>(null);

  const animateFloat = useCallback((amplitude: number = 0.5, speed: number = 1) => {
    if (!meshRef.current) return;
    
    const mesh = meshRef.current;
    const time = Date.now() * 0.001 * speed;
    mesh.position.y += Math.sin(time) * amplitude * 0.01;
  }, []);

  const animateRotation = useCallback((speed: number = 1) => {
    if (!meshRef.current) return;
    
    const mesh = meshRef.current;
    mesh.rotation.y += 0.01 * speed;
  }, []);

  return { meshRef, animateFloat, animateRotation };
}