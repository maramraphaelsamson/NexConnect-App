"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@/firebase';
import type { User } from 'firebase/auth';

type Mode = 'Personal' | 'Business';

interface AppContextType {
  mode: Mode;
  toggleMode: () => void;
  user: User | null;
  isUserLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('Personal');
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (mode === 'Business') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'Personal' ? 'Business' : 'Personal'));
  };

  return (
    <AppContext.Provider value={{ mode, toggleMode, user, isUserLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
