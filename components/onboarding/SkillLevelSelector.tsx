'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  GraduationCap, 
  BookOpen, 
  Code, 
  Microscope,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

interface SkillLevelOption {
  id: SkillLevel
  title: string
  description: string
  icon: any
  color: string
  features: string[]
}

const skillLevels: SkillLevelOption[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'New to bioinformatics and computational biology',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    features: [
      'Introduction to bioinformatics concepts',
      'Basic Linux commands',
      'Simple data analysis',
      'Guided tutorials with explanations',
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Have some experience with basic bioinformatics',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-600',
    features: [
      'RNA-seq analysis workflows',
      'Variant calling pipelines',
      'Advanced Linux scripting',
      'Interactive coding exercises',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Experienced with genomics and pipeline development',
    icon: Code,
    color: 'from-purple-500 to-pink-600',
    features: [
      'Complex Nextflow pipelines',
      'Multi-omics data integration',
      'Custom tool development',
      'Performance optimization',
    ],
  },
  {
    id: 'expert',
    title: 'Expert',
    description: 'Professional bioinformatician or researcher',
    icon: Microscope,
    color: 'from-orange-500 to-red-600',
    features: [
      'Advanced algorithm implementation',
      'Large-scale data processing',
      'Contributing to open-source tools',
      'Research-level projects',
    ],
  },
]

interface SkillLevelSelectorProps {
  onSelect: (level: SkillLevel) => void
  locale?: string
}

export default function SkillLevelSelector({ onSelect, locale = 'en' }: SkillLevelSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSelect = (level: SkillLevel) => {
    setSelectedLevel(level)
  }

  const handleContinue = async () => {
    if (!selectedLevel) return

    setIsSubmitting(true)

    // Save to localStorage
    const userProfile = {
      skillLevel: selectedLevel,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    }
    
    localStorage.setItem('bionxa_user_profile', JSON.stringify(userProfile))

    // Call parent callback
    onSelect(selectedLevel)

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 pointer-events-none"></div>
      
      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--t1)' }}>Welcome to </span>
            <span className="gradient-text">BioNXA</span>
          </h1>
          <p className="text-muted text-lg">
            {locale === 'ar' 
              ? 'اختر مستوى خبرتك في المعلوماتية الحيوية'
              : 'Select your bioinformatics experience level'}
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {skillLevels.map((level) => {
            const Icon = level.icon
            const isSelected = selectedLevel === level.id

            return (
              <button
                key={level.id}
                onClick={() => handleSelect(level.id)}
                className={`
                  card-glass text-left p-6 transition-all duration-300 relative overflow-hidden
                  hover:scale-105 hover:shadow-2xl
                  ${isSelected ? 'ring-2 ring-primary-500 glass-strong' : ''}
                `}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-400" />
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${level.color} 
                  flex items-center justify-center mb-4
                `}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
                  {level.title}
                </h3>
                <p className="text-muted text-sm mb-4">
                  {level.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {level.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedLevel || isSubmitting}
            className={`
              btn-glow px-8 py-4 text-lg inline-flex items-center gap-3
              ${!selectedLevel ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Setting up...</span>
              </>
            ) : (
              <>
                <span>{locale === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Skip option */}
          <p className="text-muted text-sm mt-4">
            {locale === 'ar' ? 'يمكنك تغيير مستواك لاحقًا من الإعدادات' : 'You can change this later in settings'}
          </p>
        </div>
      </div>
    </div>
  )
}
