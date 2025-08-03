"use client";
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Allow keyboard navigation for 3D elements
      if (event.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('using-keyboard');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}

export function useScreenReader() {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    // Simple screen reader detection
    const checkScreenReader = () => {
      const isNavigation = navigator.userAgent.includes('nvda') || 
                          navigator.userAgent.includes('jaws') || 
                          navigator.userAgent.includes('narrator');
      setIsScreenReader(isNavigation);
    };

    checkScreenReader();
  }, []);

  return isScreenReader;
}