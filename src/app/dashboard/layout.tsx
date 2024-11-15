// src/app/dashboard/layout.tsx
'use client';

import { SidebarProvider } from '@/providers/sidebar-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

import { SideNav } from '@/components/sidenav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
    <SidebarProvider>
    <SideNav />

      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
    </TooltipProvider>

  );
}