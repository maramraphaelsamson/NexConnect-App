"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@/firebase';
import type { User } from 'firebase/auth';

type Mode = 'Personal' | 'Business';
type Theme = 'light' | 'dark';

interface AppContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  user: User | null;
  isUserLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('Personal');
  const [theme, setTheme] = useState<Theme>('light');
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Apply the theme to the document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'Personal' ? 'Business' : 'Personal'));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <AppContext.Provider value={{ mode, toggleMode, setMode, theme, toggleTheme, setTheme, user, isUserLoading }}>
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
