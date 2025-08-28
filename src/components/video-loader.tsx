
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const LOADER_SESSION_KEY = 'hasLoaderPlayed';

export function VideoLoader() {
  const [showLoader, setShowLoader] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs only on the client
    if (pathname === '/') {
      const hasPlayed = sessionStorage.getItem(LOADER_SESSION_KEY);
      
      if (!hasPlayed) {
        setShowLoader(true);
        setIsFadingOut(false);
      }
    } else {
      // If we navigate away from home, we don't want the loader to pop up again
      // even if the session key is not set yet.
      setShowLoader(false);
    }
  }, [pathname]);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
    // Hide the loader completely after the fade-out animation
    setTimeout(() => {
      setShowLoader(false);
    }, 1000); // Must match animation duration
  };

  if (!showLoader) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[10000] bg-background flex items-center justify-center transition-opacity duration-1000 ease-in-out',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <video
        src="https://ik.imagekit.io/ddahycfh5/Final%20Comp-1.mp4?updatedAt=1756145886738"
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        suppressHydrationWarning
        priority
      />
    </div>
  );
}
