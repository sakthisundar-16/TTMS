import { useState, useMemo } from 'react';
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

const yearToSemesterMap: Record<string, number[]> = {
  '1': [1, 2],
  '2': [3, 4],
  '3': [5, 6],
  '4': [7, 8],
};

export default function Timetable() {
  const [selectedYear, setSelectedYear] = useState('3');
  const [selectedSemester, setSelectedSemester] = useState('5');

  const availableSemesters = useMemo(() => {
    return yearToSemesterMap[selectedYear] || [];
  }, [selectedYear]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const semesters = yearToSemesterMap[year] || [];
    if (semesters.length > 0) {
      setSelectedSemester(String(semesters[0]));
    }
  };

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
              <Select defaultValue="cse">
                <SelectTrigger className="bg-background border-border/50 hover:border-border transition-colors">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">Computer Science (CSE)</SelectItem>
                  <SelectItem value="it">Information Technology (IT)</SelectItem>
                  <SelectItem value="mech">Mechanical Engineering (MECH)</SelectItem>
                  <SelectItem value="eee">Electrical & Electronics (EEE)</SelectItem>
                  <SelectItem value="ece">Electronics & Communication (ECE)</SelectItem>
                  <SelectItem value="civil">Civil Engineering (CIVIL)</SelectItem>
                  <SelectItem value="sh">Science & Humanities (S&H)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Year</label>
              <Select value={selectedYear} onValueChange={handleYearChange}>
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
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="bg-background border-border/50 hover:border-border transition-colors">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {availableSemesters.map((sem) => (
                    <SelectItem key={sem} value={String(sem)}>
                      Semester {sem}
                    </SelectItem>
                  ))}
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
