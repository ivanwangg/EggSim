import Image from 'next/image';

export default function PotWater({
  showPotWaterSVG,
  step,
  typedText,
  showWaterPot,
}: {
  showPotWaterSVG: boolean;
  step: number;
  typedText: string;
  showWaterPot: boolean;
}) {
  return (
    <>
      {showPotWaterSVG && (
        <>
          <div className="absolute top-[30%] poof-in z-15">
            <div className="pulse-glow">
              <Image
                src="/boil/pot_v2_water.svg"
                alt="Pot Filled With Water"
                width={180}
                height={180}
                className="w-45"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            2. Pot filled with water
          </h1>
        </>
      )}
      {typedText && step === 3 && (
        <div className="absolute top-[28%] left-[50%] transform -translate-x-1/2 z-50 text-center">
          <h1 className="text-xl font-bold pixelated-text zoom-in-out glow-effect2">
            {typedText}
          </h1>
        </div>
      )}
      {showWaterPot && (
        <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
          <Image
            src="/boil/pot_v2_water.svg"
            alt="Pot with Water"
            width={140}
            height={140}
            className="w-35"
          />
        </div>
      )}
    </>
  );
}
