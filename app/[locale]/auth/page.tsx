'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import Logo from '@/components/Logo'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
import { signUpWithEmail, signInWithEmail, signInWithOAuth } from '@/lib/supabase'
import { trackSignUp, trackSignIn } from '@/components/GoogleAnalytics'

export default function AuthPage() {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const isRTL = locale === 'ar'
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', agreedToTerms: false, agreedToMarketing: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (isSignUp) {
        const { error: err } = await signUpWithEmail(formData.email, formData.password, formData.name)
        if (err) throw err
        trackSignUp('email')
        alert('Check your email to confirm your account!')
        setIsSignUp(false)
      } else {
        const { error: err } = await signInWithEmail(formData.email, formData.password)
        if (err) throw err
        trackSignIn('email')
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.')
    } finally { setIsLoading(false) }
  }

  const handleOAuth = async (provider: 'google' | 'github' | 'apple') => {
    setIsLoading(true)
    setError(null)
    try {
      const { error: err } = await signInWithOAuth(provider)
      if (err) throw err
      trackSignIn(provider)
    } catch (err: any) {
      setError(err.message || 'Sign-in failed.')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticlesBackground />
      <Navbar />

      <div className="w-full max-w-md mx-auto px-6 pt-24 pb-12">
        <div className="card-glass p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Logo size={40} animated={true} />
              <span className="text-2xl font-bold gradient-text">BioNXA</span>
            </div>
            <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--t1)' }}>
              {isSignUp ? t('auth.signUp.title') : t('auth.signIn.title')}
            </h1>
            <p className="text-muted text-sm">
              {isSignUp ? t('auth.signUp.subtitle') : t('auth.signIn.subtitle')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(255,74,141,0.1)', border: '1px solid rgba(255,74,141,0.2)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--a3)' }} />
              <p className="text-sm" style={{ color: 'var(--a3)' }}>{error}</p>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <button onClick={() => handleOAuth('google')} disabled={isLoading}
              className="w-full btn-ghost px-4 py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {t('auth.continueWithGoogle')}
            </button>
            <button onClick={() => handleOAuth('github')} disabled={isLoading}
              className="w-full btn-ghost px-4 py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              {t('auth.continueWithGithub')}
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--brd)' }} />
            <span className="text-subtle text-xs">{t('auth.orUseEmail')}</span>
            <div className="flex-1 h-px" style={{ background: 'var(--brd)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className={`absolute top-3 w-4 h-4 text-subtle ${isRTL ? 'right-3' : 'left-3'}`} />
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder={t('auth.namePlaceholder')} required
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl text-sm`}
                  style={{ background: 'var(--bgc)', border: '1px solid var(--brd)', color: 'var(--t1)' }} />
              </div>
            )}
            <div className="relative">
              <Mail className={`absolute top-3 w-4 h-4 text-subtle ${isRTL ? 'right-3' : 'left-3'}`} />
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder={t('auth.emailPlaceholder')} required
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl text-sm`}
                style={{ background: 'var(--bgc)', border: '1px solid var(--brd)', color: 'var(--t1)' }} />
            </div>
            <div className="relative">
              <Lock className={`absolute top-3 w-4 h-4 text-subtle ${isRTL ? 'right-3' : 'left-3'}`} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                placeholder={t('auth.passwordPlaceholder')} required minLength={6}
                className={`w-full ${isRTL ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-2.5 rounded-xl text-sm`}
                style={{ background: 'var(--bgc)', border: '1px solid var(--brd)', color: 'var(--t1)' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-3 text-subtle hover:text-muted ${isRTL ? 'left-3' : 'right-3'}`}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {isSignUp && (
              <div className="space-y-2 pt-1">
                <label className={`flex items-start gap-2 text-xs text-muted cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required className="mt-0.5" />
                  <span>{t('auth.agreeToTerms')} <Link href="/terms" className="text-accent-1 hover:underline">{t('auth.termsOfService')}</Link> {t('auth.and')} <Link href="/privacy" className="text-accent-1 hover:underline">{t('auth.privacyPolicy')}</Link></span>
                </label>
              </div>
            )}

            <button type="submit" disabled={isLoading || (isSignUp && !formData.agreedToTerms)}
              className="w-full btn-glow px-4 py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>{t('auth.loading')}</span></>
              ) : (
                <><Sparkles className="w-4 h-4" /><span>{isSignUp ? t('auth.signUp.button') : t('auth.signIn.button')}</span></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {isSignUp ? (isRTL ? 'لديك حساب؟ ' : 'Already have an account? ') : (isRTL ? 'ليس لديك حساب؟ ' : "Don't have an account? ")}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(null) }} className="text-accent-1 font-semibold hover:underline">
              {isSignUp ? t('auth.signIn.button') : t('auth.signUp.button')}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
