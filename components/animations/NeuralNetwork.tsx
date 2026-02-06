'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Node {
  x: number
  y: number
  layer: number
  pulse: number
  pulseSpeed: number
}

interface Signal {
  from: Node
  to: Node
  progress: number
  speed: number
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const W = 500
    const H = 300
    canvas.width = W
    canvas.height = H

    const layers = [3, 5, 7, 5, 3]
    const nodes: Node[] = []
    const signals: Signal[] = []

    // Create nodes
    layers.forEach((count, layerIdx) => {
      const x = (layerIdx + 1) * (W / (layers.length + 1))
      for (let i = 0; i < count; i++) {
        const y = (i + 1) * (H / (count + 1))
        nodes.push({
          x, y,
          layer: layerIdx,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        })
      }
    })

    // Create random signals
    const spawnSignal = () => {
      const fromLayer = Math.floor(Math.random() * (layers.length - 1))
      const fromNodes = nodes.filter(n => n.layer === fromLayer)
      const toNodes = nodes.filter(n => n.layer === fromLayer + 1)
      if (fromNodes.length && toNodes.length) {
        signals.push({
          from: fromNodes[Math.floor(Math.random() * fromNodes.length)],
          to: toNodes[Math.floor(Math.random() * toNodes.length)],
          progress: 0,
          speed: 0.01 + Math.random() * 0.015,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const isDark = theme === 'dark' || !theme

      // Draw connections
      nodes.forEach(n1 => {
        const nextLayer = nodes.filter(n2 => n2.layer === n1.layer + 1)
        nextLayer.forEach(n2 => {
          ctx.beginPath()
          ctx.moveTo(n1.x, n1.y)
          ctx.lineTo(n2.x, n2.y)
          ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.06)' : 'rgba(0, 153, 204, 0.06)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        })
      })

      // Draw signals
      if (Math.random() < 0.08) spawnSignal()
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]
        s.progress += s.speed
        if (s.progress > 1) {
          signals.splice(i, 1)
          continue
        }
        const x = s.from.x + (s.to.x - s.from.x) * s.progress
        const y = s.from.y + (s.to.y - s.from.y) * s.progress
        const alpha = Math.sin(s.progress * Math.PI)

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(180, 74, 255, ${alpha * 0.8})` : `rgba(136, 51, 204, ${alpha * 0.6})`
        ctx.fill()

        // Signal glow
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(180, 74, 255, ${alpha * 0.15})` : `rgba(136, 51, 204, ${alpha * 0.1})`
        ctx.fill()

        // Signal trail line
        ctx.beginPath()
        ctx.moveTo(s.from.x + (s.to.x - s.from.x) * Math.max(0, s.progress - 0.15), s.from.y + (s.to.y - s.from.y) * Math.max(0, s.progress - 0.15))
        ctx.lineTo(x, y)
        ctx.strokeStyle = isDark ? `rgba(180, 74, 255, ${alpha * 0.3})` : `rgba(136, 51, 204, ${alpha * 0.2})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Draw nodes
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed
        const pulseSize = 1 + Math.sin(n.pulse) * 0.5

        // Outer glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, 8 * pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 153, 204, 0.04)'
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(n.x, n.y, 4 * pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(0, 240, 255, ${0.4 + Math.sin(n.pulse) * 0.2})` : `rgba(0, 153, 204, ${0.3 + Math.sin(n.pulse) * 0.15})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[500px] max-h-[300px] mx-auto opacity-60"
    />
  )
}
