import { useState } from 'react';

interface BackpackButtonProps {
  setOpenInventory: () => void;
}

export default function BackpackButton({
  setOpenInventory,
}: BackpackButtonProps) {
  const [isBackpackHovered, setIsBackpackHovered] = useState(false);

  return (
    <div
      className="relative inline-block w-[4rem] h-[5rem] ml-[8rem] mt-[15rem]"
      onMouseEnter={() => setIsBackpackHovered(true)}
      onMouseLeave={() => setIsBackpackHovered(false)}
    >
      <img
        src={
          isBackpackHovered
            ? '/inventory/backpack_open.svg'
            : '/inventory/backpack.svg'
        }
        className={
          isBackpackHovered
            ? 'w-full h-full scale-113 ml-[0.3rem]'
            : 'w-full h-full'
        }
      />
      <button
        className="absolute inset-0 w-full h-full no-hover"
        onClick={setOpenInventory}
      ></button>
    </div>
  );
}
