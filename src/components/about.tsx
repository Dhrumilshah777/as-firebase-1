
"use client";

import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming you have a hook to detect screen size

export function About() {
  const isMobileOrTablet = useIsMobile(); // Using a custom hook to check if the screen is smaller than 992px

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-2 md:px-4">
      <h2 className='text-center text-2xl sm:text-4xl md:text-5xl font-headline  mb-10'>We find <span >Magic</span> in Mundane, <br/>
      <span  style={{ color: '#9C8969' }}>Stories</span> in every frame </h2>
        {isMobileOrTablet ? (
          // Layout for screens smaller than 992px
          <div className="grid grid-cols-1 items-center gap-8 px-2">
            <div className="grid grid-cols-2 gap-4">
              <Image
                  src="https://ik.imagekit.io/dqel2bwws/imgaes/sparsh-vama-black&white.jpg?updatedAt=1753171761731"
                  width={400}
                  height={500}
                  alt="A loving couple"
                  data-ai-hint="couple portrait"
                  className="object-cover aspect-[4/5] w-full"
                  priority
              />
              <Image
                  src="https://ik.imagekit.io/dqel2bwws/imgaes/aangi-sinlge-1.jpg?updatedAt=1756104492266"
                  width={400}
                  height={500}
                  alt="A bride in a red veil"
                  data-ai-hint="indian bride"
                  className="object-cover aspect-[4/5] w-full"
                  priority
              />
            </div>
            <div className="space-y-6 text-left ">
                <p className=" text-sm leading-loose ">
                  Welcome to ARIHANT STUDIO — where moments become memories.
                </p>
                <p className=" text-sm leading-tight">
                  We're a team of passionate photographers and visual storytellers dedicated to capturing life's most meaningful moments. Whether it's a wedding, a family portrait, a milestone celebration, or a brand that needs its story told, we believe every moment deserves to be preserved beautifully.
                </p>
                <p className=" text-sm  leading-tight">
                  At ARIHANT STUDIO, we combine a keen eye for detail with a love for authentic emotion. Our approach is personal, professional, and creative — making sure every image reflects not just what it looked like, but what it felt like.
                </p>
                <p className=" text-sm leading-tight">
                  With <span className="font-bold text-foreground">25 years of experience</span>  and a deep appreciation for natural light, genuine connections, and thoughtful composition, our goal is simple: to create timeless images that you’ll treasure for years to come.
                </p>
            </div>
          </div>
        ) : (
          // Layout for screens 992px and larger
          <div className="grid grid-cols-3 gap-8 items-center">
              <div className="ps-10 ms-8">
                <Image
                    src="https://ik.imagekit.io/dqel2bwws/imgaes/sparsh-vama-black&white.jpg?updatedAt=1753171761731"
                    width={400}
                    height={500}
                    alt="A loving couple"
                    data-ai-hint="couple portrait"
                    className="object-cover w-full aspect-[4/5]"
                    priority
                />
              </div>
              <div className="space-y-6 text-left">
                <p className=" text-sm  leading-loose">
                  Welcome to ARIHANT STUDIO — where moments become memories.
                </p>
                <p className=" text-sm  leading-loose">
                  We're a team of passionate photographers and visual storytellers dedicated to capturing life's most meaningful moments. Whether it's a wedding, a family portrait, a milestone celebration, or a brand that needs its story told, we believe every moment deserves to be preserved beautifully.
                </p>
                <p className=" text-sm leading-loose">
                  At ARIHANT STUDIO, we combine a keen eye for detail with a love for authentic emotion. Our approach is personal, professional, and creative — making sure every image reflects not just what it looked like, but what it felt like.
                </p>
                <p className=" text-sm leading-loose">
                  With <span className="font-bold text-foreground">25 years of experience</span>  and a deep appreciation for natural light, genuine connections, and thoughtful composition, our goal is simple: to create timeless images that you’ll treasure for years to come.
                </p>
              </div>
              <div className="pe-10 me-8">
                <Image
                    src="https://ik.imagekit.io/dqel2bwws/imgaes/aangi-sinlge-1.jpg?updatedAt=1756104492266"
                    width={400}
                    height={500}
                    alt="A bride in a red veil"
                    data-ai-hint="indian bride"
                    className="object-cover w-full aspect-[4/5]"
                    priority
                />
              </div>
          </div>
        )}
      </div>
    </section>
  );
}
