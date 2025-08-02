import { useEffect } from 'react';

export default function useShakeComplete( // used for pot shakes and whether or not to show the result if the user did not click next yet
  shakeIndex: number,
  shakeCount: number,
  setShowReady: (value: boolean) => void
) {
  useEffect(() => {
    if (shakeIndex === shakeCount && shakeCount > 0) {
      setShowReady(true);
    }
  }, [shakeIndex, shakeCount, setShowReady]);
}
