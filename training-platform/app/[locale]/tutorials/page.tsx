'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronRight, CheckCircle, Circle, Code, Home } from 'lucide-react'

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
    description: 'Get started with Nextflow fundamentals',
    tutorials: [
      {
        id: 'intro',
        title: 'Introduction to Nextflow',
        description: 'Learn what Nextflow is and why it\'s essential for modern bioinformatics',
        duration: '30 min',
        level: 'beginner' as const,
        completed: false,
        lessons: 5
      },
      {
        id: 'processes',
        title: 'Processes and Tasks',
        description: 'Understand how to define and execute computational tasks',
        duration: '45 min',
        level: 'beginner' as const,
        completed: false,
        lessons: 6
      },
      {
        id: 'channels',
        title: 'Channels and Data Flow',
        description: 'Master dataflow programming with channels',
        duration: '1 hour',
        level: 'beginner' as const,
        completed: false,
        lessons: 7
      },
      {
        id: 'operators',
        title: 'Channel Operators',
        description: 'Transform and manipulate data using powerful operators',
        duration: '1 hour',
        level: 'intermediate' as const,
        completed: false,
        lessons: 8
      }
    ]
  },
  bioinformatics: {
    title: 'Bioinformatics Workflows',
    description: 'Build real-world genomics pipelines',
    tutorials: [
      {
        id: 'qc',
        title: 'Quality Control Pipeline',
        description: 'Build a FastQC-based quality control workflow',
        duration: '1 hour',
        level: 'intermediate' as const,
        completed: false,
        lessons: 6
      },
      {
        id: 'rnaseq',
        title: 'RNA-seq Analysis',
        description: 'Create a complete RNA-seq quantification pipeline',
        duration: '2 hours',
        level: 'intermediate' as const,
        completed: false,
        lessons: 10
      },
      {
        id: 'variant',
        title: 'Variant Calling',
        description: 'Develop a GATK-based variant calling workflow',
        duration: '2 hours',
        level: 'advanced' as const,
        completed: false,
        lessons: 12
      }
    ]
  },
  advanced: {
    title: 'Advanced Topics',
    description: 'Master advanced Nextflow features',
    tutorials: [
      {
        id: 'containers',
        title: 'Containers and Conda',
        description: 'Manage software dependencies with containers and Conda',
        duration: '1.5 hours',
        level: 'advanced' as const,
        completed: false,
        lessons: 8
      },
      {
        id: 'cloud',
        title: 'Cloud Deployment',
        description: 'Deploy workflows on AWS, Azure, and Google Cloud',
        duration: '2 hours',
        level: 'advanced' as const,
        completed: false,
        lessons: 9
      },
      {
        id: 'optimization',
        title: 'Performance Optimization',
        description: 'Optimize workflows for speed and resource efficiency',
        duration: '1.5 hours',
        level: 'advanced' as const,
        completed: false,
        lessons: 7
      }
    ]
  }
}

export default function TutorialsPage() {
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
            <span className="font-semibold">Tutorials</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Tutorials</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive courses to take you from beginner to expert in Nextflow and bioinformatics workflow development
          </p>
        </div>

        {/* Tutorial Categories */}
        <div className="space-y-12">
          {Object.entries(tutorialCategories).map(([key, category]) => (
            <div key={key}>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                <p className="text-gray-300">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.tutorials.map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} category={key} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TutorialCard({ tutorial, category }: { tutorial: Tutorial; category: string }) {
  const levelColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  }

  return (
    <Link href={`/tutorials/${category}/${tutorial.id}`}>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-primary transition transform hover:scale-105 cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {tutorial.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-500" />
            )}
            <div>
              <h3 className="text-xl font-semibold">{tutorial.title}</h3>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 mb-4">{tutorial.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className={`${levelColors[tutorial.level]} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
              {tutorial.level}
            </span>
            <span className="text-gray-400">{tutorial.lessons} lessons</span>
          </div>
          <span className="text-gray-400">{tutorial.duration}</span>
        </div>
      </div>
    </Link>
  )
}
