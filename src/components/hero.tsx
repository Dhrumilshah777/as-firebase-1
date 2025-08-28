
"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Volume2, VolumeX, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const carouselSlides = [
  { type: 'image', src: '/images/aagam-aangi.jpg', alt: 'A beautiful mountain landscape.', hint: 'mountain landscape' },
  { type: 'video', src: "https://ik.imagekit.io/dqel2bwws/Parth%20&%20Niki's%20teaser.mp4?updatedAt=1753167450727" },
  { type: 'image', src: '/images/insta-1.jpg', alt: 'A heartwarming photo of a family laughing together.', hint: 'family laughing' },
  { type: 'video', src: '/videos/WEDDING HIGHLIGHT- Parth & Nishita wn.mp4' },
  { type: 'image', src: '/images/gallery-11.jpg', alt: 'A stunning landscape shot of a mountain range at sunset.', hint: 'mountain sunset' },
];


export function Hero() {
  const [api, setApi] = useState<CarouselApi>()
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false })
  );
  const [isBuffering, setIsBuffering] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
      const selectedIndex = api.selectedScrollSnap();
      setCurrentSlide(selectedIndex);
      const videoInSlide = videoRefs.current[selectedIndex];
      if (videoInSlide) {
        videoInSlide.play().catch(() => {});
      }
    }

    api.on("select", handleSelect)

    // Event listeners for buffering
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handleWaiting = () => setIsBuffering(prev => ({...prev, [index]: true}));
        const handlePlaying = () => setIsBuffering(prev => ({...prev, [index]: false}));

        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('canplay', handlePlaying);

        // Initial check for the first video
        if (index === 0 && carouselSlides[0].type === 'video') {
            video.play().catch(() => {});
        }
      }
    });

    return () => {
      api.off("select", handleSelect)
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const handleWaiting = () => setIsBuffering(prev => ({...prev, [index]: true}));
          const handlePlaying = () => setIsBuffering(prev => ({...prev, [index]: false}));
          video.removeEventListener('waiting', handleWaiting);
          video.removeEventListener('playing', handlePlaying);
           video.removeEventListener('canplay', handlePlaying);
        }
      });
    }
  }, [api]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = newMutedState;
      }
    });

    const autoplay = autoplayPlugin.current;
    if (autoplay) {
        if (newMutedState) {
            autoplay.play();
        } else {
            autoplay.stop();
        }
    }
  };

  return (
    <section id="home" className="relative w-full">
       <Carousel 
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="w-full h-auto"
        opts={{
            loop: true,
            
          }}
       >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
                <div className="relative w-full aspect-[16/18] md:aspect-[16/6] ">
                    {slide.type === 'image' ? (
                        <Image
                            src={slide.src}
                            alt={slide.alt!}
                            data-ai-hint={slide.hint}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <>
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={slide.src}
                                autoPlay={index === 0} // Autoplay only the first video initially
                                loop
                                muted={isMuted}
                                playsInline
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={toggleMute}
                            />
                            {isBuffering[index] && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                    <Loader className="h-12 w-12 text-white animate-spin" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/80 border-none text-primary" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/80 border-none text-primary" />
        {carouselSlides[currentSlide]?.type === 'video' && (
          <div className="absolute bottom-4 right-4 z-10">
            <Button onClick={toggleMute} size="icon" variant="outline" className="bg-black/20 text-white hover:bg-black/50 hover:text-white border-none">
              {isMuted ? <VolumeX /> : <Volume2 />}
              <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
          </div>
        )}
      </Carousel>
    </section>
  );
}
