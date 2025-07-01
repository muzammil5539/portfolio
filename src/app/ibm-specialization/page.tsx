import Header from "@/components/Header";
import IBMSpecialization from "@/components/IBMSpecialization";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IBM AI Engineering Specialization | Muzammil Nawaz Khan",
  description: "Track my progress through IBM's AI Engineering Specialization program, including coursework, projects, and GitHub activity.",
};

export default function IBMSpecializationPage() {
  return (
    <>
      <Header />
      <IBMSpecialization />
      <Footer />
    </>
  );
}