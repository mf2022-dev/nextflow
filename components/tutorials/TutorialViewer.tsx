'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Play, 
  RotateCcw,
  BookOpen,
  Clock,
  Award,
  Target,
  Home
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tutorial, TutorialSection } from '@/lib/types/tutorial';
import { UserProfileUtils } from '@/lib/userProfile';

interface TutorialViewerProps {
  tutorial: Tutorial;
}

export default function TutorialViewer({ tutorial }: TutorialViewerProps) {
  const router = useRouter();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: string]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentSection = tutorial.sections[currentSectionIndex];
  const progress = (completedSections.length / tutorial.sections.length) * 100;
  const isLastSection = currentSectionIndex === tutorial.sections.length - 1;
  const isSectionCompleted = completedSections.includes(currentSection.id);

  // Initialize code from code block
  useEffect(() => {
    if (currentSection.codeBlock) {
      setCode(currentSection.codeBlock.code);
    }
  }, [currentSection]);

  // Track time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSection = () => {
    if (!isSectionCompleted) {
      markSectionComplete();
    }
    if (currentSectionIndex < tutorial.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setShowQuizResults(false);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      setShowQuizResults(false);
    }
  };

  const markSectionComplete = () => {
    if (!completedSections.includes(currentSection.id)) {
      setCompletedSections(prev => [...prev, currentSection.id]);
    }
  };

  const handleRunCode = () => {
    // Simulated code execution
    try {
      // In a real implementation, this would run in a sandbox
      setCodeOutput('Code executed successfully!\n\n' + (currentSection.codeBlock?.expectedOutput || 'Output would appear here'));
      markSectionComplete();
    } catch (error) {
      setCodeOutput('Error: ' + (error as Error).message);
    }
  };

  const handleResetCode = () => {
    if (currentSection.codeBlock) {
      setCode(currentSection.codeBlock.code);
      setCodeOutput('');
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    markSectionComplete();
  };

  const calculateQuizScore = () => {
    if (!currentSection.quiz) return 0;
    const correct = currentSection.quiz.filter(
      (q, idx) => quizAnswers[q.id] === q.correctAnswer
    ).length;
    return Math.round((correct / currentSection.quiz.length) * 100);
  };

  const handleCompleteTutorial = () => {
    // Mark tutorial as complete and award XP
    UserProfileUtils.completeTutorial(tutorial.id);
    // Navigate to tutorials list
    router.push('/en/tutorials');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/en/tutorials')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Back to Tutorials"
              >
                <Home className="w-5 h-5 text-gray-300" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{tutorial.title}</h1>
                <p className="text-gray-400 text-sm">{tutorial.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">{tutorial.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Section {currentSectionIndex + 1} of {tutorial.sections.length} • {Math.round(progress)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-32">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sections
              </h3>
              <div className="space-y-2">
                {tutorial.sections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSectionIndex(idx)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-all
                      ${idx === currentSectionIndex ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{idx + 1}. {section.title}</span>
                      {completedSections.includes(section.id) && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    {section.estimatedTime && (
                      <p className="text-xs opacity-70 mt-1">{section.estimatedTime} min</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                {/* Section Title */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {currentSection.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                        {currentSection.type}
                      </span>
                      {currentSection.estimatedTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {currentSection.estimatedTime} minutes
                        </span>
                      )}
                    </div>
                  </div>
                  {isSectionCompleted && (
                    <div className="flex items-center gap-2 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-semibold">Completed</span>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                {currentSection.type === 'text' && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentSection.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Code Content */}
                {currentSection.type === 'code' && (
                  <div>
                    <div className="prose prose-invert prose-lg max-w-none mb-6">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {currentSection.content}
                      </ReactMarkdown>
                    </div>
                    
                    {currentSection.codeBlock && (
                      <div className="space-y-4">
                        {/* Code Editor */}
                        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500" />
                              <div className="w-3 h-3 rounded-full bg-green-500" />
                              <span className="ml-4 text-gray-400 text-sm">{currentSection.codeBlock.language}</span>
                            </div>
                            <div className="flex gap-2">
                              {currentSection.codeBlock.editable && (
                                <button
                                  onClick={handleResetCode}
                                  className="px-3 py-1 text-sm text-gray-300 hover:text-white flex items-center gap-1"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                  Reset
                                </button>
                              )}
                              {currentSection.codeBlock.runnable && (
                                <button
                                  onClick={handleRunCode}
                                  className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center gap-1"
                                >
                                  <Play className="w-4 h-4" />
                                  Run Code
                                </button>
                              )}
                            </div>
                          </div>
                          <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={!currentSection.codeBlock.editable}
                            className="w-full h-96 bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                            spellCheck={false}
                          />
                        </div>

                        {/* Output */}
                        {codeOutput && (
                          <div className="bg-black rounded-xl p-4 border border-gray-700">
                            <p className="text-green-400 font-mono text-sm mb-2">Output:</p>
                            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{codeOutput}</pre>
                          </div>
                        )}

                        {/* Explanation */}
                        {currentSection.codeBlock.explanation && (
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <div className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {currentSection.codeBlock.explanation}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Content */}
                {currentSection.type === 'interactive' && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {currentSection.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Quiz Content */}
                {currentSection.type === 'quiz' && currentSection.quiz && (
                  <div className="space-y-6">
                    <div className="prose prose-invert mb-8">
                      <p>{currentSection.content}</p>
                    </div>

                    {currentSection.quiz.map((question, qIdx) => (
                      <div key={question.id} className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Question {qIdx + 1}: {question.question}
                        </h4>
                        <div className="space-y-3">
                          {question.options.map((option, optIdx) => (
                            <label
                              key={optIdx}
                              className={`
                                flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all
                                ${quizAnswers[question.id] === optIdx ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-transparent hover:bg-white/10'}
                                ${showQuizResults && optIdx === question.correctAnswer ? 'bg-green-600 border-green-400' : ''}
                                ${showQuizResults && quizAnswers[question.id] === optIdx && optIdx !== question.correctAnswer ? 'bg-red-600 border-red-400' : ''}
                                border-2
                              `}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                checked={quizAnswers[question.id] === optIdx}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [question.id]: optIdx })}
                                disabled={showQuizResults}
                                className="mt-1"
                              />
                              <span className="text-white">{option}</span>
                            </label>
                          ))}
                        </div>
                        {showQuizResults && (
                          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <p className="text-blue-300 text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {!showQuizResults && (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < currentSection.quiz.length}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Target className="w-5 h-5" />
                        Submit Answers
                      </button>
                    )}

                    {showQuizResults && (
                      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Quiz Results</h4>
                        <p className="text-gray-300">
                          You scored <span className="text-2xl font-bold text-green-400">{calculateQuizScore()}%</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                  <button
                    onClick={handlePreviousSection}
                    disabled={currentSectionIndex === 0}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white rounded-lg flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  {isLastSection ? (
                    <button
                      onClick={handleCompleteTutorial}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2"
                    >
                      <Award className="w-5 h-5" />
                      Complete Tutorial (+{tutorial.xpReward} XP)
                    </button>
                  ) : (
                    <button
                      onClick={handleNextSection}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
