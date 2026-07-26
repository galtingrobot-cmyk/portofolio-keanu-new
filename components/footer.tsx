'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Code2, Briefcase, Camera, Mail } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')

  const socialLinks = [
    { icon: Code2, href: 'https://github.com/Gotrings', label: 'GitHub' },
    { icon: Briefcase, href: 'https://www.linkedin.com/in/keanu-dustin-kemala/', label: 'LinkedIn' },
    { icon: Camera, href: 'https://www.instagram.com/captathings/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:keanudustin10@gmail.com', label: 'Email' },
  ]

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
    <footer id="footer" className="relative py-16 px-6 border-t border-white/10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-4">Keanu Dustin Kemala</h3>
            <p className="text-muted-foreground">Frontend Developer & UI/UX Designer</p>
            <p className="text-sm text-muted-foreground mt-2">{t('location')}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <p className="font-heading font-semibold">Quick Links</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#skills" className="hover:text-foreground transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="font-heading font-semibold">{t('follow')}</p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <p>&copy; {new Date().getFullYear()} Keanu Dustin Kemala. {t('allRights')}</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
