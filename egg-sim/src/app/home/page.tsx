'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useXP } from '../context/XPContext';
import { useInventory } from '../context/InventoryContext';
import BackpackButton from '../components/backpackButton';

import XPBar from '../components/xpBar';
import Inventory from '../components/inventory';


export default function HomePage() {

  const router = useRouter();

  const [animationStarted, setAnimationStarted] = useState(false);
  const [eggVisible, setEggVisible] = useState(false);
  const [eggClicked, setEggClicked] = useState(false);
  const [eggAnimationFinished, setEggAnimationFinished] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [eggJumpFinished, setEggJumpFinished] = useState(false); 
  const [showPrompt, setShowPrompt] = useState(false); 
  const [isBackpackHovered, setIsBackpackHovered] = useState(false);

  const { currentXP, maxXP, level, setCurrentXP, setCurrentLevel } = useXP();
  const [openInventory, setOpenInventory] = useState(false);

  const gainXP = (val: number) => {
    if (currentXP + val >= 100) {
      setCurrentLevel(level + 1);
    }
    setCurrentXP((currentXP + val) % maxXP);
  }

  const handleClick = () => {
    if (!animationStarted) {
      setAnimationStarted(true); // trigger animation on click
    }
  };

  const handleEggClick = () => {
    setEggClicked(true);
    setTimeout(() => {
      setEggAnimationFinished(true);
      setShowOptions(true);
    }, 2500); // delay for rising/enlarging animation
  };

  const handleOptionClick = (option: string) => {
    if (option === 'boil') {
      router.push('/boil');
    } else {
      router.push('/fry');
    }
  };

  useEffect(() => {
    if (animationStarted) {
      setTimeout(() => {
        setEggVisible(true); // have egg appear roughly after time hen moves off screen
      }, 4500); // roughly the time hen is gone
    }
  }, [animationStarted]);

  // delay instructions appearing
  useEffect(() => {
    setTimeout(() => {
      setShowPrompt(true); 
    }, 1000); //  appears after 1 second
  }, []);

  const handleEggJumpAnimationEnd = () => {
    setEggJumpFinished(true); 
  };

  return (
      /* Background */
    <div 
      className="relative w-full h-screen overflow-x-hidden" 
      style={{ backgroundImage: 'url(/farm_background_simple_v6.svg)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                minHeight: '100vh' }}>
      <XPBar></XPBar>
      {/* <button className="absolute mt-[10rem] w-[10rem] h-[5rem] bg-red-500" onClick={() => gainXP(10)}>
        click me
      </button> */}
      <BackpackButton setOpenInventory={() => setOpenInventory(true)}/>
      {openInventory && (
        <Inventory onClose={() => setOpenInventory(false)}></Inventory>
      )}

      {/* Step 1  - Only visible before hen is clicked */}
      {!animationStarted && showPrompt && (
        <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 text-white text-2xl font-semibold animate__animated animate__fadeIn animate__delay-1s pixelated-text glow-effect bounce-effect">
          <p>Step 1: Click the chicken to begin!</p>
        </div>
      )}

      {/* Step 2  - Only visible after the egg jump animation is finished */}
      {eggVisible && !eggClicked && eggJumpFinished && showPrompt && (
        <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 text-white text-2xl font-semibold animate__animated animate__fadeIn animate__delay-1s pixelated-text glow-effect bounce-effect animate__delay-2s">
          <p>Step 2: Click the egg!</p>
        </div>
      )}
      {/* Nest (Initial image of the hen nesting) */}
      <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2">
        <img
          src={animationStarted ? '/nest.svg' : '/hen_nesting.svg'} // change to hen_nesting initially and to nest when animation starts
          alt="Nest"
          className="transition-all duration-1000 drop-shadow-lg"
          onClick={handleClick}
          style={{ width: '100px', zIndex: 1 }}
        />
      </div>

      {/* Hen walking animation */}
      {animationStarted && (
        <div className="walking-hen" />
      )}

      {/* Egg (Appears after hen walks off screen) */}
      {eggVisible && !eggClicked && (
        <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 transition-all duration-500">
          <img
            src="/egg.svg"
            alt="Egg"
            className="transition-all duration-1000 drop-shadow-lg"
            style={{
              width: '60px',
              zIndex: 3,
              animation: 'jumpLand 1.5s ease-out forwards',
              transform: `translateX(-50%) translate(31px, 20px)`,
            }}
            onClick={handleEggClick}
            onAnimationEnd={handleEggJumpAnimationEnd} // Set the flag when the jump animation ends
          />
        </div>
      )}

      {/* Egg rising animation */}
      {eggClicked && !eggAnimationFinished && (
        <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2" style={{ zIndex: 4, animation: 'slideUp 2s ease-out forwards' }}>
          <img
            src="/egg.svg"
            alt="Egg Rising"
            className="transition-all duration-1000 drop-shadow-lg"
            style={{ width: '70px' }}
          />
        </div>
      )}

      {/* Egg enlarging animation */}
      {eggClicked && eggAnimationFinished && (
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2" style={{ zIndex: 4, animation: 'enlarge 2s ease-in-out forwards', animationIterationCount: 'infinite', animationDirection: 'alternate' }}>
          <img
            src="/egg.svg"
            alt="Egg Enlarging"
            className="transition-all duration-1000 drop-shadow-lg"
            style={{ width: '100px' }}
          />
        </div>
      )}

      {/* Show options after egg animation finishes */}
      {eggAnimationFinished && showOptions && (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 space-y-8">
          <h2
            className="text-2xl text-white font-semibold animate__animated animate__fadeIn animate__delay-2s pixelated-text glow-effect animate__bounce"
          >
            What do you want to do with the egg?
          </h2>
          <div className="space-x-100">
            <button
              onClick={() => handleOptionClick('boil')}
              className="bg-blue-600 text-white p-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 animate__animated animate__zoomIn boil-button pixelated-text pop-in"
              style={{ width: '250px' }}
            >
              Boil It 🥚
            </button>
            <button
              onClick={() => handleOptionClick('fry')}
              className="bg-yellow-600 text-white p-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-[-2deg] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 animate__animated animate__zoomIn  fry-button pixelated-text pop-in"
              style={{ width: '250px' }}
            >
              Fry It 🍳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
