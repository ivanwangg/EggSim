'use client';
import Image from 'next/image';
import NavButton from './navButton';

<<<<<<< HEAD


export default function NavBar() {
<<<<<<< HEAD
// bg-[#C89F77
  return (
    <nav className="fixed top-1 w-full z-50 bg-transparent px-5 py-8 flex items-center justify-between">


        {/* old logo stuff
        <img src="logo/logo_mascot.svg" className="w-[5rem] h-[5rem] mx-2 px-2"
        
=======
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

>>>>>>> 29e7492 (Set up Prettier and Linting)
=======


export default function NavBar() {
// bg-[#C89F77]
  return (
    <nav className="fixed top-1 w-full z-50 bg-transparent px-5 py-8 flex items-center justify-between">


        {/* old logo stuff
        <img src="logo/logo_mascot.svg" className="w-[5rem] h-[5rem] mx-2 px-2"
        
>>>>>>> 2534ce6 (Pulled from main and resolved merge conflicts)
        <div className="w-full font-bold text-2xl text-white">
          <Image
            src="logo/logo_text_only.svg"
            className="-ml-5 mt-2"
            width={192}
            height={192}
            alt=""
          />
        </div>

        */}
        {/* new logo stuff */}
        <div className="flex items-center flex-row">
            <img src="logo/logo_mascot.svg" className="absolute top-3 ml-1 w-16 h-16" ></img>

            <div className="text-[32px] ml-1" style={{ fontFamily: 'LogoFont'}}> 
            {/* Egg */}
              <div className=" absolute top-[15px] left-[100px]" style={{textShadow: '0px 4px 4px rgba(0,0,0,0.5)'}}> 
                <span style={{ color: 'yellow'}}>E</span>
                <span style={{ color: 'white' }}>gg</span>
              </div>
            {/* Sim*/}
              <div className=" absolute top-[37px] left-[175px]" style={{textShadow: '0px 4px 4px rgba(0,0,0,0.5)'}}> 
                <span style={{ color: 'yellow'}}>S</span>
                <span style={{ color: 'white' }}>im</span>
              </div>
            </div>
        </div>
        {/* nav bar buttons*/}
        <div className="flex items-center space-x-3 ">
          <NavButton name="Home" route="/home"></NavButton>
          <NavButton name="About" route="/about"></NavButton>
          <NavButton name="FAQ" route="/faq"></NavButton>
          <NavButton name="Contact Us" route="/contact"></NavButton>
        </div>
      </nav>
  );
}
