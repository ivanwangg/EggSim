import { useState } from 'react';
import Image from 'next/image';

interface SpinnerButtonProps {
  setOpenMenu: () => void;
}

export default function SpinnerButton({ setOpenMenu }: SpinnerButtonProps) {
  const [isSlotHovered, setIsSlotHovered] = useState(false);

  return (
    <div
      className="relative inline-block w-[5rem] h-[5rem] ml-[3rem]"
      onMouseEnter={() => setIsSlotHovered(true)}
      onMouseLeave={() => setIsSlotHovered(false)}
    >
      <Image
        src={
          isSlotHovered
            ? '/spinner/coin_slot_v3_1.svg'
            : '/spinner/coin_slot_v3_0.svg'
        }
        alt=""
        width={75}
        height={75}
        className={`scale-135 ml-1`}
      />
      <button
        className="absolute inset-0 w-full h-full no-hover"
        onClick={setOpenMenu}
      ></button>
    </div>
  );
}
