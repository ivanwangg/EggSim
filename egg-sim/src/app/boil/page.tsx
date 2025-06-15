'use client';

<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)

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


<<<<<<< HEAD


=======
  // typewriter effect
  useEffect(() => {
    if (!clickedNext) return;

    if (cookTime >= 1 && cookTime <= 10) {
      const boilIntro = ' First, turn on the stove and bring the water to a boil. ';
      const dropIntro = ' Next, gently place the egg into the boiling pot. ';
      const waitIntro = ' Now, let it simmer and wait for the perfect consistency! To keep the heat trapped, we will put the lid back on the pot. ';

      setTypedText('');
      indexRef.current = 0;

      const boilTypingInterval = setInterval(() => {
        if (indexRef.current < boilIntro.length - 1) {
          indexRef.current++;
          setTypedText((prev) => prev + boilIntro[indexRef.current]);
        } else {
          clearInterval(boilTypingInterval);
          setTypedText('');

          setBackgroundStage(3);
          setShowWaterPot(false);
          setShowBigWaterPot(true);
          setIsEggVisible(false);

          setTimeout(() => {
            indexRef.current = 0;
            setBackgroundStage(0);
            setShowBoilingPot(true);
            setIsEggVisible(false);
            setShowBigWaterPot(false);

            const dropTypingInterval = setInterval(() => {
              if (indexRef.current < dropIntro.length - 1) {
                indexRef.current++;
                setTypedText((prev) => prev + dropIntro[indexRef.current]);
              } else {
                clearInterval(dropTypingInterval);

                setShowEggDrop(true);

                // trigger splash effect shortly after drop begins
                setTimeout(() => {
                  setShowSplash(true);


                  setTimeout(() => {
                    setShowEggDrop(false);
                    setShowSplash(false);
                    setTypedText('');
                    indexRef.current = 0;
                    setTimeout(() => {
                      setShowBoilingPot(false);
                      setShowBoilingEggPot(true);
                    }, 40);

                    const waitTypingInterval = setInterval(() => {
                      if (indexRef.current < waitIntro.length - 1) {
                        indexRef.current++;
                        setTypedText((prev) => prev + waitIntro[indexRef.current]);
                      } else {
                        clearInterval(waitTypingInterval);
                        setShowBoilingEggPot(false);
                        setShowPotWithLid(true);

                      }
                    }, 50);
                  }, 1000);
                }, 600);
              }
            }, 50);
          }, 3000);
        }
      }, 50);
    }
    // warning portions. will probably need to fix this when i decide to not add warnings, and just give bad results instead.
    if (clickedNext && (cookTime < 1 || cookTime > 10)) {
      const warning = getInstructionForTime(cookTime);
      setTypedText('');
      indexRef.current = 0;

      const interval = setInterval(() => {
        if (indexRef.current < warning.length - 1) {
          indexRef.current++;
          setTypedText((prev) => prev + warning[indexRef.current]);
        } else {
          clearInterval(interval);
          setShowResult(true);
          if (cookTime < 1) {
            setResultSVG('/boil/result/egg_boiled_1_mins.svg');
          }
          setShowBackButton(true);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [clickedNext, cookTime]);

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        if (cookTime < 1) {
          setResultSVG('/boil/result/egg_boiled_1_mins.svg');
        } else if (cookTime <= 2) {
          setResultSVG('/boil/result/egg_boiled_2_mins.svg');
        } else if (cookTime <= 3) {
          setResultSVG('/boil/result/egg_boiled_half_3_mins.svg');
        } else if (cookTime <= 4) {
          setResultSVG('/boil/result/egg_boiled_half_4-6_mins.svg');
        } else if (cookTime <= 6) {
          setResultSVG('/boil/result/egg_boiled_half_4-6_mins.svg');
        } else if (cookTime <= 10) {
          setResultSVG('/boil/result/egg_boiled_half_7-10_mins.svg');
        } else {
          setResultSVG('/boil/result/egg_boiled_half_7-10_mins.svg');
        }

        // show the back button once results are given
        setTimeout(() => {
          setShowBackButton(true);
        }, 1000);
      }, 800);
    }
  }, [showResult, cookTime]);

  // titles and descriptions for each resulting fried egg based on the cook time
  function getResultParts(cookTime: number): [string, string] {
    if (cookTime < 1) {
      return [" Raw Trouble", "  The egg is mostly uncooked—clear whites, runny yolk. Not safe to eat!"];
    } else if (cookTime <= 2) {
      return [" Very Soft Boil", "  Whites are barely set, yolk is fully liquid. Good for dipping, but fragile."];
    } else if (cookTime <= 3) {
      return [" Soft Boiled", "  Whites are mostly set, yolk is creamy and runny. Perfect for ramen or toast soldiers."];
    } else if (cookTime <= 4) {
      return [" Medium-Soft Boil", "  Whites are fully set, yolk is jammy but not runny. Great balance of texture."];
    } else if (cookTime <= 6) {
      return [" Medium Boiled", "  Whites are firm, yolk is partly set but still creamy in the center."];
    } else if (cookTime <= 10) {
      return [" Hard Boiled", "  Whites are firm, yolk is fully set and pale yellow. Ideal for salads or deviled eggs."];
    } else {
      return [" Overcooked", "  Chalky yolk and rubbery whites. Might have a green-gray ring—still edible, just dry."];
    }
  }


  useEffect(() => {
    if (shakeIndex === shakeCount && shakeCount > 0) {
      setTimeout(() => {
        setShowResult(true);
      }, 800);
    }
  }, [shakeIndex, shakeCount]);
  // display title and description of fried egg
  useEffect(() => {
    if (!showResult) return;

    const [title, description] = getResultParts(cookTime);

    setTypedTitle('');
    setTypedDescription('');
    let titleIndex = 0;
    let descIndex = 0;

    const typeTitle = () => {
      if (titleIndex < title.length - 1) {
        titleIndex++;
        setTypedTitle(prev => prev + title[titleIndex]);
        setTimeout(typeTitle, 50);
      } else {
        // start typing description after title
        setTimeout(() => typeDescription(), 300);
      }
    };

    const typeDescription = () => {
      if (descIndex < description.length - 1) {
        descIndex++;
        setTypedDescription(prev => prev + description[descIndex]);
        setTimeout(typeDescription, 50);
      }
    };

    typeTitle();
  }, [showResult, cookTime]);

