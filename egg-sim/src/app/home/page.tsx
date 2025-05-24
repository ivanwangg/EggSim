'use client';

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [position, setPosition] = useState(50); // starting at center
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nestImage, setNestImage] = useState("/hen_nesting.svg");

  const lastImageChangeTime = useRef<number>(0); // track last image change time
  const animationRef = useRef<number | null>(null); // track animation id
  const svgFiles = [
    '/hen_walking0.svg',
    '/hen_walking1.svg',
    '/hen_walking2.svg',
    '/hen_walking3.svg',
    '/hen_walking4.svg',
    '/hen_walking5.svg',
    '/hen_walking6.svg',
    '/hen_walking7.svg',
  ];

  const handleClick = () => {
    if (!animationStarted) {
      setAnimationStarted(true); // start animation when clicked
      setNestImage("/nest.svg"); // change hen_nesting.svg to nest.svg when hen walking animation triggered
    }
  };

  useEffect(() => {
    if (animationStarted) {
      const animate = (timestamp: number) => {
        // move hen to the right
        setPosition((prev) => prev + 8);

        // cycle walking images
        if (timestamp - lastImageChangeTime.current >= 70) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % svgFiles.length); // cycle images
          lastImageChangeTime.current = timestamp;
        }

        // stop animation when hen goes off-screen
        if (position >= 100) {
          cancelAnimationFrame(animationRef.current!);
          return;
        }

        // continue animation if hen hasn't reached the end
        animationRef.current = requestAnimationFrame(animate);
      };

      // start the animation
      animationRef.current = requestAnimationFrame(animate);

      // clean up function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [animationStarted, position]);

  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-sky-400">
      {/* Sky */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-sky-400"></div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-green-500"></div>

      {/* Nest */}
      <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2">
        <img
          src={nestImage} // either hen_nesting.svg or nest.svg
          alt="Nest"
          className="transition-all duration-1000 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
          onClick={handleClick} // trigger animation on click
          style={{
            width: '100px', 
            zIndex: 1, 
          }}
        />
      </div>

      {/* Hen walking*/}
      {animationStarted && (
        <div onClick={handleClick} className="cursor-pointer">
          <img
            src={svgFiles[currentIndex]} 
            alt={`Hen walking animation ${currentIndex}`}
            className="transition-all duration-1000 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
            style={{
              left: `${position}%`, 
              width: '100px',
              zIndex: 2, 
              position: 'absolute',
              top: '70%', 
              transform: `translateX(-50%) translate(-9px, 8px)`, // shift hen 9px left and 8px down diagonally
            }}
          />
        </div>
      )}
    </div>
  );
}
