import NavButton from "./navButton";

export default function NavBar() {
  return (
    <nav className="w-full h-[5rem] flex items-center justify-between px-8 md:px-20 bg-[#C89F77] shadow-md fixed top-0 left-0 z-50">
      <p className="font-bold text-2xl text-white select-none">EggSim</p>
      <div className="flex gap-6">
        <NavButton name="Home" route="" />
        <NavButton name="About" route="" />
        <NavButton name="FAQ" route="faq" />
        <NavButton name="Contact Us" route="" />
      </div>
    </nav>
  );
}
