'use client'

import { useTranslations } from 'next-intl'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { ExternalLink, Terminal } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Projects() {
  const t = useTranslations('projects')
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedProjects, setExpandedProjects] = useState<number[]>([])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const projects = [
    {
      id: 6,
      title: 'Kopi Mood',
      description: 'Aplikasi kedai kopi dengan AI Barista dan sistem pemesanan modern.',
      category: 'web',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'N8N', 'Supabase', 'Docker'],
      image: '/images/projects/cafe-mood-ai.png',
      link: 'https://cafe-mood-ai.vercel.app/',
    },
    {
      id: 7,
      title: 'Glockwerk CNC',
      description: 'Company profile perusahaan CNC Machining dengan desain premium.',
      category: 'web',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      image: '/images/projects/glockwerk.png',
      link: 'https://glockwerk-cnc.vercel.app/',
    },
    {
      id: 1,
      title: 'NutriEdu',
      description: 'Deteksi status gizi anak dengan edukasi dan panduan gizi seimbang.',
      category: 'web',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Leaflet.js', 'Vite'],
      image: '/images/projects/nutriedu.png',
      link: 'https://capstone-dicoding-nutriedu.vercel.app/',
    },
    {
      id: 2,
      title: 'HIMTECH',
      description: 'Website profil himpunan teknologi rekayasa perangkat lunak.',
      category: 'web',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Shadcn UI'],
      image: '/images/projects/himtech.png',
      link: 'https://himtech-2026.vercel.app/',
    },
    {
      id: 3,
      title: 'Prototype Profile Cafe',
      description: 'Prototype UI/UX profil cafe yang modern dan responsif.',
      category: 'uiux',
      tech: ['Figma', 'Photoshop', 'Canva'],
      image: '/images/projects/cafe.png',
      link: 'https://www.figma.com/design/NvCiLbyPLEGo692FBsupSv/Cafe-Apps?node-id=1102-2&t=MbOImQPt5SRzLEci-1',
    },
    {
      id: 4,
      title: 'Politeknik Meta Apps Mobile',
      description: 'Prototype aplikasi LMS Politeknik Meta untuk perangkat seluler.',
      category: 'uiux',
      tech: ['Figma', 'Photoshop', 'Canva'],
      image: '/images/projects/politeknik.png',
      link: 'https://www.figma.com/design/rkSXZXEtDOUOUarNBuBqhT/Politeknik-Meta?node-id=5-2509&t=zhC4TSiNsT8uuJDu-1',
    },
    {
      id: 5,
      title: 'Prototype Cinefusion',
      description: 'Prototype aplikasi streaming film dengan tampilan sinematik.',
      category: 'uiux',
      tech: ['Figma', 'Photoshop', 'Canva'],
      image: '/images/projects/cinefusion.png',
      link: 'https://www.figma.com/design/Hoa5UkBI2sgoUnwWJ1ODK0/Cinefusion?node-id=2-2&t=KMFwsFMnRUMSYTtT-1',
    },
  ]

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web Development' },
    { key: 'uiux', label: 'UI/UX Design' },
  ]

  const filteredProjects = projects.filter(p =>
    activeFilter === 'all' || p.category === activeFilter
  )

  return (
    <section id="projects" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ ls ./projects</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">{t('title')}</h2>
          <p className="text-lg text-primary font-mono mb-8">Showcasing my best work in frontend development and UI/UX design.</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-end gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-mono text-xs whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive 
                    ? 'bg-black/5 dark:bg-white/5 text-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                {filter.key === 'all' ? 'all.sh' : filter.key === 'web' ? 'web.tsx' : 'uiux.fig'}
                {isActive && (
                  <motion.span
                    layoutId="project-tab-underline"
                    className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div className="border border-black/10 dark:border-white/10 rounded-b-2xl rounded-tr-2xl bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-6 md:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative overflow-hidden border border-black/10 dark:border-white/10 rounded-3xl bg-black/5 dark:bg-white/5 backdrop-blur-md hover:border-black/20 dark:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer group"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0" aria-label={`View ${project.title}`}></a>
                {/* Project Image */}
                <div className="relative h-36 bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%] flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/20 dark:bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 items-center relative z-10">
                    {(expandedProjects.includes(project.id) ? project.tech : project.tech.slice(0, 3)).map((tech, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {!expandedProjects.includes(project.id) && project.tech.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedProjects([...expandedProjects, project.id]);
                        }}
                        className="font-mono text-[10px] text-primary/70 px-1.5 py-1 hover:text-primary transition-colors cursor-pointer"
                      >
                        +{project.tech.length - 3} more
                      </button>
                    )}
                    {expandedProjects.includes(project.id) && project.tech.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedProjects(expandedProjects.filter(id => id !== project.id));
                        }}
                        className="font-mono text-[10px] text-primary/70 px-1.5 py-1 hover:text-primary transition-colors cursor-pointer"
                      >
                        - less
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
