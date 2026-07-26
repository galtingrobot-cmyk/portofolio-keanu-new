'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const [thumbHeight, setThumbHeight] = useState(20)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const updateHeight = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const percentage = windowHeight / documentHeight
      // Calculate thumb height between 5% and 100%
      setThumbHeight(Math.max(percentage * 100, 5))
    }

    const handleScroll = () => {
      setIsVisible(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsVisible(false)
      }, 1200) // Redup setelah 1.2 detik tidak scroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeight)
    
    // Call initially after a slight delay to ensure content is loaded
    setTimeout(updateHeight, 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeight)
      clearTimeout(timeout)
    }
  }, [])

  // Map scroll progress (0-1) to the top offset of the thumb
  const top = useTransform(scrollYProgress, [0, 1], ['0%', `${100 - thumbHeight}%`])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed right-1 top-1 bottom-1 w-[6px] z-50 pointer-events-none"
        >
          <motion.div
            style={{ 
              height: `${thumbHeight}%`, 
              top 
            }}
            className="absolute right-0 w-full bg-foreground/30 dark:bg-foreground/20 rounded-full backdrop-blur-sm"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
