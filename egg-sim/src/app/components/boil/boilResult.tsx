import Image from 'next/image';

export default function BoilResult({
  showResult,
  resultSVG,
  typedTitle,
  typedDescription,
}: {
  showResult: boolean;
  resultSVG: string;
  typedTitle: string;
  typedDescription: string;
}) {
  if (!showResult) return null;
  return (
    <>
      <div className="absolute top-[23.5%] left-[71%] z-50 zoom-in-out pulse-glow">
        <Image
          src={resultSVG || '/egg.svg'}
          alt="Final Egg Result"
          width={200}
          height={200}
          className="w-50"
        />
      </div>
      <div className="absolute top-[45%] left-[75.5%] transform -translate-x-1/2 z-50 text-center max-w-[300px]">
        <p className="text-lg font-extrabold text-yellow-200 glow-effect pixelated-text">
          {typedTitle}
        </p>
        <p className="text-xs font-semibold text-white pixelated-text backdrop-blur-md bg-black/40 p-3 mt-2 rounded-lg shadow-lg leading-snug whitespace-pre-line">
          {typedDescription}
        </p>
      </div>
    </>
  );
}
