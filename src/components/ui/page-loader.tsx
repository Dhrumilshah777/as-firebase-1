"use client";

import { usePageLoader } from '@/hooks/use-page-loader';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export function PageLoader() {
  const { isPageLoading } = usePageLoader();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        isPageLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Loader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
