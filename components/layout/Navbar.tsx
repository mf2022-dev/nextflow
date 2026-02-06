'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Menu, X, LogIn } from 'lucide-react'

export default function Navbar() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/tutorials' as const, label: t('nav.tutorials') },
    { href: '/playground' as const, label: t('nav.playground') },
    { href: '/resources' as const, label: t('nav.resources') },
  ]

  return (
    <nav className={`fixed top-4 ${isRTL ? 'right-4 left-4' : 'left-4 right-4'} z-50 transition-all duration-500`}>
      <div className={`max-w-5xl mx-auto nav-pill px-4 py-2 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="transform transition-transform group-hover:scale-110">
              <Logo size={32} animated={true} />
            </div>
            <span className="text-lg font-bold gradient-text">BioNXA</span>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/auth"
              className="hidden md:inline-flex btn-glow text-xs px-4 py-2 items-center gap-1"
            >
              <LogIn className="w-3 h-3" />
              <span>{t('auth.signIn.button')}</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden theme-toggle"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-theme animate-slide-down">
            <div className="flex flex-col gap-1 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth"
                className="btn-glow text-xs px-4 py-2 text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                {t('auth.signIn.button')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
