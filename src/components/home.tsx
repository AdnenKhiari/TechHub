import Hero from "./Hero";
import CohortDetails from "./CohortDetails";
import ContactForm from "./ContactForm";
import { Toaster } from "./ui/toaster";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a1f]">
      <Hero />
      <CohortDetails />
      <ContactForm />
      <Toaster />
    </div>
  );
}

export default Home;