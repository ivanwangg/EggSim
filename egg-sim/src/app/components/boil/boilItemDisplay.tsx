import Image from 'next/image';

export default function BoilItemDisplay({
  isPromptVisible,
  step,
  showPotSVG,
  showFinalItems,
  hideEverything,
}: {
  isPromptVisible: boolean;
  step: number;
  showPotSVG: boolean;
  showFinalItems: boolean;
  hideEverything: boolean;
}) {
  if (hideEverything) return null;

  return (
    <>
      {isPromptVisible && (
        <div className="step1-prompt">
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            Step 1. The things you need for boiling an egg
          </h1>
        </div>
      )}

      {step === 1 && (
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          1. A boiling pot
        </h1>
      )}

      {showPotSVG && (
        <div className="absolute top-[30%] poof-in z-15">
          <div className="pulse-glow">
            <Image
              src="/boil/pot_v2_lid_on.svg"
              alt="Boiling Pot"
              width={180}
              height={180}
              className="w-45"
            />
          </div>
        </div>
      )}

      {showFinalItems && (
        <div className="absolute top-[54%] left-[73.5%] z-10 poof-fall">
          <Image
            src="/boil/pot_v2_lid_on.svg"
            alt="Pot"
            width={140}
            height={140}
            className="w-35"
          />
        </div>
      )}
    </>
  );
}
