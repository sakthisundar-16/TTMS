import { Search, Filter, Download, MoreVertical, Eye, Edit, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const students = [
  {
    rollNumber: '921022243017',
    name: 'Sandhosh G',
    department: 'AI & DS',
    year: 3,
    semester: 7,
    semesterAttendance: 92,
    yearAttendance: 88,
    status: 'good',
  },
  {
    rollNumber: '921022243018',
    name: 'Priya Kumar',
    department: 'CSE',
    year: 2,
    semester: 4,
    semesterAttendance: 78,
    yearAttendance: 82,
    status: 'warning',
  },
  {
    rollNumber: '921022243019',
    name: 'Rahul Sharma',
    department: 'IT',
    year: 4,
    semester: 8,
    semesterAttendance: 95,
    yearAttendance: 91,
    status: 'excellent',
  },
  {
    rollNumber: '921022243020',
    name: 'Anitha R',
    department: 'ECE',
    year: 3,
    semester: 6,
    semesterAttendance: 68,
    yearAttendance: 72,
    status: 'danger',
  },
  {
    rollNumber: '921022243021',
    name: 'Mohammed Ali',
    department: 'MECH',
    year: 2,
    semester: 3,
    semesterAttendance: 85,
    yearAttendance: 84,
    status: 'good',
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'excellent':
      return <span className="badge-success">Excellent</span>;
    case 'good':
      return <span className="badge-success">Good</span>;
    case 'warning':
      return <span className="badge-warning">At Risk</span>;
    case 'danger':
      return <span className="badge-danger">Critical</span>;
    default:
      return null;
  }
}

function getAttendanceColor(value: number) {
  if (value >= 85) return 'text-success font-semibold';
  if (value >= 75) return 'text-warning font-semibold';
  return 'text-destructive font-semibold';
}

export function StudentTable() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or roll number..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="data-table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Year / Sem</th>
              <th>Semester %</th>
              <th>Year %</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNumber} className="group">
                <td className="font-mono text-sm">{student.rollNumber}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-sm font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </td>
                <td>{student.department}</td>
                <td>Year {student.year} / Sem {student.semester}</td>
                <td>
                  <span className={getAttendanceColor(student.semesterAttendance)}>
                    {student.semesterAttendance}%
                  </span>
                </td>
                <td>
                  <span className={getAttendanceColor(student.yearAttendance)}>
                    {student.yearAttendance}%
                  </span>
                </td>
                <td>{getStatusBadge(student.status)}</td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Record
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Alert
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-5 of 1,245 students
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
