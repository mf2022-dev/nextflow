'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Check, X, Sparkles, Zap, Crown, ArrowLeft, Brain, Code, Award, Users } from 'lucide-react'

export default function PricingPage() {
  const t = useTranslations()

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for students and beginners',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { text: 'Linux fundamentals (10 tutorials)', included: true },
        { text: 'Basic bioinformatics courses', included: true },
        { text: 'AI Assistant (10 queries/day)', included: true },
        { text: 'Code playground access', included: true },
        { text: 'Community forums', included: true },
        { text: 'Basic progress tracking', included: true },
        { text: 'Advanced courses', included: false },
        { text: 'Unlimited AI queries', included: false },
        { text: 'Certificates', included: false },
        { text: 'Priority support', included: false },
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For researchers and professionals',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-primary-500 to-secondary-500',
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'All advanced courses (RNA-seq, GWAS, proteomics)', included: true },
        { text: 'Unlimited AI Assistant queries', included: true },
        { text: 'AI code optimization suggestions', included: true },
        { text: 'Verified certificates of completion', included: true },
        { text: 'Private code repositories', included: true },
        { text: 'Downloadable datasets', included: true },
        { text: 'Priority email support', included: true },
        { text: '1-on-1 mentorship', included: false },
        { text: 'API access', included: false },
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Team',
      price: '$49',
      period: 'per month',
      description: 'For research groups (up to 5 users)',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        { text: 'Everything in Pro (5 seats)', included: true },
        { text: 'Team progress dashboard', included: true },
        { text: 'Collaborative projects', included: true },
        { text: 'Shared code repositories', included: true },
        { text: 'Team certificates', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom learning paths', included: true },
        { text: 'Priority support (24h response)', included: true },
        { text: 'Monthly 1-on-1 mentorship sessions', included: true },
        { text: 'API access', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For universities and institutions',
      icon: <Crown className="w-8 h-8" />,
      gradient: 'from-amber-500 to-orange-500',
      features: [
        { text: 'Everything in Team (unlimited seats)', included: true },
        { text: 'White-label platform option', included: true },
        { text: 'Custom integrations (LMS, SSO)', included: true },
        { text: 'Dedicated infrastructure', included: true },
        { text: 'On-premise deployment option', included: true },
        { text: 'Custom course creation', included: true },
        { text: 'Analytics & reporting dashboard', included: true },
        { text: 'SLA guarantee (99.9% uptime)', included: true },
        { text: 'Dedicated support team', included: true },
        { text: 'Annual training workshops', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center glass px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-primary-400 mr-2" />
          <span className="text-sm font-semibold text-primary-300">Coming Soon</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
          Choose Your <span className="gradient-text">Learning Path</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          BioNXA is currently <strong className="text-white">100% FREE</strong>. Premium features will be introduced in the future with special pricing for existing users.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg px-4 py-2">
            <p className="text-green-300 text-sm font-semibold">✓ Current users get lifetime discounts</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg px-4 py-2">
            <p className="text-blue-300 text-sm font-semibold">✓ 30-day advance notice for changes</p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-strong rounded-2xl p-6 ${
                plan.popular ? 'ring-2 ring-primary-500 shadow-glow-lg' : ''
              } hover:scale-105 transition-transform duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl mb-4`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-2">/ {plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Sparkles className="w-5 h-5 text-primary-400 mr-2" />
                When will paid features be available?
              </h3>
              <p className="text-gray-300">
                We're currently focused on building the best learning experience. Paid features will be introduced after securing investment, with at least 30 days' advance notice to all users.
              </p>
            </div>
            <div className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 text-secondary-400 mr-2" />
                Will existing users get special pricing?
              </h3>
              <p className="text-gray-300">
                <strong className="text-white">Absolutely!</strong> Early adopters who sign up now will receive lifetime discounts and grandfather pricing when we launch premium tiers.
              </p>
            </div>
            <div className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Code className="w-5 h-5 text-accent-400 mr-2" />
                What will remain free forever?
              </h3>
              <p className="text-gray-300">
                Core educational content including Linux basics, beginner bioinformatics, community forums, and basic AI Assistant access (10 queries/day) will always be free.
              </p>
            </div>
            <div className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Users className="w-5 h-5 text-purple-400 mr-2" />
                Do you offer student or institutional discounts?
              </h3>
              <p className="text-gray-300">
                Yes! We'll offer 50% discounts for students with valid .edu emails and custom enterprise pricing for universities and research institutions in Saudi Arabia and globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border border-primary-700/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Start Learning Today - <span className="gradient-text">Completely Free</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, students, and professionals mastering bioinformatics with AI-powered learning. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              href="/auth"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-8 py-4 rounded-lg transition inline-flex items-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Sign Up Free
            </Link>
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-lg transition"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-gray-500 text-sm">
          Prices shown are estimates for future reference. BioNXA is currently 100% free to use.
        </p>
      </div>
    </div>
  )
}
