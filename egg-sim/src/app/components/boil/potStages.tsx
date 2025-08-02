import Image from 'next/image';

export default function PotStages({
  showBigWaterPot,
  showBoilingPot,
  showBoilingEggPot,
  showPotWithLid,
  isShaking,
}: {
  showBigWaterPot: boolean;
  showBoilingPot: boolean;
  showBoilingEggPot: boolean;
  showPotWithLid: boolean;
  isShaking: boolean;
}) {
  return (
    <>
      {showBigWaterPot && (
        <div className="absolute top-[15%] left-[60%] poof-in z-15">
          <Image
            src="/boil/pot_v2_water.svg"
            alt="Big Pot With Water"
            width={240}
            height={240}
            className="w-150"
          />
        </div>
      )}
      {showBoilingPot && (
        <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
          <Image
            src="/boil/pot_v2_boiling_water.svg"
            alt="Boiling Water"
            width={140}
            height={140}
            className="w-35"
          />
        </div>
      )}
      {showBoilingEggPot && (
        <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
          <Image
            src="/boil/pot_v2_boiling_egg.svg"
            alt="Boiling Egg"
            width={140}
            height={140}
            className="w-35"
          />
        </div>
      )}
      {showPotWithLid && (
        <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
          <div className={isShaking ? 'shake-animation' : ''}>
            <Image
              src="/boil/pot_v2_lid_on.svg"
              alt="Pot with Lid"
              width={140}
              height={140}
              className="w-35"
            />
          </div>
        </div>
      )}
    </>
  );
}
