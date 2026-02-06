'use client'

import { useLocale, useTranslations } from 'next-intl'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BookOpen, ExternalLink, FileText, Video, Users, Code, Database } from 'lucide-react'

const sections = [
  {
    title: 'Documentation', titleAr: 'التوثيق', color: 'var(--a1)',
    items: [
      { title: 'Official Nextflow Docs', desc: 'Comprehensive guide to all features', url: 'https://nextflow.io/docs/latest/' },
      { title: 'Nextflow Patterns', desc: 'Common workflow patterns and best practices', url: 'https://nextflow-io.github.io/patterns/' },
      { title: 'nf-core Guidelines', desc: 'Community standards for pipelines', url: 'https://nf-co.re/docs/' },
    ]
  },
  {
    title: 'Community', titleAr: 'المجتمع', color: 'var(--a2)',
    items: [
      { title: 'Nextflow Forum', desc: 'Ask questions and get community help', url: 'https://community.seqera.io' },
      { title: 'Nextflow Slack', desc: 'Real-time discussions with users', url: 'https://www.nextflow.io/slack-invite.html' },
      { title: 'GitHub Repository', desc: 'Source code and issue tracking', url: 'https://github.com/nextflow-io/nextflow' },
    ]
  },
  {
    title: 'Video Tutorials', titleAr: 'فيديوهات تعليمية', color: 'var(--a3)',
    items: [
      { title: 'Nextflow YouTube', desc: 'Video tutorials and conference talks', url: 'https://www.youtube.com/@Nextflow' },
      { title: 'nf-core YouTube', desc: 'Community pipeline presentations', url: 'https://www.youtube.com/@nf-core' },
    ]
  },
  {
    title: 'Pipeline Collections', titleAr: 'مجموعات خطوط الأنابيب', color: 'var(--a4)',
    items: [
      { title: 'nf-core Pipelines', desc: '100+ production-ready pipelines', url: 'https://nf-co.re/pipelines' },
      { title: 'Nextflow Hub', desc: 'Discover and share pipelines', url: 'https://www.nextflow.io/blog/2020/introducing-nextflow-hub.html' },
    ]
  },
]

const bioTopics = [
  { title: 'RNA-seq Analysis', titleAr: 'تحليل RNA-seq', desc: 'Learn RNA sequencing data analysis', tags: ['Quality Control', 'Alignment', 'Quantification', 'Differential Expression'] },
  { title: 'Variant Calling', titleAr: 'استدعاء المتغيرات', desc: 'Discover variants in genomic data', tags: ['Alignment', 'Variant Detection', 'Annotation', 'Filtering'] },
  { title: 'Metagenomics', titleAr: 'الميتاجينوميكس', desc: 'Analyze microbial communities', tags: ['Classification', 'Assembly', 'Binning', 'Annotation'] },
  { title: 'Single-cell Analysis', titleAr: 'تحليل الخلية الواحدة', desc: 'Process single-cell sequencing data', tags: ['Cell Calling', 'Normalization', 'Clustering', 'Annotation'] },
]

export default function ResourcesPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="section-tag mb-4 mx-auto" style={{ color: 'var(--a2)' }}>
              <BookOpen className="w-3 h-3 mr-1" />
              {isRTL ? 'الموارد' : 'Resources'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              {isRTL ? 'موارد التعلم' : 'Learning Resources'}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {isRTL ? 'مجموعة منسقة من أفضل الموارد لتعلم المعلوماتية الحيوية و Nextflow' : 'Curated collection of documentation, tutorials, and community resources to help you master Nextflow'}
            </p>
          </div>
        </ScrollReveal>

        {sections.map((section, si) => (
          <ScrollReveal key={si} delay={si * 80}>
            <div className="mb-10">
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--t1)' }}>
                <span style={{ color: section.color }}>{isRTL ? section.titleAr : section.title}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {section.items.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="card-glass group cursor-pointer h-full block">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className="font-semibold text-sm group-hover:gradient-text-simple transition-all" style={{ color: 'var(--t1)' }}>{item.title}</h3>
                      <ExternalLink className="w-3 h-3 text-subtle opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              {isRTL ? 'مواضيع المعلوماتية الحيوية' : 'Bioinformatics Topics'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {bioTopics.map((topic, i) => (
                <div key={i} className="card-glass">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--t1)' }}>{isRTL ? topic.titleAr : topic.title}</h3>
                  <p className="text-muted text-sm mb-3">{topic.desc}</p>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {topic.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--a1-bg)', color: 'var(--a1)', border: '1px solid var(--a1)20' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  )
}
