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
    <button className={`font-medium text-xl px-6 py-0.5 mx-8 rounded-xl ${state ? "text-black bg-amber-50" : "text-white hover:bg-amber-50 hover:text-black"}`} onClick={() => router.push(route)}>
      {name}
    </button>
  )
}