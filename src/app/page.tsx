import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConnectPrompt from "@/components/layout/ConnectPrompt";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import LatestPosts from "@/components/sections/LatestPosts";
import Credentials from "@/components/sections/Credentials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <LatestPosts />
        <Credentials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <JsonLd data={faqSchema()} />
      <ConnectPrompt />
    </>
  );
}
