export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']
import Navigation from '@/components/Navigation'
import ViewCounter from '@/components/widgets/ViewCounter'
import Image from 'next/image'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
    
  const project = data as Project | null

  if (!project) {
    notFound()
  }

  // Fetch initial view count
  const { data: viewDataRaw } = await supabase
    .from('page_views')
    .select('count')
    .eq('slug', slug)
    .single()
    
  const viewData = viewDataRaw as { count: number } | null
    
  const initialViews = viewData?.count || 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6">
      <Navigation />
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-12 space-y-6">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Projek
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                  project.status === 'live' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : project.status === 'wip'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                }`}>
                  {project.status}
                </span>
                <ViewCounter slug={slug} initialCount={initialViews} />
              </div>

              <div className="flex items-center gap-4">
                {project.repo_url && (
                  <a 
                    href={project.repo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:border-slate-700 transition-all text-sm font-medium"
                  >
                    Repository
                  </a>
                )}
                {project.demo_url && (
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all text-sm font-bold flex items-center gap-2"
                  >
                    Live Demo
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-slate-400">
              {project.tagline}
            </p>
          </div>
        </header>

        {project.cover_url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-slate-800 shadow-2xl">
            <Image 
              src={project.cover_url} 
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-p:leading-relaxed">
          {project.description ? (
            <div dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }} />
          ) : (
            <p className="text-slate-500 italic">No detailed description available for this project yet.</p>
          )}
        </div>
      </article>
    </div>
  )
}
