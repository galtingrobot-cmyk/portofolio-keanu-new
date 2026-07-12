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
import { SlowmoToggle } from '@/components/slowmo-toggle'
import { WaterToggle } from '@/components/water-toggle'
import en from '@/messages/en.json'
import id from '@/messages/id.json'

export default function Home() {
  const [locale, setLocale] = useState('en')
  const [mounted, setMounted] = useState(false)
  const [isSlowMo, setIsSlowMo] = useState(false)
  const [isWaterEnabled, setIsWaterEnabled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem('locale') || 'en'
    setLocale(savedLocale)
  }, [])

  const handleToggleSlowMo = () => {
    setIsSlowMo(!isSlowMo)
  }

  const handleToggleWater = () => {
    setIsWaterEnabled(!isWaterEnabled)
  }

  if (!mounted) return null

  const messages = locale === 'id' ? id : en

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScroll />
      <AnimatedBackground isSlowMo={isSlowMo} isWaterEnabled={isWaterEnabled} />
      <AudioToggle />
      <SlowmoToggle isSlowMo={isSlowMo} onToggle={handleToggleSlowMo} />
      <WaterToggle isWaterEnabled={isWaterEnabled} onToggle={handleToggleWater} />
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


