'use client'

import { useTranslations } from 'next-intl'
import { motion, Variants } from 'framer-motion'
import { Terminal } from 'lucide-react'
import Image from 'next/image'

export function About() {
  const t = useTranslations('about')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="border border-black/10 dark:border-white/10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ whoami</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6 order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">{t('title')}</h2>
              <p className="text-lg text-primary font-mono leading-relaxed">{t('subtitle')}</p>
            <p className="text-foreground/90 leading-relaxed text-lg">{t('bio')}</p>
            <p className="text-foreground/80 leading-relaxed">{t('focus')}</p>
            <p className="text-muted-foreground italic">{t('availability')}</p>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Aurora ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-blue-400 to-purple-500 animate-spin-slow opacity-60 blur-sm" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-400 to-purple-500 p-[3px]">
                <div className="w-full h-full rounded-full bg-background p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/images/profile/keanu.png"
                      alt="Keanu Dustin Kemala"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    />
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
