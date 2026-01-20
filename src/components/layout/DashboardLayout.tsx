import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto p-4 pt-20 lg:p-6 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
