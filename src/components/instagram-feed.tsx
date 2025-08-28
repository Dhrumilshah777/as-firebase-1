
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const instagramPhotos = [
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-2.jpg?updatedAt=1753171730696', alt: 'A pregnant woman in a pink dress', hint: 'pregnant woman', link: 'https://www.instagram.com/p/Co6m1HgpXq6/?img_index=1' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/jigar-sangeeta-insta.jpg?updatedAt=1753171735373', alt: 'A couple sitting together with a bicycle', hint: 'couple bicycle', link: 'https://www.instagram.com/p/DGK--ZrpiLj/?img_index=1'},
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-10.jpg?updatedAt=1753171727859', alt: 'A man proposing to a woman under an archway', hint: 'proposal couple', link: 'https://www.instagram.com/p/DANBA_6IlYo/?img_index=1' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-12.jpg?updatedAt=1753171728206', alt: 'A woman in a traditional green dress spinning around', hint: 'woman traditional dress', link: 'https://www.instagram.com/p/C3FpY5Mtcgg/?img_index=1' },
  { src: 'https://ik.imagekit.io/dqel2bwws/imgaes/gallery-13.jpg?updatedAt=1753171728250', alt: 'A woman in a traditional green dress spinning around', hint: 'woman traditional dress', link: 'https://www.instagram.com/p/CxZ5S_jP1PZ/' },
];

export function InstagramFeed() {
  return (
    <section id="instagram" className="w-full py-12 md:py-24 lg:py-15" style={{ backgroundColor: '#F2EFEA' }}>
      <div className=" px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline font-light tracking-tight">
            Instagram
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {instagramPhotos.map((photo, index) => (
            <Link href={photo.link} key={index} target="_blank" rel="noopener noreferrer">
              <div className="block overflow-hidden group aspect-w-1 aspect-h-1 xl:aspect-w-4 xl:aspect-h-5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  data-ai-hint={photo.hint}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover  transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="https://www.instagram.com/arihantstudio.in/" passHref>
            <Button size="lg" variant="outline" className="uppercase tracking-widest border-[#988463] text-[#988463] hover:bg-[#988463] hover:text-white transition-colors duration-300 rounded-none">Follow Us @ArihantStudio</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
