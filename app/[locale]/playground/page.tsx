'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import dynamic from 'next/dynamic'
import { Play, Save, Download, AlertCircle, Code, Lightbulb } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/animations/ParticlesBackground'
import AIAssistant from '@/components/AIAssistant'
import AICodeAnalyzer from '@/components/AICodeAnalyzer'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const exampleWorkflows = {
  hello: {
    name: 'Hello World',
    code: `#!/usr/bin/env nextflow

// A simple Hello World workflow
process sayHello {
    output:
    stdout

    script:
    """
    echo 'Hello, Nextflow!'
    """
}

workflow {
    sayHello | view
}
`
  },
  qc: {
    name: 'Quality Control',
    code: `#!/usr/bin/env nextflow

// FastQC Quality Control Pipeline
params.reads = "data/reads/*_{1,2}.fastq.gz"
params.outdir = "results"

process fastqc {
    tag "QC on \${sample_id}"
    publishDir "\${params.outdir}/fastqc", mode: 'copy'
    
    input:
    tuple val(sample_id), path(reads)
    
    output:
    path "fastqc_\${sample_id}_logs"
    
    script:
    """
    mkdir fastqc_\${sample_id}_logs
    fastqc -o fastqc_\${sample_id}_logs -f fastq -q \${reads}
    """
}

process multiqc {
    publishDir "\${params.outdir}/multiqc", mode: 'copy'
    
    input:
    path '*'
    
    output:
    path 'multiqc_report.html'
    
    script:
    """
    multiqc .
    """
}

workflow {
    Channel
        .fromFilePairs(params.reads, checkIfExists: true)
        .set { read_pairs_ch }
    
    fastqc(read_pairs_ch)
    multiqc(fastqc.out.collect())
}
`
  },
  rnaseq: {
    name: 'RNA-seq Basic',
    code: `#!/usr/bin/env nextflow

// Simple RNA-seq quantification pipeline
params.reads = "data/rnaseq/*_{1,2}.fastq.gz"
params.transcriptome = "data/transcriptome.fa"
params.outdir = "results"

process index {
    input:
    path transcriptome
    
    output:
    path 'salmon_index'
    
    script:
    """
    salmon index -t \${transcriptome} -i salmon_index
    """
}

process quantification {
    tag "Quant on \${sample_id}"
    publishDir "\${params.outdir}/quant/\${sample_id}", mode: 'copy'
    
    input:
    path index
    tuple val(sample_id), path(reads)
    
    output:
    path "\${sample_id}"
    
    script:
    """
    salmon quant -i \${index} -l A \\
        -1 \${reads[0]} -2 \${reads[1]} \\
        -o \${sample_id}
    """
}

workflow {
    transcriptome_ch = Channel.fromPath(params.transcriptome)
    reads_ch = Channel.fromFilePairs(params.reads)
    
    index(transcriptome_ch)
    quantification(index.out, reads_ch)
}
`
  }
}

export default function PlaygroundPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [code, setCode] = useState(exampleWorkflows.hello.code)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [selectedExample, setSelectedExample] = useState('hello')

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running workflow...\n')
    setTimeout(() => {
      setOutput(`N E X T F L O W  ~  version 24.10.0
Launching workflow...

executor >  local (1)
[xx/xxxxxx] process > sayHello [100%] 1 of 1 ✔

Hello, Nextflow!

Workflow completed successfully!
`)
      setIsRunning(false)
    }, 2000)
  }

  const handleExampleChange = (exampleKey: string) => {
    setSelectedExample(exampleKey)
    setCode(exampleWorkflows[exampleKey as keyof typeof exampleWorkflows].code)
    setOutput('')
  }

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navbar />
      <AIAssistant context="playground" currentCode={code} />
      <AICodeAnalyzer code={code} language="groovy" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Top bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="section-tag" style={{ color: 'var(--a1)' }}>
              <Code className="w-3 h-3 mr-1" />
              {isRTL ? 'ساحة التجارب' : 'Code Playground'}
            </div>
            <select
              value={selectedExample}
              onChange={(e) => handleExampleChange(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm font-mono"
              style={{ background: 'var(--bgc)', border: '1px solid var(--brd)', color: 'var(--t1)' }}
            >
              {Object.entries(exampleWorkflows).map(([key, example]) => (
                <option key={key} value={key}>{example.name}</option>
              ))}
            </select>
          </div>

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="btn-glow px-4 py-2 text-xs inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              {isRunning ? (isRTL ? 'جارٍ التشغيل...' : 'Running...') : (isRTL ? 'تشغيل' : 'Run')}
            </button>
            <button className="btn-ghost px-4 py-2 text-xs inline-flex items-center gap-2">
              <Save className="w-3 h-3" />
              {isRTL ? 'حفظ' : 'Save'}
            </button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-240px)]">
          {/* Code Editor */}
          <div className="card-glass p-0 overflow-hidden">
            <div className="px-4 py-2 border-b border-theme flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--a4)' }} />
              <span className="text-xs font-mono text-muted">Nextflow Script</span>
            </div>
            <div className="h-[calc(100%-36px)]">
              <MonacoEditor
                height="100%"
                language="groovy"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 12 },
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="card-glass p-0 overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-theme flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: isRunning ? 'var(--a3)' : output ? 'var(--a4)' : 'var(--t3)' }} />
              <span className="text-xs font-mono text-muted">Output</span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {output ? (
                <pre className="text-sm font-mono whitespace-pre-wrap" style={{ color: 'var(--a4)' }}>
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-subtle">
                  <div className="text-center">
                    <Play className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">{isRTL ? 'اضغط "تشغيل" لتنفيذ سير العمل' : 'Click "Run" to execute your workflow'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="card-glass mt-4">
          <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--a1)' }} />
            <div>
              <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--a1)' }}>
                {isRTL ? 'نصائح ساحة التجارب' : 'Playground Tips'}
              </h4>
              <ul className="text-sm text-muted space-y-1">
                <li>{isRTL ? '• هذه بيئة محاكاة لأغراض التعلم' : '• This is a simulated environment for learning purposes'}</li>
                <li>{isRTL ? '• جرّب تعديل أمثلة سير العمل لترى كيف تعمل' : '• Try modifying the example workflows to see how they work'}</li>
                <li>{isRTL ? '• اطلع على الدورات التعليمية للشرح المفصل' : '• Check out the tutorials for detailed explanations'}</li>
                <li>{isRTL ? '• للتنفيذ الحقيقي، ثبّت Nextflow محلياً أو استخدم منصة سحابية' : '• For real execution, install Nextflow locally or use a cloud platform'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
