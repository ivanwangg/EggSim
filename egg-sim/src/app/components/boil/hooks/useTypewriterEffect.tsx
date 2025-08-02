import { useEffect, MutableRefObject, useState } from 'react';

interface UseBoilTypewriterEffectProps {
  clickedNext: boolean;
  cookTime: number;
  showReady: boolean;
  setTypedText: (v: string | ((prev: string) => string)) => void;
  setBackgroundStage: (stage: number) => void;
  setShowWaterPot: (show: boolean) => void;
  setShowBigWaterPot: (show: boolean) => void;
  setIsEggVisible: (show: boolean) => void;
  setShowBoilingPot: (show: boolean) => void;
  setShowEggDrop: (show: boolean) => void;
  setShowSplash: (show: boolean) => void;
  setShowBoilingEggPot: (show: boolean) => void;
  setShowPotWithLid: (show: boolean) => void;
  setShowResult: (show: boolean) => void;
  setResultSVG: (svg: string) => void;
  setShowBackButton: (show: boolean) => void;
  getInstructionForTime: (time: number) => string;
  indexRef: MutableRefObject<number>;
  setShowNextBoilButton: (show: boolean) => void;
}

export default function useBoilTypewriterEffect({
  clickedNext,
  cookTime,
  showReady,
  setTypedText,
  setBackgroundStage,
  setShowWaterPot,
  setShowBigWaterPot,
  setIsEggVisible,
  setShowBoilingPot,
  setShowEggDrop,
  setShowSplash,
  setShowBoilingEggPot,
  setShowPotWithLid,
  setShowResult,
  setResultSVG,
  setShowBackButton,
  getInstructionForTime,
  indexRef,
  setShowNextBoilButton,
}: UseBoilTypewriterEffectProps) {
  const [boilStep, setBoilStep] = useState(0);

  const stepDelays = new Map<number, number>([
    [0, 1000],
    [1, 2000],
    [2, 10000],
    [3, 20000],
  ]);

  const boilIntro = ' First, turn on the stove and bring the water to a boil. ';
  const boiledIntro = ' Now, with the pot boiling, it is time for the egg! ';
  const dropIntro = ' Next, gently place the egg into the boiling pot. ';
  const waitIntro =
    ' Now, let it simmer and wait for the perfect consistency! To keep the heat trapped, we will put the lid back on the pot. ';
  const finalStepText = ' All done! Here is your perfectly boiled egg. ';

  function typeText(text: string, step: number, callback?: () => void) {
    setTypedText('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < text.length - 1) {
        indexRef.current++;
        setTypedText((prev) => prev + text[indexRef.current]);
      } else {
        clearInterval(interval);
        callback?.();

        // show next button only when step is over so as to not prematurely trigger and mess it up
        if (step !== 0 && step !== 3) {
          // so the next button doesn't show on the result page in the background

          const delay = stepDelays.get(step) ?? 1000;
          setTimeout(() => {
            setShowNextBoilButton(true);
          }, delay);
        }
      }
    }, 40);
  }

  function handleNextBoilStep() {
    setShowNextBoilButton(false);
    setBoilStep((prev) => Math.min(prev + 1, 3)); // add step 3 as final step
  }

  useEffect(() => {
    if (!clickedNext) {
      setTypedText('');
      setShowNextBoilButton(false);
      setBoilStep(0);
      setShowResult(false); // ensure result hidden if not clickedNext
      return;
    }

    // WARNING PATH
    if (cookTime < 1 || cookTime > 10) {
      const warning = getInstructionForTime(cookTime);
      typeText(warning, boilStep, () => {
        setShowResult(true);
        setResultSVG(
          cookTime < 1
            ? '/boil/result/egg_boiled_1_mins.svg'
            : '/boil/result/egg_boiled_7-10_mins.svg'
        );
        setShowBackButton(true);
      });
      return;
    }

    // NORMAL FLOW
    if (boilStep === 0) {
      typeText(boilIntro, boilStep, () => {
        setTypedText('');
        setBackgroundStage(3);
        setShowWaterPot(false);
        setShowBigWaterPot(true);
        setIsEggVisible(false);

        setTimeout(() => {
          setBackgroundStage(0);
          setShowBigWaterPot(false);
          setShowBoilingPot(true);

          // Insert boiledIntro text after setBackgroundStage(0)
          typeText(boiledIntro, boilStep, () => {
            setShowNextBoilButton(true);
          });
        }, 3000); // After 3 seconds delay
      });
    }

    if (boilStep === 1) {
      typeText(dropIntro, boilStep, () => {
        setShowEggDrop(true);
        setTimeout(() => {
          setShowSplash(true);
          setTimeout(() => {
            setShowEggDrop(false);
            setShowSplash(false);
          }, 800);
        }, 500);
      });
    }

    if (boilStep === 2) {
      setShowBoilingPot(false);
      setShowBoilingEggPot(true);
      typeText(waitIntro, boilStep, () => {
        setShowBoilingEggPot(false);
        setShowPotWithLid(true);
      });
    }

    if (boilStep === 3 && showReady) {
      // final step: user clicked next again to reveal the result
      setShowNextBoilButton(false);
      typeText(finalStepText, boilStep, () => {
        setShowResult(true);
        setResultSVG(
          cookTime <= 4
            ? '/boil/result/egg_boiled_3-4_mins.svg'
            : cookTime <= 6
              ? '/boil/result/egg_boiled_5-6_mins.svg'
              : '/boil/result/egg_boiled_7-10_mins.svg'
        );
        setShowBackButton(true);
      });
    }
  }, [clickedNext, boilStep]);

  return { handleNextBoilStep };
}
