
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const photos = [
  { src: 'https://ik.imagekit.io/dqel2bwws/WeddingPoster.jpg?updatedAt=1756105377610', alt: 'A romantic wedding photo', hint: 'wedding couple', category: 'Weddings' },
  { src: 'https://ik.imagekit.io/dqel2bwws/parth-nikki-pre-wedding.jpg?updatedAt=1756105469837', alt: 'A lively event photo', hint: 'concert party', category: 'Pre-Wedding' },
  { src: 'https://ik.imagekit.io/dqel2bwws/maternity-new.jpg?updatedAt=1756105391534', alt: 'A heartwarming family photo', hint: 'family portrait', category: 'Maternity' },
  { src: 'https://ik.imagekit.io/dqel2bwws/couple-mew.jpg?updatedAt=1756105469278', alt: 'Another portrait', hint: 'portrait man', category: 'Couple' },
  { src: 'https://ik.imagekit.io/dqel2bwws/post-wedding-new-1.jpg?updatedAt=1756105470020', alt: 'A beautiful portrait photo', hint: 'portrait woman', category: 'Post-Wedding' },
  { src: 'https://ik.imagekit.io/dqel2bwws/toddler-new.jpg?updatedAt=1756105469936', alt: 'A stunning landscape', hint: 'mountain landscape', category: 'Toddler' },
];

export function FramesWeCreate() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-12" style={{ backgroundColor: '#F2EFEA' }}>
      <div className=" px-5 md:px-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-headline font-light tracking-tight">Frames we create</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse through our portfolio of stunning photographs. Each image tells a unique story.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-14">
          {photos.map((photo, index) => (
            <Link href={`/portfolio?category=${photo.category}`} key={index}>
              <div
                className="overflow-hidden cursor-pointer"
              >
                <Card className="h-full group border-0 shadow-none rounded-none">
                  <CardContent className="p-0 overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      data-ai-hint={photo.hint}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/portfolio" passHref>
            <Button size="lg" variant="outline" className="uppercase tracking-widest border-[#988463] text-[#988463] hover:bg-[#988463] hover:text-white transition-colors duration-300 rounded-none">View Portfolio</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
