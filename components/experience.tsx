'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Users,
  GraduationCap,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'

type CertificateItem = {
  name: string
  issuer: string
  location: string
  description: string
  skills: string[]
  link?: string
  images?: string[]
}

type ExperienceItem = {
  id: number
  title: string
  company: string
  period: string
  location: string
  description: string
  highlights: string[]
}

type EducationItem = {
  id: number
  degree: string
  school: string
  period: string
  location: string
  description: string
  skills: string[]
}

type ActivityItem = {
  id: number
  title: string
  organization: string
  period: string
  location: string
  description: string
  skills: string[]
}

// Unified shape so experience / education / activities can share one timeline renderer.
type LogEntry = {
  id: number
  title: string
  meta: string
  period: string
  location: string
  description: string
  skills: string[]
}

export function Experience() {
  const t = useTranslations('experience')
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certificates' | 'activities'>('experience')
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({})
  const carouselRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth >= 1024 ? 380 : window.innerWidth >= 768 ? window.innerWidth * 0.45 : window.innerWidth * 0.85
      const scrollAmount = (cardWidth + 24) * (direction === 'left' ? -1 : 1)
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: 'Mentee Coding Camp powered by DBS Foundation 2025',
      company: 'Dicoding & DBS Foundation',
      period: 'January 2025 - June 2025',
      location: 'Online',
      description: 'Participating in the Coding Camp program provided by Dicoding & DBS Foundation. Developing skills in Front-End and Back-End.',
      highlights: ['React', 'TypeScript', 'Node.js', 'Deployment', 'Tailwind CSS', 'Git', 'GitHub', 'Vite', 'Shadcn UI', 'Figma'],
    },
    {
      id: 2,
      title: 'Internship Backend Developer & Admin',
      company: 'PT Dharma Polimetal',
      period: 'January 2024 - March 2024',
      location: 'Cikarang Selatan, Kab.Bekasi, Indonesia',
      description: 'Developing an application using Laravel for the creation of a dashboard for tracking goods and responsible for creating QR codes for rack goods as well as truck tracking.',
      highlights: ['Laravel', 'Dashboard', 'QR Code', 'Tracking', 'Excel'],
    },
  ]

  const education: EducationItem[] = [
    {
      id: 1,
      degree: 'Teknologi Rekayasa Perangkat Lunak',
      school: 'Politeknik Meta Industri Cikarang',
      period: '2022 - Now',
      location: 'Cikarang Selatan, Kab.Bekasi, Indonesia',
      description: 'Software Engineering Technology',
      skills: ['Laravel', 'Basis Data', 'PHP', 'UI/UX Design', 'Web Development', 'Mobile App'],
    },
  ]

  const certificates: CertificateItem[] = [
    {
      name: 'Sertifikat Kelulusan dari Coding Camp 2025',
      issuer: 'Coding Camp powered by DBS Foundation',
      location: 'Online',
      description: 'Certificate of participation in Coding Camp supported by DBS Foundation 2025',
      skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git', 'Vite', 'Shadcn UI', 'Figma'],
      images: ['/images/certificates/coding-camp-1.jpg', '/images/certificates/coding-camp-2.jpg', '/images/certificates/coding-camp-3.jpg'],
    },
    {
      name: 'Magang Backend Developer',
      issuer: 'PT Dharma Polimetal',
      location: 'Di Tempat',
      description: 'Backend Developer Internship at PT Dharma Polimetal',
      skills: ['Laravel', 'Dashboard', 'QR Code', 'Excel'],
      images: ['/images/certificates/magang-1.jpg'],
    },
    {
      name: 'Kelas UI/UX Design',
      issuer: 'Yuksinibelajar Batch 1',
      location: 'Online',
      description: 'Comprehensive certification in UX design process, user research, and prototyping.',
      skills: ['UI Design', 'UX Research', 'Prototyping'],
      images: ['/images/certificates/uiux-1.jpg', '/images/certificates/uiux-2.jpg'],
    },
    {
      name: 'Sertifikat Bahasa Inggris dari TBI',
      issuer: 'TBI & Dicoding',
      location: 'Online',
      description: 'Learning English with B1 level',
      skills: ['English'],
      images: ['/images/certificates/english-certificate.jpg', '/images/certificates/standar-1.jpg'],
    },
    {
      name: 'Belajar Pengembangan Web Intermediate',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning front-end with HTML, CSS, and JavaScript',
      skills: ['HTML', 'CSS', 'JavaScript', 'Vite', 'Webpack'],
      link: 'https://dicoding.com/certificates/1OP8JY4DVPQK',
      images: ['/images/certificates/web-intermediate.jpg'],
    },
    {
      name: 'Belajar Fundamental Front-End Web Development',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning front-end with HTML, CSS, and JavaScript',
      skills: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://dicoding.com/certificates/MEPJQGRD4X3V',
      images: ['/images/certificates/frontend-fundamental.jpg'],
    },
    {
      name: 'Belajar Membuat Front End Web untuk Pemula',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning front-end with HTML, CSS, and JavaScript',
      skills: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://dicoding.com/certificates/MRZMNVM33PYQ',
      images: ['/images/certificates/frontend-pemula.jpg'],
    },
    {
      name: 'Belajar Back-End Pemula dengan JavaScript',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning back-end with JavaScript',
      skills: ['JavaScript', 'Node.js'],
      link: 'https://dicoding.com/certificates/JMZVE5WWNPN9',
      images: ['/images/certificates/backend-pemula.jpg'],
    },
    {
      name: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning web programming',
      skills: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://dicoding.com/certificates/N9ZO99J50XG5',
      images: ['/images/certificates/web-dasar.jpg'],
    },
    {
      name: 'Belajar Dasar Pemrograman JavaScript',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning JavaScript basics',
      skills: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://dicoding.com/certificates/53XEDM430PRN',
      images: ['/images/certificates/javascript-dasar.jpg'],
    },
    {
      name: 'Belajar Dasar Git dengan GitHub',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning how to use Git and GitHub',
      skills: ['Git', 'GitHub'],
      link: 'https://dicoding.com/certificates/N9ZO954Q6XG5',
      images: ['/images/certificates/git-github.jpg'],
    },
    {
      name: 'Memulai Dasar Pemrograman Untuk Menjadi Pengembang Software',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Starting basic programming for software developers',
      skills: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://dicoding.com/certificates/MRZMNQ00LPYQ',
      images: ['/images/certificates/dasar-pemrograman.jpg'],
    },
    {
      name: 'Pengenalan ke Logika Pemrograman',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning programming logic',
      skills: ['Logic', 'Programming'],
      link: 'https://dicoding.com/certificates/53XED4Q7VPRN',
      images: ['/images/certificates/logika-pemrograman.jpg'],
    },
    {
      name: 'Financial Literacy',
      issuer: 'Dicoding',
      location: 'Online',
      description: 'Learning financial literacy',
      skills: ['Financial', 'Literacy'],
      link: 'https://dicoding.com/certificates/98XWE1784XM3',
      images: ['/images/certificates/financial-literacy.jpg'],
    },
  ]

  const activities: ActivityItem[] = [
    {
      id: 1,
      title: 'Workshop UI/UX Design di Himpunan TRPL',
      organization: 'Politeknik Meta Industri Cikarang',
      period: 'July 2025 - August 2025',
      location: 'Cikarang Selatan, Kab.Bekasi, Indonesia',
      description: 'Teaching workshop on design thinking and user research for participants at TRPL Community and learning how to make LinkedIn.',
      skills: ['Teaching', 'Public Speaking', 'Design Thinking', 'User Research', 'Figma', 'LinkedIn'],
    },
  ]

  // Normalize the three timeline-shaped datasets into one shared entry type.
  const logEntries: Record<'experience' | 'education' | 'activities', LogEntry[]> = {
    experience: experiences.map((e) => ({
      id: e.id,
      title: e.title,
      meta: e.company,
      period: e.period,
      location: e.location,
      description: e.description,
      skills: e.highlights,
    })),
    education: education.map((e) => ({
      id: e.id,
      title: e.degree,
      meta: e.school,
      period: e.period,
      location: e.location,
      description: e.description,
      skills: e.skills,
    })),
    activities: activities.map((a) => ({
      id: a.id,
      title: a.title,
      meta: a.organization,
      period: a.period,
      location: a.location,
      description: a.description,
      skills: a.skills,
    })),
  }

  const tabs = [
    { key: 'experience' as const, file: 'experience.log', label: 'Work Experience', icon: Briefcase },
    { key: 'education' as const, file: 'education.log', label: 'Education', icon: GraduationCap },
    { key: 'certificates' as const, file: 'certificates.log', label: 'Certificates', icon: Award },
    { key: 'activities' as const, file: 'activities.log', label: 'Activities', icon: Users },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
  }

  const toggleSkills = (key: string) => {
    setExpandedSkills((prev) => ({ ...prev, [key]: !prev[key] }))
  }



  return (
    <section id="experience" className="relative min-h-[100dvh] pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="shrink-0 mb-8"
        >
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ cat journey.log</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">{t('title')}</h2>
        </motion.div>

        {/* Editor-style tab bar */}
        <div className="flex items-end gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-mono text-xs whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive 
                    ? 'bg-black/5 dark:bg-white/5 text-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                <Icon className="w-3.5 h-3.5 opacity-70" />
                {tab.file}
                {isActive && (
                  <motion.span
                    layoutId="active-tab-underline"
                    className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div className="border border-black/10 dark:border-white/10 rounded-b-2xl rounded-tr-2xl bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-6 md:p-8 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
              {(activeTab === 'experience' || activeTab === 'education' || activeTab === 'activities') && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {logEntries[activeTab].map((entry, index) => {
                    const isLast = index === logEntries[activeTab].length - 1
                    const skillsKey = `${activeTab}-${entry.id}`
                    const expanded = expandedSkills[skillsKey]
                    const visibleSkills = expanded ? entry.skills : entry.skills.slice(0, 5)
                    return (
                      <motion.div key={entry.id} variants={itemVariants} className="grid grid-cols-[20px_1fr] gap-4">
                        {/* rail */}
                        <div className="flex flex-col items-center">
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-primary ring-[3px] ring-primary/20"
                          />
                          {!isLast && <span className="w-px flex-1 bg-black/10 dark:bg-white/10 mt-2" />}
                        </div>

                        {/* content */}
                        <div className={isLast ? 'pb-2' : 'pb-9'}>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className="font-mono text-[11px] px-2 py-0.5 rounded border text-primary border-primary/40 bg-primary/10"
                            >
                              v{index + 1}.0
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" /> {entry.period}
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" /> {entry.location}
                            </span>
                          </div>

                          <h4 className="text-lg md:text-xl font-semibold text-foreground/90 mb-1">{entry.title}</h4>
                          <p className="text-sm font-medium mb-3 text-primary">
                            {entry.meta}
                          </p>
                          <p className="text-foreground/70 leading-relaxed mb-4 max-w-2xl">{entry.description}</p>

                          <div className="flex flex-wrap gap-1.5 items-center">
                            {visibleSkills.map((skill, idx) => (
                              <span key={idx} className="font-mono text-[11px] px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/60">
                                {skill}
                              </span>
                            ))}
                            {entry.skills.length > 5 && (
                              <button
                                onClick={() => toggleSkills(skillsKey)}
                                className="font-mono text-[11px] px-2 py-1 rounded transition-colors text-primary hover:text-primary/70"
                              >
                                {expanded ? 'show less' : `+${entry.skills.length - 5} more`}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* Certificates */}
              {activeTab === 'certificates' && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative -mx-6 md:-mx-8">
                  {/* Left fade edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-10" />
                  {/* Right fade edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10" />

                  <div
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-4 pb-3 px-6 md:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => {
                      const el = e.currentTarget
                      const startX = e.pageX - el.offsetLeft
                      const scrollLeft = el.scrollLeft
                      isDraggingRef.current = false // Reset drag state on touch start

                      const onMove = (ev: MouseEvent) => {
                        const x = ev.pageX - el.offsetLeft
                        // Set dragging flag if moved more than 5 pixels
                        if (Math.abs(x - startX) > 5) {
                          isDraggingRef.current = true
                        }
                        el.scrollLeft = scrollLeft - (x - startX)
                      }
                      const onUp = () => {
                        document.removeEventListener('mousemove', onMove)
                        document.removeEventListener('mouseup', onUp)
                      }
                      document.addEventListener('mousemove', onMove)
                      document.addEventListener('mouseup', onUp)
                    }}
                  >
                    {certificates.map((cert, index) => {
                      const mainImage = cert.images && cert.images.length > 0 ? cert.images[0] : null
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="flex-none w-[260px] md:w-[300px] group cursor-pointer"
                          onClick={(e) => {
                            // If the user was dragging, don't open the image
                            if (isDraggingRef.current) {
                              e.preventDefault()
                              return
                            }
                            if (cert.images && cert.images.length > 0) {
                              setLightboxImages(cert.images)
                              setCurrentImageIndex(0)
                            }
                          }}
                        >
                          {/* Image area */}
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-black/8 dark:border-white/8 bg-black/5 dark:bg-white/5 shadow-md group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500 group-hover:-translate-y-1.5">
                            {mainImage && (
                              <>
                                <Image
                                  src={mainImage}
                                  alt={cert.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                  sizes="(max-width: 768px) 260px, 300px"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3">
                                      <ExternalLink className="w-4 h-4 text-white" />
                                    </div>
                                  </div>
                                </div>
                                {/* CERT badge */}
                                <span className="absolute top-2.5 left-2.5 font-mono text-[9px] px-1.5 py-0.5 rounded border backdrop-blur-md text-primary border-primary/40 bg-background/75 dark:bg-black/65">
                                  CERT · {String(index + 1).padStart(2, '0')}
                                </span>
                                {/* Multi-image indicator */}
                                {cert.images && cert.images.length > 1 && (
                                  <div className="absolute bottom-2.5 right-2.5 bg-black/55 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded font-mono border border-white/10">
                                    +{cert.images.length - 1}
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          {/* Text content — compact, below image */}
                          <h4 className="text-sm font-semibold text-foreground/90 leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">{cert.name}</h4>
                          <p className="text-[11px] flex items-center gap-1 text-primary/80 mb-1.5">
                            <Award className="w-3 h-3 shrink-0" /> {cert.issuer}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.slice(0, 2).map((skill, idx) => (
                              <span key={idx} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-foreground/50">
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 2 && (
                              <span className="font-mono text-[9px] text-foreground/35 px-1 py-0.5">+{cert.skills.length - 2}</span>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                    {/* Trailing spacer so last card isn't hidden under fade */}
                    <div className="flex-none w-4 md:w-8 shrink-0" />
                  </div>

                  {/* Scroll hint dots */}
                  <p className="text-center text-[10px] text-foreground/30 font-mono mt-2 pb-1">
                    ← drag to scroll →
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImages && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImages(null)}
          >
            <button
              onClick={() => setLightboxImages(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-white/20 rounded-full p-2.5 transition-all z-[110]"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))
                  }}
                  className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-white/20 rounded-full p-3 transition-all z-[110]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))
                  }}
                  className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-white/20 rounded-full p-3 transition-all z-[110]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={currentImageIndex}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[85vh] flex-1 flex items-center justify-center">
                <Image
                  src={lightboxImages[currentImageIndex]}
                  alt={`Certificate view ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </div>
              
              {lightboxImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full text-white/90 font-mono text-sm border border-black/10 dark:border-white/10 flex items-center gap-2 shadow-2xl">
                  <span>{String(currentImageIndex + 1).padStart(2, '0')}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">{String(lightboxImages.length).padStart(2, '0')}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
