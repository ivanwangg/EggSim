import { ChevronRight } from 'lucide-react';

export default function NextBackButtons({
  showNext,
  showNextBoilButton,
  showBack,
  onNext,
  onBack,
}: {
  showNext: boolean;
  showNextBoilButton: boolean;
  showBack: boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <>
      {showNext && !showNextBoilButton && (
        <button
          className="absolute top-[52%] left-[66.5%] z-50 bg-blue-500 hover:bg-blue-700 text-white font-cursive font-semibold py-2 px-5 rounded-lg shadow-md shadow-blue-400/50 border-2 border-blue-800 transition-transform active:scale-95 boil-button pixelated-text"
          onClick={onNext}
        >
          Go boil
        </button>
      )}

      {showNextBoilButton && (
        <button
          className="absolute top-[48.5%] left-[80%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={onNext}
          aria-label="Next Boil Step"
        >
          <ChevronRight className="text-white w-3 h-3" />
        </button>
      )}

      {showBack && (
        <button
          className="absolute top-[62%] left-[72.8%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={onBack}
        >
          Back
        </button>
      )}
    </>
  );
}
