import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleField = ({ particleCount = 50, maxSize = 4 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * maxSize + 1,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6',
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
  }, [particleCount, maxSize]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, particle.direction * 100, 0],
            x: [0, particle.direction * 50, 0],
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 20).map((particle, i) => (
          <motion.line
            key={particle.id}
            x1={`${particle.x}%`}
            y1={`${particle.y}%`}
            x2={`${particles[(i + 1) % particles.length]?.x || 0}%`}
            y2={`${particles[(i + 1) % particles.length]?.y || 0}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          {i % 3 === 0 && (
            <div className="w-8 h-8 border border-blue-500/20 rotate-45" />
          )}
          {i % 3 === 1 && (
            <div className="w-6 h-6 rounded-full border border-purple-500/20" />
          )}
          {i % 3 === 2 && (
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-blue-500/20" />
          )}
        </motion.div>
      ))}
      
      {/* Ambient Glow Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default ParticleField;