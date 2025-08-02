import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-center">
        {/* Main Logo Animation */}
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.6)",
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-12 h-12 text-white" />
          </motion.div>

          {/* Orbiting Dots */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                transformOrigin: "60px 60px",
                transform: `rotate(${i * 45}deg) translateX(60px)`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.125,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Resonance
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Initializing audio visualization engine...
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          className="space-y-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[
            "Loading audio processing modules...",
            "Initializing 3D visualization engine...",
            "Setting up real-time frequency analysis...",
            "Preparing interactive interface..."
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.8 + i * 0.3,
                duration: 0.5
              }}
            >
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
              <span>{step}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Waveform at Bottom */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-end space-x-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
              animate={{
                height: [5, Math.random() * 30 + 5, 5],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.02,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500/30 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 border-2 border-purple-500/30"
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;