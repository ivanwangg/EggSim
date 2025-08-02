import { useEffect } from 'react';

export default function useShakeTriggerOnLid(
  showPotWithLid: boolean,
  cookTime: number,
  setShakeCount: (count: number) => void,
  setShakeIndex: (index: number) => void
) {
  useEffect(() => {
    if (showPotWithLid) {
      const count = Math.min(5, Math.floor(cookTime)); // cap at 5 shakes
      setShakeCount(count);
      setShakeIndex(0);
    }
  }, [showPotWithLid, cookTime, setShakeCount, setShakeIndex]);
}
