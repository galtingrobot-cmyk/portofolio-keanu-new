'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    const newIsDark = !isDark

    // Fallback if browser doesn't support View Transitions
    if (!document.startViewTransition) {
      setIsDark(newIsDark)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newIsDark)
      return
    }

    // Pastikan titik animasi berasal persis dari tengah-tengah ikon tombol
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      setIsDark(newIsDark)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newIsDark)
    })

    transition.ready.then(() => {
      const isDesktop = window.innerWidth >= 768

      // Animate the new view (Ripple + optional Blur for desktop)
      document.documentElement.animate(
        isDesktop
          ? [
              { clipPath: `circle(0px at ${x}px ${y}px)`, filter: 'blur(15px)' },
              { clipPath: `circle(${endRadius * 0.1}px at ${x}px ${y}px)`, filter: 'blur(10px)', offset: 0.35 },
              { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, filter: 'blur(0px)', offset: 0.85 },
              { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, filter: 'blur(0px)' },
            ]
          : [
              { clipPath: `circle(0px at ${x}px ${y}px)` },
              { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
            ],
        {
          duration: 900,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )

      // Animate the old view fading (override with Blur for desktop)
      if (isDesktop) {
        document.documentElement.animate(
          [
            { filter: 'blur(0px)', opacity: 1 },
            { filter: 'blur(4px)', opacity: 0.95, offset: 0.3 },
            { filter: 'blur(15px)', opacity: 0, offset: 0.85 },
            { filter: 'blur(15px)', opacity: 0 },
          ],
          {
            duration: 900,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-old(root)',
          }
        )
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-lg transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  )
}
