'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
  BookOpen,
  Code,
  Zap,
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
} from 'lucide-react'
import { UserProfile, UserProfileUtils, SkillLevel, skillLevelDefinitions } from '@/lib/userProfile'

export default function PersonalizedDashboard() {
  const locale = useLocale()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user profile
    const userProfile = UserProfileUtils.getProfile()
    setProfile(userProfile)
    
    // Update streak
    if (userProfile) {
      UserProfileUtils.updateStreak()
    }
    
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">No profile found. Please complete onboarding.</p>
      </div>
    )
  }

  const skillContent = skillLevelDefinitions[profile.skillLevel]
  const recommendedTutorials = UserProfileUtils.getRecommendedTutorials(profile.skillLevel)
  const completionRate = profile.progress.completedTutorials.length / skillContent.tutorials.length * 100

  // Skill level colors
  const levelColors: Record<SkillLevel, string> = {
    beginner: 'from-green-500 to-emerald-600',
    intermediate: 'from-blue-500 to-cyan-600',
    advanced: 'from-purple-500 to-pink-600',
    expert: 'from-orange-500 to-red-600',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="card-glass p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'مرحبًا بك!' : 'Welcome Back!'}
            </h2>
            <p className="text-muted">
              {locale === 'ar' 
                ? `مستواك: ${profile.skillLevel}` 
                : `Your level: ${profile.skillLevel.charAt(0).toUpperCase() + profile.skillLevel.slice(1)}`}
            </p>
          </div>
          
          {/* Skill Badge */}
          <div className={`
            px-4 py-2 rounded-lg bg-gradient-to-r ${levelColors[profile.skillLevel]}
            text-white font-semibold text-sm
          `}>
            {profile.skillLevel.toUpperCase()}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {/* XP */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold gradient-text">{profile.progress.xp}</span>
            </div>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'نقاط الخبرة' : 'Total XP'}
            </p>
          </div>

          {/* Streak */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-bold gradient-text">{profile.progress.streak}</span>
            </div>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'سلسلة الأيام' : 'Day Streak'}
            </p>
          </div>

          {/* Completed */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-2xl font-bold gradient-text">
                {profile.progress.completedTutorials.length}
              </span>
            </div>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'دروس مكتملة' : 'Completed'}
            </p>
          </div>

          {/* Progress */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold gradient-text">
                {Math.round(completionRate)}%
              </span>
            </div>
            <p className="text-xs text-muted">
              {locale === 'ar' ? 'التقدم' : 'Progress'}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Learning Path */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'المسار الموصى به' : 'Recommended Learning Path'}
          </h3>
          <Link 
            href="/tutorials" 
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
          >
            {locale === 'ar' ? 'عرض الكل' : 'View All'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {skillContent.recommendedPaths.slice(0, 3).map((path, idx) => (
            <Link 
              key={idx}
              href="/tutorials"
              className="card-glass p-5 hover:glass-strong transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-lg bg-gradient-to-br ${levelColors[profile.skillLevel]}
                  flex items-center justify-center flex-shrink-0
                `}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 group-hover:gradient-text transition-all" 
                      style={{ color: 'var(--t1)' }}>
                    {path}
                  </h4>
                  <p className="text-xs text-muted line-clamp-2">
                    {skillContent.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Next Tutorials */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'ابدأ التعلم' : 'Continue Learning'}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {recommendedTutorials.slice(0, 4).map((tutorialId, idx) => (
            <Link
              key={idx}
              href={`/tutorials`}
              className="card-glass p-5 hover:glass-strong transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-primary-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold mb-1 group-hover:gradient-text transition-all" 
                    style={{ color: 'var(--t1)' }}>
                  {tutorialId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <TrendingUp className="w-3 h-3" />
                  <span>{profile.skillLevel.charAt(0).toUpperCase() + profile.skillLevel.slice(1)} Level</span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary-400 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link 
          href="/playground"
          className="card-glass p-6 hover:glass-strong transition-all group text-center"
        >
          <Code className="w-10 h-10 mx-auto mb-3 text-primary-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'ساحة التجربة' : 'Code Playground'}
          </h4>
          <p className="text-xs text-muted">
            {locale === 'ar' ? 'جرب التعليمات البرمجية' : 'Try code examples'}
          </p>
        </Link>

        <Link 
          href="/resources"
          className="card-glass p-6 hover:glass-strong transition-all group text-center"
        >
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-accent-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'المصادر' : 'Resources'}
          </h4>
          <p className="text-xs text-muted">
            {locale === 'ar' ? 'أدوات ومراجع' : 'Tools & references'}
          </p>
        </Link>

        <Link 
          href="/dashboard"
          className="card-glass p-6 hover:glass-strong transition-all group text-center"
        >
          <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'الإنجازات' : 'Achievements'}
          </h4>
          <p className="text-xs text-muted">
            {locale === 'ar' ? 'تتبع تقدمك' : 'Track progress'}
          </p>
        </Link>
      </div>
    </div>
  )
}
