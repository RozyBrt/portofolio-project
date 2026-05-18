import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FACHRUR ROZI SYAH PUTRA BERUTU | Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>R</span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.1em' }}>
            FACHRUR ROZI SYAH PUTRA BERUTU
          </span>
        </div>

        {/* Main Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Software Engineer &amp; Tech Writer
            </span>
          </div>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Crafting Premium Web &amp; AI Digital Products.
          </h1>
          <p style={{ fontSize: '22px', color: '#94a3b8', margin: 0, maxWidth: '900px', lineHeight: 1.5 }}>
            Tempat berbagi baris kode dan keluh kesah yang gagal di-debug oleh logika.
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
            rozybrt.dev
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ fontSize: '18px', color: '#10b981', fontWeight: 600 }}>
              Open for opportunities
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
