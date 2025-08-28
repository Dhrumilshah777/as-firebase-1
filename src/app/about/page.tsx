
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Testimonials } from '@/components/testimonials';
import { InstagramFeed } from '@/components/instagram-feed';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[50vh] min-h-[500px]">
          <Image
            src="/images/arihant-ouside.jpg"
            alt="About Arihant Studio"
            data-ai-hint="photography studio"
            fill
            className="object-cover"
            priority
          />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-start">
              <h2 className="text-3xl font-light tracking-widest sm:text-4xl ">
                HOW OUR JOURNEY STARTED
              </h2>
              <div className="max-w-3xl space-y-6">
                <p className="text-muted-foreground leading-loose">
                  35 years ago, our two founders began their journey as humble helpers in a small photography studio. With nothing but passion in their hearts and a relentless commitment to their craft, they worked tirelessly day and night. In 1999, their dream took shape as they opened their very own studio named as Arihant Studio a symbol of their dedication and belief in themselves.
                </p>
                <p className="text-muted-foreground leading-loose">
                  Through years of hard work, they built not just a business, but a name that earned love and respect across Surat and within the Jain community. By 2006, just seven years later, their small studio had grown into a thriving space with two full-fledged units.
                </p>
                <p className="text-muted-foreground leading-loose">
                  But their journey didn't stop there. In 2016, with the same spirit that started it all, they opened a second branch in the Pal area—this time with four beautifully designed units. What started as a dream has now become a legacy of passion, perseverance, and pride.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
