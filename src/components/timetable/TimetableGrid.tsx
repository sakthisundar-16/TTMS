import { useState } from 'react';
import { Clock, MapPin, User, Edit2, UserMinus, BookOpen, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = [
  { slot: 1, time: '09:00 - 10:00' },
  { slot: 2, time: '10:00 - 11:00' },
  { slot: 3, time: '11:30 - 12:30' },
  { slot: 4, time: '02:00 - 03:00' },
  { slot: 5, time: '03:00 - 04:00' },
];

const availableFaculty = [
  { id: 'F001', name: 'Dr. Naveen Kumar', department: 'IT' },
  { id: 'F002', name: 'Prof. Lakshmi S', department: 'CSE' },
  { id: 'F003', name: 'Dr. Ramesh P', department: 'AI & DS' },
  { id: 'F004', name: 'Ms. Divya R', department: 'ECE' },
  { id: 'F005', name: 'Prof. Kumar M', department: 'CSE' },
  { id: 'F006', name: 'Dr. Priya S', department: 'IT' },
];

const availableSubjects = [
  'Machine Learning',
  'Data Structures',
  'Database Systems',
  'Cloud Computing',
  'Computer Networks',
  'Operating Systems',
  'Web Development',
  'Artificial Intelligence',
];

const availableRooms = [
  'Room 101', 'Room 105', 'Room 201', 'Room 202', 'Room 301',
  'Lab 101', 'Lab 102', 'Lab 201', 'Lab 301',
];

interface TimetableCell {
  subject: string;
  faculty: string;
  room: string;
  type: 'lecture' | 'lab' | 'free';
  facultyAbsent?: boolean;
}

const initialTimetableData: Record<string, Record<number, TimetableCell>> = {
  Monday: {
    1: { subject: 'Machine Learning', faculty: 'Dr. Naveen', room: 'Lab 201', type: 'lab' },
    2: { subject: 'Machine Learning', faculty: 'Dr. Naveen', room: 'Lab 201', type: 'lab' },
    3: { subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'Room 301', type: 'lecture' },
    4: { subject: 'Database Systems', faculty: 'Ms. Divya', room: 'Room 105', type: 'lecture' },
    5: { subject: 'Cloud Computing', faculty: 'Dr. Ramesh', room: 'Room 202', type: 'lecture' },
  },
  Tuesday: {
    1: { subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'Room 301', type: 'lecture' },
    2: { subject: 'Database Systems', faculty: 'Ms. Divya', room: 'Room 105', type: 'lecture', facultyAbsent: true },
    3: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
    4: { subject: 'Cloud Computing Lab', faculty: 'Dr. Ramesh', room: 'Lab 301', type: 'lab' },
    5: { subject: 'Cloud Computing Lab', faculty: 'Dr. Ramesh', room: 'Lab 301', type: 'lab' },
  },
  Wednesday: {
    1: { subject: 'Machine Learning', faculty: 'Dr. Naveen', room: 'Room 201', type: 'lecture', facultyAbsent: true },
    2: { subject: 'Data Structures Lab', faculty: 'Prof. Kumar', room: 'Lab 101', type: 'lab' },
    3: { subject: 'Data Structures Lab', faculty: 'Prof. Kumar', room: 'Lab 101', type: 'lab' },
    4: { subject: 'Database Systems', faculty: 'Ms. Divya', room: 'Room 105', type: 'lecture' },
    5: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
  },
  Thursday: {
    1: { subject: 'Cloud Computing', faculty: 'Dr. Ramesh', room: 'Room 202', type: 'lecture' },
    2: { subject: 'Machine Learning', faculty: 'Dr. Naveen', room: 'Room 201', type: 'lecture' },
    3: { subject: 'Database Systems Lab', faculty: 'Ms. Divya', room: 'Lab 102', type: 'lab' },
    4: { subject: 'Database Systems Lab', faculty: 'Ms. Divya', room: 'Lab 102', type: 'lab' },
    5: { subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'Room 301', type: 'lecture' },
  },
  Friday: {
    1: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
    2: { subject: 'Cloud Computing', faculty: 'Dr. Ramesh', room: 'Room 202', type: 'lecture' },
    3: { subject: 'Machine Learning', faculty: 'Dr. Naveen', room: 'Room 201', type: 'lecture' },
    4: { subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'Room 301', type: 'lecture' },
    5: { subject: 'Tutorial', faculty: 'Various', room: 'Room 105', type: 'lecture' },
  },
  Saturday: {
    1: { subject: 'Project Work', faculty: 'Guide', room: 'Lab 201', type: 'lab' },
    2: { subject: 'Project Work', faculty: 'Guide', room: 'Lab 201', type: 'lab' },
    3: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
    4: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
    5: { subject: 'Free Period', faculty: '-', room: '-', type: 'free' },
  },
};

interface SelectedPeriod {
  day: string;
  hour: number;
  cell: TimetableCell;
}

export function TimetableGrid() {
  const [timetableData, setTimetableData] = useState(initialTimetableData);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod | null>(null);
  const [editMode, setEditMode] = useState<'subject' | 'faculty' | null>(null);
  const [newFaculty, setNewFaculty] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const handleCellClick = (day: string, hour: number, cell: TimetableCell) => {
    if (cell.type === 'free') return;
    setSelectedPeriod({ day, hour, cell });
    setNewFaculty('');
    setNewSubject('');
    setNewRoom('');
    setEditMode(null);
  };

  const handleReassignFaculty = () => {
    if (!selectedPeriod || !newFaculty) return;

    const faculty = availableFaculty.find(f => f.id === newFaculty);
    if (!faculty) return;

    setTimetableData(prev => ({
      ...prev,
      [selectedPeriod.day]: {
        ...prev[selectedPeriod.day],
        [selectedPeriod.hour]: {
          ...prev[selectedPeriod.day][selectedPeriod.hour],
          faculty: faculty.name,
          facultyAbsent: false,
          room: newRoom || prev[selectedPeriod.day][selectedPeriod.hour].room,
        },
      },
    }));

    toast({
      title: "Faculty Reassigned",
      description: `${faculty.name} has been assigned to ${selectedPeriod.cell.subject} on ${selectedPeriod.day}`,
    });

    setSelectedPeriod(null);
    setEditMode(null);
  };

  const handleReassignSubject = () => {
    if (!selectedPeriod || !newSubject) return;

    const faculty = newFaculty ? availableFaculty.find(f => f.id === newFaculty) : null;

    setTimetableData(prev => ({
      ...prev,
      [selectedPeriod.day]: {
        ...prev[selectedPeriod.day],
        [selectedPeriod.hour]: {
          ...prev[selectedPeriod.day][selectedPeriod.hour],
          subject: newSubject,
          faculty: faculty ? faculty.name : prev[selectedPeriod.day][selectedPeriod.hour].faculty,
          room: newRoom || prev[selectedPeriod.day][selectedPeriod.hour].room,
          type: newSubject.toLowerCase().includes('lab') ? 'lab' : 'lecture',
          facultyAbsent: false,
        },
      },
    }));

    toast({
      title: "Subject Reassigned",
      description: `Period updated to ${newSubject} on ${selectedPeriod.day}`,
    });

    setSelectedPeriod(null);
    setEditMode(null);
  };

  const handleMarkFree = () => {
    if (!selectedPeriod) return;

    setTimetableData(prev => ({
      ...prev,
      [selectedPeriod.day]: {
        ...prev[selectedPeriod.day],
        [selectedPeriod.hour]: {
          subject: 'Free Period',
          faculty: '-',
          room: '-',
          type: 'free',
        },
      },
    }));

    toast({
      title: "Period Updated",
      description: `Period marked as free on ${selectedPeriod.day}`,
    });

    setSelectedPeriod(null);
  };

  return (
    <>
      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Lecture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Lab / Practical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted" />
          <span className="text-sm text-muted-foreground">Free Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Faculty Absent</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Edit2 className="h-4 w-4" />
          <span>Click any period to edit</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="stat-card overflow-x-auto p-0">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">Hour</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour.slot} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Hour {hour.slot}</p>
                      <p className="text-xs text-muted-foreground">{hour.time}</p>
                    </div>
                  </div>
                </td>
                {days.map((day) => {
                  const cell = timetableData[day]?.[hour.slot];
                  if (!cell) return <td key={day} className="px-2 py-2" />;

                  const isAbsent = cell.facultyAbsent;

                  return (
                    <td key={day} className="px-2 py-2">
                      <div
                        onClick={() => handleCellClick(day, hour.slot, cell)}
                        className={cn(
                          'group relative cursor-pointer rounded-lg p-3 transition-all',
                          cell.type === 'lecture' && !isAbsent && 'bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:shadow-md',
                          cell.type === 'lab' && !isAbsent && 'bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 hover:shadow-md',
                          cell.type === 'free' && 'bg-muted cursor-default',
                          isAbsent && 'bg-destructive/10 border border-destructive/30 hover:bg-destructive/20'
                        )}
                      >
                        {/* Edit indicator on hover */}
                        {cell.type !== 'free' && (
                          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        )}

                        {/* Absent badge */}
                        {isAbsent && (
                          <div className="absolute -right-1 -top-1">
                            <span className="flex h-5 items-center gap-1 rounded-full bg-destructive px-2 text-[10px] font-medium text-destructive-foreground">
                              <UserMinus className="h-3 w-3" />
                              Absent
                            </span>
                          </div>
                        )}

                        <p
                          className={cn(
                            'text-sm font-semibold',
                            cell.type === 'lecture' && !isAbsent && 'text-primary',
                            cell.type === 'lab' && !isAbsent && 'text-secondary',
                            cell.type === 'free' && 'text-muted-foreground',
                            isAbsent && 'text-destructive'
                          )}
                        >
                          {cell.subject}
                        </p>
                        {cell.type !== 'free' && (
                          <>
                            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span className={cn(isAbsent && 'line-through')}>{cell.faculty}</span>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{cell.room}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!selectedPeriod} onOpenChange={() => setSelectedPeriod(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-secondary" />
              Edit Period
            </DialogTitle>
            <DialogDescription>
              {selectedPeriod && (
                <span>
                  {selectedPeriod.day}, Hour {selectedPeriod.hour} - <strong>{selectedPeriod.cell.subject}</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedPeriod?.cell.facultyAbsent && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex items-center gap-3">
              <UserMinus className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Faculty Absent</p>
                <p className="text-xs text-muted-foreground">{selectedPeriod.cell.faculty} is marked absent for this period</p>
              </div>
            </div>
          )}

          {!editMode && (
            <div className="grid gap-3 py-4">
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => setEditMode('faculty')}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Reassign Faculty</p>
                    <p className="text-xs text-muted-foreground">Assign a different faculty to this period</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => setEditMode('subject')}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Reassign Subject</p>
                    <p className="text-xs text-muted-foreground">Change the subject for this period</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto py-4 border-destructive/30 hover:bg-destructive/5"
                onClick={handleMarkFree}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                    <X className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Mark as Free Period</p>
                    <p className="text-xs text-muted-foreground">Cancel this class for today</p>
                  </div>
                </div>
              </Button>
            </div>
          )}

          {editMode === 'faculty' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select New Faculty</label>
                <Select value={newFaculty} onValueChange={setNewFaculty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose faculty member" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFaculty.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        <div className="flex items-center gap-2">
                          <span>{faculty.name}</span>
                          <Badge variant="outline" className="text-xs">{faculty.department}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Room (Optional)</label>
                <Select value={newRoom} onValueChange={setNewRoom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Keep current room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setEditMode(null)}>
                  Back
                </Button>
                <Button
                  onClick={handleReassignFaculty}
                  disabled={!newFaculty}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Reassign Faculty
                </Button>
              </DialogFooter>
            </div>
          )}

          {editMode === 'subject' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select New Subject</label>
                <Select value={newSubject} onValueChange={setNewSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assign Faculty (Optional)</label>
                <Select value={newFaculty} onValueChange={setNewFaculty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Keep current faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFaculty.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        <div className="flex items-center gap-2">
                          <span>{faculty.name}</span>
                          <Badge variant="outline" className="text-xs">{faculty.department}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Room (Optional)</label>
                <Select value={newRoom} onValueChange={setNewRoom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Keep current room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setEditMode(null)}>
                  Back
                </Button>
                <Button
                  onClick={handleReassignSubject}
                  disabled={!newSubject}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Reassign Subject
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
