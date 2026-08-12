"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ConnectPrompt from "@/components/ConnectPrompt";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
      <ConnectPrompt />
    </>
  );
}
