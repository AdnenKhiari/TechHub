import Hero from "./Hero";
import AboutSection from "./AboutSection";
import CurriculumList from "./CurriculumList";
import ContactForm from "./ContactForm";
import { Toaster } from "./ui/toaster";

function Home() {
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

export default Home;