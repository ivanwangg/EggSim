import Image from 'next/image';

export default function EggSequence({
  showOilPourSprite,
  showEggSlam,
  showEggPoof,
  showEggCracked,
  startAnimation,
  animationKey,
  isSpatulaMove,
}: {
  showOilPourSprite: boolean;
  showEggSlam: boolean;
  showEggPoof: boolean;
  showEggCracked: boolean;
  startAnimation: boolean;
  animationKey: number;
  isSpatulaMove: boolean;
}) {
  return (
    <>
      {showOilPourSprite && (
        <div className="absolute top-[50%] left-[73%] poof-in">
          <div className="absolute top-[50%] left-[73%] z-0 w-[56px] h-[64px] oil-pour-animation" />
        </div>
      )}

      {showEggSlam && (
        <div className="absolute top-[50%] left-[60%] z-50 animate-egg-slam">
          <Image src="/egg.svg" alt="Egg Slam" width={40} height={40} />
        </div>
      )}

      {showEggPoof && (
        <div className="absolute top-[50%] left-[60%] z-50 egg-poof-out">
          <Image
            src="/fry/eggshell_cracked_together.svg"
            alt="Poof Effect"
            width={40}
            height={40}
          />
        </div>
      )}

      {showEggCracked && (
        <div className="absolute top-[50%] left-[75%] rotate-90 z-50">
          <Image
            src="/fry/eggshell_cracked_together.svg"
            alt="Egg Cracked"
            width={40}
            height={40}
          />
        </div>
      )}

      {startAnimation && (
        <div key={animationKey} className="absolute top-[48%] left-[74%] z-0">
          <div className="w-20 h-20 transform animated-egg-sequence" />
        </div>
      )}

      {isSpatulaMove && (
        <>
          <div
            className="absolute top-[48.5%] left-[73%] z-0 spatula-animation"
            style={{ transform: 'rotate(0deg)' }}
          >
            <Image
              src="/spatula_sideview.svg"
              alt="Side Spatula"
              width={180}
              height={180}
            />
          </div>

          <div className="absolute top-[58%] left-[75%] z-0 wrapper">
            <div className="flip-element">
              <Image
                src="/fry/egg_cracked.svg"
                alt="Flipping Egg"
                width={40}
                height={40}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
