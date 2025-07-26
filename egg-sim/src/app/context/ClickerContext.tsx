import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

interface ClickerContextProps {
  chickenAmount: number;
  cursorIncreasePerClick: number;
  incrementChickenAmount: (amount: number) => void;
  resetChickenAmount: () => void;
  perSecond: number;
  incrementPerSecond: (amount: number) => void;
  resetPerSecond: () => void;
}

const ClickerContext = createContext<ClickerContextProps | undefined>(
  undefined
);

interface ClickerProviderProps {
  children: ReactNode;
}

export function ClickerProvider({ children }: ClickerProviderProps) {
  const [chickenAmount, setChickenAmount] = useState(0);
  const [perSecond, setPerSecond] = useState(0);
  const [cursorIncreasePerClick, setCursorIncreasePerClick] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem('chickenAmount');
    if (stored) {
      setChickenAmount(parseInt(stored, 10));
    }

    const storedPerSecond = localStorage.getItem('perSecond');
    if (storedPerSecond) {
      setPerSecond(parseInt(storedPerSecond, 10));
    }

    const storedCursorIncreasePerClick = localStorage.getItem(
      'cursorIncreasePerClick'
    );
    if (storedCursorIncreasePerClick) {
      setCursorIncreasePerClick(parseInt(storedCursorIncreasePerClick, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chickenAmount', chickenAmount.toString());
  }, [chickenAmount]);

  useEffect(() => {
    localStorage.setItem('perSecond', perSecond.toString());
  }, [perSecond]);

  useEffect(() => {
    localStorage.setItem(
      'cursorIncreasePerClick',
      cursorIncreasePerClick.toString()
    );
  }, [cursorIncreasePerClick]);

  const incrementChickenAmount = useCallback((amount = 1) => {
    setChickenAmount((prev) => prev + amount);
  }, []);

  const resetChickenAmount = useCallback(() => {
    setChickenAmount(0);
  }, []);

  const incrementPerSecond = useCallback((amount: number) => {
    setPerSecond((prev) => prev + amount);
  }, []);

  const resetPerSecond = useCallback(() => {
    setPerSecond(0);
  }, []);

  const value = useMemo(
    () => ({
      chickenAmount,
      cursorIncreasePerClick,
      incrementChickenAmount,
      resetChickenAmount,
      perSecond,
      incrementPerSecond,
      resetPerSecond,
    }),
    [
      chickenAmount,
      cursorIncreasePerClick,
      incrementChickenAmount,
      resetChickenAmount,
      perSecond,
      incrementPerSecond,
      resetPerSecond,
    ]
  );

  return (
    <ClickerContext.Provider value={value}>{children}</ClickerContext.Provider>
  );
}

export function useClicker() {
  const context = useContext(ClickerContext);
  if (!context) {
    throw new Error('useClicker must be used within an ClickerProvider');
  }
  return context;
}
