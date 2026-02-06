'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BookOpen, ChevronRight, CheckCircle, Circle, Code, Terminal, Dna, Brain, Workflow, Microscope } from 'lucide-react'

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  completed: boolean
  lessons: number
}

const tutorialCategories = {
  basics: {
    title: 'Nextflow Basics',
    titleAr: 'أساسيات Nextflow',
    icon: <Workflow className="w-5 h-5" />,
    color: 'var(--a1)',
    description: 'Get started with Nextflow fundamentals',
    descriptionAr: 'ابدأ بأساسيات Nextflow',
    tutorials: [
      { id: 'intro', title: 'Introduction to Nextflow', titleAr: 'مقدمة في Nextflow', description: 'Learn what Nextflow is and why it\'s essential for modern bioinformatics', descriptionAr: 'تعرف على Nextflow ولماذا هو ضروري للمعلوماتية الحيوية', duration: '30 min', level: 'beginner' as const, completed: false, lessons: 5 },
      { id: 'processes', title: 'Processes and Tasks', titleAr: 'العمليات والمهام', description: 'Understand how to define and execute computational tasks', descriptionAr: 'تعلم كيفية تعريف وتنفيذ المهام الحسابية', duration: '45 min', level: 'beginner' as const, completed: false, lessons: 6 },
      { id: 'channels', title: 'Channels and Data Flow', titleAr: 'القنوات وتدفق البيانات', description: 'Master dataflow programming with channels', descriptionAr: 'أتقن برمجة تدفق البيانات باستخدام القنوات', duration: '1 hour', level: 'beginner' as const, completed: false, lessons: 7 },
      { id: 'operators', title: 'Channel Operators', titleAr: 'مشغلات القنوات', description: 'Transform and manipulate data using powerful operators', descriptionAr: 'حوّل البيانات ومعالجتها باستخدام المشغلات', duration: '1 hour', level: 'intermediate' as const, completed: false, lessons: 8 },
    ]
  },
  bioinformatics: {
    title: 'Bioinformatics Workflows',
    titleAr: 'سير عمل المعلوماتية الحيوية',
    icon: <Dna className="w-5 h-5" />,
    color: 'var(--a2)',
    description: 'Build real-world genomics pipelines',
    descriptionAr: 'ابنِ خطوط أنابيب جينومية حقيقية',
    tutorials: [
      { id: 'qc', title: 'Quality Control Pipeline', titleAr: 'خط أنابيب مراقبة الجودة', description: 'Build a FastQC-based quality control workflow', descriptionAr: 'ابنِ سير عمل مراقبة الجودة باستخدام FastQC', duration: '1 hour', level: 'intermediate' as const, completed: false, lessons: 6 },
      { id: 'rnaseq', title: 'RNA-seq Analysis', titleAr: 'تحليل RNA-seq', description: 'Create a complete RNA-seq quantification pipeline', descriptionAr: 'أنشئ خط أنابيب كامل لتحليل RNA-seq', duration: '2 hours', level: 'intermediate' as const, completed: false, lessons: 10 },
      { id: 'variant', title: 'Variant Calling', titleAr: 'استدعاء المتغيرات', description: 'Develop a GATK-based variant calling workflow', descriptionAr: 'طوّر سير عمل استدعاء المتغيرات باستخدام GATK', duration: '2 hours', level: 'advanced' as const, completed: false, lessons: 12 },
    ]
  },
  advanced: {
    title: 'Advanced Topics',
    titleAr: 'مواضيع متقدمة',
    icon: <Brain className="w-5 h-5" />,
    color: 'var(--a3)',
    description: 'Master advanced Nextflow features',
    descriptionAr: 'أتقن ميزات Nextflow المتقدمة',
    tutorials: [
      { id: 'containers', title: 'Containers and Conda', titleAr: 'الحاويات و Conda', description: 'Manage software dependencies with containers and Conda', descriptionAr: 'أدِر تبعيات البرمجيات باستخدام الحاويات و Conda', duration: '1.5 hours', level: 'advanced' as const, completed: false, lessons: 8 },
      { id: 'cloud', title: 'Cloud Deployment', titleAr: 'النشر السحابي', description: 'Deploy workflows on AWS, Azure, and Google Cloud', descriptionAr: 'انشر سير العمل على AWS و Azure و Google Cloud', duration: '2 hours', level: 'advanced' as const, completed: false, lessons: 9 },
      { id: 'optimization', title: 'Performance Optimization', titleAr: 'تحسين الأداء', description: 'Optimize workflows for speed and resource efficiency', descriptionAr: 'حسّن سير العمل للسرعة وكفاءة الموارد', duration: '1.5 hours', level: 'advanced' as const, completed: false, lessons: 7 },
    ]
  }
}

export default function TutorialsPage() {
  const locale = useLocale()
  const t = useTranslations()
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a1)' }}>
              <BookOpen className="w-3 h-3 mr-1" />
              {isRTL ? 'الدورات التعليمية' : 'Learning Tutorials'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              {isRTL ? 'ابدأ رحلة التعلم' : 'Start Your Learning Journey'}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {isRTL
                ? 'دورات شاملة تأخذك من المبتدئ إلى الخبير في Nextflow وتطوير سير عمل المعلوماتية الحيوية'
                : 'Comprehensive courses to take you from beginner to expert in Nextflow and bioinformatics workflow development'}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {Object.entries(tutorialCategories).map(([key, category], catIdx) => (
            <ScrollReveal key={key} delay={catIdx * 100}>
              <div>
                <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="icon-box" style={{ background: `${category.color}15`, border: `1px solid ${category.color}25`, color: category.color }}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--t1)' }}>
                      {isRTL ? category.titleAr : category.title}
                    </h2>
                    <p className="text-muted text-sm">{isRTL ? category.descriptionAr : category.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.tutorials.map((tutorial: any) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} category={key} isRTL={isRTL} locale={locale} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function TutorialCard({ tutorial, category, isRTL, locale }: { tutorial: any; category: string; isRTL: boolean; locale: string }) {
  return (
    <Link href={`/tutorials/${category}/${tutorial.id}` as any}>
      <div className="card-glass group cursor-pointer h-full">
        <div className={`flex items-start gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {tutorial.completed ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--a4)' }} />
          ) : (
            <Circle className="w-5 h-5 text-subtle flex-shrink-0" />
          )}
          <h3 className="font-semibold group-hover:gradient-text-simple transition-all" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? tutorial.titleAr : tutorial.title}
          </h3>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-4">
          {locale === 'ar' ? tutorial.descriptionAr : tutorial.description}
        </p>

        <div className={`flex items-center justify-between text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`badge badge-${tutorial.level}`}>
              {tutorial.level}
            </span>
            <span className="text-subtle">{tutorial.lessons} {locale === 'ar' ? 'درس' : 'lessons'}</span>
          </div>
          <span className="text-subtle">{tutorial.duration}</span>
        </div>
      </div>
    </Link>
  )
}
