
import { Gallery } from '@/components/gallery';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
