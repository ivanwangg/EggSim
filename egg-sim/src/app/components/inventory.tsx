import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { allItems } from '../types/Item';
import Image from 'next/image';
import RemovalItemModal from './removalItemModal';
import InfoItemModal from './infoItemModal';
import { Item } from '../types/Item';

interface InventoryProps {
  onClose: () => void;
}

export default function Inventory({ onClose }: InventoryProps) {
  const [isVisible, setVisible] = useState(false);
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
  const [infoItem, setInfoItem] = useState<Item | null>(null);
  const [openInfo, setOpenInfo] = useState(false);

  const { items, removeItem } = useInventory();

  const itemToRemove = allItems.find((item) => item.id === confirmItemId);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-row justify-center items-center select-none">
      <div
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
      />
      <div
        className={`relative w-[90%] h-[90%] z-10 flex flex-col transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="w-full h-[5rem] flex flex-row justify-center items-center border-x-3 border-t-3 rounded-2xl border-black bg-blue-400">
          <div className="w-[20rem] h-full flex flex-row justify-center items-center">
            <button className="w-[7rem] font-bold" onClick={handleClose}>
              Return
            </button>
          </div>
          <p className="w-full h-full flex flex-row font-bold text-2xl justify-center items-center border-x-3 rounded-2xl border-black bg-amber-300">
            My Collection
          </p>
          <div className="w-[20rem] h-full" />
        </div>
        <div className="w-full h-full flex flex-wrap justify-center items-center border-3 rounded-2xl pt-7 content-start overflow-auto bg-green-300">
          {allItems.map((item) => {
            const collected = items.some((i) => i.id === item.id);

            return (
              <div
                key={item.id}
                className={`relative w-[7rem] h-[7rem] border-2 rounded-2xl m-2 flex justify-center items-center transition-opacity ${
                  collected
                    ? 'bg-white border-red-400 opacity-100'
                    : 'bg-gray-300 border-gray-400 opacity-50'
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  title={item.name}
                  className="object-contain"
                  width={90}
                  height={90}
                />
                {collected && (
                  <>
                    <button
                      onClick={() => setConfirmItemId(item.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs hover:bg-red-800"
                      title="Remove item"
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        setInfoItem(item);
                        setOpenInfo(true);
                      }}
                      className="absolute top-1 left-1 bg-red-600 text-white rounded-full w-9 h-5 flex justify-center items-center text-xs hover:bg-red-800"
                      title="Info"
                    >
                      Info
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
        {confirmItemId && (
          <RemovalItemModal
            itemToRemove={itemToRemove}
            removeItem={() => removeItem(confirmItemId)}
            setConfirmItemId={() => setConfirmItemId(null)}
          />
        )}
        {openInfo && infoItem && (
          <InfoItemModal
            setOpenInfo={() => {
              setOpenInfo(false);
              setInfoItem(null);
            }}
            item={infoItem}
          />
        )}
      </div>
    </div>
  );
}
