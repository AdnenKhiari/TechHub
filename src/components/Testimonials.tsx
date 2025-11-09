import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "TechCorp",
    content: "The cohort-based learning approach transformed my career. The hands-on projects and mentorship were invaluable.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Software Engineer",
    company: "InnovateLabs",
    content: "Best investment I've made in my education. The curriculum is cutting-edge and the community support is amazing.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Frontend Developer",
    company: "DesignHub",
    content: "From zero to hero in 12 weeks! The instructors are world-class and the projects are industry-relevant.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 4,
    name: "Alex Rivera",
    role: "DevOps Engineer",
    company: "CloudScale",
    content: "The collaborative learning environment pushed me to excel. I landed my dream job within a month of graduating.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: 5,
    name: "Emma Wilson",
    role: "Data Scientist",
    company: "DataFlow",
    content: "Exceptional program with real-world applications. The cohort model kept me motivated and accountable throughout.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Backend Developer",
    company: "ServerPro",
    content: "The depth of knowledge and practical skills I gained exceeded my expectations. Highly recommend to anyone serious about tech.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a1f]" id="testimonials">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-purple-900/10" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/30 mb-6">
            <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
            <span className="text-sm text-purple-300 font-medium">Student Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              What Our Students Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Join thousands of successful graduates who transformed their careers with TechHub
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="group relative"
                style={{
                  animation: `slideIn 0.6s ease-out ${idx * 0.1}s both`
                }}
              >
                {/* Card */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 border border-purple-400/30 rounded-2xl p-6 md:p-8 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                  {/* Glossy top highlight */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />
                  
                  {/* Quote icon */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:rotate-12 transition-transform duration-500">
                    <Quote className="w-6 h-6 text-white" fill="white" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-purple-400/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-12 h-12 rounded-full border-2 border-purple-400/50"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-purple-400">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'w-12 bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'w-2 bg-purple-500/30 hover:bg-purple-500/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
