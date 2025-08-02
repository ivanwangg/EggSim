'use client';

import { useState, useEffect, useRef } from 'react';
import BackgroundLayers from '../components/boil/backgroundLayers';
import OverlayBlur from '../components/boil/overlayBlur';
import EggSlide from '../components/boil/eggSlide';
import BoilItemDisplay from '../components/boil/boilItemDisplay';
import Step2Prompt from '../components/boil/step2Prompt';
import TimeSlider from '../components/boil/sliderSection';
import NextBackButtons from '../components/boil/nextBackButtons';
import PotWater from '../components/boil/potWater';
import TypedTextDisplay from '../components/boil/typedTestDisplay';
import EggDropSplash from '../components/boil/eggDropSplash';
import PotStages from '../components/boil/potStages';
import BoilResult from '../components/boil/boilResult';

import useIntroSequence from '../components/boil/hooks/useIntroSequence';
import useStepTransitions from '../components/boil/hooks/useStepTransition';
import useResultReveal from '../components/boil/hooks/useResultReveal';
import useShakeEffect from '../components/boil/hooks/useShakeEffect';
import useShakeTriggerOnLid from '../components/boil/hooks/useShakeTrigger';
import useShakeComplete from '../components/boil/hooks/useShakeComplete';
import useResultTypewriter from '../components/boil/hooks/useResultTypewriter';
import useBoilTypewriterEffect from '../components/boil/hooks/useTypewriterEffect';

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

  const [backgroundStage, setBackgroundStage] = useState(0);
  const [hideEverything, setHideEverything] = useState(false);

  const [typedText, setTypedText] = useState('');
  const [showPotWaterSVG, setShowPotWaterSVG] = useState(false);
  const [showWaterPot, setShowWaterPot] = useState(false);
  const [showBigWaterPot, setShowBigWaterPot] = useState(false);
  const [showBoilingPot, setShowBoilingPot] = useState(false);
  const [showBoilingEggPot, setShowBoilingEggPot] = useState(false);
  const [showPotWithLid, setShowPotWithLid] = useState(false);
  const [showEggDrop, setShowEggDrop] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const [shakeIndex, setShakeIndex] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [resultSVG, setResultSVG] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);

  const [showNextBoilButton, setShowNextBoilButton] = useState(false); // NEW
  const [showReady, setShowReady] = useState(false);

  const indexRef = useRef(0);

  function getInstructionForTime(time: number) {
    if (time < 1)
      return ' Boiling an egg for less than a minute won’t cook it as it’ll still be raw inside. At best, you’ve just given it a steamy wake-up call.';
    if (time > 10)
      return ' Boil an egg too long and the yolk goes dry with a gray ring like it’s aged ten years in ten minutes. Congratulations, you’ve just overcooked breakfast into a biology experiment.';
    return '';
  }

  useIntroSequence(setIsEggVisible, setIsPromptVisible, setStep);

  useStepTransitions(step, {
    setShowPotSVG,
    setStep,
    setHideEverything,
    setIsEggVisible,
    setBackgroundStage,
    setTypedText,
    setShowPotWaterSVG,
    setShowWaterPot,
    setShowStep2Prompt,
    setShowFinalItems,
    setShowSlider,
    setShowNextButton,
  });

  const { handleNextBoilStep } = useBoilTypewriterEffect({
    clickedNext,
    cookTime,
    showReady,
    setTypedText,
    setBackgroundStage,
    setShowWaterPot,
    setShowBigWaterPot,
    setIsEggVisible,
    setShowBoilingPot,
    setShowEggDrop,
    setShowSplash,
    setShowBoilingEggPot,
    setShowPotWithLid,
    setShowResult,
    setResultSVG,
    setShowBackButton,
    getInstructionForTime,
    indexRef,
    setShowNextBoilButton, // NEW
  });

  useResultReveal(showResult, cookTime, setResultSVG, setShowBackButton);
  useResultTypewriter(showResult, cookTime, setTypedTitle, setTypedDescription);
  useShakeComplete(shakeIndex, shakeCount, setShowReady);
  useShakeEffect(shakeIndex, shakeCount, setIsShaking, setShakeIndex);
  useShakeTriggerOnLid(showPotWithLid, cookTime, setShakeCount, setShakeIndex);

  function handleNextClick() {
    setClickedNext(true);
    setShowNextButton(false);
  }

  function handleBackClick() {
    setClickedNext(false);
    setTypedText('');
    setIsEggVisible(true);
    setShowNextButton(true);
    setShowBackButton(false);
    setBackgroundStage(0);
    setShowBoilingPot(false);
    setShowWaterPot(true);
    setShowBoilingEggPot(false);
    setShowPotWithLid(false);
    setShowResult(false);
    setTypedTitle('');
    setTypedDescription('');
    setShowNextBoilButton(false);
  }

  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center flex-col overflow-hidden transition-transform duration-[2000ms] ease-in-out ${
        backgroundStage === 3
          ? 'scale-100'
          : clickedNext && cookTime
            ? 'scale-[2.0]'
            : step === 4
              ? 'scale-[1.5]'
              : 'scale-100'
      } opacity-100`}
      style={{
        transformOrigin: step === 4 || clickedNext ? '100% center' : 'center',
      }}
    >
      <BackgroundLayers backgroundStage={backgroundStage} />
      <OverlayBlur show={showResult} />
      {isEggVisible && <EggSlide />}

      <BoilItemDisplay
        isPromptVisible={isPromptVisible}
        step={step}
        showPotSVG={showPotSVG}
        showFinalItems={showFinalItems}
        hideEverything={hideEverything}
      />

      <Step2Prompt show={showStep2Prompt && !clickedNext} />

      <TimeSlider
        show={showSlider && !clickedNext}
        cookTime={cookTime}
        setCookTime={setCookTime}
        disabled={clickedNext}
      />

      <NextBackButtons
        showNext={showNextButton}
        showNextBoilButton={showNextBoilButton}
        showBack={showBackButton}
        onNext={showNextBoilButton ? handleNextBoilStep : handleNextClick}
        onBack={handleBackClick}
      />

      <PotWater
        showPotWaterSVG={showPotWaterSVG}
        step={step}
        typedText={typedText}
        showWaterPot={showWaterPot}
      />

      <TypedTextDisplay show={!!typedText && clickedNext} text={typedText} />
      <EggDropSplash showEggDrop={showEggDrop} showSplash={showSplash} />

      <PotStages
        showBigWaterPot={showBigWaterPot}
        showBoilingPot={showBoilingPot}
        showBoilingEggPot={showBoilingEggPot}
        showPotWithLid={showPotWithLid}
        isShaking={isShaking}
      />

      <BoilResult
        showResult={showResult}
        resultSVG={resultSVG}
        typedTitle={typedTitle}
        typedDescription={typedDescription}
      />
    </div>
  );
}
