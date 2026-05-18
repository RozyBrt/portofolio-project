export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'
import Navigation from '@/components/Navigation'
import ViewCounter from '@/components/widgets/ViewCounter'

import type { Database } from '@/types/database'
type Post = Database['public']['Tables']['posts']['Row']

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  const post = data as Post | null

  if (!post) {
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

  // Calculate reading time (roughly)
  const words = post.content.split(/\s+/).length
  const readTime = Math.ceil(words / 200)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6">
      <Navigation />
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 space-y-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Blog
          </Link>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.published_at || post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readTime} menit baca
              </span>
              <ViewCounter slug={slug} initialCount={initialViews} />
              {post.category && (
                <span className="px-3 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Tag size={12} />
                  {post.category}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-img:rounded-2xl whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content.replace(/\\n/g, '\n')}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                R
              </div>
              <div>
                <p className="font-bold">RozyBrt</p>
                <p className="text-slate-500 text-sm">Software Engineer & Tech Writer</p>
              </div>
            </div>
            
            <Link 
              href="/blog" 
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition-all text-sm font-medium"
            >
              Lihat Tulisan Lainnya
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
