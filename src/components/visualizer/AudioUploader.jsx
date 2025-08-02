import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Music, File, CheckCircle, X } from 'lucide-react';
import RippleEffect from '../ui/RippleEffect';

const AudioUploader = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = ['MP3', 'WAV', 'FLAC', 'M4A', 'OGG'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length === 0) {
      // Show error message
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          
          // Process files
          const processedFiles = audioFiles.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
          }));
          
          setUploadedFiles(prev => [...prev, ...processedFiles]);
          onFileUpload(processedFiles[0].file); // Pass first file to parent
          
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Main Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 cursor-pointer ${
          isDragging
            ? 'border-blue-400 bg-blue-500/10 scale-105'
            : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/8'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <RippleEffect />
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Icon with Animation */}
        <motion.div
          className="mb-8"
          animate={isDragging ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
              isDragging ? 'bg-blue-500/20' : 'bg-white/10'
            }`}
            animate={{
              boxShadow: isDragging
                ? ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 20px rgba(59, 130, 246, 0)"]
                : "0 0 0 0 rgba(59, 130, 246, 0)",
            }}
            transition={{ duration: 1, repeat: isDragging ? Infinity : 0 }}
          >
            <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-400' : 'text-white/60'}`} />
          </motion.div>
        </motion.div>

        {/* Upload Text */}
        <motion.div
          animate={isDragging ? { y: -5 } : { y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-2xl font-semibold mb-4 text-white">
            {isDragging ? 'Drop your files here!' : 'Upload Audio Files'}
          </h4>
          <p className="text-gray-400 mb-6 text-lg">
            Drag and drop your audio files here, or click to browse
          </p>
          
          <motion.button
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <File className="w-5 h-5" />
            <span>Choose Files</span>
          </motion.button>
        </motion.div>

        {/* Supported Formats */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 w-full mb-3">Supported formats:</p>
          {supportedFormats.map((format, i) => (
            <motion.span
              key={format}
              className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              {format}
            </motion.span>
          ))}
        </motion.div>

        {/* Upload Progress */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-32 h-32 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <h4 className="text-xl font-semibold text-white mb-2">Uploading...</h4>
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-gray-400">{Math.round(uploadProgress)}% complete</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Uploaded Files List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Uploaded Files ({uploadedFiles.length})</span>
            </h5>
            
            <div className="grid gap-4">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/8 transition-all duration-300"
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.7)",
                          "0 0 0 10px rgba(34, 197, 94, 0)",
                          "0 0 0 0 rgba(34, 197, 94, 0.7)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Music className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div>
                      <h6 className="font-medium text-white truncate max-w-xs">
                        {file.name}
                      </h6>
                      <p className="text-sm text-gray-400">
                        {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Ready</span>
                    </motion.div>
                    
                    <motion.button
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                      onClick={() => removeFile(file.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Batch Actions */}
            <motion.div
              className="flex justify-between items-center pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-400">
                Total: {uploadedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)} MB
              </p>
              
              <div className="flex space-x-3">
                <motion.button
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUploadedFiles([])}
                >
                  Clear All
                </motion.button>
                
                <motion.button
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Process Files
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Upload Suggestions */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {[
          {
            title: 'Electronic Music',
            description: 'Perfect for spectrum analysis',
            icon: '🎵',
            color: 'from-blue-500/20 to-cyan-500/20'
          },
          {
            title: 'Classical & Orchestral',
            description: 'Beautiful waveform displays',
            icon: '🎼',
            color: 'from-purple-500/20 to-pink-500/20'
          },
          {
            title: 'Ambient & Chill',
            description: 'Stunning particle effects',
            icon: '🌙',
            color: 'from-green-500/20 to-teal-500/20'
          }
        ].map((suggestion, i) => (
          <motion.div
            key={suggestion.title}
            className={`p-6 bg-gradient-to-br ${suggestion.color} rounded-xl border border-white/10 text-center hover:border-white/20 transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
          >
            <div className="text-4xl mb-3">{suggestion.icon}</div>
            <h6 className="font-semibold text-white mb-2">{suggestion.title}</h6>
            <p className="text-sm text-gray-400">{suggestion.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AudioUploader;