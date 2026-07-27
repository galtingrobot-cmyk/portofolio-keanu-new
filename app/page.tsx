'use client'

import { useEffect, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import dynamic from 'next/dynamic'

// Lazy load heavy components and components below the fold
const About = dynamic(() => import('@/components/about').then(mod => mod.About))
const Skills = dynamic(() => import('@/components/skills').then(mod => mod.Skills))
const Projects = dynamic(() => import('@/components/projects').then(mod => mod.Projects))
const Experience = dynamic(() => import('@/components/experience').then(mod => mod.Experience))
const Contact = dynamic(() => import('@/components/contact').then(mod => mod.Contact))
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer))

// Lazy load decorative and interactive background elements (saves initial JS execution)
const AnimatedBackground = dynamic(() => import('@/components/animated-background').then(mod => mod.AnimatedBackground), { ssr: false })
const AudioToggle = dynamic(() => import('@/components/audio-toggle').then(mod => mod.AudioToggle), { ssr: false })
const SlowmoToggle = dynamic(() => import('@/components/slowmo-toggle').then(mod => mod.SlowmoToggle), { ssr: false })
const WaterToggle = dynamic(() => import('@/components/water-toggle').then(mod => mod.WaterToggle), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll').then(mod => mod.SmoothScroll), { ssr: false })
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
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 gap-4 items-center">
        <WaterToggle isWaterEnabled={isWaterEnabled} onToggle={handleToggleWater} />
        <SlowmoToggle isSlowMo={isSlowMo} onToggle={handleToggleSlowMo} />
        <AudioToggle />
      </div>
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


