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
      {/** Black Background behind the Inv Ui */}
      <div
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
      />

      {/** Inv UI */}
      <div
        className={`relative w-[95%] h-[95%] z-10 flex flex-col transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        //background for the whole UI
        style={{
          backgroundImage: 'url(/inventory/inv_taller_v3.svg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/** Top row */}
        <div
          className="w-full h-[10rem] flex flex-row justify-center items-center"
          style={{
            backgroundImage: 'url(/inventory/heading_sign_v3.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'SignFont',
          }}
        >
          {/** spacing */}
          <div className="w-[20rem] h-full" />
          {/** Collection sign */}
          <p className="w-[40rem] h-full flex flex-row text-7xl justify-center items-center text-white">
            Collection
          </p>
          {/** Return button */}
          <div className="w-[20rem] h-full flex flex-row text-white text-4xl">
            <button
              className="w-[12rem] relative top-[2rem] pt-4"
              onClick={handleClose}
              style={{
                backgroundImage: 'url(/inventory/return_button.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: 'SignFont',
              }}
            >
              Return
            </button>
          </div>
        </div>

        {/** Body */}

        {/** Chicken inv */}
        <div className="flex flex-row justify-center items-center w-[80%] h-[60%] mx-auto">
          <div className="w-[60%] h-full flex flex-wrap justify-center items-center content-start overflow-auto">
            {allItems.map((item) => {
              const collected = items.some((i) => i.id === item.id);

              return (
                <div
                  key={item.id}
                  className={`relative w-[6rem] h-[6rem] rounded-2xl m-2 flex justify-center items-center transition-opacity ${
                    collected ? 'opacity-100' : 'opacity-50'
                  }`}
                  style={{
                    backgroundImage: 'url(/inventory/slot_background_v2.svg)',
                    backgroundSize: '110%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
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
          {/** Description Section */}
          {/** background */}
          <div
            className="flex flex-col w-[40%] h-full items-center"
            style={{
              backgroundImage: 'url(/inventory/scroll.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '10vh',
              fontFamily: 'DescFont',
            }}
          >
            {/** chicken name */}
            <div className="w-full h-[20%] pt-10 flex flex-wrap justify-center content-start overflow-hidden font-bold text-5xl">
              Hello
            </div>
            {/** chicken selfie */}
            <img
              src="real-chicken/brown_chicken.jpeg"
              className="w-75 h-[40%] mr-2 border-5"
              style={{ borderColor: '#D4AA8D' }}
            />
            {/** chicken desc*/}
            <div className="w-[80%] h-[40%] flex flex-wrap justify-center content-start pl-3 pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
        {/** other stuff */}
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
