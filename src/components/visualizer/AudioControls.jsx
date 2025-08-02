import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import RippleEffect from '../ui/RippleEffect';

const AudioControls = ({ audioFile, isPlaying, setIsPlaying, selectedMode }) => {
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioFile && audioRef.current) {
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      className="bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 p-6"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Track Info */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
              boxShadow: isPlaying 
                ? ["0 0 20px rgba(59, 130, 246, 0.3)", "0 0 30px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(59, 130, 246, 0.3)"]
                : "0 0 20px rgba(59, 130, 246, 0.2)"
            }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            <Volume2 className="w-8 h-8 text-white" />
          </motion.div>
          
          <div>
            <h4 className="text-lg font-semibold text-white truncate max-w-xs">
              {audioFile?.name || 'No track selected'}
            </h4>
            <p className="text-sm text-gray-400">
              {selectedMode === 'spectrum' && 'Frequency Spectrum Mode'}
              {selectedMode === 'particles' && 'Particle Field Mode'}
              {selectedMode === 'waveform' && 'Waveform Mode'}
            </p>
          </div>
        </div>

        {/* Mode Indicator */}
        <motion.div
          className="px-4 py-2 bg-white/10 rounded-full text-sm text-white font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="relative group">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          />
          
          {/* Progress Thumb */}
          <motion.div
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 8px)` }}
            whileHover={{ scale: 1.2 }}
          />
        </div>
      </motion.div>

      {/* Main Controls */}
      <motion.div
        className="flex items-center justify-center space-x-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Shuffle */}
        <motion.button
          className={`p-3 rounded-full transition-all duration-300 ${
            isShuffle ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          onClick={() => setIsShuffle(!isShuffle)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RippleEffect />
          <Shuffle className="w-5 h-5" />
        </motion.button>

        {/* Previous */}
        <motion.button
          className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RippleEffect />
          <SkipBack className="w-6 h-6" />
        </motion.button>

        {/* Play/Pause */}
        <motion.button
          className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={togglePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isPlaying ? {
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.4)",
              "0 0 40px rgba(139, 92, 246, 0.6)",
              "0 0 20px rgba(59, 130, 246, 0.4)"
            ]
          } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        >
          <RippleEffect />
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-8 h-8 ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Next */}
        <motion.button
          className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RippleEffect />
          <SkipForward className="w-6 h-6" />
        </motion.button>

        {/* Repeat */}
        <motion.button
          className={`p-3 rounded-full transition-all duration-300 ${
            isRepeat ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          onClick={() => setIsRepeat(!isRepeat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RippleEffect />
          <Repeat className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Volume Control */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <motion.button
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RippleEffect />
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
          
          <div className="relative w-24 group">
            <div className="w-full h-1 bg-white/20 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style={{ width: `${isMuted ? 0 : volume}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            />
            <motion.div
              className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${isMuted ? 0 : volume}% - 6px)` }}
            />
          </div>
          
          <span className="text-sm text-gray-400 w-8">{isMuted ? 0 : volume}</span>
        </div>

        {/* Stop Button */}
        <motion.button
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
          onClick={() => {
            audioRef.current?.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RippleEffect />
          <Square className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Visualizer Status */}
      <motion.div
        className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={isPlaying ? {
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          />
          <span className="text-sm text-gray-400">
            {isPlaying ? 'Visualizer Active' : 'Visualizer Paused'}
          </span>
        </div>
        
        <motion.div
          className="text-xs text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Real-time Analysis
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AudioControls;