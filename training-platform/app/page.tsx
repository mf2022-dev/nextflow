'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Code, Play, Award, Menu, X, Home, FileText, MessageSquare } from 'lucide-react'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nextflow Academy</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-primary transition flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/tutorials" className="hover:text-primary transition flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Tutorials</span>
              </Link>
              <Link href="/playground" className="hover:text-primary transition flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Playground</span>
              </Link>
              <Link href="/resources" className="hover:text-primary transition flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Resources</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block hover:text-primary transition">Home</Link>
              <Link href="/tutorials" className="block hover:text-primary transition">Tutorials</Link>
              <Link href="/playground" className="block hover:text-primary transition">Playground</Link>
              <Link href="/resources" className="block hover:text-primary transition">Resources</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Master Nextflow & Bioinformatics
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn to build scalable, portable, and reproducible bioinformatics workflows through interactive tutorials and hands-on exercises
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tutorials" 
              className="bg-primary hover:bg-secondary text-white font-semibold px-8 py-4 rounded-lg transition transform hover:scale-105"
            >
              Start Learning
            </Link>
            <Link 
              href="/playground" 
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-lg transition transform hover:scale-105"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="w-12 h-12 text-primary" />}
            title="Interactive Tutorials"
            description="Step-by-step lessons covering Nextflow basics to advanced pipeline development with real-world bioinformatics examples"
          />
          <FeatureCard
            icon={<Code className="w-12 h-12 text-primary" />}
            title="Code Playground"
            description="Practice writing Nextflow workflows in an interactive editor with instant feedback and validation"
          />
          <FeatureCard
            icon={<Award className="w-12 h-12 text-primary" />}
            title="Track Progress"
            description="Monitor your learning journey, complete challenges, and earn certificates as you master new skills"
          />
        </div>
      </section>

      {/* Learning Path */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Your Learning Path</h2>
        <div className="space-y-6">
          <PathStep 
            number={1} 
            title="Nextflow Basics" 
            description="Understand dataflow programming, processes, channels, and workflow composition"
            href="/tutorials/basics"
          />
          <PathStep 
            number={2} 
            title="Bioinformatics Workflows" 
            description="Learn to build pipelines for RNA-seq, variant calling, and genomic analysis"
            href="/tutorials/bioinformatics"
          />
          <PathStep 
            number={3} 
            title="Advanced Topics" 
            description="Master containers, cloud deployment, optimization, and best practices"
            href="/tutorials/advanced"
          />
          <PathStep 
            number={4} 
            title="Real-World Projects" 
            description="Build complete production-ready pipelines with nf-core standards"
            href="/tutorials/projects"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p className="mb-4">Built with Next.js, React, and TypeScript</p>
            <p className="text-sm">Learn Nextflow • Build Better Pipelines • Advance Science</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-primary transition transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function PathStep({ number, title, description, href }: { number: number; title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-primary transition transform hover:translate-x-2 cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold">{number}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
