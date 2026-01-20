import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import '@/styles/animations.css';

interface LeaveRequest {
  id: string;
  facultyName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const LeavePermissions = () => {
  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      facultyName: 'Dr. John Smith',
      department: 'Computer Science',
      leaveType: 'Sick Leave',
      startDate: '2026-01-25',
      endDate: '2026-01-27',
      reason: 'Medical appointment',
      status: 'pending',
      requestDate: '2026-01-20',
    },
    {
      id: '2',
      facultyName: 'Prof. Sarah Johnson',
      department: 'Mathematics',
      leaveType: 'Casual Leave',
      startDate: '2026-02-01',
      endDate: '2026-02-03',
      reason: 'Personal work',
      status: 'approved',
      requestDate: '2026-01-18',
    },
    {
      id: '3',
      facultyName: 'Dr. Michael Brown',
      department: 'Physics',
      leaveType: 'Annual Leave',
      startDate: '2026-03-01',
      endDate: '2026-03-15',
      reason: 'Vacation',
      status: 'pending',
      requestDate: '2026-01-19',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Leave Permissions" subtitle="Manage and review leave requests from faculties">
      <div className="space-y-4 max-w-5xl mx-auto px-2">
          {leaveRequests.map((request, index) => (
            <div key={request.id} className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-background to-muted/30 p-5 hover:shadow-xl hover:border-primary/50 transition-all duration-300 animate-popup" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground truncate">{request.facultyName}</h3>
                    <p className="text-sm text-muted-foreground truncate">{request.department}</p>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} px-2 py-1 text-xs font-semibold shadow-sm flex-shrink-0`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="rounded bg-muted/50 p-2.5 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</p>
                      <p className="text-sm font-bold text-foreground truncate mt-1">{request.leaveType}</p>
                    </div>
                    <div className="rounded bg-muted/50 p-2.5 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Start</p>
                      <p className="text-sm font-bold text-foreground mt-1">{new Date(request.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="rounded bg-muted/50 p-2.5 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">End</p>
                      <p className="text-sm font-bold text-foreground mt-1">{new Date(request.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="rounded bg-muted/50 p-2.5 border border-border/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Req</p>
                      <p className="text-sm font-bold text-foreground mt-1">{new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="rounded bg-muted/30 p-2.5 border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Reason:</p>
                    <p className="text-sm text-foreground line-clamp-2">{request.reason}</p>
                  </div>
                  <div className="flex gap-2.5 pt-2.5">
                    {request.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md px-3 text-xs">
                          ✓ Approve
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md px-3 text-xs">
                          ✕ Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="border-primary/50 hover:bg-primary/5 px-3 text-xs">
                      More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </DashboardLayout>
  );
};

export default LeavePermissions;