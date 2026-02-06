'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: string
  prefix?: string
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const numericTarget = parseInt(target.replace(/[^0-9]/g, ''))
          if (isNaN(numericTarget)) {
            setDisplay(target)
            return
          }

          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            const current = Math.floor(numericTarget * eased)
            setDisplay(current.toLocaleString())
            if (progress < 1) requestAnimationFrame(animate)
            else setDisplay(target)
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="gradient-text font-bold">
      {prefix}{display}{suffix}
    </span>
  )
}
