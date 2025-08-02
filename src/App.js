import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Hero from './components/layout/Hero';
import VisualizerStudio from './components/visualizer/VisualizerStudio';
import Features from './components/layout/Features';
import Artists from './components/layout/Artists';
import Projects from './components/layout/Projects';
import Pricing from './components/layout/Pricing';
import ThreeBackground from './components/visualizer/ThreeBackground';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ParticleField from './components/animations/ParticleField';
import FloatingElements from './components/animations/FloatingElements';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [isVisualizerActive, setIsVisualizerActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 1.05,
      filter: 'blur(5px)',
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <ParticleField />
      <FloatingElements />
      
      {/* Three.js Visualizer Background */}
      <ThreeBackground isActive={isVisualizerActive} />
      
      {/* Navigation */}
      <Navigation 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key="main-content"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10"
        >
          {/* Hero Section */}
          <motion.section
            id="home"
            variants={sectionVariants}
            className="min-h-screen"
          >
            <Hero setIsVisualizerActive={setIsVisualizerActive} />
          </motion.section>

          {/* Visualizer Studio */}
          <motion.section
            id="visualizer"
            variants={sectionVariants}
            className="py-20"
          >
            <VisualizerStudio 
              isActive={isVisualizerActive}
              setIsActive={setIsVisualizerActive}
            />
          </motion.section>

          {/* Features Section */}
          <motion.section
            id="features"
            variants={sectionVariants}
            className="py-20"
          >
            <Features />
          </motion.section>

          {/* Artists Section */}
          <motion.section
            id="artists"
            variants={sectionVariants}
            className="py-20"
          >
            <Artists />
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id="projects"
            variants={sectionVariants}
            className="py-20"
          >
            <Projects />
          </motion.section>

          {/* Pricing Section */}
          <motion.section
            id="pricing"
            variants={sectionVariants}
            className="py-20"
          >
            <Pricing />
          </motion.section>
        </motion.main>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="flex flex-col space-y-2">
          {['home', 'visualizer', 'features', 'artists', 'projects', 'pricing'].map((section, i) => (
            <motion.div
              key={section}
              className={`w-2 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                currentSection === section 
                  ? 'bg-white shadow-lg shadow-white/30' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setCurrentSection(section);
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      
      </motion.div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          x: typeof window !== 'undefined' ? window.mouseX - 8 : 0,
          y: typeof window !== 'undefined' ? window.mouseY - 8 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 800,
          mass: 0.1
        }}
      />

      {/* Global Styles */}
      <style jsx global>{`
        * {
          cursor: none;
        }
        
        body {
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        ::selection {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default App;