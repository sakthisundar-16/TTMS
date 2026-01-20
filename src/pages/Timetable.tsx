import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Timetable() {
  return (
    <DashboardLayout
      title="Timetable"
      subtitle="View and manage class schedules - Click any period to reassign"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Filters */}
        <div className="stat-card">
          <div className="grid gap-4 sm:grid-cols-3">
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
                  <SelectItem value="2-3">Year 2 / Sem 3</SelectItem>
                  <SelectItem value="3-5">Year 3 / Sem 5</SelectItem>
                  <SelectItem value="4-7">Year 4 / Sem 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Section</label>
              <Select defaultValue="a">
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Section A</SelectItem>
                  <SelectItem value="b">Section B</SelectItem>
                  <SelectItem value="c">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Timetable Grid Component */}
        <TimetableGrid />
      </div>
    </DashboardLayout>
  );
}
