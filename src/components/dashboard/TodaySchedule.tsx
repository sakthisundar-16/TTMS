import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const schedule = [
  {
    id: 1,
    time: '09:00 - 10:00',
    subject: 'Data Structures',
    class: 'CSE-2A',
    room: 'Room 301',
    status: 'completed',
  },
  {
    id: 2,
    time: '10:00 - 11:00',
    subject: 'Machine Learning',
    class: 'AI&DS-3A',
    room: 'Lab 201',
    status: 'ongoing',
  },
  {
    id: 3,
    time: '11:30 - 12:30',
    subject: 'Database Systems',
    class: 'IT-2B',
    room: 'Room 105',
    status: 'upcoming',
  },
  {
    id: 4,
    time: '02:00 - 03:00',
    subject: 'Cloud Computing',
    class: 'CSE-4A',
    room: 'Lab 301',
    status: 'upcoming',
  },
];

export function TodaySchedule() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
        <p className="text-sm text-muted-foreground">Your classes for today</p>
      </div>

      <div className="space-y-3">
        {schedule.map((item) => (
          <div
            key={item.id}
            className={cn(
              'relative flex items-center gap-4 rounded-lg border p-3 transition-all',
              item.status === 'ongoing'
                ? 'border-secondary bg-secondary-light'
                : item.status === 'completed'
                ? 'border-border bg-muted/50 opacity-60'
                : 'border-border bg-card hover:border-secondary/50'
            )}
          >
            {item.status === 'ongoing' && (
              <div className="absolute -left-px top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-secondary" />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-foreground">{item.subject}</h4>
                {item.status === 'ongoing' && (
                  <span className="badge-success">Live</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.class}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{item.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
