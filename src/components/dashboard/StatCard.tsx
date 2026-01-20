import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary';
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variantClasses = {
    default: 'stat-card',
    primary: 'stat-card-primary',
    secondary: 'stat-card-secondary',
  };

  const iconBgClasses = {
    default: 'bg-secondary/10 text-secondary',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
  };

  const textClasses = {
    default: {
      title: 'text-muted-foreground',
      value: 'text-foreground',
      subtitle: 'text-muted-foreground',
    },
    primary: {
      title: 'text-primary-foreground/80',
      value: 'text-primary-foreground',
      subtitle: 'text-primary-foreground/60',
    },
    secondary: {
      title: 'text-secondary-foreground/80',
      value: 'text-secondary-foreground',
      subtitle: 'text-secondary-foreground/60',
    },
  };

  return (
    <div className={cn(variantClasses[variant], 'animate-fade-in')}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn('text-sm font-medium', textClasses[variant].title)}>{title}</p>
          <p className={cn('mt-2 text-3xl font-bold tracking-tight', textClasses[variant].value)}>
            {value}
          </p>
          {subtitle && (
            <p className={cn('mt-1 text-sm', textClasses[variant].subtitle)}>{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className={cn('text-xs', textClasses[variant].subtitle)}>vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-xl p-3', iconBgClasses[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
