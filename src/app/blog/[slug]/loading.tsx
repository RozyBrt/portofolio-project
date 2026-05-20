import Navigation from '@/components/Navigation'

export default function BlogPostLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 py-24 px-6">
      <Navigation />
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 space-y-6">
          {/* Back link */}
          <div className="h-6 w-48 bg-slate-900 rounded-md animate-pulse" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Meta tags (Date, Read time, Views, Category) */}
              <div className="h-5 w-32 bg-slate-900 rounded-md animate-pulse" />
              <div className="h-5 w-24 bg-slate-900 rounded-md animate-pulse" />
              <div className="h-5 w-24 bg-slate-900 rounded-md animate-pulse" />
              <div className="h-5 w-20 bg-slate-900 rounded-full animate-pulse" />
            </div>
            {/* Title */}
            <div className="h-12 md:h-14 w-5/6 bg-slate-900 rounded-lg animate-pulse" />
          </div>
        </header>

        {/* Content */}
        <div className="space-y-4 mb-16">
          <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-10/12 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-3/4 bg-slate-900 rounded-md animate-pulse" />
          
          <div className="h-32 w-full bg-slate-900 rounded-lg animate-pulse mt-8 mb-8" />
          
          <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-900 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-slate-900 rounded-md animate-pulse" />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-24 bg-slate-900 rounded-md animate-pulse" />
                <div className="h-4 w-40 bg-slate-900 rounded-md animate-pulse" />
              </div>
            </div>
            
            <div className="h-10 w-48 bg-slate-900 rounded-full animate-pulse" />
          </div>
        </footer>
      </article>
    </div>
  )
}
