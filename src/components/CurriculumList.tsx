import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, DollarSign, BookOpen, ChevronDown, Filter, Calendar } from "lucide-react";

interface Course {
  id: number;
  title: string;
  hours: number;
  subject: string;
}

interface Curriculum {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  startDate: string;
  description: string;
  courses: Course[];
  totalHours: number;
}

const curriculums: Curriculum[] = [
  {
    id: 1,
    title: "Full-Stack Web Development Bootcamp",
    category: "Web Development",
    level: "Intermediate",
    duration: "12 weeks",
    price: 2999,
    startDate: "March 15, 2024",
    description: "Master modern web development from frontend to backend with hands-on projects",
    totalHours: 240,
    courses: [
      { id: 1, title: "HTML, CSS & Responsive Design", hours: 30, subject: "Frontend Basics" },
      { id: 2, title: "JavaScript & TypeScript Fundamentals", hours: 40, subject: "Programming" },
      { id: 3, title: "React & Modern Frontend", hours: 50, subject: "Frontend Framework" },
      { id: 4, title: "Node.js & Express Backend", hours: 45, subject: "Backend Development" },
      { id: 5, title: "PostgreSQL & Database Design", hours: 35, subject: "Database" },
      { id: 6, title: "AWS Deployment & DevOps", hours: 40, subject: "Cloud & Deployment" }
    ]
  },
  {
    id: 2,
    title: "AI & Machine Learning Engineer",
    category: "Artificial Intelligence",
    level: "Advanced",
    duration: "16 weeks",
    price: 3999,
    startDate: "April 1, 2024",
    description: "Build intelligent applications with Python, TensorFlow, and cutting-edge ML frameworks",
    totalHours: 320,
    courses: [
      { id: 1, title: "Python for Data Science", hours: 40, subject: "Programming" },
      { id: 2, title: "Mathematics for ML", hours: 35, subject: "Mathematics" },
      { id: 3, title: "Neural Networks & Deep Learning", hours: 60, subject: "Deep Learning" },
      { id: 4, title: "TensorFlow & PyTorch", hours: 55, subject: "ML Frameworks" },
      { id: 5, title: "NLP & Text Processing", hours: 50, subject: "Natural Language" },
      { id: 6, title: "Computer Vision", hours: 45, subject: "Image Processing" },
      { id: 7, title: "Model Deployment & MLOps", hours: 35, subject: "Production ML" }
    ]
  },
  {
    id: 3,
    title: "Mobile App Development with React Native",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "10 weeks",
    price: 2499,
    startDate: "March 22, 2024",
    description: "Create cross-platform mobile apps for iOS and Android with React Native",
    totalHours: 200,
    courses: [
      { id: 1, title: "React Native Fundamentals", hours: 40, subject: "Mobile Framework" },
      { id: 2, title: "Mobile UI/UX Design", hours: 30, subject: "Design" },
      { id: 3, title: "Navigation & State Management", hours: 35, subject: "App Architecture" },
      { id: 4, title: "Native APIs & Device Features", hours: 40, subject: "Native Integration" },
      { id: 5, title: "App Store Deployment", hours: 25, subject: "Publishing" },
      { id: 6, title: "Performance Optimization", hours: 30, subject: "Optimization" }
    ]
  },
  {
    id: 4,
    title: "Data Science & Analytics",
    category: "Data Science",
    level: "Beginner",
    duration: "14 weeks",
    price: 2799,
    startDate: "April 5, 2024",
    description: "Learn to analyze, visualize, and derive insights from data using Python and modern tools",
    totalHours: 280,
    courses: [
      { id: 1, title: "Python Programming Basics", hours: 35, subject: "Programming" },
      { id: 2, title: "Statistics & Probability", hours: 40, subject: "Mathematics" },
      { id: 3, title: "Data Analysis with Pandas", hours: 45, subject: "Data Analysis" },
      { id: 4, title: "Data Visualization", hours: 40, subject: "Visualization" },
      { id: 5, title: "SQL & Database Queries", hours: 35, subject: "Database" },
      { id: 6, title: "Machine Learning Basics", hours: 50, subject: "ML Introduction" },
      { id: 7, title: "Real-World Projects", hours: 35, subject: "Capstone" }
    ]
  },
  {
    id: 5,
    title: "Cloud Architecture & DevOps",
    category: "Cloud Computing",
    level: "Advanced",
    duration: "12 weeks",
    price: 3499,
    startDate: "March 29, 2024",
    description: "Master cloud infrastructure, CI/CD pipelines, and modern DevOps practices",
    totalHours: 240,
    courses: [
      { id: 1, title: "AWS Cloud Fundamentals", hours: 40, subject: "Cloud Basics" },
      { id: 2, title: "Docker & Containerization", hours: 35, subject: "Containers" },
      { id: 3, title: "Kubernetes Orchestration", hours: 45, subject: "Orchestration" },
      { id: 4, title: "CI/CD Pipelines", hours: 40, subject: "Automation" },
      { id: 5, title: "Infrastructure as Code", hours: 40, subject: "IaC" },
      { id: 6, title: "Monitoring & Logging", hours: 40, subject: "Observability" }
    ]
  },
  {
    id: 6,
    title: "Cybersecurity Specialist",
    category: "Security",
    level: "Intermediate",
    duration: "14 weeks",
    price: 3299,
    startDate: "April 8, 2024",
    description: "Learn to protect systems, networks, and data from cyber threats",
    totalHours: 280,
    courses: [
      { id: 1, title: "Security Fundamentals", hours: 35, subject: "Basics" },
      { id: 2, title: "Network Security", hours: 45, subject: "Networks" },
      { id: 3, title: "Ethical Hacking", hours: 50, subject: "Penetration Testing" },
      { id: 4, title: "Web Application Security", hours: 45, subject: "Web Security" },
      { id: 5, title: "Cryptography", hours: 40, subject: "Encryption" },
      { id: 6, title: "Incident Response", hours: 35, subject: "Security Operations" },
      { id: 7, title: "Security Compliance", hours: 30, subject: "Governance" }
    ]
  }
];

export default function CurriculumList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(curriculums.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCurriculums = curriculums.filter(curriculum => {
    const matchesSearch = curriculum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curriculum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || curriculum.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || curriculum.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

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
                  {categories.map(category => (
                    <button
                      key={category}
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
                  {levels.map(level => (
                    <button
                      key={level}
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
                          <span>{curriculum.duration} • {curriculum.totalHours} hours</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>Starts: {curriculum.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span>{curriculum.courses.length} Courses</span>
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
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-purple-400" />
                          Course Breakdown
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {curriculum.courses.map((course) => (
                            <div
                              key={course.id}
                              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-white">{course.title}</h5>
                                <span className="text-purple-400 text-sm font-medium whitespace-nowrap ml-2">
                                  {course.hours}h
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">{course.subject}</p>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
                        >
                          Enroll in {curriculum.title}
                        </button>
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
