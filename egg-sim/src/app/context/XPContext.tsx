'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface XPContextProps {
  currentXP: number;
  maxXP: number;
  level: number;
  setCurrentXP: (xp: number) => void;
  setCurrentLevel: (level: number) => void;
}

const XPContext = createContext<XPContextProps | undefined>(undefined);

interface XPProviderProps {
  children: ReactNode;
}

export function XPProvider({ children }: XPProviderProps) {
  const [currentXP, setCurrentXP] = useState(0);
  const maxXP = 100;
  const [level, setCurrentLevel] = useState(1);

  const value: XPContextProps = {
    currentXP,
    maxXP,
    level,
    setCurrentXP,
    setCurrentLevel,
  };

  return (
    <XPContext.Provider value={value}>
      {children}
    </XPContext.Provider>
  )
}

export function useXP() {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}
