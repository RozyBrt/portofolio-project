export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import ProjectCard from '@/components/ProjectCard'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    
  const projects = data as Project[] | null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6 relative overflow-hidden">
      <Navigation />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <header className="mb-12 space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Selected Projects
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            A collection of things I've built, ranging from web applications to experimental experiments.
          </p>
        </header>

        {error ? (
          <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl text-red-400">
            Error fetching projects. Please try again later.
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 text-xl">No projects found in the database yet.</p>
            <p className="text-slate-600 mt-2">Time to add some amazing work to your Supabase dashboard!</p>
          </div>
        )}
      </div>
    </div>
  )
}
