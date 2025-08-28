
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const photos = [
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aangi-sinlge-1.jpg?updatedAt=1756104492266', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi-2.jpg?updatedAt=1753171677825', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi-3.jpg?updatedAt=1753171678508', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi-5.jpg?updatedAt=1753171679882', alt: 'A lively event photo', hint: 'concert party' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi-4.jpg?updatedAt=1753171678460', alt: 'A lively event photo', hint: 'concert party' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/aagam-aangi.jpg?updatedAt=1753171685636', alt: 'A lively event photo', hint: 'concert party' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-17.jpg?updatedAt=1753171730394', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-7.jpg?updatedAt=1753171732740', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-16.jpg?updatedAt=1753171730374', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/divya-karina-1.jpg?updatedAt=1753171721402', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/divya-karina-2.jpg?updatedAt=1753171722851', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/divya-karina-3.jpg?updatedAt=1753171724196', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/divya-karina-4.jpg?updatedAt=1753171724938', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/karina-gallery.jpg?updatedAt=1753171737609', alt: 'A stunning landscape', hint: 'mountain landscape' },
  // { src: 'https://placehold.co/600x500.png', alt: 'Another portrait', hint: 'portrait man' },
  // { src: 'https://placehold.co/600x850.png', alt: 'A candid wedding shot', hint: 'wedding ceremony' },
  // { src: 'https://placehold.co/600x450.png', alt: 'A stylish portrait of a woman', hint: 'fashion model' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery-full" className="w-full py-12 md:py-24 lg:py-20 bg-background">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-thin tracking-tighter sm:text-5xl font-headline">Gallery</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of our favorite moments, beautifully captured.
            </p>
          </div>
        </div>
        <div className="columns-2 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="break-inside-avoid mb-4 cursor-pointer" onClick={() => openLightbox(index)}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  data-ai-hint={photo.hint}
                  width={600}
                  height={800} // This is a placeholder, `h-auto` will respect the aspect ratio
                  className="w-full h-auto object-cover"
                  priority
                />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white z-50 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/75">
              <X size={32} />
            </button>
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-50 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/75">
              <ChevronLeft size={48} />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-50 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/75">
              <ChevronRight size={48} />
            </button>
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image
                src={photos[selectedImage].src}
                alt={photos[selectedImage].alt}
                fill
                objectFit="contain"
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
