'use client'
import { useXP } from "../context/XPContext";


export default function XPBar() {
  const { currentXP, maxXP } = useXP();
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="fixed top-30 left-[6rem]">
        <div className="w-[20rem] h-6 border-green-300 border-4 bg-green-200 rounded-full overflow-hidden">
          <div
            className="bg-green-400 h-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
          <p className="absolute inset-0 flex items-center justify-center text-sm text-black">
            XP: {currentXP} / {maxXP}
          </p>
        </div>
    </div>
  );
}

