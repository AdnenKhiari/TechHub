import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { Toaster } from "../components/ui/toaster";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a1f]">
      {/* Header */}
      <motion.div
        className="relative py-12 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl">
            Have questions? We're here to help you start your learning journey.
          </p>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <ContactForm />
      <Toaster />
    </div>
  );
}
