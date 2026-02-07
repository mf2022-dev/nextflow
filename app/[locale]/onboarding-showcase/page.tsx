'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dna, Gamepad2, BookOpen, Flask, Compass, Code, Star, Play, X } from 'lucide-react';
import Link from 'next/link';

// Import all creative onboarding components
import DNAJourney from '@/components/onboarding/creative/DNAJourney';
import CodeTheCure from '@/components/onboarding/creative/CodeTheCure';
import ChooseYourAdventure from '@/components/onboarding/creative/ChooseYourAdventure';
import FindYourLabBench from '@/components/onboarding/creative/FindYourLabBench';
import SkillCompass from '@/components/onboarding/creative/SkillCompass';
import CodeSnippetChallenge from '@/components/onboarding/creative/CodeSnippetChallenge';
import LearningConstellation from '@/components/onboarding/creative/LearningConstellation';

interface Approach {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
  duration: string;
  creativity: number;
  engagement: number;
}

const approaches: Approach[] = [
  {
    id: 'dna-journey',
    name: 'DNA Journey',
    description: 'Interactive rotating DNA helix with clickable genes representing skill levels',
    features: ['Animated 3D helix', 'Visual gene selection', 'Bioinformatics theme', 'Smooth animations'],
    icon: <Dna className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-600',
    component: <DNAJourney />,
    duration: '~30 seconds',
    creativity: 95,
    engagement: 90
  },
  {
    id: 'code-cure',
    name: 'Code the Cure',
    description: 'Gamified DNA sequencing challenge with drag-and-drop mechanics',
    features: ['Drag & drop game', 'Performance tracking', 'Skill assessment', 'Real-time scoring'],
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'from-pink-500 to-purple-600',
    component: <CodeTheCure />,
    duration: '1-2 minutes',
    creativity: 90,
    engagement: 95
  },
  {
    id: 'adventure',
    name: 'Choose Your Adventure',
    description: 'Story-driven experience with four immersive doors to choose from',
    features: ['Story narratives', 'Character identification', 'Emotional connection', 'Beautiful doors'],
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-600',
    component: <ChooseYourAdventure />,
    duration: '~45 seconds',
    creativity: 85,
    engagement: 88
  },
  {
    id: 'lab-bench',
    name: 'Find Your Lab Bench',
    description: 'Spatial metaphor with virtual lab workstations to explore',
    features: ['3D lab environment', 'Spatial navigation', 'Equipment listings', 'Interactive stations'],
    icon: <Flask className="w-8 h-8" />,
    color: 'from-cyan-500 to-blue-600',
    component: <FindYourLabBench />,
    duration: '~40 seconds',
    creativity: 88,
    engagement: 85
  },
  {
    id: 'compass',
    name: 'Skill Compass',
    description: 'Animated compass with directional choices representing skill levels',
    features: ['Rotating compass', 'Cardinal directions', 'Needle animation', 'Visual navigation'],
    icon: <Compass className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-600',
    component: <SkillCompass />,
    duration: '~35 seconds',
    creativity: 92,
    engagement: 87
  },
  {
    id: 'code-snippet',
    name: 'Code Snippet Challenge',
    description: 'Behavioral tracking through natural code interaction patterns',
    features: ['Interaction tracking', 'Code editor', 'Behavior analysis', 'Smart detection'],
    icon: <Code className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-600',
    component: <CodeSnippetChallenge />,
    duration: '30-90 seconds',
    creativity: 87,
    engagement: 92
  },
  {
    id: 'constellation',
    name: 'Learning Constellation',
    description: 'Explore a starfield where brightness indicates difficulty level',
    features: ['Star navigation', 'Parallax effects', 'Topic visualization', 'Cosmic theme'],
    icon: <Star className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-600',
    component: <LearningConstellation />,
    duration: '~40 seconds',
    creativity: 98,
    engagement: 93
  }
];

export default function OnboardingShowcase() {
  const [selectedApproach, setSelectedApproach] = useState<Approach | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <AnimatePresence mode="wait">
        {!selectedApproach ? (
          /* Showcase Grid */
          <motion.div
            key="showcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-8"
          >
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
              <Link
                href="/en"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>

              <h1 className="text-6xl font-bold text-white mb-4">
                Creative Onboarding Showcase
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Explore 7 unique approaches to indirect, creative onboarding
              </p>
              <p className="text-gray-400">
                Click on any card to experience it in action
              </p>
            </div>

            {/* Approaches Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approaches.map((approach, index) => (
                <motion.div
                  key={approach.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedApproach(approach)}
                  className="cursor-pointer group"
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all">
                    {/* Icon */}
                    <div className={`
                      mb-4 p-4 rounded-full w-fit
                      bg-gradient-to-br ${approach.color}
                      group-hover:scale-110 transition-transform
                    `}>
                      <div className="text-white">
                        {approach.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {approach.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4">
                      {approach.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Creativity</p>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${approach.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${approach.creativity}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Engagement</p>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${approach.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${approach.engagement}%` }}
                            transition={{ delay: index * 0.1 + 0.4, duration: 1 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400">Duration: {approach.duration}</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {approach.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${approach.color}`} />
                          <span className="text-xs text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      className={`
                        w-full py-3 rounded-lg font-semibold
                        bg-gradient-to-r ${approach.color}
                        text-white flex items-center justify-center gap-2
                        group-hover:shadow-2xl transition-all
                      `}
                    >
                      <Play className="w-4 h-4" />
                      Try This Approach
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Section */}
            <div className="max-w-7xl mx-auto mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Quick Comparison</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-4 text-gray-300 font-semibold">Approach</th>
                        <th className="pb-4 text-gray-300 font-semibold">Duration</th>
                        <th className="pb-4 text-gray-300 font-semibold">Creativity</th>
                        <th className="pb-4 text-gray-300 font-semibold">Engagement</th>
                        <th className="pb-4 text-gray-300 font-semibold">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approaches.map((approach) => (
                        <tr key={approach.id} className="border-b border-white/5">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${approach.color}`}>
                                <div className="text-white scale-75">
                                  {approach.icon}
                                </div>
                              </div>
                              <span className="text-white font-medium">{approach.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-400">{approach.duration}</td>
                          <td className="py-4 text-gray-400">{approach.creativity}%</td>
                          <td className="py-4 text-gray-400">{approach.engagement}%</td>
                          <td className="py-4 text-gray-400 text-sm">
                            {approach.id === 'constellation' && 'Most Creative'}
                            {approach.id === 'code-cure' && 'Most Engaging'}
                            {approach.id === 'dna-journey' && 'Brand-Aligned'}
                            {approach.id === 'adventure' && 'Storytelling'}
                            {approach.id === 'lab-bench' && 'Spatial Learners'}
                            {approach.id === 'compass' && 'Simple & Clear'}
                            {approach.id === 'code-snippet' && 'Behavioral'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Full Screen Demo */
          <motion.div
            key="demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedApproach(null)}
              className="fixed top-8 right-8 z-50 p-4 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-black/70 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Demo Content */}
            {selectedApproach.component}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
