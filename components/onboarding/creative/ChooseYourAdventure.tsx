'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Microscope, Brain, Rocket, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

interface Door {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  title: string;
  subtitle: string;
  story: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
}

const doors: Door[] = [
  {
    id: 'door1',
    level: 'beginner',
    title: 'The Curious Student',
    subtitle: 'A Journey of Discovery',
    story: 'You stand at the entrance of a vast library, filled with the mysteries of life itself. Every book represents a new discovery, every page a stepping stone to understanding the code of life. You\'re ready to begin your adventure in bioinformatics.',
    icon: <Sparkles className="w-12 h-12" />,
    color: 'from-green-400 to-emerald-600',
    gradient: 'from-green-500/20 to-emerald-900/50',
    features: [
      'Start with the fundamentals',
      'Interactive tutorials',
      'Guided learning paths',
      'Build confidence step by step'
    ]
  },
  {
    id: 'door2',
    level: 'intermediate',
    title: 'The Lab Researcher',
    subtitle: 'Analyzing the Unknown',
    story: 'The lab is your second home. Petri dishes, microscopes, and data analysis tools surround you. You\'ve learned the basics and now you\'re ready to dive deeper into genomic analysis, computational methods, and real-world applications.',
    icon: <Microscope className="w-12 h-12" />,
    color: 'from-blue-400 to-cyan-600',
    gradient: 'from-blue-500/20 to-cyan-900/50',
    features: [
      'Advanced analysis techniques',
      'Real-world datasets',
      'Computational methods',
      'Project-based learning'
    ]
  },
  {
    id: 'door3',
    level: 'advanced',
    title: 'The Breakthrough Scientist',
    subtitle: 'Pushing Boundaries',
    story: 'You\'ve made discoveries that changed your field. Your research papers are cited, your methods adopted. Now you seek to master the cutting edge of computational biology, AI-driven analysis, and multi-omics integration.',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-purple-400 to-pink-600',
    gradient: 'from-purple-500/20 to-pink-900/50',
    features: [
      'Machine learning integration',
      'Multi-omics analysis',
      'Novel algorithm development',
      'Research collaboration tools'
    ]
  },
  {
    id: 'door4',
    level: 'expert',
    title: 'The Innovator',
    subtitle: 'Shaping the Future',
    story: 'You\'re not just using bioinformatics—you\'re inventing it. You develop new algorithms, create novel frameworks, and mentor the next generation. The frontier of biotech awaits your innovations.',
    icon: <Rocket className="w-12 h-12" />,
    color: 'from-orange-400 to-red-600',
    gradient: 'from-orange-500/20 to-red-900/50',
    features: [
      'Algorithm innovation',
      'Framework development',
      'Research leadership',
      'Cutting-edge projects'
    ]
  }
];

export default function ChooseYourAdventure() {
  const router = useRouter();
  const [selectedDoor, setSelectedDoor] = useState<Door | null>(null);
  const [showStory, setShowStory] = useState(false);

  const handleDoorClick = (door: Door) => {
    setSelectedDoor(door);
    setShowStory(true);
  };

  const handleBegin = () => {
    if (selectedDoor) {
      setUserSkillLevel(selectedDoor.level);
      router.push('/en');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {!showStory ? (
            /* Door Selection */
            <motion.div
              key="doors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-7xl"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-6xl font-bold text-white mb-4">
                  Choose Your Path
                </h1>
                <p className="text-2xl text-gray-300">
                  Each door leads to a different adventure
                </p>
              </motion.div>

              {/* Doors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {doors.map((door, index) => (
                  <motion.div
                    key={door.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="cursor-pointer"
                    onClick={() => handleDoorClick(door)}
                  >
                    <div
                      className={`
                        relative h-96 rounded-2xl overflow-hidden
                        bg-gradient-to-b ${door.gradient}
                        border-2 border-white/20
                        backdrop-blur-sm
                        hover:border-white/40
                        transition-all duration-300
                        group
                      `}
                    >
                      {/* Door Frame */}
                      <div className="absolute inset-0 border-8 border-white/10 rounded-2xl" />
                      
                      {/* Door Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        {/* Icon */}
                        <motion.div
                          className={`
                            mb-6 p-6 rounded-full
                            bg-gradient-to-br ${door.color}
                            group-hover:scale-110
                            transition-transform
                          `}
                        >
                          <div className="text-white">
                            {door.icon}
                          </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {door.title}
                        </h3>
                        
                        {/* Subtitle */}
                        <p className="text-gray-300 text-sm mb-4">
                          {door.subtitle}
                        </p>

                        {/* Door Handle */}
                        <motion.div
                          className="absolute bottom-12 w-4 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"
                          animate={{ boxShadow: ['0 0 0 rgba(251, 191, 36, 0)', '0 0 20px rgba(251, 191, 36, 0.5)', '0 0 0 rgba(251, 191, 36, 0)'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>

                      {/* Enter Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <ChevronRight className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hint */}
              <motion.p
                className="text-center text-gray-400 mt-12 text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click on any door to enter
              </motion.p>
            </motion.div>
          ) : (
            /* Story View */
            <motion.div
              key="story"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-4xl"
            >
              <div className={`
                bg-gradient-to-br ${selectedDoor?.gradient}
                backdrop-blur-xl rounded-3xl p-12
                border-2 border-white/20
              `}>
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`
                    mb-8 p-8 rounded-full mx-auto w-fit
                    bg-gradient-to-br ${selectedDoor?.color}
                  `}
                >
                  <div className="text-white">
                    {selectedDoor?.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-5xl font-bold text-white text-center mb-4">
                  {selectedDoor?.title}
                </h2>
                
                <p className="text-xl text-gray-300 text-center mb-8">
                  {selectedDoor?.subtitle}
                </p>

                {/* Story */}
                <div className="bg-black/30 rounded-2xl p-8 mb-8">
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {selectedDoor?.story}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-white text-xl font-semibold mb-4 text-center">
                    Your Journey Includes:
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedDoor?.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedDoor?.color}`} />
                        <span className="text-gray-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowStory(false)}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all backdrop-blur-sm border border-white/20"
                  >
                    Choose Another Path
                  </button>
                  <button
                    onClick={handleBegin}
                    className={`
                      px-8 py-4 bg-gradient-to-r ${selectedDoor?.color}
                      text-white rounded-full font-semibold
                      hover:shadow-2xl transition-all hover:scale-105
                    `}
                  >
                    Begin This Adventure
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
