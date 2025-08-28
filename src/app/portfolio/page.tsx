import { Portfolio } from '@/components/portfolio';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Suspense } from 'react';

function PortfolioPageContents() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense>
      <PortfolioPageContents/>
    </Suspense>
  );
}
