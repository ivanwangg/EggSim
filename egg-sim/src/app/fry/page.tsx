'use client';

import { useState, useEffect, useRef } from 'react';

export default function FryPage() {
  const [step, setStep] = useState(0);
  const [isEggVisible, setIsEggVisible] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  // step 1 
  const [showPanSVG, setShowPanSVG] = useState(false);
  const [showOilSVG, setShowOilSVG] = useState(false);
  const [showSpatulaSVG, setShowSpatulaSVG] = useState(false);
  const [showFinalItems, setShowFinalItems] = useState(false);
  const [showOilBottle, setShowOilBottle] = useState(true);

  const [isZoomed, setIsZoomed] = useState(false);

  // step 2
  const [showStep2Prompt, setShowStep2Prompt] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [cookTime, setCookTime] = useState(5);
  const [showNextButton, setShowNextButton] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [typedText, setTypedText] = useState('');
  const indexRef = useRef(0);
  const [showBackButton, setShowBackButton] = useState(false);


  //step 3 
  
  //egg intro portion
  const [showEggSlam, setShowEggSlam] = useState(false);
  const [showEggCracked, setShowEggCracked] = useState(false);
  const [eggIntroDone, setEggIntroDone] = useState(false);
  const [showEggPoof, setShowEggPoof] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false)
  const [animationKey, setAnimationKey] = useState(0); // allow for the egg crack yolk animation happen again if you click the back button

  //oil intro portion
  const [showOilPourSprite, setShowOilPourSprite] = useState(false);


  // this will be the cooking instructions. Temporarily using placeholder for the non edge cases
  function getInstructionForTime(time: number) {
    if (time < 1) {
      return " Selecting less than 1 minute is not recommended because the egg will not cook properly. It might be unsafe to eat and texture will be unpleasant.";
    } else if (time > 10) {
      return " Frying for more than 10 minutes might burn the egg and make it rubbery. It's rarely necessary unless you're going for crispy bits. Or you just like charcoal. Menace.";
    } else {
      return ` Frying for ${time.toFixed(1)} minutes is a great choice. Check the yolk's firmness and edges for your preferred texture.`;
    }
  }

  // show egg and first prompt when page loads
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

  // transition through step 1 ingredients
  useEffect(() => {
    let next: ReturnType<typeof setTimeout>;

    if (step === 1) {
      setShowPanSVG(true);
      next = setTimeout(() => setStep(3), 4000);
    } else if (step === 3) {
      setShowPanSVG(false);
      setShowOilSVG(true);
      next = setTimeout(() => setStep(5), 4000);
    } else if (step === 5) {
      setShowOilSVG(false);
      setShowSpatulaSVG(true);
      next = setTimeout(() => {
        setStep(7);
        setShowSpatulaSVG(false);
        setShowFinalItems(true);
      }, 4000);
    } else if (step === 7) {
      setIsZoomed(true);
      const promptTimeout = setTimeout(() => {
        setShowStep2Prompt(true);
        const sliderTimeout = setTimeout(() => {
          setShowSlider(true);
        }, 2000);
        return () => clearTimeout(sliderTimeout);
      }, 2000);
      return () => clearTimeout(promptTimeout);
    }

    return () => {
      if (next) clearTimeout(next);
    };
  }, [step]);

  // show 'go fry' button after slider appears
  useEffect(() => {
    if (!showSlider) {
      setShowNextButton(false);
      return;
    }

    if (!clickedNext) {
      const timer = setTimeout(() => {
        setShowNextButton(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowNextButton(false);
    }
  }, [showSlider, cookTime, clickedNext]);

  // reset when cookTime changes (if not clicked yet)
  useEffect(() => {
    if (clickedNext) return;
    setTypedText('');
    setClickedNext(false);
    setShowBackButton(false);
  }, [clickedNext, cookTime]);

  // typewriter effect for instructions. for some reason, you have to add a space in front, or else it will skip a letter. i don't really know why.
 useEffect(() => {
  if (!clickedNext) return;

  if (cookTime >= 1 && cookTime <= 10) {
    const oilIntro = ' First step is to pour the bottle of olive oil on the pan. ';
    const eggIntro = ' Second step is to crack the egg!. ';
    setTypedText('');
    indexRef.current = 0;
    setEggIntroDone(false);


    const oilTypingInterval = setInterval(() => {
      if (indexRef.current < oilIntro.length - 1) {
        indexRef.current++;
        setTypedText((prev) => prev + oilIntro[indexRef.current]);
      } else {
        clearInterval(oilTypingInterval);

        // oil bottle disappears for pouring
        setShowOilBottle(false);
        setShowOilPourSprite(true);

        setTimeout(() => {
          setShowOilPourSprite(false);

          setTypedText('');
          indexRef.current = 0;

          const eggTypingInterval = setInterval(() => {
            if (indexRef.current < eggIntro.length - 1) {
              indexRef.current++;
              setTypedText((prev) => prev + eggIntro[indexRef.current]);
            } else {
              clearInterval(eggTypingInterval);

              // egg cracking animations
              setShowEggSlam(true);

              setTimeout(() => {
                setShowEggPoof(true);
                setShowEggSlam(false);

                setTimeout(() => {
                  setShowEggPoof(false);
                  setShowEggCracked(true);

                  setTimeout(() => {
                    setShowEggCracked(false);
                    setStartAnimation(true);
                    setEggIntroDone(true); // egg intro text done + animations done
                  }, 600);
                }, 500);
              }, 800);
            }
          }, 50);
        }, 1000); // pouring animation length
      }
    }, 50);

    return () => {
      clearInterval(oilTypingInterval);
    };
  }

  // <1 or >10 cooking time
  if (clickedNext && (cookTime < 1 || cookTime > 10)) {
    const warning = getInstructionForTime(cookTime);
    setTypedText('');
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < warning.length - 1) {
        indexRef.current += 1;
        setTypedText((prev) => prev + warning[indexRef.current]);
      } else {
        clearInterval(interval);
        setShowBackButton(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }
}, [clickedNext, cookTime]);



 useEffect(() => {
  if (eggIntroDone) {
    const eggIntroText = getInstructionForTime(cookTime);
    setTypedText(''); // clear typedText for new typing
    indexRef.current = 0;

    const eggTypeTimer = setInterval(() => {
      if (indexRef.current < eggIntroText.length - 1) {
        indexRef.current += 1;
        setTypedText((prev) => prev + eggIntroText[indexRef.current]);
      } else {
        clearInterval(eggTypeTimer);
        setShowBackButton(true);
      }
    }, 50);

    return () => clearInterval(eggTypeTimer);
  }
}, [eggIntroDone, cookTime]);

    // go fry button
  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);

  }
  // back button for when you click less than a minute or more than 10 minutes. its still there for the normal cooking times, but it will get removed once i implement actual instructions for those.
  function handleBackClick() {
    setClickedNext(false);
    setTypedText('');
    setShowEggCracked(false);
    setShowBackButton(false);
    setShowOilBottle(true);
  }

  useEffect(() => {
    if (showEggCracked) {
      const timer = setTimeout(() => {
        setShowEggCracked(false);     // hide the initial image
        setAnimationKey((prev) => prev + 1);
        setStartAnimation(true);      // show the animation
      }, 800); 

      return () => clearTimeout(timer);
    }
  }, [showEggCracked]);



  return (
    <div
      className={`relative w-full h-screen bg-yellow-50 flex items-center justify-center flex-col overflow-hidden transition-transform duration-[3000ms] ease-in-out ${
        clickedNext && cookTime
          ? 'scale-[2]'
          : isZoomed
          ? 'scale-[1.5]'
          : 'scale-100'
      }`}
      style={{
        // camera pans to the right when you click the fry, so we can see actual cooking closer
        transformOrigin: (isZoomed || (clickedNext && cookTime)) ? '100% center' : 'center',
        backgroundImage: 'url(/kitchen_background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Step 1 prompt*/}
      {isPromptVisible && (
        <div className="step1-prompt">
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            Step 1. The things you need for frying an egg
          </h1>
        </div>
      )}

      {/* Egg slide down*/}
      {isEggVisible && (
        <div className="absolute top-[45.8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
          <div className="egg-slide">
            <img src="/egg.svg" alt="Egg" className="w-10" />
          </div>
        </div>
      )}

      {/* Necessary items section*/}
      {(step === 1 || step === 3 || step === 5) && (
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          {step === 1 ? '1. A frying pan' : step === 3 ? '2. Some oil' : '3. A spatula'}
        </h1>
      )}
      {showPanSVG && (
        <div className="absolute top-[30%] poof-in z-15">
          <img src="/pan_topview.svg" alt="Frying Pan" className="w-45" />
        </div>
      )}
      {showOilSVG && (
        <div className="absolute top-[30%] left-[46.5%] poof-in z-15">
          <img src="/oil_bottle.svg" alt="Oil" className="w-45" />
        </div>
      )}
      {showSpatulaSVG && (
        <div className="absolute top-[30%] poof-in z-50">
          <img src="/spatula.svg" alt="Spatula" className="w-35" />
        </div>
      )}

      {/* All items drop in for step 2 */}
      {showFinalItems && (
        <>
          <div className="absolute top-[50%] left-[71.5%] z-10 poof-fall">
            <img src="/pan_sideview.svg" alt="Side Pan" className="w-50" />
          </div>
          {showOilBottle && !showOilPourSprite && (
            <div className="absolute top-[53%] left-[80%] z-0 poof-fall">
              <img src="/oil_bottle.svg" alt="Oil Bottle" className="w-50" />
            </div>
          )}
          <div className="absolute top-[50%] left-[73%] z-0 poof-fall2">
            <div style={{ transform: 'rotate(40deg)' }}>
              <img src="/spatula_sideview.svg" alt="Side Spatula" className="w-45" />
            </div>
          </div>
        </>
      )}

      {/* Step 2 prompt*/}
      {showStep2Prompt && !clickedNext && (
        <div className="absolute top-[30%] left-[53%] text-center z-50">
          <h1 className="text-1xl font-bold glow-effect2 zoom-in-out pixelated-text">
            Step 2. How long do you want to fry your egg?
          </h1>
        </div>
      )}

      {/* Slider for cook time */}
      {showSlider && !(clickedNext && cookTime) && (
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
            className="flame-slider w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 shadow-md hover:shadow-yellow-400 transition-shadow"
            disabled={clickedNext}
          />
        </div>
      )}

      {/* Typewriter instructions for cooking time */}
      {typedText && clickedNext && (
        <div
          className="absolute top-[35%] left-[64%] w-[20%] p-4 rounded-md font-mono z-50 pixelated-text bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2"
          style={{ fontSize: '0.6rem', lineHeight: '1.8' }}
        >
          {typedText}
        </div>
      )}

      {/* The go fry button for when you want to choose selected time (next button)  */}
      {showNextButton && (
        <button
          className="absolute top-[52%] left-[66.5%] z-50 bg-yellow-500 hover:bg-orange-700 text-cream-100 font-cursive font-semibold py-2 px-5 rounded-lg shadow-md shadow-orange-400/50 border-2 border-yellow-800 transition-transform active:scale-95 fry-button pixelated-text"
          onClick={handleNextClick}
        >
          Go fry 🍳
        </button>
      )}

      {/* Back button for going back when you choose an invalid time (currently works as well for normal times since they are not implemented yet) */}
      {showBackButton && (
        <button
          className="absolute top-[52%] left-[70.5%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={handleBackClick}
        >
          Back
        </button>
      )}

      {showOilPourSprite && (
        <div className="absolute top-[50%] left-[73%] z-0 w-[56px] h-[64px] oil-pour-animation" />
      )}

      {showEggSlam && (
        <div className="absolute top-[50%] left-[60%] z-50 animate-egg-slam">
          <img src="/egg.svg" alt="Egg Slam" className="w-10" />
        </div>
      )}

      {showEggPoof && (
        <div className="absolute top-[50%] left-[60%] z-50 egg-poof-out">
          <img src="/fry/eggshell_cracked_together.svg" alt="Poof Effect" className="w-10" />
        </div>
      )}

      {showEggCracked && (
        <div className="absolute top-[50%] left-[75%] rotate-90 z-50">
          <img src="/fry/eggshell_cracked_together.svg" alt="Poof Effect" className="w-10" />
        </div>
      )}

      {startAnimation && (
        <div key = {animationKey} className="absolute top-[48%] left-[74%] z-0">
          <div className="w-20 h-20 transform animated-egg-sequence" />
        </div>
      )}
    </div>
  );
}
