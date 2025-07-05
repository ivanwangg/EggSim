import { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextProps {
  balance: number;
  setBalance: (balance: number) => void;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(
  undefined
);

interface BalanceProviderProps {
  children: ReactNode;
}

export function BalanceProvider({ children }: BalanceProviderProps) {
  const [balance, setBalance] = useState(100);

  const value: BalanceContextProps = {
    balance,
    setBalance,
  };

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within an BalanceProvider');
  }
  return context;
}
