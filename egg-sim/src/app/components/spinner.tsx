'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Item, allItems } from '../types/Item';

interface SpinnerProps {
  itemWon: (item: Item) => void;
  balance: number;
  setBalance: (value: number) => void;
  costPerSpin: number;
}

const DEFAULT_ITEM: Item = {
  id: 'default',
  name: 'Default Item',
  icon: '/hen-skin/hen_skin_pirate.svg',
};

export default function Spinner({
  itemWon,
  balance,
  setBalance,
  costPerSpin,
}: SpinnerProps) {
  const [winner, setWinner] = useState<Item | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [spinPosition, setSpinPosition] = useState(0);

  useEffect(() => {
    const initialItems = Array(10)
      .fill(null)
      .map(() => {
        return (
          allItems[Math.floor(Math.random() * allItems.length)] || DEFAULT_ITEM
        );
      });
    setDisplayItems(initialItems);
  }, []);

  const spin = async () => {
    if (spinning) return;
    if (balance < costPerSpin) {
      alert('Not enough coins!');
      return;
    }

    setSpinning(true);
    setWinner(null);
    setBalance(balance - costPerSpin);

    const fastSpins = Math.floor(Math.random() * 5) + 15;
    for (let i = 0; i < fastSpins; i++) {
      setSpinPosition((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    const slowSpins = Math.floor(Math.random() * 2) + 8;
    for (let i = 0; i < slowSpins; i++) {
      setSpinPosition((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 100 + i * 20));
    }

    const finalPosition = spinPosition + fastSpins + slowSpins;
    const visibleCenterIndex = (finalPosition + 2) % displayItems.length;
    const finalWinner = displayItems[visibleCenterIndex] || DEFAULT_ITEM;

    setWinner(finalWinner);
    itemWon(finalWinner);
    setSpinning(false);
  };

  const visibleItems = Array(5)
    .fill(null)
    .map((_, i) => {
      const index = (spinPosition + i) % displayItems.length;
      return displayItems[index] || DEFAULT_ITEM;
    });

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full max-w-md h-32 bg-gray-100 rounded-xl border-4 border-amber-400 overflow-hidden">
        <div className="flex h-full items-center">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`flex-shrink-0 w-1/5 h-full flex flex-col items-center justify-center p-2 transition-all
                ${index === 2 ? 'scale-110' : 'scale-90 opacity-80'}
              `}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Image
                  src={item.icon || DEFAULT_ITEM.icon}
                  alt={item.name || item.id}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_ITEM.icon!;
                  }}
                  width={64}
                  height={64}
                />
                {!spinning &&
                  winner &&
                  index === 2 &&
                  winner.id === item.id && (
                    <div className="absolute inset-0 border-2 border-amber-400 rounded-md animate-pulse"></div>
                  )}
              </div>
              <div className="text-center mt-1 text-xs font-semibold">
                {item.name || item.id}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-amber-400 z-10"></div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2
          ${
            spinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }
          transition-colors duration-400
        `}
      >
        {spinning ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Spinning...
          </>
        ) : (
          `Spin (${costPerSpin} 🪙)`
        )}
      </button>

      {winner && !spinning && (
        <div className="mt-2 p-3 bg-amber-100 rounded-lg text-center animate-bounce">
          <div className="text-lg font-bold">You won:</div>
          <div className="text-xl font-extrabold text-amber-600">
            {winner.name || winner.id}
          </div>
        </div>
      )}
    </div>
  );
}
