'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles, Brain, Lightbulb, Code, BookOpen } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  context?: 'playground' | 'tutorial' | 'general'
  currentCode?: string
}

export default function AIAssistant({ context = 'general', currentCode }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: context === 'playground' 
        ? '👋 Hi! I\'m your AI assistant. I can help you understand bioinformatics workflows, debug your code, and suggest improvements. What would you like to know?'
        : '👋 Hi! I\'m your AI learning assistant. I can help you understand concepts, recommend tutorials, and answer questions about bioinformatics, biotechnology, and AI. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Context-aware responses
    const lowerMessage = userMessage.toLowerCase()

    // Code analysis responses
    if (context === 'playground' && currentCode) {
      if (lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
        return `🔍 **Code Analysis:**

I've analyzed your workflow. Here are my observations:

✅ **Strengths:**
- Clear process definitions
- Good use of channels for data flow
- Proper output handling

💡 **Suggestions:**
- Consider adding error handling with \`errorStrategy 'retry'\`
- Add resource labels: \`label 'high_memory'\`
- Include validation steps for input data
- Add logging for better debugging

Would you like me to explain any of these suggestions in detail?`
      }

      if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
        return `🐛 **Debugging Assistant:**

Common issues to check:
1. **Channel operators**: Ensure your channels are properly connected
2. **File paths**: Verify input file patterns match your data
3. **Process outputs**: Check that output declarations match script outputs
4. **Dependencies**: Confirm all tools are available in your environment

Share the specific error message, and I can provide targeted help!`
      }

      if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
        return `⚡ **Optimization Tips:**

**Performance:**
- Use \`cache 'lenient'\` for faster reruns
- Parallelize with \`.parallel()\` operators
- Consider executor options (cloud, HPC)

**Best Practices:**
- Modularize processes for reusability
- Use containers (Docker/Singularity)
- Implement proper logging
- Add workflow completion handlers

**Resource Management:**
- Set memory/CPU limits per process
- Use process selectors for resource allocation
- Implement queue time optimization

Need specific optimization for your workflow?`
      }
    }

    // Tutorial and learning responses
    if (lowerMessage.includes('tutorial') || lowerMessage.includes('learn')) {
      return `📚 **Learning Recommendations:**

Based on your question, I recommend:

**Beginner Path:**
1. Bioinformatics Fundamentals - Start here!
2. Data Processing Pipelines
3. Genomic Analysis Basics

**Intermediate:**
1. RNA-seq Analysis
2. Variant Calling Workflows
3. Quality Control Pipelines

**Advanced:**
1. AI/ML for Genomics
2. Cloud Deployment
3. High-Performance Computing

Which area interests you most?`
    }

    // Bioinformatics concepts
    if (lowerMessage.includes('rna') || lowerMessage.includes('seq')) {
      return `🧬 **RNA-seq Analysis:**

RNA-seq is a technique for analyzing gene expression. Here's what you need to know:

**Key Steps:**
1. **Quality Control**: FastQC for read quality
2. **Alignment**: Map reads to reference genome
3. **Quantification**: Count reads per gene
4. **Differential Expression**: Find genes that change

**Tools:**
- STAR/HISAT2 (alignment)
- Salmon/Kallisto (quantification)
- DESeq2/edgeR (analysis)

**BioNXA Resources:**
- Tutorial: "RNA-seq Analysis Workflow"
- Example: RNA-seq pipeline in playground
- Practice: Interactive coding exercises

Ready to dive deeper into any step?`
    }

    if (lowerMessage.includes('variant') || lowerMessage.includes('calling')) {
      return `🔬 **Variant Calling:**

Variant calling identifies genetic differences from a reference genome.

**Workflow:**
1. **Alignment**: BWA/Bowtie2
2. **Preprocessing**: Mark duplicates, recalibration
3. **Calling**: GATK/FreeBayes/BCFtools
4. **Filtering**: Quality control
5. **Annotation**: Functional impact

**AI Enhancement:**
- DeepVariant: Deep learning for accuracy
- ML filtering: Reduce false positives
- Predictive models: Clinical significance

**Try it:** Check our Variant Calling tutorial!

What aspect interests you?`
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return `🤖 **AI in Bioinformatics:**

AI is revolutionizing biological research:

**Applications:**
1. **Protein Structure**: AlphaFold predictions
2. **Genomics**: Variant effect prediction
3. **Drug Discovery**: Molecule generation
4. **Diagnostics**: Disease classification

**ML Techniques:**
- Deep Learning: CNNs for sequence analysis
- Random Forests: Feature selection
- Neural Networks: Pattern recognition
- Transfer Learning: Pre-trained models

**BioNXA AI Tools:**
- AI-powered code suggestions
- Automated workflow optimization
- Intelligent error detection
- Personalized learning paths

Ready to build AI-powered workflows?`
    }

    // General help responses
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return `💁 **How I Can Help:**

I'm your AI-powered bioinformatics assistant! I can:

🔍 **Code Analysis**
- Review and optimize your workflows
- Debug errors and suggest fixes
- Explain complex code patterns

📚 **Learning Support**
- Recommend tutorials based on your level
- Explain bioinformatics concepts
- Provide step-by-step guidance

🧬 **Domain Knowledge**
- RNA-seq, variant calling, QC pipelines
- Genomics, proteomics, transcriptomics
- AI/ML applications in biology

⚡ **Quick Actions**
- "Analyze my code"
- "Explain RNA-seq"
- "How do I optimize this?"
- "Recommend a tutorial"

What would you like to explore?`
    }

    // Default intelligent response
    return `🤔 **Let me help you with that...**

I understand you're asking about "${userMessage}". 

To provide the most helpful response, could you:
- Share more context about your specific use case?
- Let me know if you're working on code or learning concepts?
- Indicate your experience level (beginner/intermediate/advanced)?

Meanwhile, here are some quick resources:
- 📖 Check our tutorials library
- 💻 Try the interactive playground
- 🧬 Explore bioinformatics workflows
- 🤖 Learn about AI applications

I'm here to help! Feel free to be specific with your questions.`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await generateAIResponse(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    { icon: Code, label: 'Analyze Code', prompt: 'Can you analyze my code and suggest improvements?' },
    { icon: Lightbulb, label: 'Explain Concept', prompt: 'Explain this bioinformatics concept to me' },
    { icon: BookOpen, label: 'Recommend Tutorial', prompt: 'Recommend a tutorial for my skill level' },
    { icon: Brain, label: 'AI Applications', prompt: 'How can I use AI in bioinformatics?' }
  ]

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full p-4 shadow-glow-md transition-all hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-6 h-6 text-white" />
                <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-white/80">Powered by BioNXA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(action.prompt)
                    }}
                    className="flex items-center space-x-2 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-2 py-2 transition"
                  >
                    <action.icon className="w-3 h-3 text-primary-400" />
                    <span className="text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-700 p-4 bg-gray-900">
            <div className="flex items-end space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about bioinformatics..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
                rows={2}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl p-3 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
