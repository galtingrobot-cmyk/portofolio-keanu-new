'use client'

import { useEffect, useState, useCallback } from 'react'
import { Gauge } from 'lucide-react'

interface SlowmoToggleProps {
  isSlowMo: boolean
  onToggle: () => void
}

export function SlowmoToggle({ isSlowMo, onToggle }: SlowmoToggleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 z-50 group cursor-pointer"
      style={{ right: '80px' }}
      aria-label={isSlowMo ? 'Disable slow motion' : 'Enable slow motion'}
      title={isSlowMo ? 'Normal Speed' : 'Slow Motion'}
    >
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-xl border border-white/10 dark:border-white/15 shadow-lg shadow-black/10 dark:shadow-black/30 hover:bg-white/10 dark:hover:bg-white/15 hover:border-white/20 dark:hover:border-white/25 transition-all duration-300 hover:scale-110 active:scale-95">
        <Gauge className={`w-5 h-5 transition-colors duration-300 ${isSlowMo ? 'text-primary' : 'text-muted-foreground'}`} />
        
        {/* Pulsing indicator when slowmo is active */}
        {isSlowMo && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
        )}
      </div>
    </button>
  )
}
