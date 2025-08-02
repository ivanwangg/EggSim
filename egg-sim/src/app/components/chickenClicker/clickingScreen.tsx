import { useClicker } from '@/app/context/ClickerContext';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
export default function ClickingScreen() {
  const {
    chickenAmount,
    cursorIncreasePerClick,
    incrementChickenAmount,
    perSecond,
    incrementPerSecond,
  } = useClicker();

  const [isClicked, setIsClicked] = useState(false);
  const clickCooldown = useRef(false);

  const handleClick = useCallback(() => {
    if (clickCooldown.current) return;

    clickCooldown.current = true;
    setIsClicked(true);

    setTimeout(() => {
      incrementChickenAmount(cursorIncreasePerClick);
      setIsClicked(false);
      clickCooldown.current = false;
    }, 50);
  }, [cursorIncreasePerClick, incrementChickenAmount]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[6rem] flex flex-col justify-center items-center">
        <p className="font-bold text-2xl text-center text-white stroke-4 stroke-black">
          {chickenAmount} Chickens
          <br />
          per second: {perSecond}
        </p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <button
          className="w-[22rem] h-[25rem] flex justify-center items-center cursor-pointer no-hover rounded-full overflow-hidden"
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image
            src="/clicker/egg_click.svg"
            alt="chicken"
            width={300}
            height={300}
            className={`transform duration-100 ${
              isClicked ? 'scale-105' : 'scale-100'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
