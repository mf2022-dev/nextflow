'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    const W = 400
    const H = 500
    canvas.width = W
    canvas.height = H

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouse)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const isDark = theme === 'dark' || !theme
      const cx = W / 2
      const numPoints = 30
      const spacing = H / numPoints
      const amplitude = 60
      const labels = ['A', 'T', 'G', 'C']

      // Mouse influence on speed
      const dist = Math.abs(mouseRef.current.x - cx)
      const speedMod = dist < 200 ? 1 + (200 - dist) / 200 : 1
      time += 0.015 * speedMod

      for (let i = 0; i < numPoints; i++) {
        const y = i * spacing + 20
        const phase = time + i * 0.35
        const x1 = cx + Math.sin(phase) * amplitude
        const x2 = cx + Math.sin(phase + Math.PI) * amplitude
        const z1 = Math.cos(phase)
        const z2 = Math.cos(phase + Math.PI)

        // Base pair bond
        if (i % 2 === 0) {
          const alpha = isDark ? 0.15 : 0.1
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x2, y)
          ctx.strokeStyle = isDark ? `rgba(180, 74, 255, ${alpha})` : `rgba(136, 51, 204, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Label
          if (i % 4 === 0) {
            const label = labels[(i / 2) % labels.length]
            ctx.font = '9px JetBrains Mono, monospace'
            ctx.fillStyle = isDark ? `rgba(180, 74, 255, 0.4)` : `rgba(136, 51, 204, 0.3)`
            ctx.textAlign = 'center'
            ctx.fillText(label, (x1 + x2) / 2, y - 4)
          }
        }

        // Strand 1 node
        const size1 = 3 + z1 * 1.5
        const alpha1 = 0.5 + z1 * 0.3
        ctx.beginPath()
        ctx.arc(x1, y, Math.max(size1, 1), 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(0, 240, 255, ${alpha1})` : `rgba(0, 153, 204, ${alpha1})`
        ctx.fill()

        // Glow for strand 1
        if (z1 > 0.5) {
          ctx.beginPath()
          ctx.arc(x1, y, size1 + 4, 0, Math.PI * 2)
          ctx.fillStyle = isDark ? `rgba(0, 240, 255, 0.1)` : `rgba(0, 153, 204, 0.08)`
          ctx.fill()
        }

        // Strand 2 node
        const size2 = 3 + z2 * 1.5
        const alpha2 = 0.5 + z2 * 0.3
        ctx.beginPath()
        ctx.arc(x2, y, Math.max(size2, 1), 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(180, 74, 255, ${alpha2})` : `rgba(136, 51, 204, ${alpha2})`
        ctx.fill()

        // Glow for strand 2
        if (z2 > 0.5) {
          ctx.beginPath()
          ctx.arc(x2, y, size2 + 4, 0, Math.PI * 2)
          ctx.fillStyle = isDark ? `rgba(180, 74, 255, 0.1)` : `rgba(136, 51, 204, 0.08)`
          ctx.fill()
        }

        // Connect to next point (strand lines)
        if (i < numPoints - 1) {
          const ny = (i + 1) * spacing + 20
          const nphase = time + (i + 1) * 0.35
          const nx1 = cx + Math.sin(nphase) * amplitude
          const nx2 = cx + Math.sin(nphase + Math.PI) * amplitude

          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(nx1, ny)
          ctx.strokeStyle = isDark ? `rgba(0, 240, 255, ${0.2 + z1 * 0.15})` : `rgba(0, 153, 204, ${0.15 + z1 * 0.1})`
          ctx.lineWidth = 1.5
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x2, y)
          ctx.lineTo(nx2, ny)
          ctx.strokeStyle = isDark ? `rgba(180, 74, 255, ${0.2 + z2 * 0.15})` : `rgba(136, 51, 204, ${0.15 + z2 * 0.1})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', handleMouse)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[400px] max-h-[500px] mx-auto"
      style={{ touchAction: 'none' }}
    />
  )
}
