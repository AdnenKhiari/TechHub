import { motion } from "framer-motion";
import { ArrowLeft, Clock, DollarSign, BookOpen, Calendar, Play, CheckCircle, Users, Award } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { Toaster } from "../components/ui/toaster";

interface Course {
  id: number;
  title: string;
  hours: number;
  subject: string;
  description: string;
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
  videoUrl: string;
  prerequisites: string[];
  outcomes: string[];
  instructor: string;
  students: number;
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "Sarah Johnson",
    students: 1250,
    prerequisites: ["Basic HTML/CSS knowledge", "Understanding of programming concepts", "Familiarity with command line"],
    outcomes: [
      "Build full-stack web applications from scratch",
      "Master React and modern frontend frameworks",
      "Create RESTful APIs with Node.js and Express",
      "Deploy applications to cloud platforms",
      "Work with databases and authentication systems"
    ],
    courses: [
      { id: 1, title: "HTML, CSS & Responsive Design", hours: 30, subject: "Frontend Basics", description: "Learn the fundamentals of web design with HTML5, CSS3, and responsive layouts using Flexbox and Grid." },
      { id: 2, title: "JavaScript & TypeScript Fundamentals", hours: 40, subject: "Programming", description: "Master JavaScript ES6+ features and TypeScript for type-safe development." },
      { id: 3, title: "React & Modern Frontend", hours: 50, subject: "Frontend Framework", description: "Build interactive UIs with React, hooks, context, and state management." },
      { id: 4, title: "Node.js & Express Backend", hours: 45, subject: "Backend Development", description: "Create scalable server-side applications with Node.js and Express framework." },
      { id: 5, title: "PostgreSQL & Database Design", hours: 35, subject: "Database", description: "Design and implement relational databases with PostgreSQL and ORMs." },
      { id: 6, title: "AWS Deployment & DevOps", hours: 40, subject: "Cloud & Deployment", description: "Deploy and manage applications on AWS with CI/CD pipelines." }
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "Dr. Michael Chen",
    students: 890,
    prerequisites: ["Strong Python programming skills", "Linear algebra and calculus", "Statistics fundamentals"],
    outcomes: [
      "Develop and train neural networks",
      "Implement NLP and computer vision solutions",
      "Deploy ML models to production",
      "Work with TensorFlow and PyTorch",
      "Build end-to-end AI applications"
    ],
    courses: [
      { id: 1, title: "Python for Data Science", hours: 40, subject: "Programming", description: "Master Python libraries for data manipulation and analysis." },
      { id: 2, title: "Mathematics for ML", hours: 35, subject: "Mathematics", description: "Essential math concepts for machine learning algorithms." },
      { id: 3, title: "Neural Networks & Deep Learning", hours: 60, subject: "Deep Learning", description: "Build and train deep neural networks from scratch." },
      { id: 4, title: "TensorFlow & PyTorch", hours: 55, subject: "ML Frameworks", description: "Master industry-standard ML frameworks." },
      { id: 5, title: "NLP & Text Processing", hours: 50, subject: "Natural Language", description: "Process and analyze text data with modern NLP techniques." },
      { id: 6, title: "Computer Vision", hours: 45, subject: "Image Processing", description: "Build image recognition and object detection systems." },
      { id: 7, title: "Model Deployment & MLOps", hours: 35, subject: "Production ML", description: "Deploy and monitor ML models in production environments." }
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "Emily Rodriguez",
    students: 670,
    prerequisites: ["JavaScript/React knowledge", "Basic mobile UI/UX understanding"],
    outcomes: [
      "Build native mobile apps for iOS and Android",
      "Implement navigation and state management",
      "Access device features and APIs",
      "Publish apps to App Store and Play Store",
      "Optimize app performance"
    ],
    courses: [
      { id: 1, title: "React Native Fundamentals", hours: 40, subject: "Mobile Framework", description: "Learn React Native core concepts and components." },
      { id: 2, title: "Mobile UI/UX Design", hours: 30, subject: "Design", description: "Design beautiful and intuitive mobile interfaces." },
      { id: 3, title: "Navigation & State Management", hours: 35, subject: "App Architecture", description: "Implement navigation patterns and manage app state." },
      { id: 4, title: "Native APIs & Device Features", hours: 40, subject: "Native Integration", description: "Access camera, GPS, and other device features." },
      { id: 5, title: "App Store Deployment", hours: 25, subject: "Publishing", description: "Prepare and publish apps to app stores." },
      { id: 6, title: "Performance Optimization", hours: 30, subject: "Optimization", description: "Optimize app performance and user experience." }
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "David Park",
    students: 1450,
    prerequisites: ["Basic programming knowledge", "High school mathematics"],
    outcomes: [
      "Analyze and visualize complex datasets",
      "Build predictive models",
      "Create interactive dashboards",
      "Perform statistical analysis",
      "Communicate insights effectively"
    ],
    courses: [
      { id: 1, title: "Python Programming Basics", hours: 35, subject: "Programming", description: "Learn Python fundamentals for data science." },
      { id: 2, title: "Statistics & Probability", hours: 40, subject: "Mathematics", description: "Essential statistical concepts for data analysis." },
      { id: 3, title: "Data Analysis with Pandas", hours: 45, subject: "Data Analysis", description: "Manipulate and analyze data with Pandas library." },
      { id: 4, title: "Data Visualization", hours: 40, subject: "Visualization", description: "Create compelling visualizations with Matplotlib and Seaborn." },
      { id: 5, title: "SQL & Database Queries", hours: 35, subject: "Database", description: "Query and manage data with SQL." },
      { id: 6, title: "Machine Learning Basics", hours: 50, subject: "ML Introduction", description: "Introduction to machine learning algorithms." },
      { id: 7, title: "Real-World Projects", hours: 35, subject: "Capstone", description: "Apply skills to real-world data science projects." }
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "Alex Thompson",
    students: 780,
    prerequisites: ["Linux command line experience", "Basic networking knowledge", "Programming experience"],
    outcomes: [
      "Design scalable cloud architectures",
      "Implement CI/CD pipelines",
      "Manage containerized applications",
      "Automate infrastructure with IaC",
      "Monitor and optimize cloud resources"
    ],
    courses: [
      { id: 1, title: "AWS Cloud Fundamentals", hours: 40, subject: "Cloud Basics", description: "Master AWS core services and cloud concepts." },
      { id: 2, title: "Docker & Containerization", hours: 35, subject: "Containers", description: "Containerize applications with Docker." },
      { id: 3, title: "Kubernetes Orchestration", hours: 45, subject: "Orchestration", description: "Orchestrate containers with Kubernetes." },
      { id: 4, title: "CI/CD Pipelines", hours: 40, subject: "Automation", description: "Build automated deployment pipelines." },
      { id: 5, title: "Infrastructure as Code", hours: 40, subject: "IaC", description: "Manage infrastructure with Terraform and CloudFormation." },
      { id: 6, title: "Monitoring & Logging", hours: 40, subject: "Observability", description: "Implement monitoring and logging solutions." }
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    instructor: "Jennifer Lee",
    students: 560,
    prerequisites: ["Networking fundamentals", "Operating systems knowledge", "Basic programming"],
    outcomes: [
      "Identify and mitigate security vulnerabilities",
      "Perform penetration testing",
      "Implement security best practices",
      "Respond to security incidents",
      "Ensure compliance with security standards"
    ],
    courses: [
      { id: 1, title: "Security Fundamentals", hours: 35, subject: "Basics", description: "Core security concepts and principles." },
      { id: 2, title: "Network Security", hours: 45, subject: "Networks", description: "Secure network infrastructure and protocols." },
      { id: 3, title: "Ethical Hacking", hours: 50, subject: "Penetration Testing", description: "Learn ethical hacking techniques and tools." },
      { id: 4, title: "Web Application Security", hours: 45, subject: "Web Security", description: "Secure web applications against common attacks." },
      { id: 5, title: "Cryptography", hours: 40, subject: "Encryption", description: "Understand encryption and cryptographic systems." },
      { id: 6, title: "Incident Response", hours: 35, subject: "Security Operations", description: "Respond to and recover from security incidents." },
      { id: 7, title: "Security Compliance", hours: 30, subject: "Governance", description: "Ensure compliance with security regulations." }
    ]
  }
];

export default function CurriculumDetailPage() {
  const { id } = useParams();
  const curriculum = curriculums.find(c => c.id === Number(id));

  if (!curriculum) {
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
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm font-semibold">
              {curriculum.category}
            </span>
            <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm font-semibold">
              {curriculum.level}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            {curriculum.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">{curriculum.description}</p>

          <div className="flex flex-wrap gap-6 mt-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>{curriculum.duration} • {curriculum.totalHours} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Starts: {curriculum.startDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>{curriculum.students.toLocaleString()} students enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Instructor: {curriculum.instructor}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <motion.div
              className="glass-effect rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Course Introduction Video</p>
                  <p className="text-gray-500 text-sm mt-2">Click to watch the full curriculum overview</p>
                </div>
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {curriculum.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{outcome}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
              <ul className="space-y-3">
                {curriculum.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </motion.div>

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
                {curriculum.courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{course.title}</h3>
                          <p className="text-sm text-purple-400 mb-2">{course.subject}</p>
                          <p className="text-gray-400">{course.description}</p>
                        </div>
                      </div>
                      <span className="text-purple-400 font-semibold whitespace-nowrap ml-4">
                        {course.hours}h
                      </span>
                    </div>
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
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-5xl font-bold text-white mb-2">
                  <DollarSign className="w-12 h-12 text-green-400" />
                  {curriculum.price.toLocaleString()}
                </div>
                <p className="text-gray-400">One-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-semibold">{curriculum.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Total Hours</span>
                  <span className="text-white font-semibold">{curriculum.totalHours}h</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Courses</span>
                  <span className="text-white font-semibold">{curriculum.courses.length}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Level</span>
                  <span className="text-white font-semibold">{curriculum.level}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-white font-semibold">{curriculum.startDate}</span>
                </div>
              </div>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Enroll Now
              </button>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  ✓ Certificate upon completion
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />
      <Toaster />
    </div>
  );
}
