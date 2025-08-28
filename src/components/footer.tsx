
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

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

export function Footer() {
  return (
    <footer className="border-t text-foreground" style={{ backgroundColor: '#F2EFEA' }}>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div>
            <h3 className="text-lg font-light tracking-widest mb-2">Telephone</h3>
            <a href="tel:+919824866622" className="text-muted-foreground hover:text-[#9C8969]">+91 9824866622</a>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-widest mb-2">Social</h3>
            <div className="flex justify-center space-x-4">
              <Link href="https://www.instagram.com/arihantstudio.in/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#9C8969]">
                <WhatsappIcon className="h-6 w-6" />
                <span className="sr-only">Whatsapp</span>
              </Link>
              <Link href="https://www.youtube.com/@arihantstudiosurat" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#9C8969]">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-light tracking-widest mb-2">Email</h3>
            <a href="mailto:arihantstudiopal@gmail.com" className="text-muted-foreground hover:text-[#9C8969]">arihantstudiopal@gmail.com</a>
          </div>
        </div>
        
        <div className="border-t border-border/50 my-8"></div>

        <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-[#9C8969]">PORTFOLIO</Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-[#9C8969]">ABOUT</Link>
            <Link href="/gallery" className="text-sm text-muted-foreground hover:text-[#9C8969]">GALLERY</Link>
            <Link href="/#contact" className="text-sm text-muted-foreground hover:text-[#9C8969]">CONTACT</Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">&copy; {new Date().getFullYear()} Arihant Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
