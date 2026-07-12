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

    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
    document.documentElement.style.setProperty('--r', `${endRadius}px`)

    document.startViewTransition(() => {
      setIsDark(newIsDark)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newIsDark)
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
