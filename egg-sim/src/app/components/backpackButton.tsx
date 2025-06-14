import { useState } from 'react';
import Image from 'next/image';

interface BackpackButtonProps {
  setOpenInventory: () => void;
}

export default function BackpackButton({
  setOpenInventory,
}: BackpackButtonProps) {
  const [isBackpackHovered, setIsBackpackHovered] = useState(false);

  return (
    <div
      className="relative inline-block w-[5rem] h-[5rem] ml-3 mt-[10rem]"
      onMouseEnter={() => setIsBackpackHovered(true)}
      onMouseLeave={() => setIsBackpackHovered(false)}
    >
      <Image
        src={
          isBackpackHovered
            ? '/inventory/backpack_open.svg'
            : '/inventory/backpack.svg'
        }
        alt=""
        width={75}
        height={75}
        className={isBackpackHovered ? 'scale-113 ml-[0.3rem] mt-[0.2rem]' : ''}
      />
      <button
        className="absolute inset-0 w-full h-full no-hover"
        onClick={setOpenInventory}
      ></button>
    </div>
  );
}
