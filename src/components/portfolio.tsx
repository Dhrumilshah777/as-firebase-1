
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const categories = ['Weddings', 'Pre-Wedding', 'Maternity', 'Couple', 'Post-Wedding', 'Toddler'];

const photos = [

  // Wedding
  { src: 'https://ik.imagekit.io/dqel2bwws/1%20(7).JPG?updatedAt=1756056074425', category: 'Portraits', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: 'https://ik.imagekit.io/dqel2bwws/Rishil&Riya.jpg?updatedAt=1754049457140', category: 'Portraits', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/jinesh-isha-insta.jpg?updatedAt=1753171735507', category: 'Portraits', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/karina-gallery.jpg?updatedAt=1753171737609', category: 'Portraits', alt: 'A beautiful portrait photo', hint: 'portrait woman' },
  { src: '/images/wedding-portfolio-1.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/wedding-portfolio-2.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/wedding-portfolio-3.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/wedding-portfolio-4.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/gallery-15.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/wedding-portfolio-5.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
  { src: '/images/wedding-portfolio-5.jpg', category: 'Weddings', alt: 'A romantic wedding photo', hint: 'wedding couple' },
 // Wedding

  //Pre-Wedding
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-weddingcrop.jpg?updatedAt=1753171761584', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-wedding-1.jpg?updatedAt=1753171754770', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/Divy&karina_testimoinals-1.jpg?updatedAt=1753171711295', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-wedding.jpg?updatedAt=1753171761284', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-wedding-porfolio-4.jpg?updatedAt=1753171758802', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-wedding-porfolio-5.jpg?updatedAt=1753171761192', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/pre-wedding-porfolio-3.jpg?updatedAt=1753171756825', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/sparsh-vama-gallery-1.jpg?updatedAt=1753171762449', category: 'Pre-Wedding', alt: 'A heartwarming family photo', hint: 'family portrait' },
  //Pre-Wedding


  // Maternity
  { src: 'https://ik.imagekit.io/dqel2bwws/Rishil-Riya-2.jpg?updatedAt=1756225959709', category: 'Maternity', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/Rishil-Riya-1.jpg?updatedAt=1756225959662', category: 'Maternity', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/Rishil-Riya-3.jpg?updatedAt=1756225959659', category: 'Maternity', alt: 'A heartwarming family photo', hint: 'family portrait' },
  { src: 'https://ik.imagekit.io/dqel2bwws/Rishil&Riya.jpg?updatedAt=1754049457140', category: 'Maternity', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/maternity-4.JPG?updatedAt=1753171753628', category: 'Maternity', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/maternity-5.jpg?updatedAt=1756106999606', category: 'Maternity', alt: 'A stunning landscape', hint: 'mountain landscape' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/maternity-2.jpg?updatedAt=1753171737832', category: 'Maternity', alt: 'Another portrait', hint: 'portrait man' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/instagram-img-1.jpg?updatedAt=1753171735261', category: 'Maternity', alt: 'A professional branding photo', hint: 'modern office' },
  { src: 'https://images.unsplash.com/photo-1485809052957-5113b0ff5fd0?q=80&w=800', category: 'Maternity', alt: 'A candid wedding shot', hint: 'wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', category: 'Maternity', alt: 'A stylish portrait of a woman', hint: 'fashion model' },
  // Maternity


  // Toddler
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-red-4.jpg?updatedAt=1753171774567', category: 'Toddler', alt: 'A birthday party celebration', hint: 'birthday party' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-red-1.jpg?updatedAt=1753171773933', category: 'Toddler', alt: 'A happy family playing outdoors', hint: 'family outdoors' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-red-3.jpg?updatedAt=1753171774277', category: 'Toddler', alt: 'A serene beach at sunset', hint: 'beach sunset' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-red-2.jpg?updatedAt=1753171773866', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-pink-4.jpg?updatedAt=1753171773829', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-pink-3.jpg?updatedAt=1753171773445', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-pink-2.jpg?updatedAt=1753171769109', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-brown-3.jpg?updatedAt=1753171769275', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-brown-1.jpg?updatedAt=1753171767448', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/toddler-portfolio-brown-2.jpg?updatedAt=1753171769114', category: 'Toddler', alt: 'Team collaboration in a modern workspace', hint: 'team collaboration' },
  // Toddler

  { src: 'https://images.unsplash.com/photo-1465495976206-857b88206aa6?q=80&w=800', category: 'Weddings', alt: 'Wedding details shot', hint: 'wedding rings' },
  { src: 'https://images.unsplash.com/photo-1523438943922-38d0211a14f4?q=80&w=800', category: 'Weddings', alt: 'Bride and groom walking away', hint: 'wedding couple' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800', category: 'Portraits', alt: 'A smiling man in a suit', hint: 'man smiling' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', category: 'Weddings', alt: 'Beautiful wedding reception setup', hint: 'wedding reception' },
  
];

function PortfolioComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory(categories[0]);
    }
  }, [category]);

  const filteredPhotos = photos.filter(photo => photo.category === activeCategory);

  return (
    <section id="portfolio-full" className="w-full py-12 md:py-24 lg:py-20 bg-background">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-thin tracking-tighter sm:text-5xl font-headline">Our Portfolio</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
              Browse through our portfolio of stunning photographs. Each image tells a unique story.
            </p>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-2 my-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-none',
                activeCategory === category 
                  ? 'text-white hover:bg-[#C2A77C]/90' 
                  : 'text-foreground'
              )}
              style={{
                backgroundColor: activeCategory === category ? '#C2A77C' : undefined,
                borderColor: activeCategory === category ? '#C2A77C' : undefined
              }}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={`${activeCategory}-${index}`} 
              className="overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full group border-0 shadow-none">
                <CardContent className="p-0 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    data-ai-hint={photo.hint}
                    width={600}
                    height={800}
                    className="w-full object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PortfolioComponent />
    </React.Suspense>
  )
}
