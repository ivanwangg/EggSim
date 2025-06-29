'use client';
import { useRouter, usePathname } from "next/navigation"

interface NavButtonProps {
  name: string
  route: string
}

export default function NavButton( { name, route }: NavButtonProps) {

  const router = useRouter();
  const pathname = usePathname();

  const state = pathname === route

  return (
    <button className={`font-medium text-xl px-6 py-1 mx-0.5 rounded-xl 
            ${state ? "text-white bg-[#C89F77]" : "text-black hover:bg-[#C89F77] hover:text-black"}`} 
            onClick={() => router.push(route)}>
      {name}
    </button>
  )
}