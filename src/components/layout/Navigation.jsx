import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import RippleEffect from '../ui/RippleEffect';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'visualizer', label: 'Studio' },
    { id: 'features', label: 'Features' },
    { id: 'artists', label: 'Artists' },
    { id: 'projects', label: 'Projects' },
    { id: 'pricing', label: 'Pricing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    setIsOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    visible: { 
      y: 0, 
      opacity: 1,
      backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-black/20 border-b border-white/10' 
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('home')}
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.h1 
                className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                whileHover={{ 
                  background: "linear-gradient(45deg, #fff, #3b82f6, #8b5cf6)",
                }}
              >
                Resonance
              </motion.h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentSection === item.id
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <RippleEffect />
                  {item.label}
                  {currentSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="hidden lg:block relative px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RippleEffect />
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-2xl z-50 lg:hidden border-l border-white/10"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col p-6 pt-20">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={menuItemVariants}
                    className={`relative text-left py-4 px-4 rounded-lg mb-2 transition-all duration-300 ${
                      currentSection === item.id
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ x: 10 }}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <RippleEffect />
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.button
                  variants={menuItemVariants}
                  className="relative mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RippleEffect />
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;