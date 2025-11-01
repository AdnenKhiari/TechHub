import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, DollarSign, BookOpen, Calendar, Play, CheckCircle, Users, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ContactForm from "../components/ContactForm";
import { Toaster } from "../components/ui/toaster";

interface Course {
  id: number;
  title: string;
  subject: string;
  description: string;
  hours: number;
  details?: string[]; // Add optional details field
}

interface Curriculum {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  level: string;
  startDate: string;
  courses: Course[];
  outcomes: string[];
  prerequisites: string[];
  videoUrl?: string;
}

const curriculums: Curriculum[] = [
  {
    id: 1,
    title: "React Native Mobile Development",
    description: "Master cross-platform mobile app development with React Native. Build production-ready iOS and Android applications.",
    duration: "16 weeks",
    price: "$2,499",
    level: "Intermediate",
    startDate: "March 15, 2024",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    outcomes: [
      "Build and deploy production-ready mobile apps",
      "Master React Native core concepts and APIs",
      "Implement complex navigation patterns",
      "Integrate native device features",
      "Optimize app performance",
      "Publish apps to App Store and Google Play"
    ],
    prerequisites: [
      "JavaScript fundamentals",
      "Basic React knowledge",
      "Understanding of mobile app concepts",
      "Git version control"
    ],
    courses: [
      {
        id: 1,
        title: "React Native Fundamentals",
        subject: "Mobile Development",
        description: "Core concepts of React Native development",
        hours: 40,
        details: [
          "Setting up React Native development environment",
          "Understanding React Native components and JSX",
          "Working with Views, Text, and Image components",
          "Styling with StyleSheet and Flexbox",
          "Handling user input with TextInput and TouchableOpacity",
          "Managing component state with useState and useEffect hooks",
          "Props and component composition patterns",
          "Debugging React Native applications",
          "Platform-specific code for iOS and Android"
        ]
      },
      {
        id: 2,
        title: "Navigation & Routing",
        subject: "Mobile Development",
        description: "Implementing navigation in React Native apps",
        hours: 30,
        details: [
          "React Navigation setup and configuration",
          "Stack Navigator for screen transitions",
          "Tab Navigator for bottom navigation",
          "Drawer Navigator for side menus",
          "Passing parameters between screens",
          "Deep linking and URL handling",
          "Navigation lifecycle and events",
          "Custom navigation headers and animations"
        ]
      },
      {
        id: 3,
        title: "State Management",
        subject: "Mobile Development",
        description: "Managing application state effectively",
        hours: 35,
        details: [
          "Context API for global state",
          "Redux fundamentals and setup",
          "Redux Toolkit for simplified Redux",
          "Async actions with Redux Thunk",
          "Zustand for lightweight state management",
          "Recoil for atomic state management",
          "State persistence and hydration",
          "Performance optimization with selectors"
        ]
      },
      {
        id: 4,
        title: "Native Features",
        subject: "Mobile Development",
        description: "Accessing device capabilities",
        hours: 40,
        details: [
          "Camera and photo library access",
          "Geolocation and maps integration",
          "Push notifications setup",
          "Biometric authentication",
          "File system operations",
          "Device sensors (accelerometer, gyroscope)",
          "Background tasks and services",
          "Native module integration"
        ]
      },
      {
        id: 5,
        title: "API Integration",
        subject: "Mobile Development",
        description: "Connecting to backend services",
        hours: 30,
        details: [
          "Fetch API and Axios for HTTP requests",
          "RESTful API consumption",
          "GraphQL with Apollo Client",
          "WebSocket for real-time communication",
          "Authentication token management",
          "Error handling and retry logic",
          "Caching strategies",
          "Offline-first architecture"
        ]
      },
      {
        id: 6,
        title: "Testing & Deployment",
        subject: "Mobile Development",
        description: "Testing and publishing your apps",
        hours: 35,
        details: [
          "Unit testing with Jest",
          "Component testing with React Native Testing Library",
          "E2E testing with Detox",
          "iOS deployment with TestFlight",
          "Android deployment with Google Play",
          "Code signing and certificates",
          "CI/CD pipeline setup",
          "App performance monitoring"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    description: "Comprehensive full-stack development bootcamp covering frontend, backend, and deployment.",
    duration: "24 weeks",
    price: "$3,499",
    level: "Beginner to Advanced",
    startDate: "April 1, 2024",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    outcomes: [
      "Build full-stack web applications from scratch",
      "Master modern frontend frameworks",
      "Create RESTful APIs with Node.js",
      "Design and implement databases",
      "Deploy applications to cloud platforms",
      "Implement authentication and security"
    ],
    prerequisites: [
      "Basic computer skills",
      "Willingness to learn",
      "No prior coding experience required"
    ],
    courses: [
      {
        id: 7,
        title: "HTML, CSS & Responsive Design",
        subject: "Frontend",
        description: "Foundation of web development",
        hours: 45,
        details: [
          "HTML5 semantic elements and document structure",
          "CSS selectors, specificity, and the cascade",
          "Box model, positioning, and layout techniques",
          "Flexbox for flexible layouts",
          "CSS Grid for complex layouts",
          "Responsive design principles and mobile-first approach",
          "Media queries and breakpoints",
          "CSS animations and transitions",
          "Modern CSS features (custom properties, calc, etc.)"
        ]
      },
      {
        id: 8,
        title: "JavaScript & TypeScript Fundamentals",
        subject: "Programming",
        description: "Modern JavaScript and TypeScript",
        hours: 60,
        details: [
          "ES6+ syntax: let, const, arrow functions",
          "Destructuring, spread, and rest operators",
          "Promises, async/await, and asynchronous programming",
          "Array methods: map, filter, reduce, forEach",
          "Object-oriented programming in JavaScript",
          "TypeScript basics: types, interfaces, and generics",
          "Type inference and type annotations",
          "Working with modules and imports",
          "Error handling and debugging techniques"
        ]
      },
      {
        id: 9,
        title: "React & Modern Frontend",
        subject: "Frontend",
        description: "Building interactive UIs with React",
        hours: 70,
        details: [
          "React fundamentals: components, props, and state",
          "React Hooks: useState, useEffect, useContext, useReducer",
          "Component lifecycle and side effects",
          "Context API for state management",
          "React Router for navigation",
          "Form handling and validation",
          "Performance optimization with useMemo and useCallback",
          "Custom hooks and reusable logic",
          "Testing React components with Jest and React Testing Library"
        ]
      },
      {
        id: 10,
        title: "Node.js & Express Backend",
        subject: "Backend",
        description: "Server-side development with Node.js",
        hours: 65,
        details: [
          "Node.js runtime and event loop",
          "Creating HTTP servers with Express",
          "Routing and middleware patterns",
          "RESTful API design principles",
          "Request/response handling and validation",
          "Error handling and logging",
          "Authentication with JWT and sessions",
          "File uploads and static file serving",
          "Environment variables and configuration"
        ]
      },
      {
        id: 11,
        title: "PostgreSQL & Database Design",
        subject: "Database",
        description: "Relational database management",
        hours: 50,
        details: [
          "Relational database concepts and SQL basics",
          "Creating tables, indexes, and constraints",
          "CRUD operations: SELECT, INSERT, UPDATE, DELETE",
          "Joins: INNER, LEFT, RIGHT, FULL OUTER",
          "Aggregations and GROUP BY queries",
          "Database normalization and schema design",
          "Transactions and ACID properties",
          "Working with ORMs (Sequelize, TypeORM)",
          "Database migrations and seeding"
        ]
      },
      {
        id: 12,
        title: "AWS Deployment & DevOps",
        subject: "DevOps",
        description: "Deploying and maintaining applications",
        hours: 40,
        details: [
          "AWS fundamentals: EC2, S3, RDS",
          "Deploying applications to AWS Elastic Beanstalk",
          "Setting up CI/CD pipelines with GitHub Actions",
          "Docker containerization basics",
          "Environment management and secrets",
          "Load balancing and auto-scaling",
          "Monitoring and logging with CloudWatch",
          "Domain setup and SSL certificates",
          "Cost optimization strategies"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    description: "Learn data analysis, visualization, and machine learning with Python.",
    duration: "20 weeks",
    price: "$2,999",
    level: "Intermediate",
    startDate: "March 22, 2024",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    outcomes: [
      "Analyze and visualize complex datasets",
      "Build machine learning models",
      "Work with popular ML frameworks",
      "Deploy ML models to production",
      "Understand deep learning fundamentals",
      "Complete real-world data science projects"
    ],
    prerequisites: [
      "Basic programming knowledge",
      "High school mathematics",
      "Statistical thinking",
      "Problem-solving skills"
    ],
    courses: [
      {
        id: 13,
        title: "Python Programming",
        subject: "Programming",
        description: "Python fundamentals for data science",
        hours: 40,
        details: [
          "Python syntax and data types",
          "Control flow: if statements, loops",
          "Functions and lambda expressions",
          "Object-oriented programming in Python",
          "List comprehensions and generators",
          "File I/O and exception handling",
          "Working with modules and packages",
          "Virtual environments and pip",
          "Python best practices and PEP 8"
        ]
      },
      {
        id: 14,
        title: "NumPy & Pandas",
        subject: "Data Analysis",
        description: "Data manipulation and analysis",
        hours: 45,
        details: [
          "NumPy arrays and vectorization",
          "Array operations and broadcasting",
          "Linear algebra with NumPy",
          "Pandas DataFrames and Series",
          "Data loading from CSV, Excel, SQL",
          "Data cleaning and preprocessing",
          "Grouping, aggregation, and pivot tables",
          "Time series analysis",
          "Merging and joining datasets"
        ]
      },
      {
        id: 15,
        title: "Data Visualization",
        subject: "Visualization",
        description: "Creating compelling data visualizations",
        hours: 35,
        details: [
          "Matplotlib fundamentals and plotting",
          "Seaborn for statistical visualizations",
          "Plotly for interactive charts",
          "Creating subplots and layouts",
          "Customizing colors, labels, and legends",
          "Heatmaps and correlation matrices",
          "Geographic data visualization",
          "Dashboard creation with Streamlit",
          "Best practices for data storytelling"
        ]
      },
      {
        id: 16,
        title: "Machine Learning Basics",
        subject: "Machine Learning",
        description: "Introduction to ML algorithms",
        hours: 50,
        details: [
          "Supervised vs unsupervised learning",
          "Train-test split and cross-validation",
          "Linear and logistic regression",
          "Decision trees and random forests",
          "K-means clustering",
          "Feature engineering and selection",
          "Model evaluation metrics",
          "Hyperparameter tuning",
          "Scikit-learn library essentials"
        ]
      },
      {
        id: 17,
        title: "Deep Learning",
        subject: "Machine Learning",
        description: "Neural networks and deep learning",
        hours: 55,
        details: [
          "Neural network fundamentals",
          "TensorFlow and Keras basics",
          "Building and training models",
          "Convolutional Neural Networks (CNNs)",
          "Recurrent Neural Networks (RNNs)",
          "Transfer learning and pre-trained models",
          "Model optimization and regularization",
          "GPU acceleration",
          "Deploying ML models"
        ]
      },
      {
        id: 18,
        title: "Real-world Projects",
        subject: "Projects",
        description: "Hands-on data science projects",
        hours: 60,
        details: [
          "Exploratory data analysis project",
          "Predictive modeling for business",
          "Image classification with CNNs",
          "Natural language processing tasks",
          "Time series forecasting",
          "Recommendation system",
          "A/B testing analysis",
          "Building a data pipeline",
          "Portfolio project presentation"
        ]
      }
    ]
  }
];

export default function CurriculumDetailPage() {
  const { id } = useParams();
  const curriculum = curriculums.find(c => c.id === Number(id));
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

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
      <div className="relative bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
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
            {curriculum.videoUrl && (
              <motion.div
                className="glass-effect rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                  <Play className="w-20 h-20 text-purple-400" />
                </div>
              </motion.div>
            )}

            {/* What You'll Learn */}
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

            {/* Prerequisites */}
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
                  <div className="text-4xl font-bold text-white mb-2">{curriculum.price}</div>
                  <p className="text-gray-400">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>{curriculum.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>Starts {curriculum.startDate}</span>
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