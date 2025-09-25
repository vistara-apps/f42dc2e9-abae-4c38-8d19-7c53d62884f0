'use client';

import { ReactNode } from 'react';
import { Leaf, Settings2, User, Home, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  actions?: ReactNode;
}

export function AppShell({ 
  children, 
  title = 'PlantaPal',
  showBackButton = false,
  actions 
}: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/plants', icon: Leaf, label: 'Plants' },
    { href: '/add-plant', icon: Plus, label: 'Add' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="glass-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              ←
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">{title}</h1>
            </div>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-card border-t border-border px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'text-accent bg-accent bg-opacity-10' 
                    : 'text-muted hover:text-fg hover:bg-surface'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
