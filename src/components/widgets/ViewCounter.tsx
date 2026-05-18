'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  initialCount?: number
}

export default function ViewCounter({ slug, initialCount = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialCount)

  useEffect(() => {
    let mounted = true

    const incrementView = async () => {
      // Cek di sessionStorage apakah halaman ini udah di-view di sesi ini
      const viewKey = `viewed_${slug}`
      if (sessionStorage.getItem(viewKey)) return

      try {
        const res = await fetch(`/api/views/${slug}`, { method: 'POST' })
        const data = await res.json()
        if (mounted && data && typeof data.views === 'number') {
          setViews(data.views)
          // Simpan flag di sessionStorage
          sessionStorage.setItem(viewKey, 'true')
        }
      } catch (error) {
        console.error('Error incrementing view:', error)
      }
    }

    incrementView()

    return () => {
      mounted = false
    }
  }, [slug])

  const formatViews = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {formatViews(views)} views
    </span>
  )
}
