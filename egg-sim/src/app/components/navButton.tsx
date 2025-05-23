'use client';
import { useRouter } from "next/navigation"

interface NavButtonProps {
  name: string
  route: string
}

export default function NavButton( { name, route }: NavButtonProps) {

  const router = useRouter();

  return (
    <button className="font-medium text-xl text-white px-4 mx-8 rounded-xl hover:bg-amber-50 hover:text-black" onClick={() => router.push(route)}>
      {name}
    </button>
  )
}