'use client'

import Link from 'next/link'
import { Home, ChevronRight, BookOpen, Video, FileText, Users, ExternalLink, Code, Database } from 'lucide-react'

const resources = {
  documentation: [
    {
      title: 'Official Nextflow Documentation',
      description: 'Comprehensive guide to all Nextflow features',
      url: 'https://nextflow.io/docs/latest/',
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: 'Nextflow Patterns',
      description: 'Common workflow patterns and best practices',
      url: 'https://nextflow-io.github.io/patterns/',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'nf-core Guidelines',
      description: 'Community standards for pipeline development',
      url: 'https://nf-co.re/docs/',
      icon: <BookOpen className="w-6 h-6" />
    }
  ],
  community: [
    {
      title: 'Nextflow Community Forum',
      description: 'Ask questions and get help from the community',
      url: 'https://community.seqera.io',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Nextflow Slack',
      description: 'Join real-time discussions with Nextflow users',
      url: 'https://www.nextflow.io/slack-invite.html',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'GitHub Repository',
      description: 'Source code and issue tracking',
      url: 'https://github.com/nextflow-io/nextflow',
      icon: <Code className="w-6 h-6" />
    }
  ],
  videos: [
    {
      title: 'Nextflow YouTube Channel',
      description: 'Video tutorials and conference talks',
      url: 'https://www.youtube.com/@Nextflow',
      icon: <Video className="w-6 h-6" />
    },
    {
      title: 'nf-core YouTube',
      description: 'Community pipeline presentations',
      url: 'https://www.youtube.com/@nf-core',
      icon: <Video className="w-6 h-6" />
    }
  ],
  pipelines: [
    {
      title: 'nf-core Pipelines',
      description: 'Collection of 100+ production-ready pipelines',
      url: 'https://nf-co.re/pipelines',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Nextflow Hub',
      description: 'Discover and share Nextflow pipelines',
      url: 'https://www.nextflow.io/blog/2020/introducing-nextflow-hub.html',
      icon: <Database className="w-6 h-6" />
    }
  ]
}

const bioinformaticsTopics = [
  {
    title: 'RNA-seq Analysis',
    description: 'Learn RNA sequencing data analysis workflows',
    topics: ['Quality Control', 'Alignment', 'Quantification', 'Differential Expression']
  },
  {
    title: 'Variant Calling',
    description: 'Discover variants in genomic data',
    topics: ['Alignment', 'Variant Detection', 'Annotation', 'Filtering']
  },
  {
    title: 'Metagenomics',
    description: 'Analyze microbial communities',
    topics: ['Taxonomic Classification', 'Assembly', 'Binning', 'Annotation']
  },
  {
    title: 'Single-cell Analysis',
    description: 'Process single-cell sequencing data',
    topics: ['Cell Calling', 'Normalization', 'Clustering', 'Annotation']
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-secondary transition">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">Resources</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Curated collection of documentation, tutorials, and community resources to help you master Nextflow
          </p>
        </div>

        {/* Documentation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary" />
            <span>Documentation</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.documentation.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <span>Community</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.community.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>

        {/* Videos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
            <Video className="w-8 h-8 text-primary" />
            <span>Video Tutorials</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.videos.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>

        {/* Pipelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
            <Database className="w-8 h-8 text-primary" />
            <span>Pipeline Collections</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.pipelines.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </section>

        {/* Bioinformatics Topics */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Bioinformatics Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bioinformaticsTopics.map((topic, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <p className="text-gray-300 mb-4">{topic.description}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.topics.map((t, i) => (
                    <span key={i} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  return (
    <a 
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-primary transition transform hover:scale-105 block"
    >
      <div className="flex items-start space-x-4">
        <div className="text-primary">{resource.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-gray-300 text-sm">{resource.description}</p>
        </div>
      </div>
    </a>
  )
}
