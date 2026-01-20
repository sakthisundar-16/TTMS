import { useState } from 'react';
import { Check, X, Clock, Briefcase, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const students = [
  { rollNumber: '921022243001', name: 'Arun Kumar', status: 'present' },
  { rollNumber: '921022243002', name: 'Bhavani S', status: 'present' },
  { rollNumber: '921022243003', name: 'Chitra R', status: 'absent' },
  { rollNumber: '921022243004', name: 'Deepak M', status: 'present' },
  { rollNumber: '921022243005', name: 'Ezhil P', status: 'late' },
  { rollNumber: '921022243006', name: 'Fathima N', status: 'present' },
  { rollNumber: '921022243007', name: 'Ganesh V', status: 'od' },
  { rollNumber: '921022243008', name: 'Harini K', status: 'present' },
];

type AttendanceStatus = 'present' | 'absent' | 'late' | 'od';

const statusConfig = {
  present: { label: 'Present', icon: Check, class: 'bg-success text-success-foreground' },
  absent: { label: 'Absent', icon: X, class: 'bg-destructive text-destructive-foreground' },
  late: { label: 'Late', icon: Clock, class: 'bg-warning text-warning-foreground' },
  od: { label: 'On Duty', icon: Briefcase, class: 'bg-info text-info-foreground' },
};

export function MarkAttendanceForm() {
  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => {
      acc[student.rollNumber] = student.status as AttendanceStatus;
      return acc;
    }, {} as Record<string, AttendanceStatus>)
  );

  const updateStatus = (rollNumber: string, status: AttendanceStatus) => {
    setAttendanceData(prev => ({ ...prev, [rollNumber]: status }));
  };

  const markAllPresent = () => {
    const newData = students.reduce((acc, student) => {
      acc[student.rollNumber] = 'present';
      return acc;
    }, {} as Record<string, AttendanceStatus>);
    setAttendanceData(newData);
  };

  const presentCount = Object.values(attendanceData).filter(s => s === 'present').length;
  const absentCount = Object.values(attendanceData).filter(s => s === 'absent').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Selection Controls */}
      <div className="stat-card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Department</label>
            <Select defaultValue="ai-ds">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-ds">AI & Data Science</SelectItem>
                <SelectItem value="cse">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Year / Semester</label>
            <Select defaultValue="3-5">
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-1">Year 1 / Sem 1</SelectItem>
                <SelectItem value="1-2">Year 1 / Sem 2</SelectItem>
                <SelectItem value="2-3">Year 2 / Sem 3</SelectItem>
                <SelectItem value="2-4">Year 2 / Sem 4</SelectItem>
                <SelectItem value="3-5">Year 3 / Sem 5</SelectItem>
                <SelectItem value="3-6">Year 3 / Sem 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Select defaultValue="ml">
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml">Machine Learning</SelectItem>
                <SelectItem value="ds">Data Structures</SelectItem>
                <SelectItem value="dbms">Database Systems</SelectItem>
                <SelectItem value="cn">Computer Networks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hour</label>
            <Select defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Select hour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Hour 1 (9:00 - 10:00)</SelectItem>
                <SelectItem value="2">Hour 2 (10:00 - 11:00)</SelectItem>
                <SelectItem value="3">Hour 3 (11:30 - 12:30)</SelectItem>
                <SelectItem value="4">Hour 4 (2:00 - 3:00)</SelectItem>
                <SelectItem value="5">Hour 5 (3:00 - 4:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{students.length}</p>
          <p className="text-sm text-muted-foreground">Total Students</p>
        </div>
        <div className="rounded-lg border bg-success-light p-4 text-center">
          <p className="text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-sm text-success/80">Present</p>
        </div>
        <div className="rounded-lg border bg-destructive/10 p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{absentCount}</p>
          <p className="text-sm text-destructive/80">Absent</p>
        </div>
        <div className="rounded-lg border bg-secondary-light p-4 text-center">
          <p className="text-2xl font-bold text-secondary">
            {Math.round((presentCount / students.length) * 100)}%
          </p>
          <p className="text-sm text-secondary/80">Attendance</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={markAllPresent}>
          <Check className="mr-2 h-4 w-4" />
          Mark All Present
        </Button>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Student List */}
      <div className="stat-card overflow-hidden p-0">
        <div className="border-b bg-muted/50 px-4 py-3">
          <h3 className="font-semibold text-foreground">Student Attendance</h3>
        </div>
        <div className="divide-y">
          {students.map((student) => {
            const status = attendanceData[student.rollNumber];
            const StatusIcon = statusConfig[status].icon;
            
            return (
              <div
                key={student.rollNumber}
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(Object.keys(statusConfig) as AttendanceStatus[]).map((s) => {
                    const config = statusConfig[s];
                    const Icon = config.icon;
                    const isActive = status === s;
                    
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(student.rollNumber, s)}
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
                          isActive
                            ? config.class
                            : 'border-border bg-card text-muted-foreground hover:border-foreground/30'
                        )}
                        title={config.label}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Save className="mr-2 h-5 w-5" />
          Save Attendance
        </Button>
      </div>
    </div>
  );
}
