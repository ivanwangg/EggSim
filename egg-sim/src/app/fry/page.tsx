'use client';

import { useState, useEffect } from 'react';

export default function FryPage() {
  const [isEggVisible, setIsEggVisible] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [step, setStep] = useState(0);

  // for the sequential steps of step 1
  const [showPanSVG, setShowPanSVG] = useState(false);
  const [showOilSVG, setShowOilSVG] = useState(false);
  const [showSpatulaSVG, setShowSpatulaSVG] = useState(false);

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
    let next: ReturnType<typeof setTimeout>;

    if (step === 1) {
      setShowPanSVG(true);

      // after 4 seconds, move to next step
      next = setTimeout(() => setStep(3), 4000);
    } else if (step === 3) {
      setShowPanSVG(false)
      setShowOilSVG(true);
      next = setTimeout(() => setStep(5), 4000);
    } else if (step === 5) {
      setShowOilSVG(false);
      setShowSpatulaSVG(true);
    } 

    return () => {
      if (next) clearTimeout(next);
    };
  }, [step]);

  return (
    <div
      className="relative w-full h-screen bg-yellow-50 flex items-center justify-center flex-col overflow-hidden"
      style={{
        backgroundImage: 'url(/kitchen_background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Step 1 Prompt */}
      {isPromptVisible && (
        <div className="step1-prompt">
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            Step 1. The things you need for frying an egg
          </h1>
        </div>
      )}

      {/* Egg SVG */}
      {isEggVisible && (
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="egg-slide">
            <img src="/egg.svg" alt="Egg" className="w-15" />
          </div>
        </div>
      )}

      {/* 1. a frying pan text */}
      {(step === 1 || step === 3 || step === 5) && (
          <h1 className="text-2xl font-bold glow-effect2 zoom-in-out mb-120 pixelated-text">
            {step === 1 ? '1. a frying pan' : step === 3 ? '2. some oil' : '3. a spatula'}
          </h1>
      )}

      {/* Pan SVG, stays visible after step 1 */}
      {showPanSVG && (
        <div className="absolute top-[35%] poof-in  z-index-15">
          <img src="/egg.svg" alt="Frying Pan" className="w-20" />
        </div>
      )}

      {/* Oil SVG, stays visible after step 3 */}
      {showOilSVG && (
        <div className="absolute top-[35%] poof-in z-index-15">
          <img src="/oil.svg" alt="Oil" className="w-20" />
        </div>
      )}

      {/* Spatula SVG, stays visible after step 5 */}
      {showSpatulaSVG && (
        <div className="absolute top-[35%] poof-in z-index-15">
          <img src="/spatula.svg" alt="Spatula" className="w-20" />
        </div>
      )}
    </div>
  );
}
