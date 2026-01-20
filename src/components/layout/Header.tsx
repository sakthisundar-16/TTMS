import { Bell, Search, Calendar } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:top-0">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:h-20 lg:px-6">
        {/* Left - Title */}
        <div className="pt-16 lg:pt-0">
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Date Display */}
          <div className="hidden items-center gap-2 rounded-lg bg-muted px-3 py-2 md:flex">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{today}</span>
          </div>

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students, staff..."
              className="w-64 pl-9"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
