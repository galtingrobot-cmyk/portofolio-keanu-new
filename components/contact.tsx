'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Mail, Terminal } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

// Simple SVG icon components for social platforms
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
)

export function Contact() {
  const t = useTranslations('contact')

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'keanudustin10@gmail.com', href: 'mailto:keanudustin10@gmail.com' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: '+62 812 2991 7466', href: 'https://wa.me/6281229917466' },
  ]

  const socialLinks = [
    { icon: GithubIcon, name: 'GitHub 1st', url: 'https://github.com/Gotrings', color: 'hover:border-gray-400 hover:text-gray-300' },
    { icon: GithubIcon, name: 'GitHub 2nd', url: 'https://github.com/galtingrobot-cmyk', color: 'hover:border-gray-400 hover:text-gray-300' },
    { icon: YoutubeIcon, name: 'YouTube', url: 'https://www.youtube.com/@CreativityBot', color: 'hover:border-red-400 hover:text-red-400' },
    { icon: LinkedinIcon, name: 'LinkedIn', url: 'https://www.linkedin.com/in/keanu-dustin-kemala/', color: 'hover:border-blue-400 hover:text-blue-400' },
    { icon: InstagramIcon, name: 'Instagram', url: 'https://www.instagram.com/captathings/', color: 'hover:border-pink-400 hover:text-pink-400' },
  ]

  return (
    <section id="contact" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ ping contact</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-3">{t('title')}</h2>
          <p className="text-base font-mono text-primary max-w-2xl mx-auto">
            I&apos;m always open to interesting projects and collaboration opportunities ✋
          </p>
        </motion.div>

        <div className="border border-black/10 dark:border-white/10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-2xl h-full flex flex-col min-w-0"
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-6">Contact Information</h3>
              <div className="space-y-4 flex-grow">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  const Wrapper = info.href ? 'a' : 'div'
                  const wrapperProps = info.href ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: info.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {}
                  return (
                    <Wrapper
                      key={idx}
                      {...wrapperProps}
                      className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-black/5 dark:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all group cursor-pointer min-w-0 w-full"
                    >
                      <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all flex-shrink-0">
                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="min-w-0 flex flex-col justify-center pt-0.5 w-full">
                        <p className="text-xs md:text-sm font-mono text-muted-foreground mb-0.5">{info.label}</p>
                        <p className="text-sm md:text-base font-medium text-foreground/90 break-all">{info.value}</p>
                      </div>
                    </Wrapper>
                  )
                })}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-2xl h-full flex flex-col min-w-0"
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-6">Social Media</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4 flex-grow">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-black/10 dark:hover:bg-white/10 ${social.color} min-w-0`}
                    >
                      <div className="transform transition-transform duration-300 group-hover:scale-110">
                        <Icon />
                      </div>
                      <span className="text-xs md:text-sm font-mono font-medium truncate w-full text-center">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
