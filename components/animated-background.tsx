'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { audioEngine } from '@/lib/audio-engine'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    // Smoothed audio values (lerp towards target)
    let sBass = 0, sMid = 0, sHigh = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const w = () => window.innerWidth
    const h = () => window.innerHeight

    // --- Dot Grid Particles ---
    const dotSpacing = 28
    const dotBaseRadius = 1.2

    // --- Orbital Ring Particles ---
    const ringParticleCount = 180
    const ringParticles = Array.from({ length: ringParticleCount }, (_, i) => ({
      angle: (i / ringParticleCount) * Math.PI * 2,
      radiusOffset: (Math.random() - 0.5) * 40,
      size: 1.5 + Math.random() * 2.5,
      speed: 0.15 + Math.random() * 0.15,
      opacity: 0.3 + Math.random() * 0.7,
      pulseSpeed: 0.5 + Math.random() * 1.5,
      pulsePhase: Math.random() * Math.PI * 2,
    }))

    // --- Floating Particles ---
    const floatingCount = 60
    const floatingParticles = Array.from({ length: floatingCount }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.5,
      size: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.4,
      life: Math.random(),
    }))

    // Detect theme
    const getIsDark = () => document.documentElement.classList.contains('dark')

    const draw = () => {
      time += 0.008
      const isDark = getIsDark()

      const width = w()
      const height = h()

      // === Audio Reactivity ===
      const { bass, mid, high } = audioEngine.getAudioLevels()

      // Smooth interpolation (lerp) for buttery transitions
      const lerpFactor = 0.08
      sBass += (bass - sBass) * lerpFactor
      sMid += (mid - sMid) * lerpFactor
      sHigh += (high - sHigh) * lerpFactor

      // Clear
      ctx.clearRect(0, 0, width, height)

      // Color palette based on theme
      const primaryColor = isDark ? [140, 130, 255] : [90, 70, 220]    // purple-blue
      const accentColor = isDark ? [80, 200, 255] : [60, 140, 220]     // cyan-blue
      const gridColor = isDark ? [140, 130, 255] : [90, 70, 220]

      // === 1. Animated Dot Grid (reacts to bass) ===
      const gridOpacityBase = isDark ? 0.12 : 0.08
      const audioGridBoost = 1 + sBass * 2 // grid pulses with bass
      const offsetX = Math.sin(time * 0.3) * 8
      const offsetY = Math.cos(time * 0.25) * 8

      const cols = Math.ceil(width / dotSpacing) + 2
      const rows = Math.ceil(height / dotSpacing) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * dotSpacing + offsetX
          const y = row * dotSpacing + offsetY

          // Distance from center for wave effect
          const dx = x - width / 2
          const dy = y - height / 2
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)

          // Ripple wave — bass makes it faster
          const waveSpeed = 2 + sBass * 4
          const wave = Math.sin(dist * 0.008 - time * waveSpeed) * 0.5 + 0.5
          const opacity = gridOpacityBase * audioGridBoost * (0.3 + wave * 0.7) * (1 - dist / maxDist * 0.5)
          const radius = dotBaseRadius * (0.6 + wave * 0.4) * (1 + sBass * 0.5)

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${gridColor[0]}, ${gridColor[1]}, ${gridColor[2]}, ${Math.min(opacity, 1)})`
          ctx.fill()
        }
      }

      // === 2. Orbital Particle Ring (reacts to bass + mid) ===
      const centerX = width / 2
      const centerY = height / 2
      const baseRadius = Math.min(width, height) * 0.32

      // Bass expands ring radius
      const audioRadiusPulse = sBass * 35

      // Ring glow — mid boosts glow intensity
      const innerR = Math.max(0, baseRadius + audioRadiusPulse - 60)
      const outerR = baseRadius + audioRadiusPulse + 60
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, innerR,
        centerX, centerY, outerR
      )
      const glowOpacity = (isDark ? 0.06 : 0.03) * (1 + sMid * 5)
      glowGrad.addColorStop(0, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, 0)`)
      glowGrad.addColorStop(0.5, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${Math.min(glowOpacity, 0.4)})`)
      glowGrad.addColorStop(1, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, 0)`)
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      // Draw ring particles
      for (const p of ringParticles) {
        const angle = p.angle + time * p.speed
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5

        // Ring expands with bass, wobbles more with mid
        const audioWobble = 15 + sMid * 25
        const r = baseRadius + audioRadiusPulse + p.radiusOffset + Math.sin(angle * 3 + time) * audioWobble

        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r

        // Particles grow with mid
        const audioSizeBoost = 1 + sMid * 1.5
        const size = p.size * (0.5 + pulse * 0.5) * audioSizeBoost

        // Particles glow brighter with mid
        const audioOpacityBoost = 1 + sMid * 2
        const opacity = Math.min(p.opacity * (0.3 + pulse * 0.7) * (isDark ? 0.7 : 0.4) * audioOpacityBoost, 1)

        // Glow (bigger with audio)
        const glowSize = size * (3 + sMid * 2)
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        grd.addColorStop(0, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${opacity * 0.8})`)
        grd.addColorStop(0.4, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${opacity * 0.3})`)
        grd.addColorStop(1, `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, 0)`)
        ctx.fillStyle = grd
        ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2)

        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${opacity})`
        ctx.fill()
      }

      // === 3. Floating Particles (reacts to high frequencies) ===
      const audioSpeedBoost = 1 + sHigh * 4
      for (const p of floatingParticles) {
        p.x += p.vx * audioSpeedBoost
        p.y += p.vy * audioSpeedBoost
        p.life += 0.002 * audioSpeedBoost

        // Reset when out of bounds
        if (p.y < -20 || p.life > 1) {
          p.x = Math.random() * width
          p.y = height + 20
          p.life = 0
        }

        const fadeIn = Math.min(p.life * 5, 1)
        const fadeOut = p.life > 0.8 ? 1 - (p.life - 0.8) / 0.2 : 1
        const audioAlphaBoost = 1 + sHigh * 2
        const alpha = Math.min(p.opacity * fadeIn * fadeOut * (isDark ? 1 : 0.6) * audioAlphaBoost, 1)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 + sHigh * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
        ctx.fill()
      }

      // === 4. Scanline Effect (very subtle) ===
      if (isDark) {
        const scanlineOpacity = 0.015
        for (let y = 0; y < height; y += 3) {
          ctx.fillStyle = `rgba(0, 0, 0, ${scanlineOpacity})`
          ctx.fillRect(0, y, width, 1)
        }
      }

      // === 5. Vignette ===
      const vignetteGrad = ctx.createRadialGradient(
        centerX, centerY, Math.min(width, height) * 0.3,
        centerX, centerY, Math.max(width, height) * 0.8
      )
      const vignetteAlpha = isDark ? 0.5 : 0.2
      vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignetteGrad.addColorStop(1, `rgba(0, 0, 0, ${vignetteAlpha})`)
      ctx.fillStyle = vignetteGrad
      ctx.fillRect(0, 0, width, height)

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const cleanup = animate()
    return cleanup
  }, [mounted, animate])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
