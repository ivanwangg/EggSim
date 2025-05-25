'use client'
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='w-full h-full flex flex-col justify-start items-center bg-[#FFFBF0] pt-20'>
      <img src="hen_nesting.svg" className='w-[15rem] h-[15rem]'></img>
      <p className='font-bold text-5xl text-[#FBBF24] my-5'>
        Oops! This page is eggstinct!
      </p>
      <button className='mt-5 hover:text-[#FBBF24]' onClick={() => router.push("/")}>
        <p className='animate-bounce'>
          Click me to return to the main page!
        </p>
      </button>
    </div>
  );
}
