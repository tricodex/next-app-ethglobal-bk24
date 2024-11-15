// src/providers/sidebar-provider.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  state: 'expanded' | 'collapsed';
  setState: (state: 'expanded' | 'collapsed') => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'expanded' | 'collapsed'>('expanded');

  return (
    <SidebarContext.Provider value={{ state, setState }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}