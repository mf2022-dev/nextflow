'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { UserProfileUtils } from '@/lib/userProfile'

export default function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const locale = useLocale()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if user needs onboarding
    const needsOnboarding = UserProfileUtils.needsOnboarding()
    
    // Only redirect on first visit (not if they explicitly navigate back)
    const hasVisited = sessionStorage.getItem('bionxa_visited')
    
    if (needsOnboarding && !hasVisited) {
      router.push(`/${locale}/onboarding`)
    } else {
      // Mark as visited for this session
      sessionStorage.setItem('bionxa_visited', 'true')
      setIsChecking(false)
    }
  }, [locale, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return <>{children}</>
}
