'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Clock, Target, Zap, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

type Base = 'A' | 'T' | 'C' | 'G';

interface SequenceSlot {
  id: number;
  correctBase: Base;
  placedBase: Base | null;
  showHint: boolean;
}

const BASE_COLORS = {
  A: 'from-red-400 to-red-600',
  T: 'from-blue-400 to-blue-600',
  C: 'from-green-400 to-green-600',
  G: 'from-yellow-400 to-yellow-600'
};

const BASE_LABELS = {
  A: 'Adenine',
  T: 'Thymine',
  C: 'Cytosine',
  G: 'Guanine'
};

export default function CodeTheCure() {
  const router = useRouter();
  const [sequence, setSequence] = useState<SequenceSlot[]>([]);
  const [availableBases] = useState<Base[]>(['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G']);
  const [usedBases, setUsedBases] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [draggedBase, setDraggedBase] = useState<{ base: Base; index: number } | null>(null);

  // Generate random DNA sequence
  useEffect(() => {
    const bases: Base[] = ['A', 'T', 'C', 'G'];
    const newSequence: SequenceSlot[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      correctBase: bases[Math.floor(Math.random() * bases.length)],
      placedBase: null,
      showHint: false
    }));
    setSequence(newSequence);
  }, []);

  // Timer
  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, startTime]);

  const handleDragStart = (base: Base, index: number) => {
    setDraggedBase({ base, index });
  };

  const handleDrop = (slotId: number) => {
    if (!draggedBase || usedBases.includes(draggedBase.index)) return;

    const newSequence = [...sequence];
    const slot = newSequence.find(s => s.id === slotId);
    
    if (slot && !slot.placedBase) {
      slot.placedBase = draggedBase.base;
      setSequence(newSequence);
      setUsedBases([...usedBases, draggedBase.index]);

      // Check if correct
      if (slot.placedBase === slot.correctBase) {
        setScore(score + 10);
      }

      // Check if complete
      const allPlaced = newSequence.every(s => s.placedBase !== null);
      if (allPlaced) {
        setIsComplete(true);
      }
    }

    setDraggedBase(null);
  };

  const showHint = (slotId: number) => {
    const newSequence = [...sequence];
    const slot = newSequence.find(s => s.id === slotId);
    if (slot) {
      slot.showHint = true;
      setSequence(newSequence);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const determineSkillLevel = () => {
    const accuracy = (score / (sequence.length * 10)) * 100;
    const speed = timeElapsed;
    const hintsRatio = hintsUsed / sequence.length;

    if (accuracy >= 90 && speed < 20 && hintsRatio === 0) return 'expert';
    if (accuracy >= 75 && speed < 40 && hintsRatio < 0.3) return 'advanced';
    if (accuracy >= 60 && speed < 60) return 'intermediate';
    return 'beginner';
  };

  const handleComplete = () => {
    const level = determineSkillLevel();
    setUserSkillLevel(level);
    router.push('/en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden flex items-center justify-center p-8">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {!isComplete ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Dna className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <h1 className="text-5xl font-bold text-white mb-4">
                Code the Cure
              </h1>
              <p className="text-xl text-gray-300">
                Complete the DNA sequence to discover a breakthrough!
              </p>
            </motion.div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg px-6 py-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{timeElapsed}s</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg px-6 py-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">{score} pts</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg px-6 py-3 border border-white/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{hintsUsed} hints</span>
                </div>
              </div>
            </div>

            {/* DNA Sequence Slots */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">
                Target Sequence
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {sequence.map((slot) => (
                  <motion.div
                    key={slot.id}
                    className="relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(slot.id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`
                        w-20 h-20 rounded-lg border-2 border-dashed
                        ${slot.placedBase ? 'border-green-400' : 'border-gray-500'}
                        flex items-center justify-center
                        ${slot.placedBase ? `bg-gradient-to-br ${BASE_COLORS[slot.placedBase]}` : 'bg-white/10'}
                        backdrop-blur-sm
                      `}
                    >
                      {slot.placedBase ? (
                        <span className="text-3xl font-bold text-white">
                          {slot.placedBase}
                        </span>
                      ) : slot.showHint ? (
                        <span className="text-2xl font-bold text-gray-400">
                          {slot.correctBase}
                        </span>
                      ) : (
                        <span className="text-gray-500">?</span>
                      )}
                    </div>

                    {/* Hint Button */}
                    {!slot.placedBase && !slot.showHint && (
                      <button
                        onClick={() => showHint(slot.id)}
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 hover:text-blue-300"
                      >
                        Hint
                      </button>
                    )}

                    {/* Correct/Wrong Indicator */}
                    {slot.placedBase && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                          slot.placedBase === slot.correctBase
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {slot.placedBase === slot.correctBase ? '✓' : '✗'}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Available Bases */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">
                Available Bases
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {availableBases.map((base, index) => (
                  <motion.div
                    key={index}
                    draggable={!usedBases.includes(index)}
                    onDragStart={() => handleDragStart(base, index)}
                    className={`
                      w-16 h-16 rounded-lg cursor-move
                      bg-gradient-to-br ${BASE_COLORS[base]}
                      flex flex-col items-center justify-center
                      ${usedBases.includes(index) ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
                      transition-all shadow-lg
                    `}
                    whileHover={!usedBases.includes(index) ? { scale: 1.1 } : {}}
                    whileTap={!usedBases.includes(index) ? { scale: 0.95 } : {}}
                  >
                    <span className="text-2xl font-bold text-white">{base}</span>
                    <span className="text-xs text-white/80">{BASE_LABELS[base].slice(0, 3)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-5xl font-bold text-white mb-4">
              Sequence Complete!
            </h2>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Time</p>
                  <p className="text-3xl font-bold text-white">{timeElapsed}s</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Score</p>
                  <p className="text-3xl font-bold text-green-400">{score}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Accuracy</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {Math.round((score / (sequence.length * 10)) * 100)}%
                  </p>
                </div>
              </div>

              <div className="text-gray-300 mb-6">
                <p className="text-lg">
                  Based on your performance, we've tailored a learning path just for you!
                </p>
              </div>

              <button
                onClick={handleComplete}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Start Learning
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
