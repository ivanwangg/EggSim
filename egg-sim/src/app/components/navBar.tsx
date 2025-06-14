'use client';
import Image from 'next/image';
import NavButton from './navButton';

export default function NavBar() {
  return (
    <div className="w-full h-[5rem] flex flex-col bg-[#C89F77] top-0 fixed z-50">
      <div className="w-full h-full flex flex-row items-center px-3">
        <Image
          src="logo/logo_mascot.svg"
          className="mx-2 px-2"
          width={80}
          height={80}
          alt=""
        />

        <div className="w-full font-bold text-2xl text-white">
          <Image
            src="logo/logo_text_only.svg"
            className="-ml-5 mt-2"
            width={192}
            height={192}
            alt=""
          />
        </div>
        <div className="w-full flex flex-row">
          <NavButton name="Home" route="/home"></NavButton>
          <NavButton name="About" route="/about"></NavButton>
          <NavButton name="FAQ" route="/faq"></NavButton>
          <NavButton name="Contact Us" route="/contact"></NavButton>
        </div>
      </div>
    </div>
  );
}
