import { useContext, createContext, useState, ReactNode } from "react";
import { Item } from "../types/Item";
import { useEffect } from "react";


interface InventoryContextProps {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems(prev => [...prev, item]);
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const value: InventoryContextProps = {
    items,
    addItem,
    removeItem,
  }

  // Load inventory from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem("inventory");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save inventory to localStorage on every change
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(items));
  }, [items]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider")
  }
  return context
}