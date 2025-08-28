
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Instagram, Youtube, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/portfolio', label: 'PORTFOLIO' },
  { href: '/gallery', label: 'GALLERY' },
  { href: '/#contact', label: 'CONTACT' },
];

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className=" text-lg tracking-widest">ARIHANT STUDIO</span>
        </Link>
        <div className="flex flex-1 items-center justify-center">
            <nav className="hidden  md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#9C8969]"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
        </div>
        <div className="hidden  md:flex items-center gap-4">
            <Link href="https://www.instagram.com/arihantstudio.in/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
             <Link href="#" className="text-muted-foreground hover:text-[#9C8969]">
              <WhatsappIcon className="h-5 w-5" />
              <span className="sr-only">Whatsapp</span>
            </Link>
            <Link href="https://www.youtube.com/@arihantstudiosurat" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
        </div>
        <div className="md:hidden ml-auto">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                 <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false} onClick={() => setIsSheetOpen(false)}>
                    <span className="text-lg tracking-widest">ARIHANT STUDIO</span>
                 </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium hover:text-[#9C8969]"
                    prefetch={false}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-4 pt-4 border-t">
                    <Link href="https://www.instagram.com/arihantstudio.in/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-[#9C8969]">
                        <WhatsappIcon className="h-5 w-5" />
                        <span className="sr-only">Whatsapp</span>
                    </Link>
                    <Link href="https://www.youtube.com/@arihantstudiosurat" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                    </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
