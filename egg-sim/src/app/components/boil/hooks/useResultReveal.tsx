import { useEffect } from 'react';

export default function useResultReveal(
  showResult: boolean,
  cookTime: number,
  setResultSVG: (url: string) => void,
  setShowBackButton: (show: boolean) => void
) {
  useEffect(() => {
    if (!showResult) return;

    const timer = setTimeout(() => {
      if (cookTime < 1) {
        setResultSVG('/boil/result/egg_boiled_1_mins.svg');
      } else if (cookTime <= 2) {
        setResultSVG('/boil/result/egg_boiled_2_mins.svg');
      } else if (cookTime <= 3) {
        setResultSVG('/boil/result/egg_boiled_half_3_mins.svg');
      } else if (cookTime <= 6) {
        setResultSVG('/boil/result/egg_boiled_half_4-6_mins.svg');
      } else {
        setResultSVG('/boil/result/egg_boiled_half_7-10_mins.svg');
      }

      setTimeout(() => {
        setShowBackButton(true);
      }, 1000);
    }, 800);

    return () => clearTimeout(timer);
  }, [showResult, cookTime, setResultSVG, setShowBackButton]);
}
