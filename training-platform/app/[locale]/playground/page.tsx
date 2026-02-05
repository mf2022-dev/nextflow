'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Play, Save, Download, Home, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'

// Dynamically import Monaco Editor to avoid SSR issues
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
  const [code, setCode] = useState(exampleWorkflows.hello.code)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [selectedExample, setSelectedExample] = useState('hello')

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running workflow...\n')
    
    // Simulate workflow execution
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-primary hover:text-secondary transition">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">Playground</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Example Selector */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="text-sm font-semibold text-gray-300">Example:</label>
          <select
            value={selectedExample}
            onChange={(e) => handleExampleChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          >
            {Object.entries(exampleWorkflows).map(([key, example]) => (
              <option key={key} value={key}>
                {example.name}
              </option>
            ))}
          </select>
        </div>

        {/* Editor and Output */}
        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          {/* Code Editor */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
              <h3 className="font-semibold">Nextflow Script</h3>
            </div>
            <div className="h-full">
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
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
              <h3 className="font-semibold">Output</h3>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {output ? (
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>Click &quot;Run&quot; to execute your workflow</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Playground Tips</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• This is a simulated environment for learning purposes</li>
                <li>• Try modifying the example workflows to see how they work</li>
                <li>• Check out the tutorials for detailed explanations</li>
                <li>• For real execution, install Nextflow locally or use a cloud platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
