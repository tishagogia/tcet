import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextAnimations = ({ 
  text, 
  className = '', 
  animationType = 'typewriter',
  delay = 0,
  speed = 50 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (animationType === 'typewriter') {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsComplete(true);
        }
      }, delay + speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay, speed, animationType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay / 1000
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const words = text.split(' ');

  if (animationType === 'typewriter') {
    return (
      <motion.div 
        className={`${className} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay / 1000 }}
      >
        {displayedText}
        {!isComplete && (
          <motion.span
            className="inline-block w-0.5 h-5 bg-white ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  }

  if (animationType === 'wave') {
    return (
      <motion.div 
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                variants={childVariants}
                whileHover={{ 
                  scale: 1.2, 
                  color: '#3b82f6',
                  transition: { duration: 0.1 }
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <motion.span variants={childVariants} className="inline-block">
                &nbsp;
              </motion.span>
            )}
          </span>
        ))}
      </motion.div>
    );
  }

  if (animationType === 'fade') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: delay / 1000,
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        {text}
      </motion.div>
    );
  }

  if (animationType === 'glitch') {
    return (
      <motion.div className={`${className} relative`}>
        <motion.div
          animate={{
            x: [0, -2, 2, 0],
            textShadow: [
              '0 0 0 rgba(255,0,0,0)',
              '2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7)',
              '0 0 0 rgba(255,0,0,0)'
            ]
          }}
          transition={{
            duration: 0.2,
            repeat: 2,
            delay: delay / 1000,
            repeatType: 'reverse'
          }}
        >
          {text}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {text}
    </motion.div>
  );
};

export default TextAnimations;