import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { PT_Sans, Playfair_Display } from 'next/font/google'
import { cn } from '@/lib/utils';
import Social from '@/components/Social';

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontBody = PT_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: 'StarterStory',
  description: 'A starter blog template with AI-powered features.',
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'Posts' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "antialiased min-h-screen flex flex-col bg-background text-foreground",
          fontHeadline.variable,
          fontBody.variable
        )}
      >
        <header className="py-4 px-4 sm:px-6 lg:px-8 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              StarterStory
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main className="flex-grow w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="py-9 lg:py-12 text-center bg-muted/50">
          <div className="mb-4">
            <nav>
              <ul className="flex justify-center space-x-4">
                {navLinks.slice(0, -1).map((link) => (
                   <li key={link.href}><a href={link.href} className="text-muted-foreground hover:text-primary">{link.label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <Social />
          <div className="text-sm y-5 text-muted-foreground">&copy;{new Date().getFullYear()} StarterStory</div>
        </footer>
      </body>
    </html>
  );
}
