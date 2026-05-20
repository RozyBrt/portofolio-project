import Navigation from '@/components/Navigation'

export default function ProjectLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 py-24 px-6">
      <Navigation />
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-12 space-y-6">
          {/* Back link skeleton */}
          <div className="h-6 w-48 bg-slate-900 rounded-md animate-pulse" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Status & Views */}
                <div className="h-6 w-16 bg-slate-900 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-slate-900 rounded-md animate-pulse" />
              </div>

              <div className="flex items-center gap-4">
                {/* Action buttons */}
                <div className="h-10 w-28 bg-slate-900 rounded-lg animate-pulse" />
                <div className="h-10 w-32 bg-slate-900 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <div className="h-12 md:h-14 w-3/4 bg-slate-900 rounded-lg animate-pulse" />
            {/* Tagline */}
            <div className="h-6 w-2/4 bg-slate-900 rounded-md animate-pulse" />
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-slate-900 animate-pulse border border-slate-800 shadow-2xl" />

        {/* Content */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-10/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-9/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-slate-900 rounded-md animate-pulse mt-8" />
          <div className="h-4 w-10/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-8/12 bg-slate-900 rounded-md animate-pulse" />
        </div>
      </article>
    </div>
  )
}
