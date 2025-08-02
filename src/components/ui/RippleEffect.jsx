import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleEffect = ({ color = 'rgba(255, 255, 255, 0.6)', duration = 600 }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration);
  }, [duration]);

  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.8
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: duration / 1000,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
      onMouseDown={createRipple}
      style={{ pointerEvents: 'none' }}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background: color,
            }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Enable pointer events for parent */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        onMouseDown={createRipple}
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default RippleEffect;