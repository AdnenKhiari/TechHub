import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import CurriculumList from "../components/CurriculumList";
import ContactForm from "../components/ContactForm";
import { Toaster } from "../components/ui/toaster";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a1f]">
      <Hero />
      <AboutSection />
      <CurriculumList />
      <ContactForm />
      <Toaster />
    </div>
  );
}
