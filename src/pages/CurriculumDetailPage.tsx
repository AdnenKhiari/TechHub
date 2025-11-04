import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, DollarSign, BookOpen, Calendar, Play, CheckCircle, Users, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ContactForm from "../components/ContactForm";
import { Toaster } from "../components/ui/toaster";
import { useCurriculum } from "../hooks/useCurriculums";
import VideoPlayer from "../components/VideoPlayer";

export default function CurriculumDetailPage() {
  const { id } = useParams();
  const { curriculum, courses, loading, error } = useCurriculum(Number(id));
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a1f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-300">Loading curriculum...</div>
        </div>
      </div>
    );
  }

  if (error || !curriculum) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a1f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Curriculum Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a1f]">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 py-4 px-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {curriculum.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {curriculum.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <motion.div
              className="glass-effect rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 p-6 pb-4">
                <Play className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Course Preview</h2>
              </div>
              <div className="px-6 pb-6">
                <VideoPlayer
                  src={curriculum.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  className="w-full"
                  onReady={(player) => {
                    console.log('Video player ready for curriculum:', curriculum.title);
                  }}
                />
              </div>
            </motion.div>

            {/* What You'll Learn */}
            {curriculum.outcomes && curriculum.outcomes.length > 0 && (
              <motion.div
                className="glass-effect rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-purple-400" />
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {curriculum.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Prerequisites */}
            {curriculum.prerequisites && curriculum.prerequisites.length > 0 && (
              <motion.div
                className="glass-effect rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-400" />
                  Prerequisites
                </h2>
                <div className="space-y-3">
                  {curriculum.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-gray-300">{prereq}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Course Curriculum */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-400" />
                Complete Curriculum
              </h2>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-1">{course.title}</h3>
                            <p className="text-sm text-purple-400 mb-2">{course.subject}</p>
                            <p className="text-gray-400">{course.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <span className="text-purple-400 font-semibold whitespace-nowrap">
                            {course.hours}h
                          </span>
                          {expandedChapter === index ? (
                            <ChevronUp className="w-5 h-5 text-purple-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedChapter === index && course.details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-white/10">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-purple-400" />
                              What You'll Learn
                            </h4>
                            <div className="space-y-3">
                              {course.details.map((detail, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all">
                                    <CheckCircle className="w-4 h-4 text-purple-400" />
                                  </div>
                                  <p className="text-gray-300 group-hover:text-white transition-colors">
                                    {detail}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="glass-effect rounded-2xl p-8 sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">${curriculum.price.toLocaleString()}</div>
                  <p className="text-gray-400">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>{curriculum.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>Starts {new Date(curriculum.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span>{curriculum.level}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                  Enroll Now
                </button>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-3">This course includes:</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Live instructor support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Project-based learning
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 py-12">
        <ContactForm />
      </div>
      <Toaster />
    </div>
  );
}