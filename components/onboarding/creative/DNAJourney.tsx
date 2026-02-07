'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Sparkles, Brain, Microscope, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

interface Gene {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
}

const genes: Gene[] = [
  {
    id: 'gene1',
    level: 'beginner',
    label: 'The Curious Explorer',
    description: 'Just starting your bioinformatics journey',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-600',
    position: { x: 20, y: 30 }
  },
  {
    id: 'gene2',
    level: 'intermediate',
    label: 'The Lab Researcher',
    description: 'Building foundational analysis skills',
    icon: <Microscope className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-600',
    position: { x: 50, y: 45 }
  },
  {
    id: 'gene3',
    level: 'advanced',
    label: 'The Data Scientist',
    description: 'Mastering computational biology techniques',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-600',
    position: { x: 80, y: 60 }
  },
  {
    id: 'gene4',
    level: 'expert',
    label: 'The Innovator',
    description: 'Pushing boundaries in biotech research',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-orange-400 to-red-600',
    position: { x: 65, y: 25 }
  }
];

export default function DNAJourney() {
  const router = useRouter();
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleGeneClick = (gene: Gene) => {
    setSelectedGene(gene);
    setIsAnimating(false);
  };

  const handleConfirm = () => {
    if (selectedGene) {
      setUserSkillLevel(selectedGene.level);
      router.push('/en');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden flex items-center justify-center p-8">
      {/* Animated Background DNA Strands */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-blue-400 to-purple-600"
            style={{
              left: `${20 + i * 20}%`,
              height: '100%'
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleY: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Dna className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Your Learning DNA
          </h1>
          <p className="text-xl text-gray-300">
            Click on a gene that resonates with your journey
          </p>
        </motion.div>

        {/* DNA Helix Container */}
        <div className="relative h-[500px] w-full">
          {/* Central Helix Visualization */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Helix Strands */}
            {[...Array(20)].map((_, i) => {
              const angle = (rotation + i * 18) % 360;
              const rad = (angle * Math.PI) / 180;
              const x1 = 50 + 20 * Math.cos(rad);
              const y1 = 20 + i * 3;
              const x2 = 50 - 20 * Math.cos(rad);
              const y2 = 20 + i * 3;
              
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#helixGradient)"
                    strokeWidth="0.3"
                    opacity={0.6}
                  />
                  <circle cx={x1} cy={y1} r="1" fill="#3b82f6" opacity="0.8" />
                  <circle cx={x2} cy={y2} r="1" fill="#8b5cf6" opacity="0.8" />
                </g>
              );
            })}
          </svg>

          {/* Interactive Genes */}
          {genes.map((gene, index) => (
            <motion.div
              key={gene.id}
              className="absolute cursor-pointer"
              style={{
                left: `${gene.position.x}%`,
                top: `${gene.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: selectedGene?.id === gene.id ? 1.3 : 1,
                opacity: 1
              }}
              transition={{
                delay: index * 0.2,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleGeneClick(gene)}
            >
              <motion.div
                className={`
                  relative w-32 h-32 rounded-full
                  bg-gradient-to-br ${gene.color}
                  flex items-center justify-center
                  shadow-2xl
                  ${selectedGene?.id === gene.id ? 'ring-4 ring-white' : ''}
                `}
                animate={{
                  boxShadow: selectedGene?.id === gene.id
                    ? ['0 0 20px rgba(255,255,255,0.5)', '0 0 40px rgba(255,255,255,0.8)', '0 0 20px rgba(255,255,255,0.5)']
                    : '0 10px 30px rgba(0,0,0,0.3)'
                }}
                transition={{
                  duration: 1.5,
                  repeat: selectedGene?.id === gene.id ? Infinity : 0
                }}
              >
                <div className="text-white">
                  {gene.icon}
                </div>

                {/* Label */}
                <motion.div
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48 text-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white font-semibold text-sm mb-1">
                      {gene.label}
                    </p>
                    <p className="text-gray-300 text-xs">
                      {gene.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Selection Display */}
        <AnimatePresence>
          {selectedGene && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="text-center mt-12"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className={`bg-gradient-to-br ${selectedGene.color} p-4 rounded-full`}>
                    {selectedGene.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedGene.label}
                    </h3>
                    <p className="text-gray-300">
                      {selectedGene.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  Begin Your Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!selectedGene && (
          <motion.p
            className="text-center text-gray-400 mt-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click on any gene to explore your path
          </motion.p>
        )}
      </div>
    </div>
  );
}
