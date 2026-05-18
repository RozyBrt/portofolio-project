'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'
import Link from 'next/link'

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


interface ProjectCardProps {
  project: {
    id: string
    slug: string
    title: string
    tagline: string
    status: 'live' | 'wip' | 'archived'
    repo_url?: string | null
    demo_url?: string | null
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all shadow-xl flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          <Code2 size={24} />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
          project.status === 'live' 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : project.status === 'wip'
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
        }`}>
          {project.status}
        </span>
      </div>

      <Link href={`/projects/${project.slug}`} className="block mb-2">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
      </Link>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">
        {project.tagline}
      </p>

      <div className="flex items-center gap-4 mt-auto relative z-10">
        {project.repo_url && (
          <a 
            href={project.repo_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-200 transition-colors"
            title="Repository"
          >
            <GithubIcon size={20} />
          </a>
        )}
        {project.demo_url && (
          <a 
            href={project.demo_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-200 transition-colors"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </motion.div>
  )
}
