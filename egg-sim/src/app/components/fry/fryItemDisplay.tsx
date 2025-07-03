import Image from 'next/image';
import React from 'react';

type Props = {
  isPromptVisible: boolean;
  step: number;
  showPanSVG: boolean;
  showOilSVG: boolean;
  showSpatulaSVG: boolean;
  showSaltSVG: boolean;
  showPepperSVG: boolean;
  showFinalItems: boolean;
  showOilBottle: boolean;
  showOilPourSprite: boolean;
  showSpatulaPan: boolean;
  isSpatulaDone: boolean;
  showSaltTable: boolean;
  showSaltShaker: boolean;
  showPepperTable: boolean;
  showPepperShaker: boolean;
};

export default function FryItemDisplay({
  isPromptVisible,
  step,
  showPanSVG,
  showOilSVG,
  showSpatulaSVG,
  showSaltSVG,
  showPepperSVG,
  showFinalItems,
  showOilBottle,
  showOilPourSprite,
  showSpatulaPan,
  isSpatulaDone,
  showSaltTable,
  showSaltShaker,
  showPepperTable,
  showPepperShaker,
}: Props) {
  return (
    <>
      {/* Step 1 prompt */}
      {isPromptVisible && (
        <div className="step1-prompt">
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            Step 1. The things you need for frying an egg
          </h1>
        </div>
      )}

      {/* Necessary items text */}
      {(step === 1 || step === 3 || step === 4 || step === 5 || step === 6) && (
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          {step === 1
            ? '1. A frying pan'
            : step === 3
              ? '2. Some oil'
              : step === 4
                ? '3. A spatula'
                : step === 5
                  ? '4. A salt shaker'
                  : '5. A pepper shaker'}
        </h1>
      )}

      {/* Materials Section SVGs */}
      {showPanSVG && (
        <div className="pulse-glow absolute top-[30%] z-15">
          <div className="poof-in">
            <Image
              src="/pan_topview.svg"
              alt="Frying Pan"
              width={180}
              height={180}
            />
          </div>
        </div>
      )}

      {showOilSVG && (
        <div className="pulse-glow absolute top-[30%] left-[46.5%] z-15">
          <div className="poof-in">
            <Image src="/oil_bottle.svg" alt="Oil" width={180} height={180} />
          </div>
        </div>
      )}

      {showSpatulaSVG && (
        <div className="pulse-glow absolute top-[30%] z-50">
          <div className="poof-in">
            <Image src="/spatula.svg" alt="Spatula" width={140} height={180} />
          </div>
        </div>
      )}

      {showSaltSVG && (
        <div className="pulse-glow absolute top-[30%] z-15">
          <div className="poof-in">
            <Image
              src="/fry/salt_shaker.svg"
              alt="Salt Shaker"
              width={70}
              height={70}
            />
          </div>
        </div>
      )}

      {showPepperSVG && (
        <div className="pulse-glow absolute top-[30%] z-15">
          <div className="poof-in">
            <Image
              src="/fry/pepper_shaker.svg"
              alt="Pepper Shaker"
              width={70}
              height={70}
            />
          </div>
        </div>
      )}

      {/* Final item drops */}
      {showFinalItems && (
        <>
          <div className="absolute top-[50%] left-[71.5%] z-10 poof-fall">
            <Image
              src="/pan_sideview.svg"
              alt="Side Pan"
              width={200}
              height={200}
            />
          </div>

          {showOilBottle && !showOilPourSprite && (
            <div className="absolute top-[53%] left-[80%] z-0 poof-fall">
              <Image
                src="/oil_bottle.svg"
                alt="Oil Bottle"
                width={200}
                height={200}
              />
            </div>
          )}

          {showSpatulaPan && !isSpatulaDone && (
            <div className="absolute top-[50%] left-[73%] z-0 poof-fall2">
              <div style={{ transform: 'rotate(40deg)' }}>
                <Image
                  src="/spatula_sideview.svg"
                  alt="Side Spatula"
                  className="w-45"
                  width={180}
                  height={180}
                />
              </div>
            </div>
          )}

          {showSaltTable && !showSaltShaker && (
            <div className="absolute top-[65.3%] left-[87%] z-0 poof-fall">
              <Image
                src="/fry/salt_shaker.svg"
                alt="Salt Shaker"
                width={30}
                height={30}
              />
            </div>
          )}

          {showPepperTable && !showPepperShaker && (
            <div className="absolute top-[65.3%] left-[88%] z-0 poof-fall">
              <Image
                src="/fry/pepper_shaker.svg"
                alt="Pepper Shaker"
                width={30}
                height={30}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
