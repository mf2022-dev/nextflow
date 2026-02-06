// Google Analytics Component for BioNXA
// To use: Add your GA4 Measurement ID to environment variables

'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Replace with your actual Google Analytics Measurement ID
// Get this from: https://analytics.google.com/
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && (window as any).gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  // Only load GA in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  )
}

// Helper functions for tracking events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track user interactions
export const trackTutorialStart = (tutorialName: string) => {
  trackEvent('start_tutorial', 'Tutorial', tutorialName)
}

export const trackTutorialComplete = (tutorialName: string) => {
  trackEvent('complete_tutorial', 'Tutorial', tutorialName)
}

export const trackCodeRun = (language: string) => {
  trackEvent('run_code', 'Playground', language)
}

export const trackAIQuery = (queryType: string) => {
  trackEvent('ai_query', 'AI Assistant', queryType)
}

export const trackSignUp = (method: string) => {
  trackEvent('sign_up', 'Auth', method)
}

export const trackSignIn = (method: string) => {
  trackEvent('sign_in', 'Auth', method)
}

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', 'Navigation', pageName)
}
