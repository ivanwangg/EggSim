'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

import StepSlider from '../components/fry/stepSlider';
import FryItemDisplay from '../components/fry/fryItemDisplay';
import useIntroSequence from '../components/fry/hooks/useIntroSequence';
import useStepSequence from '../components/fry/hooks/useStepSequence';
import useSliderPrompt from '../components/fry/hooks/useSliderPrompt';
import useCookingSequence from '../components/fry/hooks/useCookingSequence';
import useSeasoningSequence from '../components/fry/hooks/useSeasoningSequence';
import useResultReveal from '../components/fry/hooks/useResultReveal';
import useResultTyping from '../components/fry/hooks/useResultTypewriter';
import useFlipSequence from '../components/fry/hooks/useFlipSequence';
import EggSequence from '../components/fry/eggSequence';
import SeasoningShake from '../components/fry/seasoningSequence';
import EggResult from '../components/fry/eggResult';

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

  // step 3 (slider cooking portion )
  const [showEggSlam, setShowEggSlam] = useState(false);
  const [showEggCracked, setShowEggCracked] = useState(false);
  const [showEggPoof, setShowEggPoof] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showOilPourSprite, setShowOilPourSprite] = useState(false);
  const [flipIntro, setFlipIntro] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultSVG, setResultSVG] = useState('');
  const [isSpatulaMove, setIsSpatulaMove] = useState(false);
  const [flipIndex, setFlipIndex] = useState(0);
  const [flipCount, setFlipCount] = useState(0);
  const [isSpatulaDone, setIsSpatulaDone] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');

  // seasoning portion (end of cooking sequence)
  const [startSeasoningIntro, setStartSeasoningIntro] = useState(false);
  const [showSaltShaker, setShowSaltShaker] = useState(false);
  const [showSaltTable, setShowSaltTable] = useState(true);
  const [showPepperShaker, setShowPepperShaker] = useState(false);
  const [showPepperTable, setShowPepperTable] = useState(true);
  const [showNextCookingButton, setShowNextCookingButton] = useState(false);

  function getInstructionForTime(time: number) {
    if (time < 1) {
      return ' Selecting less than 1 minute is not recommended because the egg will not cook properly. It might be unsafe to eat and texture will be unpleasant.';
    } else {
      return " Frying for more than 10 minutes might burn the egg and make it rubbery. It's rarely necessary unless you're going for crispy bits. Or you just like charcoal. Menace.";
    }
  }

  useIntroSequence(setIsEggVisible, setIsPromptVisible, setStep);

  useStepSequence(
    step,
    setStep,
    setShowPanSVG,
    setShowOilSVG,
    setShowSpatulaSVG,
    setShowSaltSVG,
    setShowPepperSVG,
    setShowFinalItems,
    setIsZoomed,
    setShowStep2Prompt,
    setShowSlider
  );

  useSliderPrompt({
    showSlider,
    cookTime,
    clickedNext,
    setShowNextButton,
    setTypedText,
    setClickedNext,
    setShowBackButton,
  });

  const { handleNextCookingStep } = useCookingSequence({
    clickedNext,
    cookTime,
    setTypedText,
    indexRef,
    setClickedNext,
    setShowBackButton,
    setShowOilBottle,
    setShowOilPourSprite,
    setIsEggVisible,
    setShowEggSlam,
    setShowEggPoof,
    setShowEggCracked,
    setStartAnimation,
    setIsSpatulaMove,
    setFlipIntro,
    setShowResult,
    setResultSVG,
    getInstructionForTime,
    setShowNextCookingButton,
    setStartSeasoningIntro, // start seasoning after last cooking step
  });

  const { handleNextSeasoningStep } = useSeasoningSequence({
    startSeasoningIntro,
    setTypedText,
    indexRef,
    setShowSaltTable,
    setShowSaltShaker,
    setShowPepperTable,
    setShowPepperShaker,
    setShowResult,
    setShowNextCookingButton, // reuse the same next button for seasoning
  });

  useFlipSequence({
    flipIntro,
    cookTime,
    flipCount,
    flipIndex,
    showEggCracked,
    setFlipCount,
    setFlipIndex,
    setIsSpatulaDone,
    setIsSpatulaMove,
    setStartSeasoningIntro,
    setAnimationKey,
    setStartAnimation,
    setShowEggCracked,
  });

  useResultReveal({
    showResult,
    cookTime,
    setResultSVG,
    setShowBackButton,
  });

  useResultTyping({
    showResult,
    cookTime,
    setTypedTitle,
    setTypedDescription,
  });

  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);
  }

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
        transformOrigin:
          isZoomed || (clickedNext && cookTime) ? '100% center' : 'center',
        backgroundImage: 'url(/kitchen_background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {showResult && (
        <div className="absolute inset-0 z-40 backdrop-blur-sm bg-black/20 pointer-events-none" />
      )}

      {isEggVisible && (
        <div className="absolute top-[45.8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
          <div className="egg-slide">
            <Image src="/egg.svg" alt="Egg" width={40} height={40} />
          </div>
        </div>
      )}

      <FryItemDisplay
        isPromptVisible={isPromptVisible}
        step={step}
        showPanSVG={showPanSVG}
        showOilSVG={showOilSVG}
        showSpatulaSVG={showSpatulaSVG}
        showSaltSVG={showSaltSVG}
        showPepperSVG={showPepperSVG}
        showFinalItems={showFinalItems}
        showOilBottle={showOilBottle}
        showOilPourSprite={showOilPourSprite}
        showSpatulaPan={showSpatulaPan}
        isSpatulaDone={isSpatulaDone}
        showSaltTable={showSaltTable}
        showSaltShaker={showSaltShaker}
        showPepperTable={showPepperTable}
        showPepperShaker={showPepperShaker}
      />

      <StepSlider
        cookTime={cookTime}
        setCookTime={setCookTime}
        clickedNext={clickedNext}
        showSlider={showSlider}
        showNextButton={showNextButton}
        onNextClick={handleNextClick}
        showStep2Prompt={showStep2Prompt}
      />

      {typedText && clickedNext && (
        <div
          className="absolute top-[32%] left-[64%] w-[20%] p-4 rounded-md font-mono z-30 pixelated-text bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2"
          style={{ fontSize: '0.6rem', lineHeight: '1.8' }}
        >
          {typedText}
        </div>
      )}

      {showNextCookingButton && (
        <button
          className="absolute top-[48.5%] left-[80%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={() => {
            if (startSeasoningIntro) {
              handleNextSeasoningStep();
            } else {
              handleNextCookingStep();
            }
          }}
        >
          <ChevronRight className="text-white w-3 h-3" />
        </button>
      )}

      {showBackButton && (
        <button
          className="absolute top-[60%] left-[72.2%] z-50 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform active:scale-95 bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2 pixelated-text"
          onClick={handleBackClick}
        >
          Back
        </button>
      )}

      <EggSequence
        showOilPourSprite={showOilPourSprite}
        showEggSlam={showEggSlam}
        showEggPoof={showEggPoof}
        showEggCracked={showEggCracked}
        startAnimation={startAnimation}
        animationKey={animationKey}
        isSpatulaMove={isSpatulaMove}
      />

      <SeasoningShake
        showSaltShaker={showSaltShaker}
        showPepperShaker={showPepperShaker}
      />

      <EggResult
        showResult={showResult}
        resultSVG={resultSVG}
        typedTitle={typedTitle}
        typedDescription={typedDescription}
      />
    </div>
  );
}
