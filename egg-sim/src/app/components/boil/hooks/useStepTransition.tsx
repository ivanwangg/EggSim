import { useEffect } from 'react';

export default function useStepTransitions(
  step: unknown,
  actions: {
    setShowPotSVG: any;
    setStep: any;
    setHideEverything: any;
    setIsEggVisible: any;
    setBackgroundStage: any;
    setTypedText: any;
    setShowPotWaterSVG: any;
    setShowWaterPot: any;
    setShowStep2Prompt: any;
    setShowFinalItems: any;
    setShowSlider: any;
    setShowNextButton: any;
  }
) {
  const {
    setShowPotSVG,
    setStep,
    setHideEverything,
    setIsEggVisible,
    setBackgroundStage,
    setTypedText,
    setShowPotWaterSVG,
    setShowWaterPot,
    setShowStep2Prompt,
    setShowFinalItems,
    setShowSlider,
    setShowNextButton,
  } = actions;

  useEffect(() => {
    let timeout1: string | number | NodeJS.Timeout | undefined,
      timeout2: string | number | NodeJS.Timeout | undefined,
      timeout3: string | number | NodeJS.Timeout | undefined;

    if (step === 1) {
      setShowPotSVG(true);
      timeout1 = setTimeout(() => setStep(3), 4000);
    }

    if (step === 3) {
      setHideEverything(true);
      setIsEggVisible(false);
      setBackgroundStage(1);
      setTypedText(
        'First, turn on the faucet. We need to fill the pot with water.'
      );

      timeout1 = setTimeout(() => {
        setBackgroundStage(2);

        timeout2 = setTimeout(() => {
          setTypedText('');
          setBackgroundStage(0);
          setShowPotWaterSVG(true);

          timeout3 = setTimeout(() => {
            setShowPotWaterSVG(false);
            setBackgroundStage(0);
            setIsEggVisible(true);
            setShowWaterPot(true);
            setStep(4);
          }, 2000); // changed this to 2000 instead of 1000 because it was causing it to be too fast of a transition
        }, 2000);
      }, 1500);
    }

    if (step === 4) {
      setShowStep2Prompt(true);
      setShowFinalItems(true);

      timeout1 = setTimeout(() => {
        setShowSlider(true);

        timeout2 = setTimeout(() => {
          setShowNextButton(true);
        }, 2000);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [step]);
}
