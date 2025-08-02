import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Music, Headphones, Mic, Radio, Volume2 } from 'lucide-react';

const FloatingElements = () => {
  const icons = [Zap, Music, Headphones, Mic, Radio, Volume2];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Floating Icons */}
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          <div className="relative">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
              whileHover={{ scale: 1.3, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-6 h-6 text-white/60" />
            </motion.div>
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl filter blur-md -z-10"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Floating Music Notes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-white/20 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 5,
          }}
        >
          {['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
      
      {/* Floating Geometric Cards */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`card-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotateY: [0, 180, 360],
            rotateX: [0, 15, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          <div className="w-16 h-24 bg-gradient-to-b from-white/5 to-white/10 rounded-lg backdrop-blur-sm border border-white/10 p-2">
            <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded mb-2" />
            <div className="w-3/4 h-1 bg-white/30 rounded mb-1" />
            <div className="w-1/2 h-1 bg-white/20 rounded mb-1" />
            <div className="w-full h-1 bg-white/10 rounded" />
          </div>
        </motion.div>
      ))}
      
      {/* Animated Waveform */}
      <motion.div
        className="absolute bottom-20 left-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-end space-x-1">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
              animate={{
                height: [5, Math.random() * 40 + 10, 5],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Floating Frequency Spectrum */}
      <motion.div
        className="absolute top-32 right-16"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="w-32 h-20 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10 p-2">
          <div className="flex justify-between items-end h-full">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 rounded-full"
                animate={{
                  height: [2, Math.random() * 12 + 2, 2],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Orbiting Elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              transformOrigin: `${100 + i * 50}px 0px`,
              transform: `rotate(${i * 90}deg) translateX(${100 + i * 50}px)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FloatingElements;