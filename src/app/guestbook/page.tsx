export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { ArrowLeft, BookOpen } from 'lucide-react'
import GuestbookClient from './GuestbookClient'

export const metadata = {
  title: 'Guestbook | RozyBrt',
  description: 'Tinggalkan jejak, pesan, atau sekadar sapaan di buku tamu ini.',
}

export default async function GuestbookPage() {
  const supabase = await createClient()
  
  // Fetch initial messages, newest first
  const { data: initialEntries, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6 relative overflow-hidden">
      <Navigation />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <header className="mb-16 space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
              <BookOpen size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Buku <span className="text-blue-500">Tamu</span>
            </h1>
          </div>
          
          <p className="text-slate-400 text-lg italic max-w-xl">
            "Tinggalkan jejakmu di sini. Entah itu pujian, kritik kode yang berantakan, atau sekadar ngajak ngopi."
          </p>
        </header>

        {error ? (
          <div className="p-8 bg-red-950/20 border border-red-500/30 rounded-2xl text-red-400 text-center">
            Gagal memuat buku tamu. Pastikan tabel 'guestbook' sudah dibuat di database.
          </div>
        ) : (
          <GuestbookClient initialEntries={initialEntries || []} />
        )}
      </div>
    </div>
  )
}
