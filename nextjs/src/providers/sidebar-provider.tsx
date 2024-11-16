"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SidebarState = "expanded" | "collapsed";

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
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state") as SidebarState;
    if (savedState) setState(savedState);

    // Handle mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStateChange = (newState: SidebarState) => {
    setState(newState);
    localStorage.setItem("sidebar-state", newState);
  };

  const toggleSidebar = () => {
    const newState = state === "expanded" ? "collapsed" : "expanded";
    handleStateChange(newState);
  };

  const contextValue: SidebarContext = {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}