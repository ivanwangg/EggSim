export default function Step2Prompt({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute top-[30%] left-[53%] text-center z-50">
      <h1 className="text-1xl font-bold glow-effect2 zoom-in-out pixelated-text">
        Step 2. How long do you want to boil your egg?
      </h1>
    </div>
  );
}
