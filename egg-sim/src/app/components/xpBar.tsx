'use client'
import { useXP } from "../context/XPContext";


export default function XPBar() {
  const { currentXP, maxXP, level } = useXP();
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="w-[23rem] flex flex-row items-center fixed top-25 left-[3rem]">
      <div className="relative w-[6rem] h-[6rem] z-50">
        <img src={`${level % 5 == 0 ? "xp-bar/star.svg" : "xp-bar/star_v2.svg"}`} className="w-full h-full object-contain"/>
        <p className="absolute inset-0 flex justify-center items-center font-bold text-xl pb-2 text-black pr-0.4 pt-1">
          {level}
        </p>
      </div>
      <div className="relative w-[20rem] flex flex-row h-6 bg-gradient-to-b from-green-200 to-green-300 border-b-4 border-green-500 rounded-lg overflow-hidden -ml-9">
        <div className="w-full border-2 border-green-500 rounded-md overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-in-out bg-gradient-to-r from-green-300 to-green-400"
            style={{ width: `${percentage}%` }}
          />
          <p className="absolute inset-0 flex items-center justify-center font-semibold text-sm text-black">
            XP: {currentXP} / {maxXP}
          </p>
        </div>
      </div>

    </div>
  );
}

