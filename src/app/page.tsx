"use client";
import Header from "@/components/Header";
import { Interactive3DHero, SkillsGlobe3D, ProjectShowcase3D, AnimatedBackground, Interactive3DTimeline, Contact3D } from "@/components/3d";
import { useWebGLSupport } from "@/components/3d/hooks";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Suspense } from "react";

// Loading component for 3D sections
function Section3DLoader() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Loading 3D experience...</p>
        <p className="text-xs text-gray-500 mt-2">
          Preparing interactive content for your device
        </p>
      </div>
    </div>
  );
}

// Performance monitoring and fallback wrapper
function Enhanced3DSection({ children, fallback }: { 
  children: React.ReactNode; 
  fallback: React.ReactNode;
}) {
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  
  if (!hasWebGL || isLowEndDevice) {
    return <>{fallback}</>;
  }
  
  return (
    <Suspense fallback={<Section3DLoader />}>
      {children}
    </Suspense>
  );
}

export default function Home() {
  const { hasWebGL } = useWebGLSupport();

  return (
    <>
      {/* Animated 3D Background - only for WebGL-capable devices */}
      {hasWebGL && (
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
      )}
      
      <Header />
      
      {/* Enhanced 3D Hero Section */}
      <Enhanced3DSection fallback={<Hero />}>
        <Interactive3DHero />
      </Enhanced3DSection>

      {/* Enhanced 3D Projects Section */}
      <Enhanced3DSection fallback={<Projects />}>
        <ProjectShowcase3D />
      </Enhanced3DSection>

      {/* Experience Section - Original or 3D Timeline */}
      <Enhanced3DSection fallback={<Experience />}>
        <Interactive3DTimeline />
      </Enhanced3DSection>

      {/* Enhanced 3D Skills Section */}
      <Enhanced3DSection fallback={<Skills />}>
        <SkillsGlobe3D />
      </Enhanced3DSection>

      {/* Enhanced 3D Contact Section */}
      <Enhanced3DSection fallback={<Contact />}>
        <Contact3D />
      </Enhanced3DSection>

      <Footer />
    </>
  );
}
