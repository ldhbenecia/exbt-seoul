import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="flex items-center">
        <h1 className="text-lg font-bold tracking-tight">EXBT</h1>
        <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">
          Seoul Cultural Events
        </span>
      </div>
      <ThemeToggle />
    </header>
  );
}
