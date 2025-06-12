'use client';

import { useState, useEffect } from 'react';

export default function BoilPage() {
  const [step, setStep] = useState(0);
  const [isEggVisible, setIsEggVisible] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [showPotSVG, setShowPotSVG] = useState(false);

  const [showStep2Prompt, setShowStep2Prompt] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [cookTime, setCookTime] = useState(5);
  const [showNextButton, setShowNextButton] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [showFinalItems, setShowFinalItems] = useState(false);

  const [backgroundStage, setBackgroundStage] = useState(0); // 0 = kitchen background, 1 = sink background, 2 = sink faucet on background
  const [hideEverything, setHideEverything] = useState(false);

  const [typedText, setTypedText] = useState('');
  const [showPotWaterSVG, setShowPotWaterSVG] = useState(false);
  const [showWaterPot, setShowWaterPot] = useState(false);
  // const indexRef = useRef(0);

  useEffect(() => {
    setIsEggVisible(true);

    const showPrompt = setTimeout(() => {
      setIsPromptVisible(true);
    }, 2000);

    const step1ToStep2 = setTimeout(() => {
      setIsPromptVisible(false);
      setStep(1);
    }, 6000);

    return () => {
      clearTimeout(showPrompt);
      clearTimeout(step1ToStep2);
    };
  }, []);

  useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let timeout3: ReturnType<typeof setTimeout>;
    let timeout4: ReturnType<typeof setTimeout>;

    if (step === 1) {
      setShowPotSVG(true);
      timeout1 = setTimeout(() => setStep(3), 4000);
    }

    if (step === 3) {
      setHideEverything(true); // hide pot svg and pot on stove
      setIsEggVisible(false);
      setBackgroundStage(1);
      setTypedText('First, turn on the faucet. We need to fill the pot with water.');

      timeout1 = setTimeout(() => {
        setBackgroundStage(2);

        timeout2 = setTimeout(() => {
          setTypedText('');
          setShowPotWaterSVG(true); // show the second item

          timeout3 = setTimeout(() => { //might be useless timeout here ill fix later
            timeout4 = setTimeout(() => {
              setShowPotWaterSVG(false);
              setBackgroundStage(0); // return to kitchen background
              setIsEggVisible(true);
              setShowWaterPot(true);
              setStep(4);
            }, 1000);
          }, 3000);
        }, 2000);
      }, 1500);
    }

    if (step === 4) {
      setShowStep2Prompt(true);
      setShowFinalItems(true);

      timeout1 = setTimeout(() => {
        setShowSlider(true);

        timeout2 = setTimeout(() => {
          setShowNextButton(true);
        }, 2000);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, [step]);




  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);
  }

  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center flex-col overflow-hidden transition-transform duration-[2000ms] ease-in-out ${step === 4 || clickedNext
        ? 'scale-[1.5] opacity-100'
        : 'scale-100 opacity-100'
        }`}
      style={{
        transformOrigin: step === 4 || clickedNext ? '100% center' : 'center',
      }}
    >
      {/*  Backgrounds  */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: backgroundStage === 0 ? 1 : 0,
          backgroundImage: 'url(/kitchen_background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: backgroundStage === 1 ? 1 : 0,
          backgroundImage: 'url(/boil/sink_close_up.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: backgroundStage === 2 ? 1 : 0,
          backgroundImage: 'url(/boil/sink_close_up_water_open.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* step 1 */}
      {isEggVisible && (
        <div className="absolute top-[45.8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
          <div className="egg-slide">
            <img src="/egg.svg" alt="Egg" className="w-10" />
          </div>
        </div>
      )}

      {!hideEverything && (
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
              <img src="/boil/pot_v2_lid_on.svg" alt="Boiling Pot" className="w-45" />
            </div>
          )}

          {showFinalItems && (
            <div className="absolute top-[54%] left-[73.5%] z-10 poof-fall">
              <img src="/boil/pot_v2_lid_on.svg" alt="Pot" className="w-35" />
            </div>
          )}
        </>
      )}

      {showStep2Prompt && !clickedNext && (
        <div className="absolute top-[30%] left-[53%] text-center z-50">
          <h1 className="text-1xl font-bold glow-effect2 zoom-in-out pixelated-text">
            Step 2. How long do you want to boil your egg?
          </h1>
        </div>
      )}

      {showSlider && !clickedNext && (
        <div className="absolute top-[45%] left-[56%] w-[30%] z-50">
          <p
            className="text-center text-xl mt-2 font-bold pixelated-text"
            style={{
              color: `rgb(255, ${Math.max(0, 255 - 255 * (cookTime / 12))}, 0)`,
              textShadow: '0 0 10px rgba(255, 100, 0, 0.6)',
            }}
          >
            {cookTime < 1
              ? '< 1 minute'
              : cookTime > 10
                ? '> 10 minutes'
                : `${cookTime.toFixed(1)} minutes`}
          </p>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.1"
            value={cookTime}
            onChange={(e) => setCookTime(parseFloat(e.target.value))}
            className="boil-slider w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 shadow-md hover:shadow-blue-400 transition-shadow"
            disabled={clickedNext}
          />
        </div>
      )}

      {showNextButton && (
        <button
          className="absolute top-[52%] left-[66.5%] z-50 bg-blue-500 hover:bg-blue-700 text-white font-cursive font-semibold py-2 px-5 rounded-lg shadow-md shadow-blue-400/50 border-2 border-blue-800 transition-transform active:scale-95 boil-button pixelated-text"
          onClick={handleNextClick}
        >
          Go boil
        </button>
      )}


      {showPotWaterSVG && (
        <div className="absolute top-[30%] poof-in z-15">
          <img src="/boil/pot_v2_boiling_water.svg" alt="Boiling Pot" className="w-45" />
        </div>
      )}

      {showPotWaterSVG && (
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          2. Pot filled with water
        </h1>
      )}

      {/* faucet transition portions*/}
      {typedText && (
        <div className="absolute top-[28%] left-[50%] transform -translate-x-1/2 z-50 text-center">
          <h1 className="text-xl font-bold pixelated-text zoom-in-out glow-effect2">{typedText}</h1>
        </div>
      )}

      {showWaterPot && (
        <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
          <img src="/boil/pot_v2_boiling_water.svg" alt="Pot with Water" className="w-35" />
        </div>
      )}
    </div>
  );
}
