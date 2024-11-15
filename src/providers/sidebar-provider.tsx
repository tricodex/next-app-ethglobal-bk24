// src/providers/sidebar-provider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SidebarState = "expanded" | "collapsed";

// interface SidebarContext {
//   state: SidebarState;
//   setState: (state: SidebarState) => void;
// }

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SidebarState>("expanded");

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state") as SidebarState;
    if (savedState) setState(savedState);
  }, []);

  const handleStateChange = (newState: SidebarState) => {
    setState(newState);
    localStorage.setItem("sidebar-state", newState);
  };

  return (
    <SidebarContext.Provider value={{ state, setState: handleStateChange }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}