import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'StarterStory',
  description: 'A simple starter blog.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="text-3xl font-bold font-headline text-primary-foreground hover:text-primary transition-colors">
              StarterStory
            </Link>
          </div>
        </header>
        <main className="flex-grow w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t">
            <p className="text-center text-sm text-muted-foreground max-w-4xl mx-auto">
                © {new Date().getFullYear()} StarterStory. All rights reserved.
            </p>
        </footer>
      </body>
    </html>
  );
}
