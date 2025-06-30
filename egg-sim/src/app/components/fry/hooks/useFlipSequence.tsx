import { useEffect } from 'react';

export default function useFlipSequence({
  flipIntro,
  cookTime,
  flipCount,
  flipIndex,
  showEggCracked,
  setFlipCount,
  setFlipIndex,
  setIsSpatulaDone,
  setIsSpatulaMove,
  setStartSeasoningIntro,
  setAnimationKey,
  setStartAnimation,
  setShowEggCracked,
}: {
  flipIntro: boolean;
  cookTime: number;
  flipCount: number;
  flipIndex: number;
  showEggCracked: boolean;
  setFlipCount: React.Dispatch<React.SetStateAction<number>>;
  setFlipIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsSpatulaDone: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSpatulaMove: React.Dispatch<React.SetStateAction<boolean>>;
  setStartSeasoningIntro: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimationKey: React.Dispatch<React.SetStateAction<number>>;
  setStartAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEggCracked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // start animation after delay of egg cracking
  useEffect(() => {
    if (showEggCracked) {
      const timer = setTimeout(() => {
        setShowEggCracked(false);
        setAnimationKey((prev) => prev + 1);
        setStartAnimation(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [showEggCracked]);

  // get number of flips
  useEffect(() => {
    if (flipIntro) {
      const getFlipCount = (cookTime: number) => {
        if (cookTime < 4) return 1;
        if (cookTime < 7) return 2;
        return 3;
      };

      setFlipCount(getFlipCount(cookTime));
      setFlipIndex(0);
    }
  }, [flipIntro, cookTime]);

  // flip animation portion
  useEffect(() => {
    if (flipCount === 0 || flipIndex >= flipCount) return;

    setIsSpatulaDone(true);
    setIsSpatulaMove(true);

    const duration = 4500;

    const timer = setTimeout(() => {
      setIsSpatulaMove(false);
      setFlipIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [flipIndex, flipCount]);

  // start the seasoning intro after flips are done, when the user clicks the next button
  useEffect(() => {
    if (flipIndex === flipCount && flipCount > 0) {
      setIsSpatulaDone(false);
      setTimeout(() => {
        setStartSeasoningIntro(true);
      }, 800);
    }
  }, [flipIndex, flipCount]);
}
