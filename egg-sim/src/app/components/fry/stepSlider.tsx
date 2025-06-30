type Props = {
  cookTime: number;
  setCookTime: (val: number) => void;
  clickedNext: boolean;
  showSlider: boolean;
  showNextButton: boolean;
  onNextClick: () => void;
  showStep2Prompt: boolean;
};

export default function StepSlider({
  cookTime,
  setCookTime,
  clickedNext,
  showSlider,
  showNextButton,
  onNextClick,
  showStep2Prompt,
}: Props) {
  return (
    <>
      {showStep2Prompt && !clickedNext && (
        <div className="absolute top-[30%] left-[53%] text-center z-50">
          <h1 className="text-1xl font-bold glow-effect2 zoom-in-out pixelated-text">
            Step 2. How long do you want to fry your egg?
          </h1>
        </div>
      )}

      {showSlider && !clickedNext && (
        <div className="absolute top-[45%] left-[56%] w-[30%] z-50">
          <p
            className="text-center text-xl mt-2 font-bold pixelated-text"
            style={{
              color: `rgb(255, ${Math.max(0, 255 - 255 * (cookTime / 12))}, 0)`,
              textShadow: '0 0 10px rgba(255, 100, 0, 0.6)',
            }}
          >
            {cookTime < 1
              ? '< 1 minute'
              : cookTime > 10
                ? '> 10 minutes'
                : `${cookTime.toFixed(1)} minutes`}
          </p>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.1"
            value={cookTime}
            onChange={(e) => setCookTime(parseFloat(e.target.value))}
            className="flame-slider w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 shadow-md hover:shadow-yellow-400 transition-shadow"
          />
        </div>
      )}

      {showNextButton && (
        <button
          className="absolute top-[52%] left-[66.5%] z-50 bg-yellow-500 hover:bg-orange-700 text-cream-100 font-cursive font-semibold py-2 px-5 rounded-lg shadow-md shadow-orange-400/50 border-2 border-yellow-800 transition-transform active:scale-95 fry-button pixelated-text"
          onClick={onNextClick}
        >
          Go fry 🍳
        </button>
      )}
    </>
  );
}
