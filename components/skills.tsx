'use client'

import { useTranslations } from 'next-intl'
import { motion, Variants } from 'framer-motion'
import { Code2, Palette, Wrench, Terminal } from 'lucide-react'
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiVercel, SiN8N, SiSupabase } from 'react-icons/si'
import { FaReact, FaFigma, FaGitAlt, FaUniversalAccess, FaDocker, FaRobot } from 'react-icons/fa6'
import { MdDevices, MdSpeed } from 'react-icons/md'
import { TbBrandVscode, TbUserSearch } from 'react-icons/tb'
import { RxComponentInstance } from 'react-icons/rx'

export function Skills() {
  const t = useTranslations('skills')

  const skillCategories = [
    {
      icon: Code2,
      title: t('frontend'),
      tools: [
        { name: 'React', icon: FaReact, color: 'text-[#61DAFB]' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-foreground' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
        { name: 'Framer Motion', icon: SiFramer, color: 'text-[#0055FF] dark:text-[#E2E2E2]' },
      ],
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Palette,
      title: t('design'),
      tools: [
        { name: 'Figma', icon: FaFigma, color: 'text-[#F24E1E]' },
        { name: 'Responsive', icon: MdDevices, color: 'text-foreground/80' },
        { name: 'Design Systems', icon: RxComponentInstance, color: 'text-purple-500 dark:text-purple-400' },
        { name: 'User Research', icon: TbUserSearch, color: 'text-blue-500 dark:text-blue-400' },
      ],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: Wrench,
      title: t('tools'),
      tools: [
        { name: 'Git', icon: FaGitAlt, color: 'text-[#F05032]' },
        { name: 'VS Code', icon: TbBrandVscode, color: 'text-[#007ACC]' },
        { name: 'Vercel', icon: SiVercel, color: 'text-foreground' },
        { name: 'Performance', icon: MdSpeed, color: 'text-green-600 dark:text-green-500' },
        { name: 'Accessibility', icon: FaUniversalAccess, color: 'text-blue-600 dark:text-blue-400' },
        { name: 'Antigravity', icon: FaRobot, color: 'text-violet-500 dark:text-violet-400' },
        { name: 'Docker', icon: FaDocker, color: 'text-[#2496ED]' },
        { name: 'n8n', icon: SiN8N, color: 'text-[#EA4B71]' },
        { name: 'Supabase', icon: SiSupabase, color: 'text-[#3ECF8E]' },
      ],
      color: 'from-amber-500/20 to-orange-500/20',
    },
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="skills" className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-foreground/40">
            <Terminal className="w-3.5 h-3.5" />
            <span>~/portfolio $ cat skills.json</span>
            <span className="inline-block w-[7px] h-3.5 bg-foreground/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">{t('title')}</h2>
        </motion.div>

        {/* Panel */}
        <div className="border border-black/10 dark:border-white/10 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-6 md:p-8">
          <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden p-6 xl:p-8 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20 transition-all duration-300 group shadow-xl shadow-black/5 dark:shadow-black/20 flex flex-col h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="mb-6">
                    <Icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform origin-left" />
                    <h3 className="text-xl font-heading font-semibold">{category.title}</h3>
                  </div>
                  
                  {/* Tools Grid */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {category.tools.map((tool, i) => {
                      const ToolIcon = tool.icon;
                      return (
                        <div 
                          key={i} 
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-default group/tool"
                          title={tool.name}
                        >
                          <ToolIcon className={`w-4 h-4 ${tool.color} drop-shadow-sm group-hover/tool:scale-110 transition-transform`} />
                          <span className="text-xs font-mono font-medium text-foreground/70 group-hover/tool:text-foreground transition-colors">{tool.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
