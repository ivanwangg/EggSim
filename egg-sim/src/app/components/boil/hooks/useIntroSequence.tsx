import { useEffect } from 'react';

export default function useIntroSequence( // same as fry
  setIsEggVisible: (arg0: boolean) => void,
  setIsPromptVisible: (arg0: boolean) => void,
  setStep: (arg0: number) => void
) {
  useEffect(() => {
    setIsEggVisible(true);

    const showPrompt = setTimeout(() => {
      setIsPromptVisible(true);
    }, 2000);

    const step1ToStep2 = setTimeout(() => {
      setIsPromptVisible(false);
      setStep(1);
    }, 6000);

    return () => {
      clearTimeout(showPrompt);
      clearTimeout(step1ToStep2);
    };
  }, []);
}
