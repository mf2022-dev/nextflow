'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, BookOpen, Brain, Rocket, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

interface ConstellationStar {
  id: string;
  x: number;
  y: number;
  size: number;
  brightness: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  topics: string[];
}

const stars: ConstellationStar[] = [
  {
    id: 'star1',
    x: 20,
    y: 70,
    size: 80,
    brightness: 1,
    level: 'beginner',
    label: 'Foundational Stars',
    description: 'Bright and accessible - perfect for starting your journey',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-600',
    topics: ['DNA Basics', 'Gene Structure', 'Sequence Alignment', 'Introduction to Python']
  },
  {
    id: 'star2',
    x: 40,
    y: 50,
    size: 60,
    brightness: 0.8,
    level: 'intermediate',
    label: 'Knowledge Cluster',
    description: 'Moderate brightness - for those building expertise',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-600',
    topics: ['Genomic Analysis', 'RNA-Seq', 'Pathway Analysis', 'Statistical Methods']
  },
  {
    id: 'star3',
    x: 65,
    y: 40,
    size: 45,
    brightness: 0.6,
    level: 'advanced',
    label: 'Research Nebula',
    description: 'Dimmer stars - advanced concepts for researchers',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-600',
    topics: ['Machine Learning', 'Multi-Omics', 'Network Biology', 'Custom Algorithms']
  },
  {
    id: 'star4',
    x: 85,
    y: 65,
    size: 30,
    brightness: 0.4,
    level: 'expert',
    label: 'Frontier Constellation',
    description: 'Distant stars - cutting-edge innovation',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-orange-400 to-red-600',
    topics: ['AI Integration', 'Novel Frameworks', 'Research Leadership', 'Publication']
  }
];

// Generate background stars
const backgroundStars = Array.from({ length: 200 }, (_, i) => ({
  id: `bg-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  brightness: Math.random() * 0.5 + 0.5,
  twinkleDelay: Math.random() * 3
}));

export default function LearningConstellation() {
  const router = useRouter();
  const [selectedStar, setSelectedStar] = useState<ConstellationStar | null>(null);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStarClick = (star: ConstellationStar) => {
    setSelectedStar(star);
  };

  const handleConfirm = () => {
    if (selectedStar) {
      setUserSkillLevel(selectedStar.level);
      router.push('/en');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {backgroundStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            animate={{
              opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.twinkleDelay
            }}
          />
        ))}
      </div>

      {/* Parallax Effect Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: (mousePosition.x - 50) * 0.02,
          y: (mousePosition.y - 50) * 0.02
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        {/* Nebula Effect */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Star className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Navigate Your Learning Universe
          </h1>
          <p className="text-xl text-gray-300">
            Follow the stars that shine brightest for you
          </p>
        </motion.div>

        {/* Constellation Map */}
        <div className="relative w-full max-w-6xl h-[600px]">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {stars.map((star, i) => {
              if (i < stars.length - 1) {
                const nextStar = stars[i + 1];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={`${star.x}%`}
                    y1={`${star.y}%`}
                    x2={`${nextStar.x}%`}
                    y2={`${nextStar.y}%`}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.3 }}
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Constellation Stars */}
          {stars.map((star, index) => (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                delay: index * 0.3,
                type: 'spring',
                stiffness: 200
              }}
              onMouseEnter={() => setHoveredStar(star.id)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => handleStarClick(star)}
            >
              {/* Glow Effect */}
              <motion.div
                className={`
                  absolute inset-0 rounded-full blur-2xl
                  bg-gradient-to-br ${star.color}
                `}
                style={{
                  width: star.size * 2,
                  height: star.size * 2,
                  marginLeft: -star.size / 2,
                  marginTop: -star.size / 2
                }}
                animate={{
                  opacity: selectedStar?.id === star.id ? 0.6 : hoveredStar === star.id ? 0.4 : 0.2,
                  scale: selectedStar?.id === star.id ? 1.5 : 1
                }}
              />

              {/* Star Body */}
              <motion.div
                className={`
                  relative rounded-full
                  bg-gradient-to-br ${star.color}
                  flex items-center justify-center
                  ${selectedStar?.id === star.id ? 'ring-4 ring-white' : ''}
                `}
                style={{
                  width: star.size,
                  height: star.size
                }}
                animate={{
                  scale: selectedStar?.id === star.id ? 1.2 : hoveredStar === star.id ? 1.1 : 1,
                  boxShadow: selectedStar?.id === star.id
                    ? ['0 0 30px rgba(255,255,255,0.8)', '0 0 60px rgba(255,255,255,1)', '0 0 30px rgba(255,255,255,0.8)']
                    : '0 0 20px rgba(255,255,255,0.5)'
                }}
                transition={{
                  duration: 1.5,
                  repeat: selectedStar?.id === star.id ? Infinity : 0
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="text-white" style={{ transform: `scale(${star.size / 80})` }}>
                  {star.icon}
                </div>
              </motion.div>

              {/* Star Info Tooltip */}
              <AnimatePresence>
                {(hoveredStar === star.id || selectedStar?.id === star.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64"
                  >
                    <div className="bg-black/90 backdrop-blur-xl rounded-lg p-4 border border-white/20">
                      <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                        <Zap className="w-4 h-4" style={{ opacity: star.brightness }} />
                        {star.label}
                      </h3>
                      <p className="text-gray-300 text-xs mb-3">
                        {star.description}
                      </p>
                      <div className="space-y-1">
                        {star.topics.slice(0, 3).map((topic, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${star.color}`} />
                            <span className="text-gray-400 text-xs">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Selection Panel */}
        <AnimatePresence>
          {selectedStar ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-12 w-full max-w-2xl"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-6 rounded-full bg-gradient-to-br ${selectedStar.color}`}>
                    {selectedStar.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {selectedStar.label}
                    </h2>
                    <p className="text-gray-300">
                      {selectedStar.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Topics You'll Explore:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedStar.topics.map((topic, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedStar.color}`} />
                        <span className="text-gray-200 text-sm">{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className={`
                    w-full py-4 rounded-full font-semibold text-lg
                    bg-gradient-to-r ${selectedStar.color}
                    text-white hover:shadow-2xl transition-all hover:scale-105
                  `}
                >
                  Chart This Course
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              className="text-gray-400 mt-12 text-center text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click on any star to explore its learning path
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
