'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import PersonalizedDashboard from '@/components/dashboard/PersonalizedDashboard'
import { UserProfileUtils, UserProfile } from '@/lib/userProfile'
import { ArrowRight, Sparkles } from 'lucide-react'

interface PersonalizedHomeProps {
  showFullLanding?: boolean
}

export default function PersonalizedHome({ showFullLanding = false }: PersonalizedHomeProps) {
  const locale = useLocale()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userProfile = UserProfileUtils.getProfile()
    setProfile(userProfile)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  // If no profile or showing full landing, show regular homepage
  if (!profile || showFullLanding) {
    return null // Will show default homepage
  }

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />

      {/* Hero Section - Personalized */}
      <section className="relative pt-32 pb-12 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a1)' }}>
            <Sparkles className="w-3 h-3 mr-1" />
            {locale === 'ar' ? 'مرحبًا بعودتك' : 'Welcome Back'}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'استمر في ' : 'Continue Your '}
            </span>
            <span className="gradient-text">
              {locale === 'ar' ? 'رحلة التعلم' : 'Learning Journey'}
            </span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {locale === 'ar'
              ? `مستواك: ${profile.skillLevel} • ${profile.progress.xp} نقطة خبرة • ${profile.progress.completedTutorials.length} درس مكتمل`
              : `Level: ${profile.skillLevel.charAt(0).toUpperCase() + profile.skillLevel.slice(1)} • ${profile.progress.xp} XP • ${profile.progress.completedTutorials.length} Tutorials Completed`}
          </p>
        </div>
      </section>

      {/* Personalized Dashboard */}
      <PersonalizedDashboard />

      <Footer />
    </div>
  )
}
