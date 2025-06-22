'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function FryPage() {
  const [step, setStep] = useState(0);
  const [isEggVisible, setIsEggVisible] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  // step 1
  const [showPanSVG, setShowPanSVG] = useState(false);
  const [showOilSVG, setShowOilSVG] = useState(false);
  const [showSpatulaSVG, setShowSpatulaSVG] = useState(false);
  const [showSaltSVG, setShowSaltSVG] = useState(false);
  const [showPepperSVG, setShowPepperSVG] = useState(false);
  const [showFinalItems, setShowFinalItems] = useState(false);
  const [showOilBottle, setShowOilBottle] = useState(true);
  const [showSpatulaPan, setShowSpatulaPan] = useState(true);

  const [isZoomed, setIsZoomed] = useState(false);

  // step 2
  const [showStep2Prompt, setShowStep2Prompt] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [cookTime, setCookTime] = useState(5);
  const [showNextButton, setShowNextButton] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);
  const indexRef = useRef(0);
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const [showBackButton, setShowBackButton] = useState(false);
>>>>>>> 29e7492 (Set up Prettier and Linting)
=======
>>>>>>> 1a14542 (Fix duplicate code)

  //step 3

<<<<<<< HEAD
  //step 3 

=======
>>>>>>> 29e7492 (Set up Prettier and Linting)
  //egg intro portion
  const [showEggSlam, setShowEggSlam] = useState(false);
  const [showEggCracked, setShowEggCracked] = useState(false);
  const [showEggPoof, setShowEggPoof] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // allow for the egg crack yolk animation happen again if you click the back button

  //oil intro portion
  const [showOilPourSprite, setShowOilPourSprite] = useState(false);

  //egg flipping portion
  const [flipIntro, setFlipIntro] = useState(false);
  const [showResult, setShowResult] = useState(false); // to show the result SVG
  const [resultSVG, setResultSVG] = useState(''); // store the final egg result SVG path

  //spatula movement portion
  const [isSpatulaMove, setIsSpatulaMove] = useState(false);
  const [flipIndex, setFlipIndex] = useState(0);
  const [flipCount, setFlipCount] = useState(0);

  const [isSpatulaDone, setIsSpatulaDone] = useState(false);
  //results section
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');

  // seasoning section
  const [startSeasoningIntro, setStartSeasoningIntro] = useState(false);
  const [showSaltShaker, setShowSaltShaker] = useState(false);
  const [showSaltTable, setShowSaltTable] = useState(true);
  const [showPepperShaker, setShowPepperShaker] = useState(false);
  const [showPepperTable, setShowPepperTable] = useState(true);

  // this will be the cooking instructions. Temporarily using placeholder for the non edge cases. Plan to make less than 1 minute the only edge case in the future.
  function getInstructionForTime(time: number) {
    if (time < 1) {
      return ' Selecting less than 1 minute is not recommended because the egg will not cook properly. It might be unsafe to eat and texture will be unpleasant.';
    } else {
      return " Frying for more than 10 minutes might burn the egg and make it rubbery. It's rarely necessary unless you're going for crispy bits. Or you just like charcoal. Menace.";
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
      next = setTimeout(() => setStep(4), 4000);
    } else if (step === 4) {
      setShowOilSVG(false);
      setShowSpatulaSVG(true);
      next = setTimeout(() => setStep(5), 4000);
    } else if (step === 5) {
      setShowSpatulaSVG(false);
      setShowSaltSVG(true);
      next = setTimeout(() => setStep(6), 4000);
    } else if (step === 6) {
      setShowSaltSVG(false);
      setShowPepperSVG(true);
      next = setTimeout(() => {
        setStep(7);
        setShowPepperSVG(false);
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

  /*
      const oilIntro = ' First step is to pour the bottle of olive oil on the pan! This is crucial because the oil creates a non-stick surface for the egg, allowing it to cook evenly without sticking to the pan. Plus, it adds flavor and helps regulate the cooking temperature, so your egg doesn’t burn. ';
      const eggIntro = ' Second step is to crack the egg! This step is important because you need to introduce the egg into the pan, and cracking it correctly ensures the egg white and yolk stay intact. A clean crack also minimizes any shell fragments from getting into your cooking. ';
      const letSitIntro = ' Now, let the egg sit on the pan for a moment to cook properly. It’s important to give the egg time to firm up and cook the white completely before flipping it. Patience is key for the perfect egg! ';
      const flipIntro = ' Third step is to flip the egg with your spatula! Flipping the egg is necessary to ensure it cooks evenly on both sides. This step also gives you control over the egg’s doneness, whether you like it runny or fully cooked. A careful flip prevents breaking the yolk or overcooking the egg. ';
      */
  // typewriter effect for instructions. for some reason, you have to add a space in front, or else it will skip a letter. i don't really know why.
  useEffect(() => {
    if (!clickedNext) return;

    if (cookTime >= 1 && cookTime <= 10) {
      /* test intros for faster speed
      const oilIntro = ' First step  ';
      const eggIntro = ' Second step  ';
      const letSitIntro = ' Now, let ';
      const flipIntro = ' Third step  ';
      */
      const oilIntro =
        ' First step is to pour the bottle of olive oil on the pan! This is crucial because the oil creates a non-stick surface for the egg, allowing it to cook evenly without sticking to the pan. ';
      const eggIntro =
        ' Second step is to crack the egg! This step is important because you need to introduce the egg into the pan, and cracking it correctly ensures the egg white and yolk stay intact. ';
      const letSitIntro =
        ' Now, let the egg sit on the pan for a moment to cook properly. It’s important to give the egg time to firm up and cook the white completely before flipping it. Patience is key for the perfect egg! ';
      const flipIntro =
        ' Third step is to flip the egg with your spatula! Flipping the egg is necessary to ensure it cooks evenly on both sides. This step also gives you control over the egg’s doneness, whether you like it runny or fully cooked. ';

      setTypedText('');
      indexRef.current = 0;

      // oil intro typing
      const oilTypingInterval = setInterval(() => {
        if (indexRef.current < oilIntro.length - 1) {
          indexRef.current++;
          setTypedText((prev) => prev + oilIntro[indexRef.current]);
        } else {
          clearInterval(oilTypingInterval);

          // oil pouring animation
          setShowOilBottle(false);
          setShowOilPourSprite(true);

          setTimeout(() => {
            setShowOilPourSprite(false);
            setShowOilBottle(true);

            // egg intro typing
            setTypedText('');
            indexRef.current = 0;

            const eggTypingInterval = setInterval(() => {
              if (indexRef.current < eggIntro.length - 1) {
                indexRef.current++;
                setTypedText((prev) => prev + eggIntro[indexRef.current]);
              } else {
                clearInterval(eggTypingInterval);

                // egg cracking and yolk falling
                setIsEggVisible(false);
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

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 29e7492 (Set up Prettier and Linting)
                      // flip step typing
=======
                      // wait intro
>>>>>>> 6e16611 (added seasoning portion of the fry process, added more animations to the results portion)
                      setTypedText('');
                      indexRef.current = 0;
                      const sitTypingInterval = setInterval(() => {
                        if (indexRef.current < letSitIntro.length - 1) {
                          indexRef.current++;
                          setTypedText(
                            (prev) => prev + letSitIntro[indexRef.current]
                          );
                        } else {
                          clearInterval(sitTypingInterval);

                          // let the egg sit for 1500ms before flipping
                          setTimeout(() => {
                            // flip step typing
                            setTypedText('');
                            indexRef.current = 0;

                            const flipTypingInterval = setInterval(() => {
                              if (indexRef.current < flipIntro.length - 1) {
                                indexRef.current++;
                                setTypedText(
                                  (prev) => prev + flipIntro[indexRef.current]
                                );
                              } else {
                                clearInterval(flipTypingInterval);
                                setTimeout(() => {
                                  setIsSpatulaMove(true);
                                }, 600);
                                setFlipIntro(true);
                              }
                            }, 60); // slower typing speed
                          }, 1500); // Let the egg sit for 1.5 seconds before flipping
                        }
                      }, 60); // slower typing speed for the "let it sit" text
                    }, 600);
                  }, 800);
                }, 500);
              }
            }, 60);
          }, 1000);
        }
      }, 60);
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
          setShowResult(true);
          if (cookTime < 1) {
            setResultSVG('/fry/result/egg_cooked_0_mins.svg');
          }
          if (cookTime >= 10) {
            setResultSVG('/fry/result/egg_cooked_10_mins.svg');
          }
          setShowBackButton(true);
        }
      }, 75);

      return () => clearInterval(interval);
    }
  }, [clickedNext, cookTime]);

