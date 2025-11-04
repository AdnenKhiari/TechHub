import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, DollarSign, BookOpen, ChevronDown, Filter, Calendar, ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurriculums } from "../hooks/useCurriculums";
import { useCourses } from "../hooks/useCourses";

export default function CurriculumList() {
  const navigate = useNavigate();
  const { curriculums, loading, error } = useCurriculums();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { courses, loading: coursesLoading } = useCourses(expandedId);

  const categories = ["All", ...Array.from(new Set(curriculums.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCurriculums = curriculums.filter(curriculum => {
    const matchesSearch = curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curriculum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || curriculum.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || curriculum.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <section id="curriculums" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-gray-300">Loading curriculums...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="curriculums" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-red-400">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="curriculums" className="relative py-24 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Curriculums
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive learning paths designed by industry experts
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-effect rounded-2xl p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search curriculums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 font-semibold">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, idx) => (
                    <button
                      key={`category-${idx}`}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-300 font-semibold">Level:</span>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level, idx) => (
                    <button
                      key={`level-${idx}`}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedLevel === level
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Curriculum List */}
        <div className="max-w-6xl mx-auto space-y-6">
          <AnimatePresence>
            {filteredCurriculums.map((curriculum, index) => (
              <motion.div
                key={curriculum.id}
                className="glass-effect rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Curriculum Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === curriculum.id ? null : curriculum.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm font-semibold">
                          {curriculum.category}
                        </span>
                        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm font-semibold">
                          {curriculum.level}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 hover:text-purple-300 transition-colors">
                        {curriculum.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{curriculum.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>{curriculum.duration} • {curriculum.hours} hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>Starts: {new Date(curriculum.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-3xl font-bold text-white">
                          <DollarSign className="w-8 h-8 text-green-400" />
                          {curriculum.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-400">One-time payment</p>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: expandedId === curriculum.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-purple-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Course Details */}
                <AnimatePresence>
                  {expandedId === curriculum.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6 bg-white/5">
                        {/* Course List */}
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-400" />
                            Course Curriculum ({courses.length} courses)
                          </h4>
                          
                          {coursesLoading ? (
                            <div className="text-center py-8">
                              <div className="text-gray-400">Loading courses...</div>
                            </div>
                          ) : courses.length > 0 ? (
                            <div className="space-y-3">
                              {courses.map((course, courseIndex) => (
                                <motion.div
                                  key={course.id}
                                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: courseIndex * 0.1 }}
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {courseIndex + 1}
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                          <h5 className="text-lg font-semibold text-white mb-1">
                                            {course.title}
                                          </h5>
                                          <p className="text-sm text-purple-300 mb-2 font-medium">
                                            {course.subject}
                                          </p>
                                          <p className="text-gray-400 text-sm mb-3">
                                            {course.description}
                                          </p>
                                          
                                          {course.details && course.details.length > 0 && (
                                            <div className="space-y-1">
                                              <p className="text-sm font-medium text-gray-300">What you'll learn:</p>
                                              <ul className="text-sm text-gray-400 space-y-1">
                                                {course.details.slice(0, 3).map((detail, idx) => (
                                                  <li key={idx} className="flex items-start gap-2">
                                                    <PlayCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                                                    <span>{detail}</span>
                                                  </li>
                                                ))}
                                                {course.details.length > 3 && (
                                                  <li className="text-purple-300 text-xs">
                                                    +{course.details.length - 3} more topics
                                                  </li>
                                                )}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="text-right flex-shrink-0">
                                          <div className="flex items-center gap-1 text-sm text-gray-300">
                                            <Clock className="w-4 h-4 text-purple-400" />
                                            <span>{course.hours}h</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-gray-400">No courses available for this curriculum</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/curriculum/${curriculum.id}`);
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-shadow flex items-center justify-center gap-2"
                          >
                            View Full Details
                            <ArrowRight className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCurriculums.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-400">No curriculums found matching your criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}