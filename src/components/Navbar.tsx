import { useState, useEffect } from "react";
import { Menu, X, Zap, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      
      if (scrolled !== isScrolled) {
        setIsTransitioning(true);
        
        // Delay for the new navbar to appear
        setTimeout(() => {
          setIsScrolled(scrolled);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 400);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Cohorts", href: "##cohorts" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Rounded Navbar - fades up and disappears */}
      <nav 
        className={`fixed z-50 top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-5xl transition-all duration-500 ease-out ${
          isScrolled || isTransitioning ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="backdrop-blur-2xl bg-gradient-to-r from-slate-900/60 via-purple-900/40 to-slate-900/60 border border-purple-400/30 rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4 shadow-[0_8px_32px_0_rgba(139,92,246,0.3)]">
          {/* Top glossy highlight */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent rounded-full" />
          
          {/* Animated glow effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0"
            style={{
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
          
          <div className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
            {/* Logo with icon */}
            <a 
              href="#home" 
              className="flex items-center gap-2 md:gap-3 group transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500 ease-out" />
                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-1.5 md:p-2 rounded-lg transform group-hover:rotate-[360deg] transition-all duration-700 ease-out">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" fill="white" />
                </div>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                TechHub
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 ease-out group px-3 py-2 hover:-translate-y-1"
                >
                  {link.name}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 rounded-lg transition-all duration-300 ease-out -z-10" />
                </a>
              ))}
              
              <button className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full text-white font-medium hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-500 ease-out overflow-hidden group transform hover:scale-110 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-700 ease-out" />
                  Enroll Now
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-300 hover:bg-purple-500/40 active:scale-90 transition-all duration-300 ease-out"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="transform rotate-90 transition-transform duration-300 ease-out" />
              ) : (
                <Menu size={20} className="transform rotate-0 transition-transform duration-300 ease-out" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 border-t border-purple-400/20 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 ease-out px-4 py-2.5 rounded-lg hover:bg-purple-500/20 active:scale-95 transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    animation: isMobileMenuOpen ? `slideInFancy 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both` : 'none' 
                  }}
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-purple-500/50"
                style={{ 
                  animation: isMobileMenuOpen ? `slideInFancy 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both` : 'none' 
                }}
              >
                <Sparkles className="w-4 h-4" />
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Width Navbar - slides down from top */}
      <nav 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-600 ease-out ${
          isScrolled && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="backdrop-blur-2xl bg-gradient-to-r from-slate-900/60 via-purple-900/40 to-slate-900/60 border-b border-purple-400/30 px-6 md:px-8 py-3 md:py-4 shadow-[0_4px_24px_0_rgba(139,92,246,0.2)]">
          {/* Top glossy highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent opacity-50" />
          
          <div className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
            {/* Logo with icon */}
            <a 
              href="#home" 
              className="flex items-center gap-2 md:gap-3 group transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500 ease-out" />
                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-1.5 md:p-2 rounded-lg transform group-hover:rotate-[360deg] transition-all duration-700 ease-out">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" fill="white" />
                </div>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                TechHub
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 ease-out group px-3 py-2 hover:-translate-y-1"
                >
                  {link.name}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 rounded-lg transition-all duration-300 ease-out -z-10" />
                </a>
              ))}
              
              <button className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full text-white font-medium hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-500 ease-out overflow-hidden group transform hover:scale-110 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-700 ease-out" />
                  Enroll Now
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-300 hover:bg-purple-500/40 active:scale-90 transition-all duration-300 ease-out"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="transform rotate-90 transition-transform duration-300 ease-out" />
              ) : (
                <Menu size={20} className="transform rotate-0 transition-transform duration-300 ease-out" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 border-t border-purple-400/20 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 ease-out px-4 py-2.5 rounded-lg hover:bg-purple-500/20 active:scale-95 transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    animation: isMobileMenuOpen ? `slideInFancy 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both` : 'none' 
                  }}
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-purple-500/50"
                style={{ 
                  animation: isMobileMenuOpen ? `slideInFancy 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both` : 'none' 
                }}
              >
                <Sparkles className="w-4 h-4" />
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideInFancy {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}