'use client';

import { useState, useEffect } from 'react';
import { useInventory } from './context/InventoryContext';
import { Item } from './types/Item';

import Spinner from './components/spinner';

export default function Home() {
  const { addItem } = useInventory();

  const [result, setResult] = useState<Item | null>(null);
  const [balance, setBalance] = useState<number>(500);

  useEffect(() => {
    const saved = localStorage.getItem('balance');
    if (saved) {
      setBalance(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  const handleAddChicken = () => {
    addItem({
      id: 'chick-blue',
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-amber-200">
      hello
      <div className="text-lg">
        Your Balance: <span className="text-yellow-400">{balance} 🪙</span>
      </div>
      <Spinner
        itemWon={(e) => setResult(e)}
        balance={balance}
        setBalance={setBalance}
        costPerSpin={1}
      />
    </div>
  );
}
