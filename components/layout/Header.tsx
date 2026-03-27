'use client';

import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-4">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo />
          <span className="text-lg font-bold tracking-tight">EXBT</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Seoul Cultural Events
          </span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
