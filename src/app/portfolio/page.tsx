import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Welcome to my portfolio page! Here you can find a selection of my projects and skills.</p>
      </div>

      <div className="mx-auto max-w-screen-md text-left space-y-6">
        <p className="text-base sm:text-lg leading-relaxed">
          As a Level 3 Support Associate for Amazon, I excel at handling complex queries and escalated issues...
        </p>

        <p className="text-base sm:text-lg leading-relaxed">
          I am also Creator, Producer, Developer and everything that comes with video, photography and Web Development...
        </p>

        <div>
          <a
            href="https://unsplash.com/@uspekhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
          >
            View on Unsplash <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-screen-md">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              <a href="https://helmarbachle.web.app/" rel="noopener noreferrer" target="_blank" className="hover:text-primary transition-colors">
                My Resume
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image 
                    src="https://placehold.co/500x300.png" 
                    alt="Resume project screenshot" 
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint="website screenshot"
                />
            </div>
            <CardDescription>
              Created with Svelte and deployed on Firebase.
            </CardDescription>
            <Button asChild>
              <a href="https://helmarbachle.web.app/" rel="noopener noreferrer" target="_blank">
                Visit Website <ExternalLink className="ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