>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)
  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);
  }

  return (
    <div
<<<<<<< HEAD
      className={`relative w-full h-screen flex items-center justify-center flex-col overflow-hidden transition-transform duration-[2000ms] ease-in-out ${step === 4 || clickedNext
        ? 'scale-[1.5] opacity-100'
        : 'scale-100 opacity-100'
        }`}
=======
      className={`relative w-full h-screen flex items-center justify-center flex-col overflow-hidden transition-transform duration-[2000ms] ease-in-out ${
        backgroundStage === 3
          ? 'scale-100'
          : clickedNext && cookTime
          ? 'scale-[2.0]'
          : step === 4
          ? 'scale-[1.5]'
          : 'scale-100'
      } opacity-100`}
>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)
      style={{
        transformOrigin: step === 4 || clickedNext ? '100% center' : 'center',
      }}
    >
      {/* backgrounds: 0 is kitchen, 1 is sink off, 2 is sink on, 3 is stove */}
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
<<<<<<< HEAD

      {/* step 1 */}
=======
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: backgroundStage === 3 ? 1 : 0,
          backgroundImage: 'url(/boil/stovetop_close_up.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
  
      {showResult && (
        <div className="absolute inset-0 z-40 backdrop-blur-sm bg-black/20 pointer-events-none" />
      )}
  
      {/* initial egg slide down */}
>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)
      {isEggVisible && (
        <div className="absolute top-[45.8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
          <div className="egg-slide">
            <Image src="/egg.svg" alt="Egg" width={40} height={40} className="w-10" />
          </div>
        </div>
      )}
  
      {/* step 1 */}
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
              <Image src="/boil/pot_v2_lid_on.svg" alt="Boiling Pot" width={180} height={180} className="w-45" />
            </div>
          )}
  
          {showFinalItems && (
            <div className="absolute top-[54%] left-[73.5%] z-10 poof-fall">
              <Image src="/boil/pot_v2_lid_on.svg" alt="Pot" width={140} height={140} className="w-35" />
            </div>
          )}
        </>
      )}
  
      {/* step 2*/}
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

