'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Navigation, Sparkles, BookOpen, Brain, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

interface Direction {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  name: string;
  description: string;
  angle: number;
  icon: React.ReactNode;
  color: string;
}

const directions: Direction[] = [
  {
    id: 'north',
    level: 'beginner',
    name: 'Explorer',
    description: 'I\'m just starting my journey',
    angle: 0,
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'east',
    level: 'intermediate',
    name: 'Learner',
    description: 'I have foundational knowledge',
    angle: 90,
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'south',
    level: 'advanced',
    name: 'Researcher',
    description: 'I\'m conducting research',
    angle: 180,
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'west',
    level: 'expert',
    name: 'Innovator',
    description: 'I\'m pushing boundaries',
    angle: 270,
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-orange-400 to-red-600'
  }
];

export default function SkillCompass() {
  const router = useRouter();
  const [compassRotation, setCompassRotation] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [hoveredDirection, setHoveredDirection] = useState<string | null>(null);
  const [needleAngle, setNeedleAngle] = useState(0);

  // Idle compass rotation
  useEffect(() => {
    if (!selectedDirection) {
      const interval = setInterval(() => {
        setCompassRotation(prev => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [selectedDirection]);

  const handleDirectionClick = (direction: Direction) => {
    setSelectedDirection(direction);
    setNeedleAngle(direction.angle);
  };

  const handleConfirm = () => {
    if (selectedDirection) {
      setUserSkillLevel(selectedDirection.level);
      router.push('/en');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 relative overflow-hidden flex items-center justify-center p-8">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
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
          <Compass className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Direction
          </h1>
          <p className="text-xl text-gray-300">
            Let the compass guide you to your learning path
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Compass */}
          <div className="relative w-96 h-96">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
              animate={{ rotate: compassRotation }}
              transition={{ duration: 0.1, ease: 'linear' }}
            >
              {/* Cardinal Marks */}
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-1 h-6 bg-indigo-400"
                  style={{
                    left: '50%',
                    top: '-12px',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    transformOrigin: '50% 204px'
                  }}
                />
              ))}
            </motion.div>

            {/* Middle Ring */}
            <motion.div
              className="absolute inset-8 rounded-full border-2 border-indigo-500/20"
              animate={{ rotate: -compassRotation * 0.5 }}
            />

            {/* Inner Circle */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10" />

            {/* Center Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Navigation className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Compass Needle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: needleAngle }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <div className="relative w-2 h-48">
                {/* North (Red) */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-red-500 to-red-600 clip-triangle-up" />
                {/* South (White) */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-300 to-gray-400 clip-triangle-down" />
              </div>
            </motion.div>

            {/* Direction Points */}
            {directions.map((direction) => {
              const angle = direction.angle;
              const radian = (angle - 90) * (Math.PI / 180);
              const radius = 200;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <motion.div
                  key={direction.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleDirectionClick(direction)}
                  onMouseEnter={() => setHoveredDirection(direction.id)}
                  onMouseLeave={() => setHoveredDirection(null)}
                >
                  <motion.div
                    className={`
                      w-20 h-20 rounded-full
                      bg-gradient-to-br ${direction.color}
                      flex items-center justify-center
                      shadow-2xl
                      ${selectedDirection?.id === direction.id ? 'ring-4 ring-white' : ''}
                    `}
                    animate={{
                      scale: selectedDirection?.id === direction.id ? 1.2 : 1,
                      boxShadow: selectedDirection?.id === direction.id
                        ? ['0 0 20px rgba(255,255,255,0.5)', '0 0 40px rgba(255,255,255,0.8)', '0 0 20px rgba(255,255,255,0.5)']
                        : hoveredDirection === direction.id
                        ? '0 20px 40px rgba(0,0,0,0.5)'
                        : '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                    transition={{ duration: 1.5, repeat: selectedDirection?.id === direction.id ? Infinity : 0 }}
                  >
                    <div className="text-white">
                      {direction.icon}
                    </div>
                  </motion.div>

                  {/* Direction Label */}
                  <AnimatePresence>
                    {hoveredDirection === direction.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48"
                      >
                        <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                          <p className="text-white font-semibold text-sm mb-1">
                            {direction.name}
                          </p>
                          <p className="text-gray-300 text-xs">
                            {direction.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Selection Panel */}
          <AnimatePresence>
            {selectedDirection ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="w-full lg:w-96"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <div className={`mb-6 p-6 rounded-full bg-gradient-to-br ${selectedDirection.color} w-fit mx-auto`}>
                    {selectedDirection.icon}
                  </div>

                  <h2 className="text-3xl font-bold text-white text-center mb-2">
                    {selectedDirection.name}
                  </h2>

                  <p className="text-gray-300 text-center mb-8">
                    {selectedDirection.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedDirection.color} mt-2`} />
                      <p className="text-gray-200 text-sm">
                        Personalized learning path tailored to your level
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedDirection.color} mt-2`} />
                      <p className="text-gray-200 text-sm">
                        Interactive tutorials and hands-on projects
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedDirection.color} mt-2`} />
                      <p className="text-gray-200 text-sm">
                        Track your progress and earn achievements
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className={`
                      w-full py-4 rounded-full font-semibold text-lg
                      bg-gradient-to-r ${selectedDirection.color}
                      text-white hover:shadow-2xl transition-all hover:scale-105
                    `}
                  >
                    Set My Course
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full lg:w-96 text-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <p className="text-gray-400 text-lg mb-4">
                    Click on any direction to set your learning path
                  </p>
                  <p className="text-gray-500 text-sm">
                    The compass needle will point you in the right direction
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .clip-triangle-up {
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
        .clip-triangle-down {
          clip-path: polygon(50% 100%, 100% 0%, 0% 0%);
        }
      `}</style>
    </div>
  );
}
