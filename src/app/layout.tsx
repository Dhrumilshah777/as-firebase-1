
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { PageLoader } from '@/components/ui/page-loader';
import { VideoLoader } from '@/components/video-loader';
import { Jost, Gilda_Display } from 'next/font/google';
import { BackToTopButton } from '@/components/back-to-top';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['400', '500', '700'],
});

const gilda = Gilda_Display({
  subsets: ['latin'],
  variable: '--font-gilda-display',
  weight: ['400'],
});


export const metadata: Metadata = {
  title: 'Arihant Studio',
  description: 'High-quality photo studio for all your creative needs. We capture moments and create memories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jost.variable} ${gilda.variable}`}>
      <head />
      <body className="font-body antialiased">
        <VideoLoader />
        <PageLoader />
        <main>{children}</main>
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
