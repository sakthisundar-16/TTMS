import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  Calendar,
  FileText,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Timetable', href: '/', icon: Calendar },
  { name: 'Leave Permissions', href: '/leave-permissions', icon: AlertCircle },
];

const bottomNav: { name: string; href: string; icon: typeof Calendar }[] = [];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-primary px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-primary-foreground">AMS</span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col bg-sidebar transition-all duration-300 lg:relative lg:z-auto',
          collapsed ? '-translate-x-full lg:w-20 lg:translate-x-0' : 'w-64 translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 lg:h-20">
          <div className={cn('flex items-center gap-3', collapsed && 'lg:justify-center')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary-foreground">AMS</span>
                <span className="text-xs text-primary-foreground/60">Attendance System</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground lg:block"
          >
            <ChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'sidebar-link',
                  isActive && 'active',
                  collapsed && 'lg:justify-center lg:px-2'
                )}
                onClick={() => setCollapsed(true)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-3">
          {bottomNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'sidebar-link',
                  isActive && 'active',
                  collapsed && 'lg:justify-center lg:px-2'
                )}
                onClick={() => setCollapsed(true)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}

          {/* User Profile */}
          <div
            className={cn(
              'mt-3 flex items-center gap-3 rounded-lg bg-sidebar-accent p-3',
              collapsed && 'lg:justify-center lg:p-2'
            )}
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <span className="text-sm font-semibold">AD</span>
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="truncate text-xs text-sidebar-foreground/60">admin@college.edu</p>
              </div>
            )}
            {!collapsed && (
              <button className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-border hover:text-sidebar-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
