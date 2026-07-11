'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, Code2, Palette, Terminal } from 'lucide-react'
import { Button } from './ui/button'

export function Hero() {
  const t = useTranslations('hero')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative min-h-[100dvh] pt-20 pb-8 flex flex-col justify-center items-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-[-2rem]">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ ./start.sh</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/20 backdrop-blur-md font-mono text-xs text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>[status: OK] ready_for_work</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-extrabold tracking-tight mb-4 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/90 to-foreground/40">
              {t('name')}
            </span>
          </h1>
        </motion.div>

        {/* Roles/Tags */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/80 font-mono text-xs">
            <Code2 className="w-3.5 h-3.5 text-[#FFB454]" />
            <span>--role=&quot;Frontend Developer&quot;</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/80 font-mono text-xs">
            <Palette className="w-3.5 h-3.5 text-[#5CCFE6]" />
            <span>--role=&quot;UI/UX Designer&quot;</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto font-light"
        >
          {t('description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            size="lg" 
            className="group relative overflow-hidden rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300 h-12 px-6 text-sm font-semibold shadow-lg shadow-primary/30"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative flex items-center gap-2">
              {t('viewWork')}
              <Sparkles className="w-4 h-4" />
            </span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-border/50 bg-background/30 backdrop-blur-md hover:bg-black/10 dark:bg-white/10 hover:border-black/20 dark:border-white/20 hover:text-foreground transition-all duration-300 h-12 px-6 text-sm font-medium"
          >
            {t('learnMore')}
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-3 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">{t('scrollExplore')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