<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> 29e7492 (Set up Prettier and Linting)
=======
>>>>>>> 1a14542 (Fix duplicate code)
  // go fry button
  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);
  }
  // back button for when you click less than a minute or more than 10 minutes.
  function handleBackClick() {
    setClickedNext(false);
    setTypedText('');
    setIsEggVisible(true);
    setShowEggCracked(false);
    setShowBackButton(false);
    setShowOilBottle(true);
    setShowSpatulaPan(true);
    setIsSpatulaMove(false);
    setStartAnimation(false);
    setFlipIntro(false);
    setShowResult(false);
    setAnimationKey((prev) => prev + 1);
    setTypedTitle('');
    setTypedDescription('');
    setStartSeasoningIntro(false);
    setShowSaltTable(true);
    setShowPepperTable(true);
  }

  useEffect(() => {
    if (showEggCracked) {
      const timer = setTimeout(() => {
        setShowEggCracked(false); // hide the initial image
        setAnimationKey((prev) => prev + 1);
<<<<<<< HEAD
        setStartAnimation(true);      // show the animation
=======
        setStartAnimation(true); // show the animation
>>>>>>> 29e7492 (Set up Prettier and Linting)
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [showEggCracked]);

  // get number of flips based on cook times. since the cook time is longer, the spatula should flip the egg more.
  const getFlipCount = (cookTime: number) => {
    if (cookTime < 4) return 1;
    if (cookTime < 7) return 2;
    return 3;
  };

  useEffect(() => {
    if (flipIntro) {
      const totalFlips = getFlipCount(cookTime);
      setFlipCount(totalFlips);
      setFlipIndex(0); // start from the first flip
    }
  }, [flipIntro, cookTime]);

  useEffect(() => {
    if (flipCount === 0 || flipIndex >= flipCount) return;

    setIsSpatulaDone(true);
    setIsSpatulaMove(true);

    const duration = 4500; // time per flip

    const timer = setTimeout(() => {
      setIsSpatulaMove(false);

      // delay before moving to the next flip
      setFlipIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [flipIndex, flipCount]);

  // after all flips are done
  useEffect(() => {
    if (flipIndex === flipCount && flipCount > 0) {
      // show result after a brief delay
      setIsSpatulaDone(false);
      setTimeout(() => {
        setStartSeasoningIntro(true);
      }, 800);
    }
  }, [flipIndex, flipCount]);

  useEffect(() => {
    if (!startSeasoningIntro) return;

    const seasoningIntro =
      ' The last thing in our frying process is going to be seasoning! Nobody likes things unseasoned unless you are an unseasoned person! So, we’ll first start with salt!';
    const pepperIntro =
      ' Now, we are going to add a dash of pepper for the final touch! ';
    setTypedText('');
    indexRef.current = 0;

    const seasoningTypingInterval = setInterval(() => {
      if (indexRef.current < seasoningIntro.length - 1) {
        indexRef.current++;
        setTypedText((prev) => prev + seasoningIntro[indexRef.current]);
      } else {
        clearInterval(seasoningTypingInterval);
        setShowSaltTable(false);
        setShowSaltShaker(true);

        setTimeout(() => {
          setTimeout(() => {
            setTimeout(() => {
              setShowSaltShaker(false);
              setShowSaltTable(true);

              // start pepper typing effect after salt shaker animation
              setTypedText('');
              indexRef.current = 0;
              const pepperTypingInterval = setInterval(() => {
                if (indexRef.current < pepperIntro.length - 1) {
                  indexRef.current++;
                  setTypedText((prev) => prev + pepperIntro[indexRef.current]);
                } else {
                  clearInterval(pepperTypingInterval);
                  setShowPepperTable(false);

                  // show pepper shaker animation after typing effect
                  setShowPepperShaker(true);

                  setTimeout(() => {
                    setShowPepperShaker(false);
                    setShowPepperTable(true);

                    setTimeout(() => {
                      setShowSaltTable(true);
                      setShowPepperTable(true);
                      setShowResult(true);
                    }, 1000);
                  }, 1000);
                }
              }, 60);
            }, 500);
          }, 300);
        }, 300);
      }
    }, 60);

    return () => clearInterval(seasoningTypingInterval);
  }, [startSeasoningIntro]);

  useEffect(() => {
    // only give results if show result is true. helps to prevent bugs where clicking on the slider causes it to glitch out and display the results even if you didn't click fry.
    if (showResult) {
      setTimeout(() => {
        if (cookTime < 1) {
          setResultSVG('/fry/result/egg_cooked_0_mins.svg');
        } else if (cookTime <= 2) {
          setResultSVG('/fry/result/egg_cooked_2_mins.svg');
        } else if (cookTime <= 3) {
          setResultSVG('/fry/result/egg_cooked_3_mins.svg');
        } else if (cookTime <= 4) {
          setResultSVG('/fry/result/egg_cooked_4_mins.svg');
        } else if (cookTime <= 5) {
          setResultSVG('/fry/result/egg_cooked_5_mins.svg');
        } else if (cookTime <= 6) {
          setResultSVG('/fry/result/egg_cooked_6_mins.svg');
        } else if (cookTime <= 7) {
          setResultSVG('/fry/result/egg_cooked_7_mins.svg');
        } else if (cookTime <= 8) {
          setResultSVG('/fry/result/egg_cooked_8_mins.svg');
        } else if (cookTime <= 9) {
          setResultSVG('/fry/result/egg_cooked_9_mins.svg');
        } else {
          setResultSVG('/fry/result/egg_cooked_10_mins.svg');
        }

        // show the back button once results are given
        setTimeout(() => {
          setShowBackButton(true);
        }, 1000);
      }, 800);
    }
  }, [showResult, cookTime]);

  // titles and descriptions for each resulting fried egg based on the cook time.
  function getResultParts(cookTime: number): [string, string] {
    if (cookTime < 1) {
      return [
        ' Straight Yolk',
        '  Basically raw. A slippery situation. Not recommended!',
      ];
    } else if (cookTime <= 2) {
      return [
        ' Glossy Goo',
        "  Sizzling but still slimy. It's more art than breakfast.",
      ];
    } else if (cookTime <= 3) {
      return [
        ' Barely Sunny',
        '  Soft whites, runny yolk. A bit under, but getting there.',
      ];
    } else if (cookTime <= 4) {
      return [
        ' Sunny Side Up',
        '  Classic diner style. Bright yolk, delicate whites.',
      ];
    } else if (cookTime <= 5) {
      return [
        ' Half-Set Hero',
        '  The yolk jiggles, the whites stand firm. A balance of chaos and control.',
      ];
    } else if (cookTime <= 6) {
      return [
        ' Over Easy',
        '  Flipped and still gooey in the center. For the adventurous bruncher.',
      ];
    } else if (cookTime <= 7) {
      return [
        ' Over Medium',
        '  Perfectly balanced – not too soft, not too firm.',
      ];
    } else if (cookTime < 9) {
      return [
        ' Over Hard',
        '  Solid yolk, crisp edges. A dependable breakfast companion.',
      ];
    } else if (cookTime <= 10) {
      return [' Pan Toasted', '  Well-done and proud. A bite with backbone.'];
    } else {
      return [
        ' Crispy Special',
        '  Crackly edges, tough core. A bite forged in hellfire.',
      ];
    }
  }

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
        setTypedTitle((prev) => prev + title[titleIndex]);
        setTimeout(typeTitle, 50);
      } else {
        // start typing description after title
        setTimeout(() => typeDescription(), 300);
      }
    };

    const typeDescription = () => {
      if (descIndex < description.length - 1) {
        descIndex++;
<<<<<<< HEAD
        setTypedDescription(prev => prev + description[descIndex]);
=======
        setTypedDescription((prev) => prev + description[descIndex]);
>>>>>>> 29e7492 (Set up Prettier and Linting)
        setTimeout(typeDescription, 50);
      }
    };

    typeTitle();
  }, [showResult, cookTime]);

  return (
    <div
      className={`relative w-full h-screen bg-yellow-50 flex items-center justify-center flex-col overflow-hidden transition-transform duration-[3000ms] ease-in-out ${
        clickedNext && cookTime
          ? 'scale-[2]'
          : isZoomed
            ? 'scale-[1.5]'
            : 'scale-100'
<<<<<<< HEAD
<<<<<<< HEAD
        }`}
=======
      }`}
>>>>>>> 29e7492 (Set up Prettier and Linting)
=======
      }`}
>>>>>>> 1a14542 (Fix duplicate code)
      style={{
        // camera pans to the right when you click the fry, so we can see actual cooking closer
        transformOrigin:
          isZoomed || (clickedNext && cookTime) ? '100% center' : 'center',
        backgroundImage: 'url(/kitchen_background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
<<<<<<< HEAD


=======
>>>>>>> 29e7492 (Set up Prettier and Linting)
      {showResult && (
        <div className="absolute inset-0 z-40 backdrop-blur-sm bg-black/20 pointer-events-none" />
      )}

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
            <Image src="/egg.svg" alt="Egg" width={40} height={40} />
          </div>
        </div>
      )}

      {/* Necessary items section*/}
      {(step === 1 || step === 3 || step === 4 || step === 5 || step === 6) && (
        <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
          {step === 1
            ? '1. A frying pan'
            : step === 3
              ? '2. Some oil'
              : step == 4
                ? '3. A spatula'
                : step == 5
                  ? '4. A salt shaker'
                  : '5. A pepper shaker'}
        </h1>
      )}
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

      {/* All items drop in for step 2 */}
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
<<<<<<< HEAD
<<<<<<< HEAD
                <img src="/spatula_sideview.svg" alt="Side Spatula" className="w-45" />
=======
                <img
=======
                <Image
>>>>>>> c8cba19 (Add egg-sim folder content to main repo)
                  src="/spatula_sideview.svg"
                  alt="Side Spatula"
                  className="w-45"
                  width={180}
                  height={180}
                />
>>>>>>> 29e7492 (Set up Prettier and Linting)
              </div>
            </div>
          )}
          {showSaltTable && !showSaltShaker && (
            <div className="absolute top-[65.2%] left-[87%] z-0 poof-fall">
              <Image
                src="/fry/salt_shaker.svg"
                alt="Salt Shaker"
                width={30}
                height={30}
              />
            </div>
          )}

          {showPepperTable && !showPepperShaker && (
            <div className="absolute top-[65.2%] left-[88%] z-0 poof-fall">
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
          className="absolute top-[32%] left-[64%] w-[20%] p-4 rounded-md font-mono z-30 pixelated-text bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2"
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

      {/* Back button for going back */}
      {showBackButton && (
        <button
          className="absolute top-[62%] left-[72%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={handleBackClick}
        >
          Back
        </button>
      )}

      {showOilPourSprite && (
        <div className=" absolute top-[50%] left-[73%] poof-in">
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
            alt="Poof Effect"
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
      )}

      {/* Egg Flip Animation */}
      {isSpatulaMove && (
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
      )}
      {/* seasoning shake animation */}
      {showSaltShaker && (
        <div
          className="absolute top-[50%] left-[75.5%] z-10 rotate-shake poof-in"
          style={{
            transformOrigin: 'center top',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Image
            src="/fry/salt_shaker.svg"
            alt="Salt Shaker"
            width={30}
            height={30}
          />
        </div>
      )}

      {showPepperShaker && (
        <div
          className="absolute top-[50%] left-[75.5%] z-10 rotate-shake poof-in" // going to add a conditional in the future to make sure poof in effects work with rotate shake
          style={{
            transformOrigin: 'center top',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Image
            src="/fry/pepper_shaker.svg"
            alt="Pepper Shaker"
            width={30}
            height={30}
          />
        </div>
      )}

      {showResult && (
        <div className="absolute top-[25%] left-[70%] z-50 zoom-in-out pulse-glow">
          <div className="slam">
            <Image
              src={resultSVG || '/fry/egg_cracked.svg'}
              alt="Final Egg Result"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}

      {showResult && (
        <div className="absolute top-[45%] left-[75%]  transform -translate-x-1/2 z-50 text-center max-w-[250px]">
          <p className="text-lg font-extrabold text-yellow-200 glow-effect pixelated-text">
            {typedTitle}
          </p>
          <p className="text-xs font-semibold text-white pixelated-text backdrop-blur-md bg-black/40 p-3 mt-2 rounded-lg shadow-lg leading-snug whitespace-pre-line">
            {typedDescription}
          </p>
        </div>
      )}
    </div>
  );
}
