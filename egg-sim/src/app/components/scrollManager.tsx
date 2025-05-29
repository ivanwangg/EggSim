"use client";  

import { usePathname } from "next/navigation"; 
import { useEffect } from "react";

export default function ScrollManager() {
  const pathname = usePathname();  

  // check if shouldnt scroll
  const isNoScrollPage = pathname === "/home"; 
  useEffect(() => {
    if (isNoScrollPage) {
      document.documentElement.style.overflow = "hidden";  
    } else {
      document.documentElement.style.overflow = "";  
    }
  }, [isNoScrollPage]);  // Only run when pathname changes

  return null;  // No UI, only side effects
}
