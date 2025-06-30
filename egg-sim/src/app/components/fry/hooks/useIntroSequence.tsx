import { useEffect } from 'react';

export default function useIntroSequence(
  setIsEggVisible: (v: boolean) => void,
  setIsPromptVisible: (v: boolean) => void,
  setStep: (v: number) => void
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
