import { motion } from "framer-motion";
import { Calendar, BookOpen, Trophy, Clock, Loader2, AlertCircle } from "lucide-react";
import { useCohorts } from "../hooks/useCohorts";

export default function CohortDetails() {
  const { cohorts, loading, error } = useCohorts();

  if (loading) {
    return (
      <section id="cohorts" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3 text-purple-300">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xl">Loading cohorts...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="cohorts" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-8 h-8" />
              <span className="text-xl">Failed to load cohorts: {error}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cohorts" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Available Cohorts
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your learning path and join a community of passionate developers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cohorts.map((cohort, index) => (
            <motion.div
              key={cohort.id}
              className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm font-semibold">
                    {cohort.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm font-semibold">
                    {cohort.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {cohort.title}
                </h3>
                <p className="text-gray-400">{cohort.description}</p>
              </div>



              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>Starts: {new Date(cohort.start_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>Duration: {cohort.duration}</span>
                </div>
              </div>

              {/* Curriculum */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold text-white">Curriculum Highlights</h4>
                </div>
                <ul className="space-y-2">
                  {cohort.curriculum.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Trophy className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
