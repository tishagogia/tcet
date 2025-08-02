import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, ArrowDown, Volume2 } from 'lucide-react';
import RippleEffect from '../ui/RippleEffect';
import TextAnimations from '../animations/TextAnimations';

const Hero = ({ setIsVisualizerActive }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  
  const words = ['Professional', 'Stunning', 'Immersive', 'Interactive'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.2, 1],
      opacity: [0, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(139, 92, 246, 0.2) 25%, 
            transparent 50%)`
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.4) 0%, 
            rgba(139, 92, 246, 0.3) 25%, 
            transparent 60%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: `linear-gradient(135deg, 
              ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}, 
              ${i % 2 === 0 ? '#1d4ed8' : '#7c3aed'})`,
            left: `${20 + (i * 15)}%`,
            top: `${10 + (i * 12)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Animated Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div 
            className="relative inline-block"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-4 relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -100, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
              
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0"
                variants={glowVariants}
                initial="initial"
                animate={isHovered ? "animate" : "initial"}
                style={{ filter: 'blur(20px)' }}
              />
            </motion.h1>
            
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Audio
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
                Visualization
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Subtitle with Typewriter Effect */}
        <motion.div variants={itemVariants} className="mb-12">
          <TextAnimations
            text="Transform your music into stunning visual experiences with our advanced real-time analysis and rendering technology."
            className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsVisualizerActive(true);
              document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <RippleEffect />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Visualizing
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <RippleEffect />
            <span className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              View Demo
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16"
        >
          {[
            { number: '10K+', label: 'Artists' },
            { number: '50K+', label: 'Tracks' },
            { number: '4K', label: 'Quality' },
            { number: '24/7', label: 'Support' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-gray-400 text-sm mb-4">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            whileHover={{ borderColor: 'rgba(255, 255, 255, 0.6)' }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkle Animation */}
      <AnimatePresence>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-white/30" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </motion.div>
  );
};

export default Hero;
