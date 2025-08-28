"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePageLoader() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsPageLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      const anchor = target.closest('a');

      if (
        anchor &&
        anchor.href &&
        anchor.target !== '_blank' &&
        anchor.href !== window.location.href &&
        !anchor.href.startsWith('#') &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        setIsPageLoading(true);
      }
    };

    const handleMutation = () => {
      const anchors = document.querySelectorAll('a');
      anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, { childList: true, subtree: true });

    handleMutation();

    return () => {
      observer.disconnect();
      document.querySelectorAll('a').forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return { isPageLoading };
}
