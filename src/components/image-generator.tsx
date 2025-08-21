'use client';

import { useState } from 'react';
import { Loader2, ImageIcon } from 'lucide-react';
import { generateImage } from '@/ai/flows/generate-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type ImageGeneratorProps = {
  postContent: string;
};

export default function ImageGenerator({ postContent }: ImageGeneratorProps) {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    setError(null);
    setImageDataUri(null);

    try {
      const result = await generateImage({ postContent });
      setImageDataUri(result.imageDataUri);
    } catch (e) {
      setError('Failed to generate image. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <ImageIcon className="w-5 h-5" />
          AI Image Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Generate a unique header image for this post based on its content.
        </p>
        <Button onClick={handleGenerateImage} disabled={isLoading} variant="secondary">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </Button>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {imageDataUri && (
          <div className="relative w-full aspect-video rounded-md overflow-hidden border">
            <Image 
                src={imageDataUri} 
                alt="Generated blog post header" 
                fill
                style={{objectFit: 'cover'}}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
