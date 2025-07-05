'use client';
import { useRouter, usePathname } from 'next/navigation';

interface NavButtonProps {
  name: string;
  route: string;
}

export default function NavButton({ name, route }: NavButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const state = pathname === route;

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <button className={`font-medium text-xl px-6 py-1 mx-0.5 rounded-xl 
            ${state ? "text-white bg-[#C89F77]" : "text-black hover:bg-[#C89F77] hover:text-black"}`} 
            onClick={() => router.push(route)}>
=======
=======
>>>>>>> 2534ce6 (Pulled from main and resolved merge conflicts)
    <button
      className={`font-medium text-xl px-6 py-0.5 mx-8 rounded-xl ${state ? 'text-black bg-amber-50' : 'text-white hover:bg-amber-50 hover:text-black'}`}
      onClick={() => router.push(route)}
    >
<<<<<<< HEAD
>>>>>>> 29e7492 (Set up Prettier and Linting)
=======
=======
    <button className={`font-medium text-xl px-6 py-1 mx-0.5 rounded-xl 
            ${state ? "text-white bg-[#C89F77]" : "text-black hover:bg-[#C89F77] hover:text-black"}`} 
            onClick={() => router.push(route)}>
>>>>>>> e536619 (Made the nav bar trasparent, updated farm background, updated logo, and background music)
>>>>>>> 2534ce6 (Pulled from main and resolved merge conflicts)
      {name}
    </button>
  );
}
