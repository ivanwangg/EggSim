'use client'
import { useXP } from "../context/XPContext";


export default function XPBar() {
  const { currentXP, maxXP, level } = useXP();
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="w-[23rem] flex flex-row justify-between items-center fixed top-30 left-[5rem]">
      <p className="w-[2rem] h-[2rem] flex flex-row justify-center items-center font-bold text-3xl text-black pb-[0.2rem]">
        {level}
      </p>
      <div className="relative w-[20rem] flex flex-row h-6 border-green-300 border-4 bg-green-200 overflow-hidden">
        <div
          className="w-full bg-green-400 h-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
        <p className="absolute inset-0 flex items-center justify-center text-sm text-black">
          XP: {currentXP} / {maxXP}
        </p>
      </div>
    </div>
  );
}

