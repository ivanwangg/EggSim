'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  const frames = Array.from({ length: 19 }, (_, index) =>
    `not-found-page/rooster_crying${index.toString().padStart(2, '0')}.svg`
  );

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 75)
    return () => clearInterval(interval)
  }, [frames.length]);

  return (
    <div className='w-full h-full flex flex-col justify-start items-center bg-[#FFFBF0] pt-20'>
      <img src={frames[frameIndex]} className='w-[15rem] h-[15rem]'></img>
      <p className='font-bold text-5xl text-[#FBBF24] my-5'>
        Oops! This page is eggstinct!
      </p>
      <button className='mt-5 rounded-2xl px-3 hover:text-[#FBBF24]' onClick={() => router.push("/")}>
        <p className='animate-bounce'>
          Click me to return to the main page!
        </p>
      </button>
    </div>
  );
}
