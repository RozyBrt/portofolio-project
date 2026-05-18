'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import SpotifyWidget from './SpotifyWidget'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)


interface HomeContentProps {
  featuredProjects: {
    id: string
    slug: string
    title: string
    tagline: string
    status: 'live' | 'wip' | 'archived'
    repo_url?: string | null
    demo_url?: string | null
  }[]
}

export default function HomeContent({ featuredProjects }: HomeContentProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-24"
      >
        {/* Hero Section */}
        <section className="space-y-8">
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-blue-500 font-mono text-lg tracking-wider">
              ./hello_world
            </h2>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              Rozy<span className="text-blue-500">Brt</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-400 font-medium italic">
              Software Engineer & Creative Thinker.
            </p>
          </motion.div>
 
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
          >
            Fascinated by the art of clean code and minimalist design. Saya berdedikasi untuk membangun sistem web yang andal, berkinerja tinggi, dan ramah pengguna—memadukan presisi logika rekayasa perangkat lunak dengan pendekatan kreatif dalam memecahkan masalah.
          </motion.p>
 
          <motion.div variants={item} className="flex flex-wrap items-center gap-6">
            <Link
              href="/projects"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
            >
              Lihat Projek
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
 
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://github.com/RozyBrt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><GithubIcon size={24} /></a>
              <a href="https://x.com/rozi_berutu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><TwitterIcon size={24} /></a>
              <a href="https://www.linkedin.com/in/roziberutu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><LinkedinIcon size={24} /></a>
            </div>
          </motion.div>
        </section>
 
        {/* Spotify Section */}
        <motion.section variants={item} className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-px bg-emerald-500" />
            Vibes Saat Ini
          </h3>
          <SpotifyWidget />
        </motion.section>
 
        {/* Featured Projects Section */}
        <section className="space-y-12">
          <motion.div variants={item} className="flex justify-between items-end">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">Featured Works</h3>
              <p className="text-slate-500 italic text-sm md:text-base">Kumpulan projek terpilih yang merepresentasikan keahlian teknis dan eksplorasi teknologi.</p>
            </div>
            <Link
              href="/projects"
              className="text-blue-500 hover:text-blue-400 flex items-center gap-1 font-medium group"
            >
              Semua Projek
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
 
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </section>
 
        {/* Footer info */}
        <motion.footer
          variants={item}
          className="pt-20 border-t border-slate-900 text-slate-600 text-sm flex flex-col md:flex-row justify-between gap-4"
        >
          <p>© 2026 RozyBrt. Built with Next.js, Tailwind & Passion.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-end">
            <Link href="/projects" className="hover:text-slate-400 transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
            <Link href="/now" className="hover:text-slate-400 transition-colors">Now</Link>
            <Link href="/guestbook" className="hover:text-slate-400 transition-colors">Guestbook</Link>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  )
}
