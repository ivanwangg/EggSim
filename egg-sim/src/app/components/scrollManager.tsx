'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollManager() {
  const pathname = usePathname();

  // list of paths where scrolling should be disabled
  const noScrollPages = ['/home', '/fry'];
  const isNoScrollPage = noScrollPages.includes(pathname);

  useEffect(() => {
    if (isNoScrollPage) {
      document.documentElement.style.overflow = 'hidden'; // d\isables both vertical and horizontal scroll
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isNoScrollPage]);

  return null;
}
