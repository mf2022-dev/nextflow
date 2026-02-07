'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import SkillLevelSelector from '@/components/onboarding/SkillLevelSelector'
import { UserProfileUtils, SkillLevel } from '@/lib/userProfile'

export default function OnboardingPage() {
  const router = useRouter()
  const locale = useLocale()
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user needs onboarding
    const needs = UserProfileUtils.needsOnboarding()
    setNeedsOnboarding(needs)

    // If already completed onboarding, redirect to homepage
    if (!needs) {
      router.push(`/${locale}`)
    }
  }, [locale, router])

  const handleSkillLevelSelect = (level: SkillLevel) => {
    // Save to profile
    UserProfileUtils.completeOnboarding(level)

    // Redirect to personalized homepage
    setTimeout(() => {
      router.push(`/${locale}`)
    }, 500)
  }

  if (needsOnboarding === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!needsOnboarding) {
    // Already completed, will redirect
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <SkillLevelSelector onSelect={handleSkillLevelSelect} locale={locale} />
}
