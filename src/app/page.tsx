import Enhanced3DHeader from "@/components/3d/components/Enhanced3DHeader";
import Interactive3DHero from "@/components/3d/components/Interactive3DHero";
import ProjectShowcase3D from "@/components/3d/components/ProjectShowcase3D";
import Interactive3DTimeline from "@/components/3d/components/Interactive3DTimeline";
import Skills3DGlobe from "@/components/3d/components/Skills3DGlobe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/3d/components/AnimatedBackground";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Enhanced3DHeader />
      <Interactive3DHero />
      <ProjectShowcase3D />
      <Interactive3DTimeline />
      <Skills3DGlobe />
      <Contact />
      <Footer />
    </>
  );
}
