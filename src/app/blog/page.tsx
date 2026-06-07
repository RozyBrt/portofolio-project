export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']

export default async function BlogPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    
  const posts = data as Post[] | null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6 relative overflow-hidden">
      <Navigation />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <header className="mb-16 space-y-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Catatan <span className="text-blue-500">Koding</span> & Gagasan
          </h1>
          <p className="text-slate-400 text-lg">
            Catatan teknis, dokumentasi koding, dan gagasan seputar arsitektur perangkat lunak serta rekayasa teknologi.
          </p>
        </header>

        {error ? (
          <div className="p-8 bg-red-950/20 border border-red-500/30 rounded-2xl text-red-400">
            Gagal mengambil data blog. Pastikan tabel 'posts' sudah dibuat di Supabase.
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="group relative">
                <Link href={`/blog/${post.slug}`} className="block p-6 bg-slate-900/30 border border-slate-800 rounded-2xl hover:bg-slate-900/50 hover:border-blue-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h2 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.published_at || post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {post.category && (
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Tag size={12} />
                        {post.category}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt || post.content.replace(/[#*`]/g, '').substring(0, 160) + '...'}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 text-xl italic">Belum ada tulisan bray. Mari menyeduh kopi dan mulai menulis.</p>
          </div>
        )}
      </div>
    </div>
  )
}
