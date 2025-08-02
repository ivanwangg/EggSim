export default function TimeSlider({
  show,
  cookTime,
  setCookTime,
  disabled,
}: {
  show: boolean;
  cookTime: number;
  setCookTime: (time: number) => void;
  disabled: boolean;
}) {
  if (!show) return null;
  return (
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
        className="boil-slider w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 shadow-md hover:shadow-blue-400 transition-shadow"
        disabled={disabled}
      />
    </div>
  );
}
