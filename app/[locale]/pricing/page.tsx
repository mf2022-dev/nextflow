'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Check, X, Sparkles, Zap, Crown, Users, Brain } from 'lucide-react'

const plans = [
  {
    name: 'Free', nameAr: 'مجاني', price: '$0', period: 'forever', periodAr: 'دائماً',
    desc: 'Perfect for students and beginners', descAr: 'مثالي للطلاب والمبتدئين',
    color: 'var(--a4)', featured: false, icon: <Brain className="w-6 h-6" />,
    features: [
      { text: 'Linux fundamentals (10 tutorials)', ok: true },
      { text: 'Basic bioinformatics courses', ok: true },
      { text: 'AI Assistant (10 queries/day)', ok: true },
      { text: 'Code playground access', ok: true },
      { text: 'Community forums', ok: true },
      { text: 'Advanced courses', ok: false },
      { text: 'Unlimited AI queries', ok: false },
      { text: 'Certificates', ok: false },
    ]
  },
  {
    name: 'Pro', nameAr: 'احترافي', price: '$19', period: '/month', periodAr: '/شهرياً',
    desc: 'For researchers and professionals', descAr: 'للباحثين والمحترفين',
    color: 'var(--a1)', featured: true, icon: <Zap className="w-6 h-6" />,
    features: [
      { text: 'Everything in Free', ok: true },
      { text: 'All advanced courses', ok: true },
      { text: 'Unlimited AI Assistant', ok: true },
      { text: 'AI code optimization', ok: true },
      { text: 'Verified certificates', ok: true },
      { text: 'Private code repos', ok: true },
      { text: 'Downloadable datasets', ok: true },
      { text: 'Priority support', ok: true },
    ]
  },
  {
    name: 'Team', nameAr: 'فرق', price: '$49', period: '/month', periodAr: '/شهرياً',
    desc: 'For research groups (up to 5)', descAr: 'لمجموعات البحث (حتى 5)',
    color: 'var(--a2)', featured: false, icon: <Users className="w-6 h-6" />,
    features: [
      { text: 'Everything in Pro (5 seats)', ok: true },
      { text: 'Team progress dashboard', ok: true },
      { text: 'Collaborative projects', ok: true },
      { text: 'Custom learning paths', ok: true },
      { text: 'Dedicated account manager', ok: true },
      { text: 'Monthly mentorship', ok: true },
      { text: 'API access', ok: true },
      { text: 'SLA guarantee', ok: true },
    ]
  },
  {
    name: 'Enterprise', nameAr: 'مؤسسات', price: 'Custom', period: '', periodAr: '',
    desc: 'For universities and institutions', descAr: 'للجامعات والمؤسسات',
    color: 'var(--a3)', featured: false, icon: <Crown className="w-6 h-6" />,
    features: [
      { text: 'Unlimited seats', ok: true },
      { text: 'White-label platform', ok: true },
      { text: 'SSO & LMS integration', ok: true },
      { text: 'Dedicated infrastructure', ok: true },
      { text: 'On-premise deployment', ok: true },
      { text: 'Custom courses', ok: true },
      { text: 'Annual workshops', ok: true },
      { text: 'Dedicated support team', ok: true },
    ]
  },
]

export default function PricingPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a1)' }}>
              <Sparkles className="w-3 h-3 mr-1" />
              {isRTL ? 'قريباً' : 'Coming Soon'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              {isRTL ? 'اختر مسار تعلمك' : 'Choose Your Learning Path'}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-6">
              {isRTL
                ? 'BioNXA حالياً مجاني 100%. ستُقدم الميزات المتقدمة مستقبلاً مع أسعار خاصة للمستخدمين الحاليين.'
                : 'BioNXA is currently 100% FREE. Premium features will be introduced in the future with special pricing for existing users.'}
            </p>
            <div className={`flex items-center justify-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.1)', color: 'var(--a4)', border: '1px solid rgba(0,255,136,0.2)' }}>
                {isRTL ? '✓ خصومات مدى الحياة للمستخدمين الأوائل' : '✓ Lifetime discounts for early users'}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,210,255,0.1)', color: 'var(--a1)', border: '1px solid rgba(0,210,255,0.2)' }}>
                {isRTL ? '✓ إشعار مسبق 30 يوماً' : '✓ 30-day advance notice'}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className={`card-glass h-full flex flex-col relative ${plan.featured ? 'ring-2' : ''}`}
                style={plan.featured ? { borderColor: plan.color, boxShadow: `0 0 30px ${plan.color}15` } : {}}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ background: plan.color, color: '#000' }}>
                      {isRTL ? 'الأكثر شعبية' : 'MOST POPULAR'}
                    </span>
                  </div>
                )}

                <div className="text-center mb-4 pt-2">
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}25` }}>
                    {plan.icon}
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: plan.color }}>
                    {isRTL ? plan.nameAr : plan.name}
                  </h3>
                  <p className="text-subtle text-xs mt-1">{isRTL ? plan.descAr : plan.desc}</p>
                </div>

                <div className="text-center mb-4">
                  <span className="text-3xl font-bold" style={{ color: 'var(--t1)' }}>{plan.price}</span>
                  <span className="text-subtle text-sm ml-1">{isRTL ? plan.periodAr : plan.period}</span>
                </div>

                <div className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className={`flex items-center gap-2 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {f.ok ? (
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--a4)' }} />
                      ) : (
                        <X className="w-3.5 h-3.5 text-subtle flex-shrink-0" />
                      )}
                      <span className={f.ok ? 'text-muted' : 'text-subtle'}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/auth"
                  className={`w-full text-center text-sm py-2.5 rounded-xl transition block ${plan.featured ? 'btn-glow' : 'btn-ghost'}`}>
                  {plan.price === 'Custom'
                    ? (isRTL ? 'تواصل معنا' : 'Contact Sales')
                    : (isRTL ? 'ابدأ الآن' : 'Get Started')}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="card-glass text-center mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--t1)' }}>
              {isRTL ? 'ابدأ التعلم اليوم — مجاناً بالكامل' : 'Start Learning Today — Completely Free'}
            </h2>
            <p className="text-muted text-sm mb-6 max-w-xl mx-auto">
              {isRTL
                ? 'انضم لمئات الباحثين والطلاب الذين يتعلمون المعلوماتية الحيوية بالذكاء الاصطناعي. لا حاجة لبطاقة ائتمان.'
                : 'Join hundreds of researchers and students mastering bioinformatics with AI-powered learning. No credit card required.'}
            </p>
            <div className={`flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href="/auth" className="btn-glow px-6 py-3 text-sm inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isRTL ? 'سجّل مجاناً' : 'Sign Up Free'}
              </Link>
              <Link href="/" className="btn-ghost px-6 py-3 text-sm">
                {isRTL ? 'استكشف المنصة' : 'Explore Platform'}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  )
}
