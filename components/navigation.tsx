'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'

export function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('projects'), href: '#projects' },
    { label: t('experience'), href: '#experience' },
    { label: t('contact'), href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const target = document.querySelector(href)
    if (!target) return

    // Use Lenis scrollTo if available via custom event, else fallback
    const lenisEvent = new CustomEvent('lenis:scrollTo', { detail: { target, offset: 0 } })
    const dispatched = window.dispatchEvent(lenisEvent)

    if (!dispatched) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/30 border-b border-white/10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { 
                opacity: 0, 
                transition: { 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  when: "afterChildren"
                } 
              },
              open: { 
                opacity: 1, 
                transition: { 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1] 
                } 
              }
            }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xl md:hidden pt-24 px-6 pb-6 flex flex-col items-center justify-center"
          >
            <motion.div
              variants={{
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
                open: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col items-center gap-8"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  variants={{
                    closed: { 
                      opacity: 0, 
                      y: 20, 
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
                    },
                    open: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
                    },
                  }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl font-heading font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
