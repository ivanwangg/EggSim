import { useEffect } from 'react';

export default function useStepSequence(
  step: number,
  setStep: (v: number) => void,
  setShowPanSVG: (v: boolean) => void,
  setShowOilSVG: (v: boolean) => void,
  setShowSpatulaSVG: (v: boolean) => void,
  setShowSaltSVG: (v: boolean) => void,
  setShowPepperSVG: (v: boolean) => void,
  setShowFinalItems: (v: boolean) => void,
  setIsZoomed: (v: boolean) => void,
  setShowStep2Prompt: (v: boolean) => void,
  setShowSlider: (v: boolean) => void
) {
  useEffect(() => {
    let next: ReturnType<typeof setTimeout>;

    if (step === 1) {
      setShowPanSVG(true);
      next = setTimeout(() => setStep(3), 4000);
    } else if (step === 3) {
      setShowPanSVG(false);
      setShowOilSVG(true);
      next = setTimeout(() => setStep(4), 4000);
    } else if (step === 4) {
      setShowOilSVG(false);
      setShowSpatulaSVG(true);
      next = setTimeout(() => setStep(5), 4000);
    } else if (step === 5) {
      setShowSpatulaSVG(false);
      setShowSaltSVG(true);
      next = setTimeout(() => setStep(6), 4000);
    } else if (step === 6) {
      setShowSaltSVG(false);
      setShowPepperSVG(true);
      next = setTimeout(() => {
        setStep(7);
        setShowPepperSVG(false);
        setShowFinalItems(true);
      }, 4000);
    } else if (step === 7) {
      // starts the slider portion, allowing for user to begin the actual instructional experience
      setIsZoomed(true);
      const promptTimeout = setTimeout(() => {
        setShowStep2Prompt(true);
        const sliderTimeout = setTimeout(() => {
          setShowSlider(true);
        }, 2000);
        return () => clearTimeout(sliderTimeout);
      }, 2000);
      return () => clearTimeout(promptTimeout);
    }

    return () => {
      if (next) clearTimeout(next);
    };
  }, [
    step,
    setStep,
    setShowPanSVG,
    setShowOilSVG,
    setShowSpatulaSVG,
    setShowSaltSVG,
    setShowPepperSVG,
    setShowFinalItems,
    setIsZoomed,
    setShowStep2Prompt,
    setShowSlider,
  ]);
}
