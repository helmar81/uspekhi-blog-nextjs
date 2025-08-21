'use client';

import { useState } from 'react';
import { Loader2, Tags } from 'lucide-react';
import { suggestTags } from '@/ai/flows/suggest-tags';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TagSuggesterProps = {
  postContent: string;
};

export default function TagSuggester({ postContent }: TagSuggesterProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestTags = async () => {
    setIsLoading(true);
    setError(null);
    setTags([]);

    try {
      const result = await suggestTags({ postContent });
      setTags(result.tags);
    } catch (e) {
      setError('Failed to suggest tags. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <Tags className="w-5 h-5" />
          AI Tag Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Click the button below to get AI-powered tag suggestions for this post.
        </p>
        <Button onClick={handleSuggestTags} disabled={isLoading} variant="secondary">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Suggesting...
            </>
          ) : (
            'Suggest Tags'
          )}
        </Button>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-base bg-accent/20 border-accent">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
