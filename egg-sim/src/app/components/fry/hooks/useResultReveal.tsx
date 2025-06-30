import { useEffect } from 'react';

export default function useResultReveal({
  showResult,
  cookTime,
  setResultSVG,
  setShowBackButton,
}: {
  showResult: boolean;
  cookTime: number;
  setResultSVG: (v: string) => void;
  setShowBackButton: (v: boolean) => void;
}) {
  useEffect(() => {
    if (!showResult) return;

    const timeout = setTimeout(() => {
      let resultPath = '/fry/result/egg_cooked_10_mins.svg';

      if (cookTime < 1) {
        resultPath = '/fry/result/egg_cooked_0_mins.svg';
      } else if (cookTime <= 2) {
        resultPath = '/fry/result/egg_cooked_2_mins.svg';
      } else if (cookTime <= 3) {
        resultPath = '/fry/result/egg_cooked_3_mins.svg';
      } else if (cookTime <= 4) {
        resultPath = '/fry/result/egg_cooked_4_mins.svg';
      } else if (cookTime <= 5) {
        resultPath = '/fry/result/egg_cooked_5_mins.svg';
      } else if (cookTime <= 6) {
        resultPath = '/fry/result/egg_cooked_6_mins.svg';
      } else if (cookTime <= 7) {
        resultPath = '/fry/result/egg_cooked_7_mins.svg';
      } else if (cookTime <= 8) {
        resultPath = '/fry/result/egg_cooked_8_mins.svg';
      } else if (cookTime <= 9) {
        resultPath = '/fry/result/egg_cooked_9_mins.svg';
      }

      setResultSVG(resultPath);

      const backBtnTimeout = setTimeout(() => {
        setShowBackButton(true);
      }, 1000);

      return () => clearTimeout(backBtnTimeout);
    }, 800);

    return () => clearTimeout(timeout);
  }, [showResult, cookTime]);
}
