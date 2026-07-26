'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
export function Footer() {
  const t = useTranslations('footer')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer id="footer" className="relative py-8 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center text-sm text-muted-foreground text-center"
        >
          <p>&copy; {new Date().getFullYear()} Keanu Dustin Kemala. {t('allRights')}</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
