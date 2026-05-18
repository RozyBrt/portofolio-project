export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import HomeContent from '@/components/HomeContent'
import Navigation from '@/components/Navigation'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

export default async function HomePage() {
  const supabase = await createClient()
  
  // Try to fetch featured projects
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .limit(2)

  let featuredProjects = data as Project[] | null

  // If no featured projects, just get the latest 2
  if (!featuredProjects || featuredProjects.length === 0) {
    const { data: latest } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(2)
    featuredProjects = latest as Project[] | null
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <Navigation />
      
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <HomeContent featuredProjects={featuredProjects || []} />
    </main>
  )
}
