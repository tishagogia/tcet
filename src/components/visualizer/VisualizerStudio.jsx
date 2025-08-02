import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Play, Pause, Square, BarChart3, Zap, Radio } from 'lucide-react';
import RippleEffect from '../ui/RippleEffect';
import AudioUploader from './AudioUploader';
import AudioControls from './AudioControls';

const VisualizerStudio = ({ isActive, setIsActive }) => {
  const [selectedMode, setSelectedMode] = useState('spectrum');
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const modes = [
    {
      id: 'spectrum',
      name: 'Frequency Spectrum',
      description: 'Classic audio frequency visualization',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'particles',
      name: 'Particle Field',
      description: 'Dynamic particle-based visualization',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'waveform',
      name: 'Waveform',
      description: 'Real-time audio waveform display',
      icon: Radio,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const handleFileUpload = (file) => {
    setAudioFile(file);
    setShowControls(true);
    setIsActive(true);
  };

  return (
    <motion.div
      className="container mx-auto px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Header */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <motion.h3 
          className="text-5xl md:text-6xl font-light mb-6"
          whileHover={{ scale: 1.02 }}
        >
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Visualization
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
            Studio
          </span>
        </motion.h3>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Choose your preferred visualization style and upload your audio to create stunning visual experiences
        </motion.p>
      </motion.div>

      {/* Visualization Mode Selector */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={itemVariants}
      >
        {modes.map((mode, index) => {
          const IconComponent = mode.icon;
          return (
            <motion.div
              key={mode.id}
              className={`relative p-8 rounded-2xl cursor-pointer transition-all duration-500 ${
                selectedMode === mode.id
                  ? 'bg-white/10 border-2 border-white/30 shadow-2xl'
                  : 'bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20'
              }`}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMode(mode.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RippleEffect />
              
              {/* Mode Icon with Animated Background */}
              <motion.div
                className="relative mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center shadow-lg`}
                  animate={selectedMode === mode.id ? {
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.color} rounded-xl filter blur-md opacity-0`}
                  animate={{ opacity: selectedMode === mode.id ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <h4 className="text-xl font-semibold mb-3 text-white">{mode.name}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>

              {/* Selection Indicator */}
              <AnimatePresence>
                {selectedMode === mode.id && (
                  <motion.div
                    className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Effect Lines */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Audio Upload Section */}
      <motion.div 
        className="max-w-4xl mx-auto mb-16"
        variants={itemVariants}
      >
        <AudioUploader onFileUpload={handleFileUpload} />
      </motion.div>

      {/* Preview Section */}
      <AnimatePresence>
        {audioFile && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Preview Window */}
            <motion.div
              className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Simulated Visualization Preview */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {selectedMode === 'spectrum' && (
                  <div className="flex items-end justify-center space-x-2 h-32">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                        animate={{
                          height: [20, Math.random() * 80 + 20, 20],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {selectedMode === 'particles' && (
                  <div className="relative w-full h-full">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0.5, 1.5, 0.5],
                          opacity: [0.3, 1, 0.3],
                          x: [0, Math.random() * 40 - 20, 0],
                          y: [0, Math.random() * 40 - 20, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {selectedMode === 'waveform' && (
                  <svg className="w-full h-32" viewBox="0 0 400 100">
                    <motion.path
                      d="M0,50 Q100,20 200,50 T400,50"
                      stroke="url(#waveGradient)"
                      strokeWidth="3"
                      fill="none"
                      animate={{
                        d: [
                          "M0,50 Q100,20 200,50 T400,50",
                          "M0,50 Q100,80 200,50 T400,50",
                          "M0,50 Q100,20 200,50 T400,50"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-lg font-medium">
                  {selectedMode === 'spectrum' && 'Frequency Spectrum Preview'}
                  {selectedMode === 'particles' && 'Particle Field Preview'}
                  {selectedMode === 'waveform' && 'Waveform Preview'}
                </div>
              </div>
            </motion.div>

            {/* Audio Controls */}
            {showControls && (
              <AudioControls
                audioFile={audioFile}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                selectedMode={selectedMode}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VisualizerStudio;