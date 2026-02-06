'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <footer className="border-t border-theme mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-12 ${isRTL ? 'text-right' : ''}`}>
          <div className="md:col-span-1">
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Logo size={32} animated={false} />
              <span className="text-lg font-bold gradient-text">BioNXA</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'المنصة' : 'Platform'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/tutorials" className="text-muted text-sm hover:text-accent-1 transition">{t('nav.tutorials')}</Link>
              <Link href="/playground" className="text-muted text-sm hover:text-accent-1 transition">{t('nav.playground')}</Link>
              <Link href="/resources" className="text-muted text-sm hover:text-accent-1 transition">{t('nav.resources')}</Link>
              <Link href="/pricing" className="text-muted text-sm hover:text-accent-1 transition">{locale === 'ar' ? 'الأسعار' : 'Pricing'}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'الشركة' : 'Company'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-muted text-sm hover:text-accent-1 transition">{t('footer.privacy')}</Link>
              <Link href="/terms" className="text-muted text-sm hover:text-accent-1 transition">{t('footer.terms')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/mf2022-dev" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:text-accent-1 transition">GitHub</a>
              <a href="#" className="text-muted text-sm hover:text-accent-1 transition">X / Twitter</a>
              <a href="#" className="text-muted text-sm hover:text-accent-1 transition">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-theme flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-subtle text-xs">{t('footer.credits')}</p>
          <p className="text-subtle text-xs">
            {locale === 'ar' ? 'صُنع بشغف للمجتمع العلمي' : 'Built with passion for the scientific community'}
          </p>
        </div>
      </div>
    </footer>
  )
}
