import { motion } from "framer-motion";
import { Sparkles, Code2, Users, Zap } from "lucide-react";
import Iridescence from "./Iridescence";
import GalaxyBackground from "./GalaxyBackground";
import Ripple from "./Ripple";
import FaultyTerminal from "./FaultyTerminal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3e] to-[#0a0a1f]">
      {/* 3D Iridescent Background */}
      <div className="absolute inset-0 z-0">
       { /*<Iridescence
          color={[0.2, 0.3, 0.4]}
          mouseReact={true}
          amplitude={0.4}
          speed={0.8}
        /> */
        
       /* <GalaxyBackground
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={150}
        />*/
        /*<Ripple
        enableRainbow={false}
        gridColor="#5227ff"
        rippleIntensity={0.18}
        gridSize={14}
        gridThickness={10}
        glowIntensity={1}
        mouseInteraction={true}
        mouseInteractionRadius={1.4}
        vignetteStrength={100}
        gridRotation={155}
        fadeDistance={10}
        opacity={0.4}
      />*/

      <FaultyTerminal
      scale={3}
      gridMul={[2, 1]}
      digitSize={1.2}
      timeScale={0.5}
      pause={false}
      scanlineIntensity={0.5}
      glitchAmount={1}
      flickerAmount={1}
      noiseAmp={1}
      chromaticAberration={0}
      dither={0.2}
      curvature={0.2}
      tint="#8F58C5"
      mouseReact={true}
      mouseStrength={4}
      pageLoadAnimation={true}
      brightness={0.6}
      
    />

        }


      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-[1]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-[2]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Icons */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[Code2, Users, Zap, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                className="glass-effect p-4 rounded-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Icon className="w-8 h-8 text-purple-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-neon"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TechHub
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl mb-4 text-purple-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cohort-Based Learning Platform
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join a community of learners and master cutting-edge technologies
            through structured, collaborative cohorts led by industry experts.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg neon-glow hover:scale-105 transition-transform"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                document.getElementById("cohorts")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 glass-effect rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Cohorts
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}