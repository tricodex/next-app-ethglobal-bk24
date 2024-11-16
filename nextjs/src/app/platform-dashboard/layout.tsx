// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { SideNav } from "@/components/sidenav";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { useSidebar } from "@/providers/sidebar-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { state } = useSidebar();

  return (
    <main
      className={`flex-1 transition-all duration-300 ease-in-out ${
        state === "expanded" ? "ml-56" : "ml-16"
      }`}
    >
      {children}
    </main>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <SideNav />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
    </TooltipProvider>
  );
}