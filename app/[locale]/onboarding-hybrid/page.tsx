'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeSnippetChallenge from '@/components/onboarding/creative/CodeSnippetChallenge';
import LearningConstellation from '@/components/onboarding/creative/LearningConstellation';
import OnboardingIntro from '@/components/onboarding/OnboardingIntro';
import { Sparkles, Code } from 'lucide-react';
import { useOnboardingAnalytics } from '@/lib/onboardingAnalytics';

type OnboardingMode = 'intro' | 'code' | 'constellation';

export default function HybridOnboardingPage() {
  const [mode, setMode] = useState<OnboardingMode>('intro');
  const [showModeSelector, setShowModeSelector] = useState(true);
  const analytics = useOnboardingAnalytics();

  // Track mode changes
  const handleModeChange = (newMode: OnboardingMode) => {
    setMode(newMode);
    if (newMode !== 'intro') {
      analytics.trackModeSwitch(newMode);
    }
  };

  // Handle start from intro
  const handleStart = (selectedMode: 'code' | 'constellation') => {
    handleModeChange(selectedMode);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {mode === 'intro' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OnboardingIntro onStart={handleStart} />
          </motion.div>
        ) : mode === 'code' ? (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <CodeSnippetChallenge />
            
            {/* Alternative Option Button */}
            {showModeSelector && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 }}
                onClick={() => handleModeChange('constellation')}
                className="fixed bottom-8 right-8 z-50 group"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">
                    Try Visual Experience
                  </span>
                </div>
                <motion.div
                  className="absolute -top-16 right-0 bg-black/90 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Prefer exploring visually?
                </motion.div>
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="constellation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <LearningConstellation />
            
            {/* Back to Code Button */}
            {showModeSelector && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => handleModeChange('code')}
                className="fixed bottom-8 right-8 z-50 group"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105">
                  <Code className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">
                    Try Code Experience
                  </span>
                </div>
                <motion.div
                  className="absolute -top-16 right-0 bg-black/90 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Prefer hands-on coding?
                </motion.div>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
