'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.055,
      wheelMultiplier: 0.8,
      gestureOrientation: 'vertical',
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Listen for nav click events and use lenis.scrollTo
    const handleScrollTo = (e: Event) => {
      const { target, offset } = (e as CustomEvent).detail
      if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { offset: offset ?? 0, duration: 1.8 })
      }
    }

    window.addEventListener('lenis:scrollTo', handleScrollTo)

    return () => {
      window.removeEventListener('lenis:scrollTo', handleScrollTo)
      lenis.destroy()
    }
  }, [])

  return null
}
