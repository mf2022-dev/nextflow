'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Terminal, Dna, Cpu, BookOpen, Flask, Brain, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

interface Station {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  name: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  equipment: string[];
  color: string;
}

const stations: Station[] = [
  {
    id: 'station1',
    level: 'beginner',
    name: 'Learning Station',
    description: 'Start your journey with fundamentals and guided tutorials',
    icon: <BookOpen className="w-8 h-8" />,
    position: { x: 15, y: 60 },
    equipment: ['Basic tutorials', 'Interactive guides', 'Video lessons', 'Practice exercises'],
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'station2',
    level: 'intermediate',
    name: 'Analysis Workstation',
    description: 'Analyze genomic data with computational tools',
    icon: <Terminal className="w-8 h-8" />,
    position: { x: 35, y: 40 },
    equipment: ['Data analysis tools', 'Pipeline builders', 'Real datasets', 'Code editor'],
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'station3',
    level: 'advanced',
    name: 'Research Lab',
    description: 'Conduct advanced research with cutting-edge methods',
    icon: <Microscope className="w-8 h-8" />,
    position: { x: 65, y: 40 },
    equipment: ['ML algorithms', 'Multi-omics tools', 'Statistical models', 'Research papers'],
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'station4',
    level: 'expert',
    name: 'Innovation Hub',
    description: 'Develop novel algorithms and frameworks',
    icon: <Rocket className="w-8 h-8" />,
    position: { x: 85, y: 60 },
    equipment: ['Algorithm dev', 'Framework design', 'Collaboration tools', 'Publication support'],
    color: 'from-orange-400 to-red-600'
  }
];

export default function FindYourLabBench() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  };

  const handleConfirm = () => {
    if (selectedStation) {
      setUserSkillLevel(selectedStation.level);
      router.push('/en');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Lab Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Floor Grid */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/50 to-transparent" />
        
        {/* Lab Equipment Silhouettes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-48 bg-white/5 rounded-lg"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-64 bg-white/5 rounded-lg"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Flask className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Lab Bench
          </h1>
          <p className="text-xl text-gray-300">
            Explore the lab and choose where you belong
          </p>
        </motion.div>

        {/* Lab Layout */}
        <div className="relative w-full max-w-6xl h-[600px] bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl border-2 border-white/20 backdrop-blur-sm overflow-hidden">
          {/* Lab Floor */}
          <div className="absolute inset-0">
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Lighting Effects */}
            {stations.map((station) => (
              <motion.div
                key={`light-${station.id}`}
                className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${station.color} opacity-10 blur-3xl`}
                style={{
                  left: `${station.position.x}%`,
                  top: `${station.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: hoveredStation === station.id ? 1.5 : 1,
                  opacity: hoveredStation === station.id ? 0.3 : 0.1
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>

          {/* Stations */}
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              className="absolute cursor-pointer"
              style={{
                left: `${station.position.x}%`,
                top: `${station.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              onMouseEnter={() => setHoveredStation(station.id)}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => handleStationClick(station)}
            >
              {/* Station Base */}
              <motion.div
                className={`
                  relative w-48 h-48
                  ${selectedStation?.id === station.id ? 'scale-110' : ''}
                  transition-transform duration-300
                `}
              >
                {/* Desk */}
                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-700 to-gray-600 rounded-lg shadow-2xl">
                  <div className="absolute top-2 left-2 right-2 h-2 bg-gray-800 rounded" />
                </div>

                {/* Equipment Stack */}
                <motion.div
                  className={`
                    absolute top-0 left-1/2 transform -translate-x-1/2
                    w-32 h-32 rounded-2xl
                    bg-gradient-to-br ${station.color}
                    flex items-center justify-center
                    shadow-2xl
                    ${selectedStation?.id === station.id ? 'ring-4 ring-white' : ''}
                  `}
                  whileHover={{ y: -10 }}
                  animate={{
                    boxShadow: selectedStation?.id === station.id
                      ? ['0 0 20px rgba(255,255,255,0.5)', '0 0 40px rgba(255,255,255,0.8)', '0 0 20px rgba(255,255,255,0.5)']
                      : hoveredStation === station.id
                      ? '0 20px 40px rgba(0,0,0,0.5)'
                      : '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  transition={{ duration: 1.5, repeat: selectedStation?.id === station.id ? Infinity : 0 }}
                >
                  <div className="text-white">
                    {station.icon}
                  </div>
                </motion.div>

                {/* Station Label */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-56"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredStation === station.id || selectedStation?.id === station.id ? 1 : 0 }}
                >
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                    <h3 className="text-white font-semibold mb-1">
                      {station.name}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      {station.description}
                    </p>
                  </div>
                </motion.div>

                {/* Connection Lines to Center */}
                {selectedStation?.id === station.id && (
                  <motion.div
                    className="absolute top-1/2 left-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <svg width="200" height="200" className="absolute -translate-x-1/2 -translate-y-1/2">
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.3"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Center Info Display */}
          <AnimatePresence>
            {selectedStation && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 w-96 shadow-2xl">
                  <div className={`mb-4 p-4 rounded-full bg-gradient-to-br ${selectedStation.color} w-fit mx-auto`}>
                    {selectedStation.icon}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    {selectedStation.name}
                  </h2>
                  
                  <p className="text-gray-300 text-center mb-6 text-sm">
                    {selectedStation.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 text-sm">Equipment Available:</h3>
                    <div className="space-y-2">
                      {selectedStation.equipment.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${selectedStation.color}`} />
                          <span className="text-gray-200 text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className={`
                      w-full py-3 rounded-lg font-semibold
                      bg-gradient-to-r ${selectedStation.color}
                      text-white hover:shadow-2xl transition-all hover:scale-105
                    `}
                  >
                    Claim This Bench
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        {!selectedStation && (
          <motion.p
            className="text-gray-400 mt-8 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click on any workstation to learn more
          </motion.p>
        )}
      </div>
    </div>
  );
}
