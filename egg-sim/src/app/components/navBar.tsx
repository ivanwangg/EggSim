'use client'
import { useState } from "react";
import NavButton from "./navButton";

export default function NavBar() {


  return (
    <div className="w-full h-[5rem] flex flex-col bg-[#C89F77] top-0 fixed">
      <div className="w-full h-full flex flex-row items-center pl-20">
        <p className="w-full font-bold text-2xl text-white">
          EggSim
        </p>
        <div className="w-full flex flex-row">
          <NavButton name="Home" route="">/home</NavButton>
          <NavButton name="About" route="/about"></NavButton>
          <NavButton name="FAQ" route="/faq"></NavButton>
          <NavButton name="Contact Us" route="/contact"></NavButton>
        </div>
      </div>
    </div>
  );
}
