'use client'

import { useEffect, useState, useRef } from 'react'

const LINES = [
  { prompt: true, text: 'nextflow run rnaseq-pipeline.nf --input reads/*.fastq.gz' },
  { prompt: false, text: 'N E X T F L O W  ~  version 24.04.0', color: 'cyan' },
  { prompt: false, text: 'Launching `rnaseq-pipeline.nf` [happy_darwin] - revision: a1b2c3d', color: 'muted' },
  { prompt: false, text: '' },
  { prompt: false, text: '[1a/2b3c4d] process > FASTQC (sample_01)      [100%] 4 of 4 ✓', color: 'green' },
  { prompt: false, text: '[2b/3c4d5e] process > TRIM_GALORE (sample_01) [100%] 4 of 4 ✓', color: 'green' },
  { prompt: false, text: '[3c/4d5e6f] process > STAR_ALIGN (sample_01)  [100%] 4 of 4 ✓', color: 'green' },
  { prompt: false, text: '[4d/5e6f7g] process > FEATURECOUNTS (all)     [100%] 1 of 1 ✓', color: 'green' },
  { prompt: false, text: '[5e/6f7g8h] process > DESEQ2_ANALYSIS         [100%] 1 of 1 ✓', color: 'green' },
  { prompt: false, text: '' },
  { prompt: false, text: '✨ Pipeline completed successfully!', color: 'cyan' },
  { prompt: false, text: '   Duration  : 23m 45s', color: 'muted' },
  { prompt: false, text: '   Results   : ./results/', color: 'muted' },
  { prompt: true, text: '█', color: 'cursor' },
]

export default function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          let idx = 0
          const interval = setInterval(() => {
            idx++
            setVisibleLines(idx)
            if (idx >= LINES.length) clearInterval(interval)
          }, 300)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const getColor = (color?: string) => {
    switch (color) {
      case 'cyan': return 'text-accent-1'
      case 'green': return 'text-accent-4'
      case 'muted': return 'text-subtle'
      case 'cursor': return 'text-accent-1 animate-blink'
      default: return 'text-muted'
    }
  }

  return (
    <div ref={containerRef} className="terminal-window">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="text-subtle text-xs ml-3 font-mono">bionxa@pipeline ~ </span>
      </div>
      <div className="terminal-body">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${getColor(line.color)} transition-all duration-300`}
            style={{
              opacity: i < visibleLines ? 1 : 0,
              transform: i < visibleLines ? 'translateX(0)' : 'translateX(-10px)',
            }}
          >
            {line.prompt && <span className="text-accent-4">$ </span>}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}
