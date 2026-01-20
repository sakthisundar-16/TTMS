import { Clock, UserCheck, UserX, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'check-in',
    message: 'Dr. Naveen marked attendance for CSE-3A',
    time: '2 minutes ago',
    icon: UserCheck,
    iconClass: 'bg-success-light text-success',
  },
  {
    id: 2,
    type: 'alert',
    message: 'Sandhosh G - Attendance dropped below 75%',
    time: '15 minutes ago',
    icon: AlertTriangle,
    iconClass: 'bg-warning-light text-warning',
  },
  {
    id: 3,
    type: 'absence',
    message: '5 students absent in AI&DS-2B morning session',
    time: '1 hour ago',
    icon: UserX,
    iconClass: 'bg-destructive/10 text-destructive',
  },
  {
    id: 4,
    type: 'report',
    message: 'Monthly attendance report generated for IT Dept',
    time: '2 hours ago',
    icon: FileText,
    iconClass: 'bg-secondary-light text-secondary',
  },
  {
    id: 5,
    type: 'check-in',
    message: 'Prof. Kumar submitted leave request',
    time: '3 hours ago',
    icon: Clock,
    iconClass: 'bg-info/10 text-info',
  },
];

export function RecentActivity() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest attendance updates</p>
        </div>
        <button className="text-sm font-medium text-secondary hover:text-secondary/80">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className={cn('rounded-lg p-2', activity.iconClass)}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground line-clamp-1">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
