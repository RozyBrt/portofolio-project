'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2 } from 'lucide-react'
import Image from 'next/image'

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumImageUrl?: string
  songUrl?: string
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/api/spotify/now-playing')
      const json = await res.json()
      setData(json)
    } catch (error) {
      console.error('Error fetching Spotify data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 15000) // Poll every 15 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-sm">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-slate-800 rounded-lg animate-pulse flex items-center justify-center text-slate-700">
              <Music2 size={24} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-slate-800/50 rounded w-1/2 animate-pulse" />
            </div>
          </motion.div>
        ) : data?.isPlaying ? (
          <motion.a
            key="playing"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-4 bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl backdrop-blur-sm transition-all group"
          >
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={data.albumImageUrl!}
                alt={data.title!}
                fill
                sizes="(max-width: 768px) 100vw, 64px"
                className="rounded-lg object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Now Playing
              </p>
              <h4 className="text-slate-100 font-bold text-sm truncate group-hover:text-emerald-400 transition-colors">
                {data.title}
              </h4>
              <p className="text-slate-400 text-xs truncate">
                {data.artist}
              </p>
            </div>

            <div className="flex gap-1 items-end h-4 pr-2">
              <motion.div 
                animate={{ height: [8, 16, 12, 16, 8] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-1 bg-emerald-500 rounded-full" 
              />
              <motion.div 
                animate={{ height: [12, 8, 16, 10, 12] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                className="w-1 bg-emerald-500 rounded-full" 
              />
              <motion.div 
                animate={{ height: [16, 12, 8, 14, 16] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                className="w-1 bg-emerald-500 rounded-full" 
              />
            </div>
          </motion.a>
        ) : (
          <motion.div
            key="fallback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-sm relative group overflow-hidden"
          >
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="https://i.scdn.co/image/ab67616d00001e029882f40d52f971c835ea4abb"
                alt="Themilo - Tangguh"
                fill
                sizes="(max-width: 768px) 100vw, 64px"
                className="rounded-lg object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <span className="w-1 h-1 bg-slate-500 rounded-full" />
                Recently Played / Favorite
              </p>
              <h4 className="text-slate-300 font-bold text-sm truncate">
                Tangguh
              </h4>
              <p className="text-slate-500 text-xs truncate">
                Themilo
              </p>
            </div>

            <div className="flex gap-1 items-end h-3 pr-2 opacity-30">
              <motion.div 
                animate={{ height: [6, 12, 9, 12, 6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="w-1 bg-slate-400 rounded-full" 
              />
              <motion.div 
                animate={{ height: [9, 6, 12, 8, 9] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
                className="w-1 bg-slate-400 rounded-full" 
              />
              <motion.div 
                animate={{ height: [12, 9, 6, 10, 12] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
                className="w-1 bg-slate-400 rounded-full" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

}
