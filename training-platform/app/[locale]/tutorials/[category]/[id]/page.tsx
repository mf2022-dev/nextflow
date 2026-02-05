'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Home, ChevronRight, ChevronLeft, BookOpen, Code, CheckCircle } from 'lucide-react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// Sample tutorial content
const tutorialContent: any = {
  basics: {
    intro: {
      title: 'Introduction to Nextflow',
      lessons: [
        {
          id: 1,
          title: 'What is Nextflow?',
          content: `# What is Nextflow?

Nextflow is a powerful workflow management system that enables scalable and reproducible scientific workflows using software containers. It was designed around the idea that Linux platform is the *lingua franca* of data science.

## Key Features

- **Dataflow Programming Model**: Simplifies writing parallel and distributed pipelines
- **Portable**: Run on your laptop, HPC cluster, or cloud
- **Reproducible**: Built-in support for containers (Docker, Singularity, Podman)
- **Scalable**: From single machine to thousands of compute nodes
- **Reactive**: Automatically handles failures and retries

## Why Use Nextflow?

1. **Simplicity**: Focus on your science, not on parallelization
2. **Portability**: Write once, run anywhere
3. **Reproducibility**: Containers ensure consistent results
4. **Community**: Large ecosystem (nf-core) with 100+ production-ready pipelines

## Use Cases

Nextflow excels in:
- Genomics and bioinformatics workflows
- Data analysis pipelines
- Machine learning workflows
- Any computationally intensive task requiring parallelization

Let's start building your first workflow!`,
          code: `#!/usr/bin/env nextflow

println "Welcome to Nextflow!"
println "Let's build amazing pipelines together!"
`
        },
        {
          id: 2,
          title: 'Installing Nextflow',
          content: `# Installing Nextflow

Getting started with Nextflow is incredibly easy. All you need is Java 11 or later.

## Quick Installation

\`\`\`bash
curl -fsSL https://get.nextflow.io | bash
\`\`\`

This creates a \`nextflow\` executable in your current directory.

## Make it Globally Available

Move it to a directory in your PATH:

\`\`\`bash
sudo mv nextflow /usr/local/bin/
\`\`\`

## Alternative: Bioconda

If you use Conda:

\`\`\`bash
conda install -c bioconda nextflow
\`\`\`

## Verify Installation

\`\`\`bash
nextflow -version
\`\`\`

You should see output like:
\`\`\`
nextflow version 24.10.0
\`\`\`

## System Requirements

- Java 11 or later (check with \`java -version\`)
- Unix-like operating system (Linux, macOS, WSL on Windows)
- At least 4 GB of RAM

Ready to write your first workflow!`,
          code: `// Check your Nextflow version
println "Nextflow version: " + nextflow.version
println "Build: " + nextflow.build
println "Timestamp: " + nextflow.timestamp
`
        },
        {
          id: 3,
          title: 'Your First Workflow',
          content: `# Your First Workflow

Let's create a simple "Hello World" workflow to understand the basic structure.

## Basic Script Structure

Every Nextflow script typically has:
1. Shebang line
2. Process definitions
3. Workflow block

## Hello World Example

\`\`\`groovy
#!/usr/bin/env nextflow

process sayHello {
    output:
    stdout
    
    script:
    """
    echo 'Hello, World!'
    """
}

workflow {
    sayHello | view
}
\`\`\`

## Breaking It Down

- **Process**: Defines a computational task
- **Output**: Specifies what the process produces
- **Script**: The actual command to execute
- **Workflow**: Orchestrates processes
- **View**: Prints the output to console

## Running the Workflow

\`\`\`bash
nextflow run hello.nf
\`\`\`

You'll see Nextflow execute your process and display the output!`,
          code: `#!/usr/bin/env nextflow

process sayHello {
    output:
    stdout
    
    script:
    """
    echo 'Hello, World!'
    echo 'Welcome to Nextflow workflows!'
    """
}

workflow {
    sayHello | view
}
`
        }
      ]
    },
    processes: {
      title: 'Processes and Tasks',
      lessons: [
        {
          id: 1,
          title: 'Understanding Processes',
          content: `# Understanding Processes

Processes are the basic building blocks of Nextflow workflows. Each process defines a computational task that can be executed independently.

## Process Anatomy

\`\`\`groovy
process myProcess {
    // Directives
    tag "sample1"
    cpus 4
    memory '8 GB'
    
    // Input declaration
    input:
    path input_file
    
    // Output declaration
    output:
    path "output.txt"
    
    // Script block
    script:
    """
    my_command \${input_file} > output.txt
    """
}
\`\`\`

## Key Components

1. **Directives**: Configure process execution (resources, tags, etc.)
2. **Input**: Defines what data the process receives
3. **Output**: Declares what the process produces
4. **Script**: The actual command or code to execute

## Process Execution

- Each process execution is called a **task**
- Tasks run independently in isolated environments
- Nextflow handles scheduling and parallelization automatically`,
          code: `#!/usr/bin/env nextflow

process analyzeData {
    tag "Analysis"
    
    input:
    val sample_name
    
    output:
    path "results_\${sample_name}.txt"
    
    script:
    """
    echo "Analyzing \${sample_name}..."
    echo "Results for \${sample_name}" > results_\${sample_name}.txt
    """
}

workflow {
    Channel.of('sample1', 'sample2', 'sample3') | analyzeData
}
`
        }
      ]
    }
  }
}

export default function TutorialDetailPage() {
  const params = useParams()
  const category = params?.category as string
  const id = params?.id as string
  
  const [currentLesson, setCurrentLesson] = useState(0)
  const [code, setCode] = useState('')
  
  const tutorial = tutorialContent[category]?.[id]
  const lesson = tutorial?.lessons[currentLesson]

  useEffect(() => {
    if (lesson) {
      setCode(lesson.code || '')
    }
  }, [currentLesson, lesson])

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Tutorial Not Found</h1>
          <Link href="/tutorials" className="text-primary hover:text-secondary">
            Back to Tutorials
          </Link>
        </div>
      </div>
    )
  }

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  const handleNext = () => {
    if (currentLesson < tutorial.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-secondary transition">
              <Home className="w-5 h-5" />
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Link href="/tutorials" className="hover:text-primary transition">
              Tutorials
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">{tutorial.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lesson Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Lessons</span>
              </h2>
              <div className="space-y-2">
                {tutorial.lessons.map((l: any, index: number) => (
                  <button
                    key={l.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center space-x-3 ${
                      currentLesson === index
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentLesson === index ? 'bg-white text-primary' : 'bg-gray-700'
                    }`}>
                      {index < currentLesson ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-sm">{l.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Content */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <h1 className="text-3xl font-bold mb-6">{lesson?.title}</h1>
              <div 
                className="markdown-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson?.content.replace(/\n/g, '<br>') }}
              />
            </div>

            {/* Code Editor */}
            {lesson?.code && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Try It Yourself</h3>
                </div>
                <div className="h-64">
                  <MonacoEditor
                    height="100%"
                    language="groovy"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentLesson === 0}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <span className="text-gray-400">
                Lesson {currentLesson + 1} of {tutorial.lessons.length}
              </span>
              
              <button
                onClick={handleNext}
                disabled={currentLesson === tutorial.lessons.length - 1}
                className="flex items-center space-x-2 bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
