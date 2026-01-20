import { Search, Filter, Download, MoreVertical, Eye, Edit, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const staffMembers = [
  {
    facultyId: 'F001',
    name: 'Dr. Naveen Kumar',
    email: 'naveen@college.edu',
    department: 'IT',
    designation: 'Assistant Professor',
    workingDays: 220,
    leaveCL: 5,
    leaveEL: 3,
    leaveVL: 10,
    onDuty: 4,
    effectiveAttendance: 202,
    percentage: 91.8,
  },
  {
    facultyId: 'F002',
    name: 'Prof. Lakshmi S',
    email: 'lakshmi@college.edu',
    department: 'CSE',
    designation: 'Professor',
    workingDays: 220,
    leaveCL: 3,
    leaveEL: 2,
    leaveVL: 8,
    onDuty: 6,
    effectiveAttendance: 213,
    percentage: 96.8,
  },
  {
    facultyId: 'F003',
    name: 'Dr. Ramesh P',
    email: 'ramesh@college.edu',
    department: 'AI & DS',
    designation: 'Associate Professor',
    workingDays: 220,
    leaveCL: 8,
    leaveEL: 5,
    leaveVL: 12,
    onDuty: 3,
    effectiveAttendance: 198,
    percentage: 90.0,
  },
  {
    facultyId: 'F004',
    name: 'Ms. Divya R',
    email: 'divya@college.edu',
    department: 'ECE',
    designation: 'Assistant Professor',
    workingDays: 220,
    leaveCL: 2,
    leaveEL: 0,
    leaveVL: 5,
    onDuty: 8,
    effectiveAttendance: 221,
    percentage: 100.5,
  },
];

function getAttendanceColor(value: number) {
  if (value >= 95) return 'text-success font-semibold';
  if (value >= 85) return 'text-foreground font-semibold';
  if (value >= 75) return 'text-warning font-semibold';
  return 'text-destructive font-semibold';
}

export function StaffTable() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search faculty by name or ID..."
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
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>CL</th>
              <th>EL/ML</th>
              <th>VL</th>
              <th>OD</th>
              <th>Attendance %</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.facultyId} className="group">
                <td className="font-mono text-sm">{staff.facultyId}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <span className="text-sm font-semibold">
                        {staff.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.email}</p>
                    </div>
                  </div>
                </td>
                <td>{staff.department}</td>
                <td className="text-sm">{staff.designation}</td>
                <td className="text-center">{staff.leaveCL}</td>
                <td className="text-center">{staff.leaveEL}</td>
                <td className="text-center">{staff.leaveVL}</td>
                <td className="text-center">{staff.onDuty}</td>
                <td>
                  <span className={getAttendanceColor(staff.percentage)}>
                    {staff.percentage}%
                  </span>
                </td>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Leave History
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Record
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
          Showing 1-4 of 87 staff members
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
