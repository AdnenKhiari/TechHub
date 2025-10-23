import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Phone, MapPin, Clock, GraduationCap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    "Full-Stack Web Development Bootcamp",
    "AI & Machine Learning Engineer",
    "Mobile App Development with React Native",
    "Data Science & Analytics",
    "Cloud Architecture & DevOps",
    "Cybersecurity Specialist",
    "Other / General Inquiry"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! 🚀",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#1a1a3e] to-[#0a0a1f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to start your learning journey? We're here to help you every step of the way!
            </p>

            <div className="space-y-6">
              {/* Contact Details */}
              <motion.div
                className="glass-effect rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-400 mt-1">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-300">hello@techhub.com</p>
                    <p className="text-sm text-gray-400 mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                    <p className="text-gray-300">123 Tech Street, Suite 400</p>
                    <p className="text-gray-300">San Francisco, CA 94105</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Office Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-300">Saturday: 10AM - 4PM</p>
                    <p className="text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="glass-effect rounded-2xl p-8 space-y-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>

              {/* Name Field */}
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  animate={{ scale: focusedField === "name" ? 1.1 : 1 }}
                >
                  <User className="w-5 h-5 text-purple-400" />
                </motion.div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer"
                  placeholder="Name"
                />
                <motion.label
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#1a1a3e] peer-focus:px-2"
                  animate={{
                    top: formData.name || focusedField === "name" ? "0" : "50%",
                    fontSize: formData.name || focusedField === "name" ? "0.75rem" : "1rem",
                    color: focusedField === "name" ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  Full Name
                </motion.label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  animate={{ scale: focusedField === "email" ? 1.1 : 1 }}
                >
                  <Mail className="w-5 h-5 text-purple-400" />
                </motion.div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer"
                  placeholder="Email"
                />
                <motion.label
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#1a1a3e] peer-focus:px-2"
                  animate={{
                    top: formData.email || focusedField === "email" ? "0" : "50%",
                    fontSize: formData.email || focusedField === "email" ? "0.75rem" : "1rem",
                    color: focusedField === "email" ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  Email Address
                </motion.label>
              </div>

              {/* Phone Field */}
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  animate={{ scale: focusedField === "phone" ? 1.1 : 1 }}
                >
                  <Phone className="w-5 h-5 text-purple-400" />
                </motion.div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer"
                  placeholder="Phone"
                />
                <motion.label
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#1a1a3e] peer-focus:px-2"
                  animate={{
                    top: formData.phone || focusedField === "phone" ? "0" : "50%",
                    fontSize: formData.phone || focusedField === "phone" ? "0.75rem" : "1rem",
                    color: focusedField === "phone" ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  Phone Number (Optional)
                </motion.label>
              </div>

              {/* Course Selection */}
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                  animate={{ scale: focusedField === "course" ? 1.1 : 1 }}
                >
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </motion.div>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("course")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#1a1a3e]">Select a course...</option>
                  {courses.map((course) => (
                    <option key={course} value={course} className="bg-[#1a1a3e]">
                      {course}
                    </option>
                  ))}
                </select>
                <label className="absolute left-12 -top-2 text-xs text-purple-400 bg-[#1a1a3e] px-2">
                  Interested Course
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-6"
                  animate={{ scale: focusedField === "message" ? 1.1 : 1 }}
                >
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </motion.div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all peer resize-none"
                  placeholder="Message"
                />
                <motion.label
                  className="absolute left-12 top-6 text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-[#1a1a3e] peer-focus:px-2"
                  animate={{
                    top: formData.message || focusedField === "message" ? "0" : "1.5rem",
                    fontSize: formData.message || focusedField === "message" ? "0.75rem" : "1rem",
                    color: focusedField === "message" ? "#a78bfa" : "#9ca3af",
                  }}
                >
                  Your Message
                </motion.label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}