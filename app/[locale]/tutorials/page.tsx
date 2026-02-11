'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Target, 
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Lock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { tutorials } from '@/lib/tutorials';
import { UserProfileUtils } from '@/lib/userProfile';
import type { Tutorial } from '@/lib/types/tutorial';

const difficultyColors = {
  beginner: 'from-green-500 to-emerald-600',
  intermediate: 'from-blue-500 to-cyan-600',
  advanced: 'from-purple-500 to-pink-600',
  expert: 'from-red-500 to-orange-600'
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert'
};

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    setUserProfile(UserProfileUtils.getProfile());
  }, []);

  const categories = Array.from(new Set(tutorials.map(t => t.category)));

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const isTutorialCompleted = (tutorialId: string) => {
    return userProfile?.progress?.completedTutorials?.includes(tutorialId) || false;
  };

  const getTutorialProgress = (tutorialId: string) => {
    // In a real app, this would come from a progress tracking system
    return isTutorialCompleted(tutorialId) ? 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Learning Tutorials
              </h1>
              <p className="text-gray-400 text-lg">
                Master bioinformatics with hands-on interactive tutorials
              </p>
            </div>
            
            {userProfile && (
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">Total XP</p>
                    <p className="text-3xl font-bold text-yellow-400">{userProfile.progress.xp}</p>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">Completed</p>
                    <p className="text-3xl font-bold text-green-400">
                      {userProfile.progress.completedTutorials?.length || 0}
                    </p>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">Streak</p>
                    <p className="text-3xl font-bold text-orange-400">{userProfile.progress.streak}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {filteredTutorials.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No tutorials found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => {
              const isCompleted = isTutorialCompleted(tutorial.id);
              const progress = getTutorialProgress(tutorial.id);

              return (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/en/tutorials/${tutorial.slug}`}>
                    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all h-full cursor-pointer">
                      {/* Completed Badge */}
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${difficultyColors[tutorial.difficulty]} mb-4`}>
                        {difficultyLabels[tutorial.difficulty]}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {tutorial.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {tutorial.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {tutorial.tags.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded">
                            +{tutorial.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutorial.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">{tutorial.xpReward} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>{tutorial.sections.length} sections</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                          {isCompleted ? 'Review' : progress > 0 ? 'Continue' : 'Start Learning'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
