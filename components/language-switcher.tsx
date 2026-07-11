'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useCallback } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()

  const switchLanguage = useCallback((newLocale: string) => {
    if (locale === newLocale) return
    localStorage.setItem('locale', newLocale)
    window.location.reload()
  }, [locale])

  const isEnglish = locale === 'en'

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted/30 p-1 border border-border/30">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
          isEnglish
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('id')}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
          !isEnglish
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ID
      </motion.button>
    </div>
  )
}
