'use client';

import { InventoryProvider } from './context/InventoryContext';
import { XPProvider } from './context/XPContext';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <XPProvider>
      <InventoryProvider>{children}</InventoryProvider>
    </XPProvider>
  );
}
