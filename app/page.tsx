'use client'

import { useEffect, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { AnimatedBackground } from '@/components/animated-background'
import { AudioToggle } from '@/components/audio-toggle'
import en from '@/messages/en.json'
import id from '@/messages/id.json'

export default function Home() {
  const [locale, setLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem('locale') || 'en'
    setLocale(savedLocale)
  }, [])

  if (!mounted) return null

  const messages = locale === 'id' ? id : en

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScroll />
      <AnimatedBackground />
      <AudioToggle />
      <main className="relative z-10 w-full overflow-hidden">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </NextIntlClientProvider>
  )
}

