'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface OnboardingIntroProps {
  onStart: (mode: 'code' | 'constellation') => void;
}

export default function OnboardingIntro({ onStart }: OnboardingIntroProps) {
  const [selectedMode, setSelectedMode] = useState<'code' | 'constellation' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="inline-block mb-6"
          >
            <Zap className="w-20 h-20 text-yellow-400" />
          </motion.div>

          <h1 className="text-6xl font-bold text-white mb-4">
            Welcome to BioNXA
          </h1>
          <p className="text-2xl text-gray-300 mb-2">
            Let's discover your learning path
          </p>
          <p className="text-lg text-gray-400">
            Choose how you'd like to explore
          </p>
        </motion.div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Code Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedMode('code')}
            className={`
              cursor-pointer group relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-blue-600/20 to-cyan-600/20
              border-2 transition-all duration-300
              ${selectedMode === 'code' ? 'border-blue-400 scale-105' : 'border-white/10 hover:border-blue-400/50'}
            `}
          >
            <div className="p-8">
              <div className={`
                mb-6 p-6 rounded-full w-fit mx-auto
                bg-gradient-to-br from-blue-500 to-cyan-600
                ${selectedMode === 'code' ? 'scale-110' : 'group-hover:scale-110'}
                transition-transform duration-300
              `}>
                <Code className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 text-center">
                Code Explorer
              </h3>

              <p className="text-gray-300 text-center mb-6">
                Interact with real bioinformatics code and let your natural behavior reveal your skill level
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm">Natural, pressure-free exploration</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm">Real DNA analysis code</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm">Honest skill assessment</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm">Best for: Developers & hands-on learners</span>
                </div>
              </div>

              {selectedMode === 'code' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 text-blue-400 font-semibold">
                    <span>Selected</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Glow Effect */}
            {selectedMode === 'code' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Visual Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setSelectedMode('constellation')}
            className={`
              cursor-pointer group relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-purple-600/20 to-pink-600/20
              border-2 transition-all duration-300
              ${selectedMode === 'constellation' ? 'border-purple-400 scale-105' : 'border-white/10 hover:border-purple-400/50'}
            `}
          >
            <div className="p-8">
              <div className={`
                mb-6 p-6 rounded-full w-fit mx-auto
                bg-gradient-to-br from-purple-500 to-pink-600
                ${selectedMode === 'constellation' ? 'scale-110' : 'group-hover:scale-110'}
                transition-transform duration-300
              `}>
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 text-center">
                Visual Explorer
              </h3>

              <p className="text-gray-300 text-center mb-6">
                Navigate a beautiful starfield where brightness guides you to your perfect starting point
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm">Stunning visual experience</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm">Intuitive brightness guidance</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm">Natural self-selection</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm">Best for: Visual learners & explorers</span>
                </div>
              </div>

              {selectedMode === 'constellation' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="inline-flex items-center gap-2 text-purple-400 font-semibold">
                    <span>Selected</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Glow Effect */}
            {selectedMode === 'constellation' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Start Button */}
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={() => onStart(selectedMode)}
              className={`
                px-12 py-5 rounded-full font-bold text-xl text-white
                bg-gradient-to-r ${
                  selectedMode === 'code'
                    ? 'from-blue-500 to-cyan-600'
                    : 'from-purple-500 to-pink-600'
                }
                shadow-2xl hover:scale-105 transition-all
                flex items-center gap-3 mx-auto
              `}
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <p className="text-gray-400 mt-4 text-sm">
              Don't worry, you can switch modes anytime during the experience
            </p>
          </motion.div>
        )}

        {/* Skip Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <Link
            href="/en"
            className="text-gray-400 hover:text-white transition-colors text-sm underline"
          >
            Skip and explore on my own
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
