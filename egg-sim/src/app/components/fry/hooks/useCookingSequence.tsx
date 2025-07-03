import { useEffect, useState } from 'react';

export default function useCookingSequence({
  clickedNext,
  cookTime,
  setTypedText,
  indexRef,
  setClickedNext,
  setShowBackButton,
  setShowOilBottle,
  setShowOilPourSprite,
  setIsEggVisible,
  setShowEggSlam,
  setShowEggPoof,
  setShowEggCracked,
  setStartAnimation,
  setIsSpatulaMove,
  setFlipIntro,
  setShowResult,
  setResultSVG,
  getInstructionForTime,
  setShowNextCookingButton,
  setStartSeasoningIntro,
}: {
  clickedNext: boolean;
  cookTime: number;
  setTypedText: (v: string | ((prev: string) => string)) => void;
  indexRef: React.MutableRefObject<number>;
  setClickedNext: (v: boolean) => void;
  setShowBackButton: (v: boolean) => void;
  setShowOilBottle: (v: boolean) => void;
  setShowOilPourSprite: (v: boolean) => void;
  setIsEggVisible: (v: boolean) => void;
  setShowEggSlam: (v: boolean) => void;
  setShowEggPoof: (v: boolean) => void;
  setShowEggCracked: (v: boolean) => void;
  setStartAnimation: (v: boolean) => void;
  setIsSpatulaMove: (v: boolean) => void;
  setFlipIntro: (v: boolean) => void;
  setShowResult: (v: boolean) => void;
  setResultSVG: (v: string) => void;
  getInstructionForTime: (cookTime: number) => string;
  setShowNextCookingButton: (v: boolean) => void;
  setStartSeasoningIntro: (v: boolean) => void;
}) {
  const [cookingStep, setCookingStep] = useState(0);

  // delays for each step after typing finishes before showing the next button
  const stepDelays = new Map<number, number>([
    [0, 1500],
    [1, 3000],
    [2, 1500],
    [3, 7000],
  ]);

  const oilIntro =
    ' First step is to pour the bottle of olive oil on the pan! This is crucial because the oil creates a non-stick surface for the egg, allowing it to cook evenly without sticking to the pan. ';
  const eggIntro =
    ' Second step is to crack the egg! This step is important because you need to introduce the egg into the pan, and cracking it correctly ensures the egg white and yolk stay intact. ';
  const letSitIntro =
    ' Now, let the egg sit on the pan for a moment to cook properly. It’s important to give the egg time to firm up and cook the white completely before flipping it. Patience is key for the perfect egg! ';
  const flipIntro =
    ' Third step is to flip the egg with your spatula! Flipping the egg is necessary to ensure it cooks evenly on both sides and gives you control over the egg’s doneness. ';

  function typeText(text: string, step: number, callback: () => void) {
    setTypedText('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < text.length - 1) {
        indexRef.current++;
        setTypedText((prev) => prev + text[indexRef.current]);
      } else {
        clearInterval(interval);
        callback();

        const delay = stepDelays.get(step) ?? 1000;
        setTimeout(() => {
          setShowNextCookingButton(true);
        }, delay);
      }
    }, 40);
  }

  function handleNextCookingStep() {
    setShowNextCookingButton(false);
    setCookingStep((prev) => {
      const nextStep = prev + 1;
      if (nextStep > 3) {
        setStartSeasoningIntro(true); // triggers seasoning
      }
      return nextStep;
    });
  }

  useEffect(() => {
    if (!clickedNext) {
      setTypedText('');
      setShowNextCookingButton(false);
      setCookingStep(0);
      return;
    }

    if (cookTime < 1 || cookTime > 10) {
      const warning = getInstructionForTime(cookTime);
      typeText(warning, cookingStep, () => {
        setShowResult(true);
        setResultSVG(
          cookTime < 1
            ? '/fry/result/egg_cooked_0_mins.svg'
            : '/fry/result/egg_cooked_10_mins.svg'
        );
        setShowBackButton(true);
      });
      return;
    }

    if (cookingStep === 0) {
      typeText(oilIntro, cookingStep, () => {
        setShowOilBottle(false);
        setShowOilPourSprite(true);
        setTimeout(() => {
          setShowOilPourSprite(false);
          setShowOilBottle(true);
        }, 1000);
      });
    }
    // egg cracking animations
    if (cookingStep === 1) {
      typeText(eggIntro, cookingStep, () => {
        setIsEggVisible(false);
        setShowEggSlam(true);
        setTimeout(() => {
          setShowEggPoof(true);
          setShowEggSlam(false);
          setTimeout(() => {
            setShowEggPoof(false);
            setShowEggCracked(true);
            setTimeout(() => {
              setShowEggCracked(false);
              setStartAnimation(true);
            }, 600);
          }, 800);
        }, 500);
      });
    }

    // waiting portion
    if (cookingStep === 2) {
      typeText(letSitIntro, cookingStep, () => {});
    }

    // flipping portion
    if (cookingStep === 3) {
      typeText(flipIntro, cookingStep, () => {
        setTimeout(() => {
          setIsSpatulaMove(true);
          setFlipIntro(true);
        }, 600);
      });
    }
  }, [clickedNext, cookingStep]);

  return { handleNextCookingStep };
}
