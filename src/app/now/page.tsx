export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Target, Sparkles } from 'lucide-react'
import type { Database } from '@/types/database'

type NowStatus = Database['public']['Tables']['now_status']['Row']

function formatIndonesianDate(dateString: string | null) {
  if (!dateString) return 'Baru saja diperbarui'
  const date = new Date(dateString)
  const day = date.getDate()
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  return `Terakhir diperbarui: ${day} ${month} ${year}`
}

export default async function NowPage() {
  const supabase = await createClient()

  // Fetch the latest row from now_status table
  const { data } = await supabase
    .from('now_status')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  const status = data as NowStatus | null

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-6 relative overflow-hidden">
      <Navigation />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <header className="mb-12 space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent py-1 leading-tight">
            /now
          </h1>
          <p className="text-slate-400 text-base">
            Halaman ini terinspirasi oleh gerakan <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">now</a> yang menjabarkan fokus dan aktivitas saya saat ini.
          </p>
        </header>

        {status ? (
          <div className="space-y-8">
            {/* Main Glass Card */}
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-8">
                {/* Headline */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
                    <Sparkles size={14} />
                    Fokus Utama
                  </div>
                  <p className="text-xl md:text-2xl font-semibold text-slate-100 leading-relaxed font-sans">
                    "{status.headline}"
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-850 w-full" />

                {/* Location */}
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Lokasi Saat Ini</div>
                    <div className="font-semibold text-slate-200">{status.location}</div>
                  </div>
                </div>

                {/* Focus List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                    <Target size={14} />
                    Apa yang sedang dikerjakan
                  </div>
                  
                  <ul className="grid grid-cols-1 gap-3">
                    {status.focus.map((item, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-3 p-4 bg-slate-950/40 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-slate-300 text-sm md:text-base font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Updated At Footer */}
            <div className="text-center text-xs text-slate-600 font-medium">
              {formatIndonesianDate(status.updated_at)}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl text-center">
            <p className="text-slate-500 italic">Belum ada pembaruan status saat ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}
