'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Swipe', icon: '🐾' },
    { href: '/matches', label: 'Matches', icon: '💕' },
    { href: '/chat', label: 'Chat', icon: '💬' },
    { href: '/services', label: 'Services', icon: '🏥' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center py-2 px-3 rounded-lg transition-colors',
              pathname === item.href
                ? 'text-primary bg-primary/10'
                : 'text-gray-600 hover:text-primary hover:bg-primary/5'
            )}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
