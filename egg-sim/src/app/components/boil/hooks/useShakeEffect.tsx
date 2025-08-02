import { useEffect } from 'react';

export default function useShakeEffect(
  shakeIndex: number,
  shakeCount: number,
  setIsShaking: (isShaking: boolean) => void,
  setShakeIndex: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    if (shakeCount === 0 || shakeIndex >= shakeCount) return;

    const shakeDuration = 600;
    const delayBetweenShakes = 1000;
    const initialDelay = 2000;

    let shakeStartTimeout: NodeJS.Timeout;
    let shakeEndTimeout: NodeJS.Timeout;
    let nextShakeTimeout: NodeJS.Timeout;

    const startShake = () => {
      setIsShaking(true);
      shakeEndTimeout = setTimeout(() => {
        setIsShaking(false);
        nextShakeTimeout = setTimeout(() => {
          setShakeIndex((prev) => prev + 1);
        }, delayBetweenShakes);
      }, shakeDuration);
    };

    if (shakeIndex === 0) {
      shakeStartTimeout = setTimeout(startShake, initialDelay);
    } else {
      startShake();
    }

    return () => {
      clearTimeout(shakeStartTimeout);
      clearTimeout(shakeEndTimeout);
      clearTimeout(nextShakeTimeout);
    };
  }, [shakeIndex, shakeCount, setIsShaking, setShakeIndex]);
}
