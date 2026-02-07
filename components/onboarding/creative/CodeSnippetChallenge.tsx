'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Edit, Play, Trophy, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserSkillLevel } from '@/lib/userProfile';

const codeSnippet = `# DNA Sequence Analysis
def analyze_sequence(dna):
    """Analyze DNA sequence composition"""
    bases = {'A': 0, 'T': 0, 'C': 0, 'G': 0}
    
    for base in dna.upper():
        if base in bases:
            bases[base] += 1
    
    gc_content = (bases['G'] + bases['C']) / len(dna) * 100
    
    return {
        'composition': bases,
        'gc_content': round(gc_content, 2),
        'length': len(dna)
    }

# Example usage
sequence = "ATCGATCGATCG"
result = analyze_sequence(sequence)
print(f"GC Content: {result['gc_content']}%")`;

interface InteractionEvent {
  type: 'read' | 'copy' | 'edit' | 'run';
  timestamp: number;
}

export default function CodeSnippetChallenge() {
  const router = useRouter();
  const [interactions, setInteractions] = useState<InteractionEvent[]>([]);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(codeSnippet);
  const [hasRun, setHasRun] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'expert' | null>(null);

  // Track reading time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const trackInteraction = (type: InteractionEvent['type']) => {
    setInteractions([...interactions, { type, timestamp: Date.now() - startTime }]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    trackInteraction('copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    trackInteraction('edit');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleRun = () => {
    setHasRun(true);
    trackInteraction('run');
    
    // Determine skill level based on interactions
    const level = determineSkillLevel();
    setSkillLevel(level);
    setShowResult(true);
  };

  const determineSkillLevel = () => {
    const hasEdited = interactions.some(i => i.type === 'edit');
    const hasRun = interactions.some(i => i.type === 'run');
    const hasCopied = interactions.some(i => i.type === 'copy');
    const editTime = interactions.find(i => i.type === 'edit')?.timestamp || 0;
    const codeModified = code !== codeSnippet;

    // Expert: Edits code and runs it quickly
    if (hasEdited && hasRun && codeModified && editTime < 30000) {
      return 'expert';
    }
    
    // Advanced: Edits code or runs it
    if (hasEdited || (hasRun && editTime < 60000)) {
      return 'advanced';
    }
    
    // Intermediate: Copies code for later use
    if (hasCopied) {
      return 'intermediate';
    }
    
    // Beginner: Only reads
    return 'beginner';
  };

  const handleComplete = () => {
    if (skillLevel) {
      setUserSkillLevel(skillLevel);
      router.push('/en');
    }
  };

  const getSkillDescription = (level: string) => {
    const descriptions = {
      beginner: {
        title: 'Explorer',
        message: 'You prefer to understand before diving in. Perfect for structured learning!',
        color: 'from-green-400 to-emerald-600'
      },
      intermediate: {
        title: 'Practitioner',
        message: 'You learn by doing. Great for hands-on tutorials and projects!',
        color: 'from-blue-400 to-cyan-600'
      },
      advanced: {
        title: 'Experimenter',
        message: 'You adapt and modify existing code. Ideal for advanced techniques!',
        color: 'from-purple-400 to-pink-600'
      },
      expert: {
        title: 'Innovator',
        message: 'You create and optimize. Perfect for cutting-edge research!',
        color: 'from-orange-400 to-red-600'
      }
    };
    return descriptions[level as keyof typeof descriptions];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950 relative overflow-hidden flex items-center justify-center p-8">
      {/* Background Code Pattern */}
      <div className="absolute inset-0 opacity-5">
        <pre className="text-xs text-white">
          {Array(50).fill(codeSnippet).join('\n')}
        </pre>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {!showResult ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Code className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h1 className="text-5xl font-bold text-white mb-4">
                Explore This Code
              </h1>
              <p className="text-xl text-gray-300">
                Interact with the code snippet naturally - we'll learn about your style
              </p>
            </motion.div>

            {/* Stats */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm">{timeSpent}s</span>
                </div>
              </div>
              {interactions.map((interaction, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20"
                >
                  <span className="text-white text-sm capitalize">{interaction.type}</span>
                </motion.div>
              ))}
            </div>

            {/* Code Editor */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl mb-6">
              {/* Editor Header */}
              <div className="flex items-center justify-between bg-gray-800 px-6 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-gray-400 text-sm">dna_analysis.py</span>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </motion.button>
                  
                  <motion.button
                    onClick={handleRun}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Run
                  </motion.button>
                </div>
              </div>

              {/* Code Content */}
              {isEditing ? (
                <textarea
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full h-96 bg-gray-900 text-gray-100 p-6 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
              ) : (
                <pre className="p-6 overflow-x-auto">
                  <code className="text-gray-100 text-sm font-mono leading-relaxed">
                    {code}
                  </code>
                </pre>
              )}

              {/* Output Section */}
              {hasRun && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="bg-black border-t border-gray-700 p-6"
                >
                  <div className="text-green-400 font-mono text-sm">
                    <p>$ python dna_analysis.py</p>
                    <p className="mt-2">GC Content: 50.0%</p>
                    <p className="mt-2 text-gray-500">
                      ▸ Analyzing your interaction patterns...
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Instructions */}
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                Try interacting with the code above
              </p>
              <p className="text-gray-500 text-sm">
                Copy it • Edit it • Run it • Or just read it - there's no wrong answer
              </p>
            </div>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
            
            <h2 className="text-5xl font-bold text-white mb-4">
              Analysis Complete!
            </h2>

            {skillLevel && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto mb-8">
                <div className={`mb-6 p-6 rounded-full bg-gradient-to-br ${getSkillDescription(skillLevel).color} w-fit mx-auto`}>
                  <Code className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  {getSkillDescription(skillLevel).title}
                </h3>
                
                <p className="text-gray-300 mb-8 text-lg">
                  {getSkillDescription(skillLevel).message}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Time Spent</p>
                    <p className="text-2xl font-bold text-white">{timeSpent}s</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Interactions</p>
                    <p className="text-2xl font-bold text-blue-400">{interactions.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Skill Level</p>
                    <p className="text-2xl font-bold text-purple-400 capitalize">{skillLevel}</p>
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className={`
                    px-8 py-4 rounded-full font-semibold text-lg
                    bg-gradient-to-r ${getSkillDescription(skillLevel).color}
                    text-white hover:shadow-2xl transition-all hover:scale-105
                  `}
                >
                  Start Your Personalized Journey
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
