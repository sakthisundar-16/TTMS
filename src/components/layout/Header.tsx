import { Bell, Search, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-gradient-to-r from-background via-background to-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:top-0 shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:h-20 lg:px-6">
        {/* Left - Title */}
        <div className="pt-16 lg:pt-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent lg:text-2xl">{title}</h1>
          </div>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="hidden items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 md:flex border border-border/50">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{currentTime}</span>
          </div>

          {/* Date Display */}
          <div className="hidden items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 md:flex border border-border/50">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">{today}</span>
          </div>

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-56 pl-9 bg-muted/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-[11px] font-bold text-white shadow-lg">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
