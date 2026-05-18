import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

export const runtime = 'edge'
export const alt = 'Selected Project | FACHRUR ROZI SYAH PUTRA BERUTU'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch data proyek dari supabase
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  const project = data as Project | null

  const title = project?.title || 'Selected Project'
  const description = project?.description || 'Karya rekayasa perangkat lunak, arsitektur aplikasi modern, dan eksperimen digital.'
  
  const tagline = project?.tagline || 'Software Engineering Project'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#030712',
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>R</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.05em' }}>
              FACHRUR ROZI SYAH PUTRA BERUTU
            </span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            SELECTED PROJECT
          </span>
        </div>

        {/* Main Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.02em',
              maxHeight: '200px',
              overflow: 'hidden',
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', margin: 0, maxWidth: '950px', lineHeight: 1.5, maxHeight: '90px', overflow: 'hidden' }}>
            {description}
          </p>
        </div>

        {/* Footer */}
        <div 
          style={{ 
            display: 'flex', 
            width: '100%', 
            justifyContent: 'space-between', 
            borderTop: '1px solid #1e293b', 
            paddingTop: '32px',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 600 }}>
            rozybrt.dev /projects
          </span>
          <span style={{ fontSize: '18px', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.05em' }}>
            {tagline}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
