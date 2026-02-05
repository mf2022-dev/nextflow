'use client'

import { useState, useEffect } from 'react'
import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { 
  BookOpen, Code, Play, Award, Menu, X, Home, FileText, 
  Sparkles, Zap, Target, Users, TrendingUp, Check, 
  ArrowRight, Star, Dna, Microscope, Workflow, Brain, MessageSquare, Cpu, Lightbulb,
  Terminal, Server, FileCode, UserCircle, LogIn
} from 'lucide-react'

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="particle w-2 h-2 bg-primary-400 rounded-full absolute top-20 left-10 opacity-60" style={{ animationDelay: '0s' }} />
        <div className="particle w-3 h-3 bg-secondary-400 rounded-full absolute top-40 right-20 opacity-50" style={{ animationDelay: '2s' }} />
        <div className="particle w-2 h-2 bg-accent-400 rounded-full absolute bottom-40 left-1/4 opacity-60" style={{ animationDelay: '4s' }} />
        <div className="particle w-3 h-3 bg-primary-400 rounded-full absolute top-1/2 right-1/3 opacity-50" style={{ animationDelay: '1s' }} />
        <div className="particle w-2 h-2 bg-secondary-400 rounded-full absolute bottom-20 right-1/4 opacity-60" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-glow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/" className={`flex items-center space-x-3 group ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="transform transition-transform group-hover:scale-110">
                <Logo size={48} animated={true} />
              </div>
              <div>
                <span className="text-2xl font-display font-bold gradient-text block">BioNXA</span>
                <span className="text-sm text-primary-300 font-semibold">{t('nav.academy')}</span>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-8`}>
              <Link href="/" className="group flex items-center space-x-2 hover:text-primary-400 transition">
                <Home className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-medium">{t('nav.home')}</span>
              </Link>
              <Link href="/tutorials" className="group flex items-center space-x-2 hover:text-secondary-400 transition">
                <BookOpen className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-medium">{t('nav.tutorials')}</span>
              </Link>
              <Link href="/playground" className="group flex items-center space-x-2 hover:text-accent-400 transition">
                <Play className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-medium">{t('nav.playground')}</span>
              </Link>
              <Link href="/resources" className="group flex items-center space-x-2 hover:text-primary-400 transition">
                <FileText className="w-4 h-4 group-hover:animate-pulse" />
                <span className="font-medium">{t('nav.resources')}</span>
              </Link>
              <LanguageSwitcher />
              <Link href="/auth" className="btn-primary text-sm py-2 px-4">
                <LogIn className="w-4 h-4 mr-2 inline" />
                <span>{t('auth.signIn.button')}</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="glass p-2 rounded-lg hover:glass-strong transition"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10 animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block glass p-3 rounded-lg hover:glass-strong transition">{t('nav.home')}</Link>
              <Link href="/tutorials" className="block glass p-3 rounded-lg hover:glass-strong transition">{t('nav.tutorials')}</Link>
              <Link href="/playground" className="block glass p-3 rounded-lg hover:glass-strong transition">{t('nav.playground')}</Link>
              <Link href="/resources" className="block glass p-3 rounded-lg hover:glass-strong transition">{t('nav.resources')}</Link>
              <Link href="/auth" className="block btn-primary text-center">
                <LogIn className="w-4 h-4 mr-2 inline" />
                {t('auth.signIn.button')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center relative z-10">
          <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-8 animate-scale-in">
            <Sparkles className={`w-4 h-4 text-accent-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-semibold text-accent-300">{t('hero.welcome')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 animate-slide-up">
            <span className="gradient-text">{t('hero.title1')}</span>
            <br />
            <span className="text-white">{t('hero.title2')}</span>
            <br />
            <span className="gradient-text">{t('hero.title3')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t.rich('hero.description', {
              scalable: (chunks) => <span className="text-primary-400 font-semibold">{chunks}</span>,
              intelligent: (chunks) => <span className="text-secondary-400 font-semibold">{chunks}</span>,
              reproducible: (chunks) => <span className="text-accent-400 font-semibold">{chunks}</span>,
            })}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center animate-scale-in ${isRTL ? 'sm:flex-row-reverse' : ''}`} style={{ animationDelay: '0.4s' }}>
            <Link href="/tutorials" className="btn-primary group">
              <span>{t('hero.startLearning')}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'} inline group-hover:translate-x-1 transition-transform`} />
            </Link>
            <Link href="/playground" className="btn-ghost group">
              <Play className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} inline group-hover:scale-110 transition-transform`} />
              <span>{t('hero.tryPlayground')}</span>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard number="10+" label={t('stats.tutorials')} icon={<BookOpen className="w-6 h-6" />} />
            <StatCard number="50+" label={t('stats.lessons')} icon={<Target className="w-6 h-6" />} />
            <StatCard number="100%" label={t('stats.free')} icon={<Sparkles className="w-6 h-6" />} />
            <StatCard number="24/7" label={t('stats.access')} icon={<Zap className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text-simple">{t('features.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-12 h-12" />}
            gradient="from-primary-500 to-primary-600"
            title={t('features.interactive.title')}
            description={t('features.interactive.description')}
            features={[
              t('features.interactive.feature1'),
              t('features.interactive.feature2'),
              t('features.interactive.feature3')
            ]}
            isRTL={isRTL}
          />
          <FeatureCard
            icon={<Code className="w-12 h-12" />}
            gradient="from-secondary-500 to-secondary-600"
            title={t('features.playground.title')}
            description={t('features.playground.description')}
            features={[
              t('features.playground.feature1'),
              t('features.playground.feature2'),
              t('features.playground.feature3')
            ]}
            isRTL={isRTL}
          />
          <FeatureCard
            icon={<Award className="w-12 h-12" />}
            gradient="from-accent-500 to-accent-600"
            title={t('features.progress.title')}
            description={t('features.progress.description')}
            features={[
              t('features.progress.feature1'),
              t('features.progress.feature2'),
              t('features.progress.feature3')
            ]}
            isRTL={isRTL}
          />
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-6 animate-pulse">
            <Brain className={`w-4 h-4 text-accent-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-semibold text-accent-300">{t('aiFeatures.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text-simple">{t('aiFeatures.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('aiFeatures.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('aiFeatures.assistant.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aiFeatures.assistant.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('aiFeatures.codeAnalysis.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aiFeatures.codeAnalysis.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('aiFeatures.personalized.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aiFeatures.personalized.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('aiFeatures.smartHelp.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aiFeatures.smartHelp.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Try AI CTA */}
        <div className="mt-12 text-center">
          <Link href="/playground" className="btn-primary inline-flex items-center">
            <Brain className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} animate-pulse`} />
            <span>Experience AI-Powered Learning</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-6">
            <TrendingUp className={`w-4 h-4 text-primary-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-semibold text-primary-300">{t('learningPath.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text-simple">{t('learningPath.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('learningPath.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          <PathStep 
            number={1} 
            title={t('learningPath.linux.title')}
            description={t('learningPath.linux.description')}
            icon={<Terminal className="w-6 h-6" />}
            color="accent"
            duration={t('learningPath.linux.duration')}
            href="/tutorials"
            isRTL={isRTL}
          />
          <PathStep 
            number={2} 
            title={t('learningPath.basics.title')}
            description={t('learningPath.basics.description')}
            icon={<Workflow className="w-6 h-6" />}
            color="primary"
            duration={t('learningPath.basics.duration')}
            href="/tutorials"
            isRTL={isRTL}
          />
          <PathStep 
            number={3} 
            title={t('learningPath.bioinformatics.title')}
            description={t('learningPath.bioinformatics.description')}
            icon={<Dna className="w-6 h-6" />}
            color="secondary"
            duration={t('learningPath.bioinformatics.duration')}
            href="/tutorials"
            isRTL={isRTL}
          />
          <PathStep 
            number={4} 
            title={t('learningPath.advanced.title')}
            description={t('learningPath.advanced.description')}
            icon={<Brain className="w-6 h-6" />}
            color="primary"
            duration={t('learningPath.advanced.duration')}
            href="/tutorials"
            isRTL={isRTL}
          />
          <PathStep 
            number={5} 
            title={t('learningPath.projects.title')}
            description={t('learningPath.projects.description')}
            icon={<Star className="w-6 h-6" />}
            color="secondary"
            duration={t('learningPath.projects.duration')}
            href="/tutorials"
            isRTL={isRTL}
          />
        </div>
      </section>

      {/* Linux Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-6">
            <Terminal className={`w-4 h-4 text-green-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-semibold text-green-300">{t('linuxFeatures.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text-simple">{t('linuxFeatures.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('linuxFeatures.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Terminal className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('linuxFeatures.terminal.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('linuxFeatures.terminal.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <FileCode className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('linuxFeatures.scripting.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('linuxFeatures.scripting.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('linuxFeatures.tools.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('linuxFeatures.tools.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="card-glow card group">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow-md">
                <Server className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:gradient-text-simple transition-all">
                  {t('linuxFeatures.servers.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('linuxFeatures.servers.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linux CTA */}
        <div className="mt-12 text-center">
          <Link href="/tutorials" className="btn-primary inline-flex items-center">
            <Terminal className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span>Start Linux Training</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-glow glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t('cta.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link href="/tutorials" className="btn-primary inline-flex items-center text-lg">
              <Sparkles className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{t('cta.button')}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-3 mb-6 md:mb-0 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Logo size={40} animated={false} />
              <div>
                <span className="text-lg font-display font-bold gradient-text block">BioNXA Academy</span>
                <span className="text-xs text-gray-400">{t('footer.subtitle')}</span>
              </div>
            </div>
            <div className={`text-center ${isRTL ? 'md:text-left' : 'md:text-right'} text-gray-400`}>
              <p className="mb-2">{t('footer.credits')}</p>
              <p className="text-sm">{t('footer.tagline')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="card text-center group">
      <div className="text-primary-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-3xl font-bold gradient-text-simple mb-1">{number}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, gradient, title, description, features, isRTL }: { 
  icon: React.ReactNode; 
  gradient: string;
  title: string; 
  description: string;
  features: string[];
  isRTL: boolean;
}) {
  return (
    <div className="card-glow card group cursor-pointer">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-glow-md`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-2xl font-display font-semibold mb-4 group-hover:gradient-text-simple transition-all">{title}</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className={`flex items-center text-sm text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Check className={`w-4 h-4 text-primary-400 ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PathStep({ number, title, description, icon, color, duration, href, isRTL }: { 
  number: number; 
  title: string; 
  description: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent';
  duration: string;
  href: string;
  isRTL: boolean;
}) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 shadow-glow-sm',
    secondary: 'from-secondary-500 to-secondary-600 shadow-glow-purple',
    accent: 'from-accent-500 to-accent-600 shadow-glow-orange',
  }

  return (
    <Link href={href}>
      <div className="card-glow card group cursor-pointer hover:scale-[1.02] transition-all">
        <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-6`}>
          <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white group-hover:scale-110 transition-transform`}>
            {number}
          </div>
          <div className="flex-1">
            <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-primary-400 group-hover:scale-110 transition-transform">
                {icon}
              </div>
              <h3 className="text-2xl font-display font-semibold group-hover:gradient-text-simple transition-all">{title}</h3>
            </div>
            <p className="text-gray-300 mb-3 leading-relaxed">{description}</p>
            <div className={`flex items-center text-sm text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TrendingUp className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{duration}</span>
            </div>
          </div>
          <div className={`text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'scale-x-[-1]' : ''}`}>
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Link>
  )
}
