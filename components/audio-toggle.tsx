'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { audioEngine } from '@/lib/audio-engine'

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)

    // Subscribe to audio engine state
    const unsub = audioEngine.subscribe(() => {
      setIsPlaying(audioEngine.isPlaying)
    })

    // Show tooltip after 2s to nudge the user
    tooltipTimerRef.current = setTimeout(() => {
      setShowTooltip(true)
    }, 2000)

    // Auto-start on first user interaction anywhere on the page (except the toggle itself)
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      setShowTooltip(false)
      audioEngine.start().catch(() => {})
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('keydown', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      unsub()
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()

    // If this is the very first interaction, start audio
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowTooltip(false)
      await audioEngine.start().catch(() => {})
      return
    }

    await audioEngine.toggle()
  }, [hasInteracted])

  if (!mounted) return null

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      aria-label={isPlaying ? 'Mute ambient audio' : 'Play ambient audio'}
      title={isPlaying ? 'Mute' : 'Play ambient sound'}
    >
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-xl border border-white/10 dark:border-white/15 shadow-lg shadow-black/10 dark:shadow-black/30 hover:bg-white/10 dark:hover:bg-white/15 hover:border-white/20 dark:hover:border-white/25 transition-all duration-300 hover:scale-110 active:scale-95">

        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className={`w-5 h-5 ${!hasInteracted ? 'text-primary/60 animate-pulse' : 'text-muted-foreground'}`} />
        )}

        {/* Standby pulsing ring when waiting for first interaction */}
        {!hasInteracted && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2.5s' }} />
        )}

        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: '2s' }} />
        )}

        {/* Audio bars animation when playing */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 flex items-end gap-[2px] h-3">
            <span className="w-[3px] bg-primary rounded-full animate-bounce" style={{ animationDuration: '0.6s', height: '60%' }} />
            <span className="w-[3px] bg-primary rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.15s', height: '100%' }} />
            <span className="w-[3px] bg-primary rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.3s', height: '40%' }} />
          </div>
        )}
      </div>

      {/* Tooltip — appears after 2s or on hover */}
      <div
        className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 text-xs font-medium text-foreground/80 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg whitespace-nowrap transition-all duration-500 pointer-events-none
          ${showTooltip || !hasInteracted ? 'opacity-100 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        {isPlaying ? '🎵 Playing ambient audio' : '🎵 Click to enable ambient audio'}
      </div>
    </button>
  )
}
