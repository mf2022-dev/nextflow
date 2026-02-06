'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import DNAHelix from '@/components/animations/DNAHelix'
import NeuralNetwork from '@/components/animations/NeuralNetwork'
import TerminalAnimation from '@/components/animations/TerminalAnimation'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import {
  ArrowRight, Dna, Terminal, Brain, BookOpen, Code, Play,
  Sparkles, Zap, Target, Users, Award, Star, Workflow,
  Microscope, Cpu, MessageSquare, Lightbulb, Server, FileCode,
  TrendingUp, Check, Flame
} from 'lucide-react'

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:grid-flow-dense' : ''}`}>
          <div className={isRTL ? 'md:col-start-2' : ''}>
            <ScrollReveal>
              <div className="section-tag mb-6" style={{ color: 'var(--a1)' }}>
                <Sparkles className="w-3 h-3 mr-1" />
                {t('hero.welcome')}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span style={{ color: 'var(--t1)' }}>{locale === 'ar' ? 'أتقن ' : 'Master '}</span>
                <span className="gradient-text">{locale === 'ar' ? 'المعلوماتية الحيوية' : 'Bioinformatics'}</span>
                <br />
                <span style={{ color: 'var(--t1)' }}>{locale === 'ar' ? 'بطريقتك' : 'Your Way'}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-muted text-lg leading-relaxed mb-8 max-w-lg">
                {locale === 'ar'
                  ? 'تعلم بناء حلول معلوماتية حيوية قابلة للتوسع ومدعومة بالذكاء الاصطناعي وقابلة للتكرار مع مساعدة الذكاء الاصطناعي وتحليل الكود الفوري ومسارات تعليمية مخصصة'
                  : 'Learn to build scalable, AI-powered, and reproducible bioinformatics workflows with AI assistance, real-time code analysis, and personalized learning paths'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className={`flex flex-wrap gap-3 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link href="/tutorials" className="btn-glow px-6 py-3 text-sm inline-flex items-center gap-2">
                  {t('hero.startLearning')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/playground" className="btn-ghost px-6 py-3 text-sm inline-flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {t('hero.tryPlayground')}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex -space-x-2">
                  {['#00f0ff', '#b44aff', '#ff4a8d', '#4aff91'].map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2"
                      style={{ background: color, borderColor: 'var(--bg)', zIndex: 4 - i }}
                    />
                  ))}
                </div>
                <span className="text-muted text-xs">
                  {locale === 'ar' ? '312 باحث انضموا بالفعل' : '312 researchers already joined'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* DNA Helix */}
          <div className={`hidden md:block ${isRTL ? 'md:col-start-1' : ''}`}>
            <ScrollReveal delay={200}>
              <DNAHelix />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== STATS MARQUEE ===== */}
      <ScrollReveal>
        <section className="border-y border-theme py-5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-16 items-center">
                <StatItem label={locale === 'ar' ? 'سوق المعلوماتية الحيوية' : 'Bioinformatics Market'} value="$37B" suffix=" by 2031" />
                <span className="text-subtle">|</span>
                <StatItem label={locale === 'ar' ? 'سوق التعليم الإلكتروني' : 'EdTech Market'} value="$589B" suffix=" by 2034" />
                <span className="text-subtle">|</span>
                <StatItem label={locale === 'ar' ? 'منافسون مباشرون' : 'Direct Competitors'} value="0" suffix="" />
                <span className="text-subtle">|</span>
                <StatItem label={locale === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'} value="100" suffix="%" />
                <span className="text-subtle">|</span>
                <StatItem label={locale === 'ar' ? 'ثنائي اللغة' : 'Bilingual'} value="EN" suffix=" + AR" />
                <span className="text-subtle">|</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== TERMINAL CODE DEMO ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:grid-flow-dense' : ''}`}>
          <div className={isRTL ? 'md:col-start-2' : ''}>
            <ScrollReveal>
              <TerminalAnimation />
            </ScrollReveal>
          </div>
          <div className={isRTL ? 'md:col-start-1' : ''}>
            <ScrollReveal delay={100}>
              <div className="section-tag mb-4" style={{ color: 'var(--a4)' }}>
                <Terminal className="w-3 h-3 mr-1" />
                {locale === 'ar' ? 'تعلّم بالممارسة' : 'Learn by Doing'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
                {locale === 'ar' ? 'شغّل خطوط أنابيب حقيقية' : 'Run Real Pipelines'}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {locale === 'ar'
                  ? 'اكتب وشغّل خطوط أنابيب Nextflow حقيقية مباشرة في المتصفح. من تحليل RNA-seq إلى استدعاء المتغيرات — تعلّم بالممارسة الفعلية.'
                  : 'Write and execute real Nextflow pipelines directly in your browser. From RNA-seq analysis to variant calling — learn by actually doing it.'}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Terminal className="w-4 h-4" />, text: locale === 'ar' ? 'محرر كود تفاعلي مع Monaco' : 'Interactive code editor with Monaco' },
                  { icon: <Cpu className="w-4 h-4" />, text: locale === 'ar' ? 'رؤى كود مدعومة بالذكاء الاصطناعي' : 'AI-powered code insights' },
                  { icon: <Check className="w-4 h-4" />, text: locale === 'ar' ? 'أمثلة سير عمل جاهزة' : 'Pre-built workflow examples' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm text-muted ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-accent-4">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== AI TUTOR SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:grid-flow-dense' : ''}`}>
          <div className={isRTL ? 'md:col-start-1' : ''}>
            <ScrollReveal delay={100}>
              <div className="section-tag mb-4" style={{ color: 'var(--a2)' }}>
                <Brain className="w-3 h-3 mr-1" />
                {locale === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
                {locale === 'ar' ? 'معلّمك الشخصي بالذكاء الاصطناعي' : 'Your Personal AI Tutor'}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {locale === 'ar'
                  ? 'احصل على مساعدة فورية ومخصصة من مساعد الذكاء الاصطناعي. اسأل عن أي شيء — من أساسيات Nextflow إلى خطوط أنابيب المعلوماتية الحيوية المتقدمة.'
                  : 'Get instant, personalized help from the AI assistant. Ask anything — from Nextflow basics to advanced bioinformatics pipelines.'}
              </p>

              {/* AI Chat Demo */}
              <div className="card-glass p-0 overflow-hidden">
                <div className="p-3 border-b border-theme flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--a4)' }} />
                  <span className="text-xs font-mono text-muted">BioNXA AI Assistant</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="ai-msg-user rounded-xl px-3 py-2 text-xs max-w-[80%]">
                    {locale === 'ar' ? 'كيف أحلل بيانات RNA-seq؟' : 'How do I analyze RNA-seq data?'}
                  </div>
                  <div className="ai-msg-bot rounded-xl px-3 py-2 text-xs max-w-[85%]">
                    {locale === 'ar'
                      ? 'ابدأ بمراقبة الجودة باستخدام FastQC، ثم قص المحولات باستخدام Trim Galore، ومحاذاة القراءات مع STAR، وأخيراً التحليل التفاضلي باستخدام DESeq2. دعني أريك خط أنابيب Nextflow...'
                      : 'Start with quality control using FastQC, then trim adapters with Trim Galore, align reads with STAR, and finally run differential expression with DESeq2. Let me show you a Nextflow pipeline...'}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className={`relative ${isRTL ? 'md:col-start-2' : ''}`}>
            <ScrollReveal>
              <NeuralNetwork />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== FEATURES BENTO GRID ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a1)' }}>
              {locale === 'ar' ? 'لماذا BioNXA' : 'Why BioNXA'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--t1)' }}>
              {t('features.title')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4">
          <ScrollReveal delay={0}>
            <FeatureCard
              icon={<Dna className="w-5 h-5" />}
              iconClass="icon-box-cyan"
              title={t('features.interactive.title')}
              description={t('features.interactive.description')}
              features={[t('features.interactive.feature1'), t('features.interactive.feature2'), t('features.interactive.feature3')]}
              isRTL={isRTL}
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeatureCard
              icon={<Code className="w-5 h-5" />}
              iconClass="icon-box-violet"
              title={t('features.playground.title')}
              description={t('features.playground.description')}
              features={[t('features.playground.feature1'), t('features.playground.feature2'), t('features.playground.feature3')]}
              isRTL={isRTL}
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <FeatureCard
              icon={<Award className="w-5 h-5" />}
              iconClass="icon-box-rose"
              title={t('features.progress.title')}
              description={t('features.progress.description')}
              features={[t('features.progress.feature1'), t('features.progress.feature2'), t('features.progress.feature3')]}
              isRTL={isRTL}
            />
          </ScrollReveal>
        </div>

        {/* AI Features Row */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <ScrollReveal delay={100}>
            <div className="card-glass">
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="icon-box-violet flex-shrink-0">
                  <MessageSquare className="w-5 h-5" style={{ color: 'var(--a2)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>{t('aiFeatures.assistant.title')}</h3>
                  <p className="text-muted text-sm leading-relaxed">{t('aiFeatures.assistant.description')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="card-glass">
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="icon-box-mint flex-shrink-0">
                  <Brain className="w-5 h-5" style={{ color: 'var(--a4)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>{t('aiFeatures.personalized.title')}</h3>
                  <p className="text-muted text-sm leading-relaxed">{t('aiFeatures.personalized.description')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== GAMIFICATION ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:grid-flow-dense' : ''}`}>
          <div className={isRTL ? 'md:col-start-2' : ''}>
            <ScrollReveal>
              <div className="section-tag mb-4" style={{ color: 'var(--a3)' }}>
                <Flame className="w-3 h-3 mr-1" />
                {locale === 'ar' ? 'تعلّم ممتع' : 'Gamified Learning'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
                {locale === 'ar' ? 'تعلّم. تنافس. تقدّم.' : 'Learn. Compete. Level Up.'}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {locale === 'ar'
                  ? 'اكسب نقاط الخبرة، حافظ على سلسلة التعلم اليومية، واحصل على شارات بينما تتقن المعلوماتية الحيوية.'
                  : 'Earn XP, maintain daily streaks, and unlock badges as you master bioinformatics.'}
              </p>
            </ScrollReveal>
          </div>

          <div className={isRTL ? 'md:col-start-1' : ''}>
            <ScrollReveal delay={200}>
              <div className="card-glass">
                {/* Streak */}
                <div className="mb-5">
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Flame className="w-4 h-4" style={{ color: 'var(--a3)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>
                      {locale === 'ar' ? 'سلسلة 7 أيام' : '7 Day Streak'}
                    </span>
                  </div>
                  <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className={`streak-dot ${i < 5 ? 'done' : ''}`}>
                        {i < 5 ? '✓' : day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* XP Bar */}
                <div className="mb-5">
                  <div className={`flex justify-between text-xs mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-accent-1 font-semibold">Level 12</span>
                    <span className="text-muted">2,450 / 3,000 XP</span>
                  </div>
                  <div className="xp-bar">
                    <div className="xp-fill" style={{ width: '82%' }} />
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <span className="text-xs font-semibold text-muted block mb-2">
                    {locale === 'ar' ? 'الشارات' : 'Badges'}
                  </span>
                  <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {['🧬', '💻', '🧪', '🏆', '🔬'].map((badge, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                        style={{ background: 'var(--bgc)', border: '1px solid var(--brd)' }}
                      >
                        {badge}
                      </div>
                    ))}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs text-subtle"
                      style={{ background: 'var(--bgc)', border: '1px dashed var(--brd)' }}
                    >
                      +8
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== LEARNING JOURNEY ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a2)' }}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {t('learningPath.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--t1)' }}>
              {t('learningPath.title')}
            </h2>
          </div>
        </ScrollReveal>

        <div className={`relative ${isRTL ? 'pr-8' : 'pl-8'}`}>
          <div className="journey-line" style={isRTL ? { right: '15px', left: 'auto' } : {}} />

          {[
            { num: 1, icon: <Terminal className="w-4 h-4" />, color: 'var(--a4)', title: t('learningPath.linux.title'), desc: t('learningPath.linux.description'), dur: t('learningPath.linux.duration') },
            { num: 2, icon: <Workflow className="w-4 h-4" />, color: 'var(--a1)', title: t('learningPath.basics.title'), desc: t('learningPath.basics.description'), dur: t('learningPath.basics.duration') },
            { num: 3, icon: <Dna className="w-4 h-4" />, color: 'var(--a2)', title: t('learningPath.bioinformatics.title'), desc: t('learningPath.bioinformatics.description'), dur: t('learningPath.bioinformatics.duration') },
            { num: 4, icon: <Brain className="w-4 h-4" />, color: 'var(--a3)', title: t('learningPath.advanced.title'), desc: t('learningPath.advanced.description'), dur: t('learningPath.advanced.duration') },
            { num: 5, icon: <Star className="w-4 h-4" />, color: 'var(--a5)', title: t('learningPath.projects.title'), desc: t('learningPath.projects.description'), dur: t('learningPath.projects.duration') },
          ].map((step, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <Link href="/tutorials">
                <div className="card-glass mb-4 cursor-pointer group" style={{ [isRTL ? 'marginRight' : 'marginLeft']: '24px' }}>
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold group-hover:scale-110 transition-transform"
                      style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span style={{ color: step.color }}>{step.icon}</span>
                        <h3 className="font-semibold group-hover:gradient-text-simple transition-all" style={{ color: 'var(--t1)' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted text-sm leading-relaxed mb-2">{step.desc}</p>
                      <div className={`flex items-center gap-1 text-xs text-subtle ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <TrendingUp className="w-3 h-3" />
                        {step.dur}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-subtle opacity-0 group-hover:opacity-100 transition ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="card-glass text-center py-16 px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('cta.title')}</span>
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <div className={`flex flex-wrap gap-3 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href="/tutorials" className="btn-glow px-8 py-3 text-sm inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t('cta.button')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Waitlist */}
            <div className="mt-8 pt-6 border-t border-theme">
              <p className="text-subtle text-xs mb-3">
                {locale === 'ar' ? 'أو انضم لقائمة الانتظار للوصول المبكر' : 'Or join the waitlist for early access'}
              </p>
              <div className={`flex gap-2 max-w-sm mx-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-mono"
                  style={{ background: 'var(--bgc)', border: '1px solid var(--brd)', color: 'var(--t1)' }}
                />
                <button className="btn-glow px-4 py-2 text-xs">
                  {locale === 'ar' ? 'انضم' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  )
}

/* ===== SUB-COMPONENTS ===== */

function StatItem({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold gradient-text">{value}{suffix}</span>
      <span className="text-subtle text-xs">{label}</span>
    </div>
  )
}

function FeatureCard({ icon, iconClass, title, description, features, isRTL }: {
  icon: React.ReactNode
  iconClass: string
  title: string
  description: string
  features: string[]
  isRTL: boolean
}) {
  return (
    <div className="card-glass h-full group">
      <div className={`${iconClass} mb-4 group-hover:scale-110 transition-transform`}>
        <span style={{ color: iconClass.includes('cyan') ? 'var(--a1)' : iconClass.includes('violet') ? 'var(--a2)' : 'var(--a3)' }}>
          {icon}
        </span>
      </div>
      <h3 className="font-semibold mb-2 group-hover:gradient-text-simple transition-all" style={{ color: 'var(--t1)' }}>
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
      <div className="space-y-2">
        {features.map((f, i) => (
          <div key={i} className={`flex items-center gap-2 text-xs text-muted ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Check className="w-3 h-3 text-accent-4 flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}
