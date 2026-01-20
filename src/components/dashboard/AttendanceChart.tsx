import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', students: 94, staff: 98 },
  { name: 'Tue', students: 88, staff: 96 },
  { name: 'Wed', students: 91, staff: 100 },
  { name: 'Thu', students: 86, staff: 97 },
  { name: 'Fri', students: 78, staff: 94 },
  { name: 'Sat', students: 82, staff: 92 },
];

export function AttendanceChart() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Attendance Trend</h3>
          <p className="text-sm text-muted-foreground">Student vs Staff attendance this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-secondary" />
            <span className="text-sm text-muted-foreground">Staff</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 85%, 26%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 85%, 26%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStaff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(178, 99%, 28%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(178, 99%, 28%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs text-muted-foreground" tick={{ fill: 'hsl(220, 10%, 45%)' }} />
            <YAxis domain={[70, 100]} className="text-xs text-muted-foreground" tick={{ fill: 'hsl(220, 10%, 45%)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 20%, 90%)',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'hsl(220, 20%, 10%)', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="students"
              stroke="hsl(0, 85%, 26%)"
              strokeWidth={2}
              fill="url(#colorStudents)"
            />
            <Area
              type="monotone"
              dataKey="staff"
              stroke="hsl(178, 99%, 28%)"
              strokeWidth={2}
              fill="url(#colorStaff)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
