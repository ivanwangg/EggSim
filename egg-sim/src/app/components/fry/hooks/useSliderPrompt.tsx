import { useEffect } from 'react';

export default function useSliderPrompt({
  showSlider,
  cookTime,
  clickedNext,
  setShowNextButton,
  setTypedText,
  setClickedNext,
  setShowBackButton,
}: {
  showSlider: boolean;
  cookTime: number;
  clickedNext: boolean;
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
  setClickedNext: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBackButton: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // show go fry button after slider appears
  useEffect(() => {
    if (!showSlider) {
      setShowNextButton(false);
      return;
    }

    if (!clickedNext) {
      const timer = setTimeout(() => {
        setShowNextButton(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowNextButton(false);
    }
  }, [showSlider, cookTime, clickedNext]);

  // reset when cookTime changes
  useEffect(() => {
    if (clickedNext) return;

    setTypedText('');
    setClickedNext(false);
    setShowBackButton(false);
  }, [clickedNext, cookTime]);
}
