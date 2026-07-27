'use client'

import { useEffect, useState } from 'react'
import { Waves } from 'lucide-react'

interface WaterToggleProps {
  isWaterEnabled: boolean
  onToggle: () => void
}

export function WaterToggle({ isWaterEnabled, onToggle }: WaterToggleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={onToggle}
      className="relative group cursor-pointer"
      aria-label={isWaterEnabled ? 'Disable water ripples' : 'Enable water ripples'}
      title={isWaterEnabled ? 'Disable Water Effect' : 'Enable Water Effect'}
    >
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-xl border border-white/10 dark:border-white/15 shadow-lg shadow-black/10 dark:shadow-black/30 hover:bg-white/10 dark:hover:bg-white/15 hover:border-white/20 dark:hover:border-white/25 transition-all duration-300 hover:scale-110 active:scale-95">
        <Waves className={`w-5 h-5 transition-colors duration-300 ${isWaterEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
        
        {/* Pulsing indicator when water effect is active */}
        {isWaterEnabled && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
        )}
      </div>
    </button>
  )
}
