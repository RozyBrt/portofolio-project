'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Guestbook', path: '/guestbook' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-full">
      <ul className="flex items-center gap-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`relative px-4 py-1.5 text-sm font-medium transition-colors hover:text-white ${
                pathname === item.path ? 'text-white' : 'text-slate-400'
              }`}
            >
              {pathname === item.path && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 bg-blue-500/20 rounded-full border border-blue-500/30"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
