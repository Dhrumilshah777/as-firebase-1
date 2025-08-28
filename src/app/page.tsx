
import { About } from '@/components/about';
import { Footer } from '@/components/footer';
import { FramesWeCreate } from '@/components/frames-we-create';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InstagramFeed } from '@/components/instagram-feed';
import { Testimonials } from '@/components/testimonials';
import { VideoSection } from '@/components/video-section';
import { VideoGallery } from '@/components/video-gallery';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1">
        <Hero />
        <About />
        <FramesWeCreate />
        <VideoSection />
        <VideoGallery />
        <Testimonials />
        <InstagramFeed />
      </div>
      <Footer />
    </div>
  );
}
