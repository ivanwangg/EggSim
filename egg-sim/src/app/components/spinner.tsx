'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Item, allItems } from '../types/Item';
import { useInventory } from '../context/InventoryContext';
import { useBalance } from '../context/BalanceContext';

interface SpinnerProps {
  costPerSpin: number;
  onClose: () => void;
}

const DEFAULT_ITEM: Item = {
  id: 'default',
  name: 'Default Item',
  icon: '/hen-skin/hen_skin_pirate.svg',
};

export default function Spinner({ costPerSpin, onClose }: SpinnerProps) {
  const [winner, setWinner] = useState<Item | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [spinPosition, setSpinPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { balance, setBalance } = useBalance();
  const spinningRef = useRef(false);

  const { addItem } = useInventory();

  useEffect(() => {
    setIsVisible(true);
    const initialItems = Array(10)
      .fill(null)
      .map(() => {
        return (
          allItems[Math.floor(Math.random() * allItems.length)] || DEFAULT_ITEM
        );
      });
    setDisplayItems(initialItems);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCloseWinner = () => {
    setShowWinner(false);
    setTimeout(() => {
      setWinner(null);
    }, 300);
  };

  const spin = async () => {
    if (spinningRef.current) return;
    spinningRef.current = true;
    setSpinning(true);
    setWinner(null);
    setShowWinner(false);
    setBalance(balance - 1);

    const newItems = Array(10)
      .fill(null)
      .map(() => {
        return (
          allItems[Math.floor(Math.random() * allItems.length)] || DEFAULT_ITEM
        );
      });
    setDisplayItems(newItems);
    setSpinPosition(0);

    const fastSpins = Math.floor(Math.random() * 5) + 35;
    const slowSpins = 15;
    const totalSpins = fastSpins + slowSpins;

    for (let i = 0; i < fastSpins; i++) {
      setSpinPosition((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    for (let i = 0; i < slowSpins; i++) {
      setSpinPosition((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 100 + i * 20));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    const visibleCenterIndex = (totalSpins + 2) % newItems.length;
    const finalWinner = newItems[visibleCenterIndex] || DEFAULT_ITEM;

    setWinner(finalWinner);
    addItem(finalWinner);
    setSpinning(false);
    spinningRef.current = false;

    setTimeout(() => {
      setShowWinner(true);
    }, 800);
  };

  const visibleItems = Array(5)
    .fill(null)
    .map((_, i) => {
      const index = (spinPosition + i) % displayItems.length;
      return displayItems[index] || DEFAULT_ITEM;
    });

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 select-none">
      <div
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
      />
      <div
        className={`bg-red-200 relative w-[70%] h-[70%] z-10 flex flex-col justify-start items-center transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-[20rem] flex flex-row justify-center items-center my-8">
          <p className="font-bold text-2xl">Available Coins: {balance}</p>
          <Image
            src="/spinner/coin.svg"
            alt="coin"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative w-full max-w-md h-32 bg-gray-100 rounded-xl border-4 border-amber-400 overflow-hidden">
            <div className="flex h-full items-center">
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}-${spinPosition}`}
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
                  </div>
                  <div className="text-center mt-1 text-xs font-semibold">
                    {item.name || item.id}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-amber-400 z-10 opacity-40"></div>
          </div>

          <button
            onClick={spin}
            disabled={spinning || balance <= 0 || winner !== null}
            className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2
              ${
                spinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }
              ${balance <= 0 ? 'no-hover' : ''}
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
              <>
                {balance <= 0 ? 'Insufficient Funds' : `Spin ${costPerSpin}`}
                <Image
                  src="/spinner/coin.svg"
                  alt="coin"
                  width={40}
                  height={40}
                  className="object-contain -mr-3 -ml-2"
                />
              </>
            )}
          </button>
        </div>

        {winner && (
          <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300
              ${showWinner ? 'opacity-100 scale-100' : 'opacity-0 scale-100 pointer-events-none'}
              bg-green-200`}
          >
            <div className="bg-amber-100 rounded-lg p-6 text-center shadow-lg">
              <div className="text-lg font-bold mb-2">You won:</div>
              <div className="text-xl font-extrabold text-amber-600">
                {winner.name || winner.id} Chicken
              </div>
            </div>
            <Image
              src={winner.icon || DEFAULT_ITEM.icon}
              alt={winner.name || winner.id}
              className="object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_ITEM.icon!;
              }}
              width={128}
              height={128}
            />
            <button
              className="w-[10rem] h-[5rem] mt-10 bg-blue-200"
              onClick={handleCloseWinner}
              disabled={spinning}
            >
              Close
            </button>
          </div>
        )}

        {!spinning && (
          <button
            className="w-[10rem] h-[5rem] mt-10 bg-blue-200"
            onClick={handleClose}
            disabled={winner !== null}
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
}
