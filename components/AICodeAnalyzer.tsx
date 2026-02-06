'use client'

import { useState, useEffect } from 'react'
import { Brain, CheckCircle, AlertCircle, Lightbulb, Zap, Shield } from 'lucide-react'

interface CodeInsight {
  type: 'success' | 'warning' | 'info' | 'suggestion'
  category: 'performance' | 'best-practice' | 'security' | 'optimization'
  message: string
  line?: number
}

interface AICodeAnalyzerProps {
  code: string
  language?: string
  onSuggestionApply?: (suggestion: string) => void
}

export default function AICodeAnalyzer({ code, language = 'groovy', onSuggestionApply }: AICodeAnalyzerProps) {
  const [insights, setInsights] = useState<CodeInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPanel, setShowPanel] = useState(true)

  useEffect(() => {
    if (code && code.trim().length > 10) {
      analyzeCode(code)
    }
  }, [code])

  const analyzeCode = async (codeToAnalyze: string) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const detectedInsights: CodeInsight[] = []

    // AI-powered pattern detection
    
    // 1. Check for error handling
    if (!codeToAnalyze.includes('errorStrategy')) {
      detectedInsights.push({
        type: 'suggestion',
        category: 'best-practice',
        message: 'Consider adding error handling strategy. Add `errorStrategy \'retry\'` or `errorStrategy \'ignore\'` to your processes for better resilience.',
        line: codeToAnalyze.split('\n').findIndex(l => l.includes('process ')) + 1
      })
    }

    // 2. Performance optimization
    if (codeToAnalyze.includes('process ') && !codeToAnalyze.includes('cache')) {
      detectedInsights.push({
        type: 'info',
        category: 'performance',
        message: 'Enable caching for faster reruns. Add `cache \'lenient\'` to your processes to skip unchanged steps.',
        line: codeToAnalyze.split('\n').findIndex(l => l.includes('process ')) + 1
      })
    }

    // 3. Resource management
    if (codeToAnalyze.includes('process ') && !codeToAnalyze.includes('cpus') && !codeToAnalyze.includes('memory')) {
      detectedInsights.push({
        type: 'warning',
        category: 'optimization',
        message: 'Resource limits not specified. Consider adding `cpus` and `memory` directives to control resource usage and prevent overallocation.',
      })
    }

    // 4. Container usage
    if (codeToAnalyze.includes('process ') && !codeToAnalyze.includes('container') && !codeToAnalyze.includes('conda')) {
      detectedInsights.push({
        type: 'suggestion',
        category: 'best-practice',
        message: 'Use containers for reproducibility. Add `container \'docker://image\'` or `conda \'environment.yml\'` for portable and reproducible workflows.',
      })
    }

    // 5. Input validation
    if (codeToAnalyze.includes('params.') && !codeToAnalyze.includes('checkIfExists')) {
      detectedInsights.push({
        type: 'warning',
        category: 'security',
        message: 'Input validation recommended. Use `checkIfExists: true` in file channel operations to validate input files exist.',
      })
    }

    // 6. Output publishing
    if (codeToAnalyze.includes('process ') && codeToAnalyze.includes('output:') && !codeToAnalyze.includes('publishDir')) {
      detectedInsights.push({
        type: 'info',
        category: 'best-practice',
        message: 'Consider using `publishDir` to save important outputs to a results directory for easy access.',
      })
    }

    // 7. Channel operators optimization
    if (codeToAnalyze.includes('.fromFilePairs') && codeToAnalyze.includes('.set')) {
      detectedInsights.push({
        type: 'success',
        category: 'performance',
        message: 'Good use of channel operators! Your file pairing and channel assignment looks correct.',
      })
    }

    // 8. Parallelization
    if (codeToAnalyze.split('process ').length > 2 && !codeToAnalyze.includes('.parallel')) {
      detectedInsights.push({
        type: 'suggestion',
        category: 'performance',
        message: 'Enable parallelization for better performance. Use `.parallel()` operator to run multiple tasks concurrently.',
      })
    }

    // 9. Logging and monitoring
    if (!codeToAnalyze.includes('log.info') && !codeToAnalyze.includes('println')) {
      detectedInsights.push({
        type: 'info',
        category: 'best-practice',
        message: 'Add logging for better monitoring. Use `log.info("message")` to track workflow progress.',
      })
    }

    // 10. Modern syntax check
    if (codeToAnalyze.includes('Channel.fromFilePairs')) {
      detectedInsights.push({
        type: 'success',
        category: 'best-practice',
        message: 'Using modern Nextflow DSL2 syntax. Great job following current best practices!',
      })
    }

    // 11. Script organization
    if (codeToAnalyze.includes('script:') && codeToAnalyze.includes('"""')) {
      detectedInsights.push({
        type: 'success',
        category: 'best-practice',
        message: 'Clean script organization with proper quoting. This helps with variable interpolation.',
      })
    }

    // 12. Quality metrics
    const processCount = (codeToAnalyze.match(/process\s+\w+/g) || []).length
    const workflowCount = (codeToAnalyze.match(/workflow\s*{/g) || []).length
    
    if (processCount > 0 && workflowCount > 0) {
      detectedInsights.push({
        type: 'success',
        category: 'best-practice',
        message: `Workflow structure detected: ${processCount} process(es) and ${workflowCount} workflow(s). Good modular design!`,
      })
    }

    // Add AI summary
    if (detectedInsights.length > 0) {
      const suggestionCount = detectedInsights.filter(i => i.type === 'suggestion').length
      const warningCount = detectedInsights.filter(i => i.type === 'warning').length
      
      if (warningCount === 0 && suggestionCount <= 2) {
        detectedInsights.unshift({
          type: 'success',
          category: 'best-practice',
          message: '🎉 Excellent code quality! Your workflow follows most best practices. The suggestions below are optional enhancements.',
        })
      }
    }

    setInsights(detectedInsights)
    setIsAnalyzing(false)
  }

  const getIcon = (type: string, category: string) => {
    if (type === 'success') return <CheckCircle className="w-5 h-5 text-green-400" />
    if (type === 'warning') return <AlertCircle className="w-5 h-5 text-yellow-400" />
    if (category === 'performance') return <Zap className="w-5 h-5 text-blue-400" />
    if (category === 'security') return <Shield className="w-5 h-5 text-red-400" />
    return <Lightbulb className="w-5 h-5 text-purple-400" />
  }

  const getBackgroundColor = (type: string) => {
    if (type === 'success') return 'bg-green-900/20 border-green-700'
    if (type === 'warning') return 'bg-yellow-900/20 border-yellow-700'
    if (type === 'info') return 'bg-blue-900/20 border-blue-700'
    return 'bg-purple-900/20 border-purple-700'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'performance': 'Performance',
      'best-practice': 'Best Practice',
      'security': 'Security',
      'optimization': 'Optimization'
    }
    return labels[category] || category
  }

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="fixed top-20 right-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg px-4 py-2 shadow-lg flex items-center space-x-2 transition z-40"
      >
        <Brain className="w-4 h-4" />
        <span className="text-sm font-medium">Show AI Insights</span>
        {insights.length > 0 && (
          <span className="bg-white text-primary-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {insights.length}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-5 h-5 text-white" />
          <div>
            <h3 className="font-bold text-white text-sm">AI Code Insights</h3>
            <p className="text-xs text-white/80">Real-time analysis</p>
          </div>
        </div>
        <button
          onClick={() => setShowPanel(false)}
          className="text-white hover:bg-white/20 rounded p-1 transition"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-12rem)] p-4 space-y-3">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="w-8 h-8 text-primary-400 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-gray-400">Analyzing code...</p>
            </div>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8">
            <Lightbulb className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Write code to get AI insights</p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Analysis Summary</span>
                <span className="text-xs text-gray-400">{insights.length} insights</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-gray-400">{insights.filter(i => i.type === 'success').length} good</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lightbulb className="w-3 h-3 text-purple-400" />
                  <span className="text-gray-400">{insights.filter(i => i.type === 'suggestion').length} tips</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 text-yellow-400" />
                  <span className="text-gray-400">{insights.filter(i => i.type === 'warning').length} warnings</span>
                </div>
              </div>
            </div>

            {/* Insights */}
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`${getBackgroundColor(insight.type)} border rounded-lg p-3 transition hover:border-opacity-100`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(insight.type, insight.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                        {getCategoryLabel(insight.category)}
                      </span>
                      {insight.line && (
                        <span className="text-xs text-gray-500">Line {insight.line}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 px-4 py-2 bg-gray-800/50">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Powered by BioNXA AI</span>
          <button
            onClick={() => analyzeCode(code)}
            className="text-primary-400 hover:text-primary-300 transition"
          >
            Refresh Analysis
          </button>
        </div>
      </div>
    </div>
  )
}
