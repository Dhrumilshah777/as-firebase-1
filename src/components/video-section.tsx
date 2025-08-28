
"use client";

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleVideoClick = async () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        if (window.innerWidth <= 787) {
            const container = containerRef.current;
            if (container) {
                try {
                    await container.requestFullscreen();
                    if (screen.orientation && typeof screen.orientation.lock === 'function') {
                        await screen.orientation.lock('landscape').catch(() => {});
                    }
                } catch (err) {
                    console.error("Fullscreen or orientation lock failed:", err);
                }
            }
        }
        video.play().catch(() => {});
        video.muted = false;
      } else {
        video.pause();
        video.muted = true;
      }
    }
  };

  return (
    <section id="video" className="w-full bg-secondary">
      <div className="px-0">
        <div ref={containerRef} className="relative mx-auto aspect-[9/10] md:aspect-[16/6] max-w-none">
          <video
            ref={videoRef}
            src="/videos/Save the date - Sparsh & Vama.mp4"
            playsInline
            loop
            muted
            className="w-full h-full object-cover"
            onClick={handleVideoClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity duration-300",
              isPlaying ? 'opacity-0' : 'opacity-100'
            )}
            onClick={handleVideoClick}
          >
             <div className={cn(
                "bg-white/30 backdrop-blur-sm rounded-full p-4 transition-transform hover:scale-110",
                isPlaying ? "hidden" : "block"
              )}>
              <Play className="h-12 w-12 text-white fill-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
