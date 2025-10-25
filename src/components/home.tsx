import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import CurriculumList from "./CurriculumList";
import ContactForm from "./ContactForm";
import { Toaster } from "./ui/toaster";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a1f]">
      <Navbar />
      <Hero />
      <AboutSection />
      <CurriculumList />
      <ContactForm />
      <Footer />
      <Toaster />
    </div>
  );
}

export default Home;