import { useEffect, useState } from 'react';

export default function useSeasoningSequence({
  startSeasoningIntro,
  setTypedText,
  indexRef,
  setShowSaltTable,
  setShowSaltShaker,
  setShowPepperTable,
  setShowPepperShaker,
  setShowResult,
  setShowNextCookingButton,
}: {
  startSeasoningIntro: boolean;
  setTypedText: (v: string | ((prev: string) => string)) => void;
  indexRef: React.MutableRefObject<number>;
  setShowSaltTable: (v: boolean) => void;
  setShowSaltShaker: (v: boolean) => void;
  setShowPepperTable: (v: boolean) => void;
  setShowPepperShaker: (v: boolean) => void;
  setShowResult: (v: boolean) => void;
  setShowNextCookingButton: (v: boolean) => void;
}) {
  const [seasoningStep, setSeasoningStep] = useState(0);

  const stepDelays = new Map<number, number>([
    [1, 1500],
    [2, 1500],
  ]);

  const seasoningIntro =
    ' The last thing in our frying process is going to be seasoning! Nobody likes things unseasoned unless you are an unseasoned person! So, we’ll first start with salt!';
  const pepperIntro =
    ' Now, we are going to add a dash of pepper for the final touch! ';

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

  function handleNextSeasoningStep() {
    setShowNextCookingButton(false);
    setSeasoningStep((prev) => prev + 1);
  }

  useEffect(() => {
    if (!startSeasoningIntro) {
      setTypedText('');
      setShowNextCookingButton(false);
      setSeasoningStep(0);
      return;
    }

    if (seasoningStep === 0) {
      // wait for user to click the next button before the seasoning intro starts
      setShowNextCookingButton(true);
    }

    if (seasoningStep === 1) {
      typeText(seasoningIntro, 1, () => {
        setShowSaltTable(false);
        setShowSaltShaker(true);
        setTimeout(() => {
          setShowSaltShaker(false);
          setShowSaltTable(true);
        }, 1000);
      });
    }

    if (seasoningStep === 2) {
      typeText(pepperIntro, 2, () => {
        setShowPepperTable(false);
        setShowPepperShaker(true);
        setTimeout(() => {
          setShowPepperShaker(false);
          setShowPepperTable(true);
        }, 1000);
      });
    }

    if (seasoningStep === 3) {
      setShowResult(true);
    }
  }, [startSeasoningIntro, seasoningStep]);

  return { handleNextSeasoningStep };
}
