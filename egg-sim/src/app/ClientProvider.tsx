'use client';

import { BalanceProvider } from './context/BalanceContext';
import { ClickerProvider } from './context/ClickerContext';
import { InventoryProvider } from './context/InventoryContext';
import { XPProvider } from './context/XPContext';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <XPProvider>
      <BalanceProvider>
        <InventoryProvider>
          <ClickerProvider>{children}</ClickerProvider>
        </InventoryProvider>
      </BalanceProvider>
    </XPProvider>
  );
}
