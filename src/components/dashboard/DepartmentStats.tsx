import { cn } from '@/lib/utils';

const departments = [
  { name: 'AI & Data Science', students: 245, attendance: 92, color: 'bg-secondary' },
  { name: 'Computer Science', students: 312, attendance: 88, color: 'bg-primary' },
  { name: 'Information Technology', students: 198, attendance: 85, color: 'bg-warning' },
  { name: 'Electronics', students: 176, attendance: 91, color: 'bg-success' },
  { name: 'Mechanical', students: 234, attendance: 79, color: 'bg-info' },
];

export function DepartmentStats() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Department Overview</h3>
        <p className="text-sm text-muted-foreground">Attendance by department</p>
      </div>

      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.name} className="group">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{dept.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{dept.students} students</span>
                <span
                  className={cn(
                    'text-sm font-semibold',
                    dept.attendance >= 85 ? 'text-success' : dept.attendance >= 75 ? 'text-warning' : 'text-destructive'
                  )}
                >
                  {dept.attendance}%
                </span>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className={cn(
                  'progress-bar-fill',
                  dept.attendance >= 85 ? 'success' : dept.attendance >= 75 ? 'warning' : 'danger'
                )}
                style={{ width: `${dept.attendance}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