<<<<<<< HEAD

      {showPotWaterSVG && (
        <div className="absolute top-[30%] poof-in z-15">
          <img src="/boil/pot_v2_boiling_water.svg" alt="Boiling Pot" className="w-45" />
=======
    {showBackButton && (
      <button
        className="absolute top-[62%] left-[71%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
        onClick={handleBackClick}
      >
        Back
      </button>
    )}

    {showPotWaterSVG && (
      <>
        <div className="absolute top-[30%] poof-in z-15">
          <Image src="/boil/pot_v2_water.svg" alt="Pot Filled With Water" width={180} height={180} className="w-45" />
>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)
        </div>
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          2. Pot filled with water
        </h1>
      </>
    )}

<<<<<<< HEAD
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
=======
   
    {typedText && step === 3 && (
      <div className="absolute top-[28%] left-[50%] transform -translate-x-1/2 z-50 text-center">
        <h1 className="text-xl font-bold pixelated-text zoom-in-out glow-effect2">{typedText}</h1>
      </div>
    )}

    {showWaterPot && (
      <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
        <Image src="/boil/pot_v2_water.svg" alt="Pot with Water" width={140} height={140} className="w-35" />
      </div>
    )}

    {/* typewriter instructions */}
    {typedText && clickedNext && (
      <div
        className="absolute top-[35%] left-[64%] w-[20%] p-4 rounded-md font-mono z-30 pixelated-text bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2"
        style={{ fontSize: '0.6rem', lineHeight: '1.8' }}
      >
        {typedText}
      </div>
    )}

    {/* egg drop in water part */}
    {showEggDrop && (
      <div className="absolute top-[53%] left-[75%] z-100 egg-drop">
        <Image src="/egg.svg" alt="Egg Dropping" width={40} height={40} className="w-10" />
      </div>
    )}

    {showSplash && (
      <div className="absolute top-[57%] left-[75%] z-100 splash-animate">
        <Image src="/boil/splash.svg" alt="Splash Effect" width={48} height={48} className="w-12" />
      </div>
    )}

    {showBigWaterPot && (
      <div className="absolute top-[15%] left-[60%] poof-in z-15">
        <Image src="/boil/pot_v2_water.svg" alt="Big Pot With Water" width={240} height={240} className="w-150" />
      </div>
    )}

    {/* egg in pot transition part */}
    {showBoilingPot && (
      <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
        <Image src="/boil/pot_v2_boiling_water.svg" alt="Boiling Water" width={140} height={140} className="w-35" />
      </div>
    )}
    {showBoilingEggPot && (
      <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
        <Image src="/boil/pot_v2_boiling_egg.svg" alt="Boiling Egg" width={140} height={140} className="w-35" />
      </div>
    )}
    {showPotWithLid && (
      <div className="absolute top-[53%] left-[73.5%] z-10 poof-fall">
        <div className={isShaking ? 'shake-animation' : ''}>
          <Image src="/boil/pot_v2_lid_on.svg" alt="Pot with Lid" width={140} height={140} className="w-35" />
        </div>
      </div>
    )}

    {/* results*/}
    {showResult && (
      <>
        <div className="absolute top-[25%] left-[69%] z-50 zoom-in-out pulse-glow">
          <Image src={resultSVG || '/egg.svg'} alt="Final Egg Result" width={200} height={200} className="w-50" />
        </div>
        <div className="absolute top-[45%] left-[73.5%] transform -translate-x-1/2 z-50 text-center max-w-[300px]">
          <p className="text-lg font-extrabold text-yellow-200 glow-effect pixelated-text">{typedTitle}</p>
          <p className="text-xs font-semibold text-white pixelated-text backdrop-blur-md bg-black/40 p-3 mt-2 rounded-lg shadow-lg leading-snug whitespace-pre-line">
            {typedDescription}
          </p>
        </div>
      </>
    )}
  </div>
>>>>>>> 77d5ef0 (adjusted boil page styling to be more like updated fry page styling. also resolved errors from new styling that was added in previous forced merge)
  );
}
