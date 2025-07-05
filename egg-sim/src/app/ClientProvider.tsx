'use client';

import { BalanceProvider } from './context/BalanceContext';
import { InventoryProvider } from './context/InventoryContext';
import { XPProvider } from './context/XPContext';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <XPProvider>
      <BalanceProvider>
        <InventoryProvider>{children}</InventoryProvider>
      </BalanceProvider>
    </XPProvider>
  );
}
