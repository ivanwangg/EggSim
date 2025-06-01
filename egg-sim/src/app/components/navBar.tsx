'use client'
import NavButton from "./navButton";

export default function NavBar() {


  return (
    <div className="w-full h-[5rem] flex flex-col bg-[#C89F77] top-0 fixed z-50">
      <div className="w-full h-full flex flex-row items-center px-3">
        <img src="logo/logo_mascot.svg" className="w-[5rem] h-[5rem] mx-2 px-2"/>
        
        <div className="w-full font-bold text-2xl text-white">
          <img src="logo/logo_text_only.svg" className="w-[12rem] h-[12rem] -ml-5 mt-2"/>
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
