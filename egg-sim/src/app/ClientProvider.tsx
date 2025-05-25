'use client';

import { XPProvider } from './context/XPContext';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <XPProvider>
      {children}
    </XPProvider>
  );
}
