import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

export default function Timetable() {
  return (
    <DashboardLayout
      title="Timetable"
      subtitle="View and manage class schedules - Click any period to reassign"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Filters */}
        <div className="rounded-lg border border-border bg-gradient-to-r from-muted/30 to-muted/10 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Filters</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Department</label>
              <Select defaultValue="ai-ds">
                <SelectTrigger className="bg-background border-border/50 hover:border-border transition-colors">
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
              <label className="text-sm font-medium text-foreground">Year</label>
              <Select defaultValue="3">
                <SelectTrigger className="bg-background border-border/50 hover:border-border transition-colors">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Semester</label>
              <Select defaultValue="5">
                <SelectTrigger className="bg-background border-border/50 hover:border-border transition-colors">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                  <SelectItem value="5">Semester 5</SelectItem>
                  <SelectItem value="6">Semester 6</SelectItem>
                  <SelectItem value="7">Semester 7</SelectItem>
                  <SelectItem value="8">Semester 8</SelectItem>
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
