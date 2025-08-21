import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const displayPosts = allPostsData.slice(0, 3);
  const postImages = [
      { src: "https://placehold.co/600x400.png", hint: "AI technology" },
      { src: "https://placehold.co/600x400.png", hint: "cloud services" },
      { src: "https://placehold.co/600x400.png", hint: "software development" }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter">StarterStory</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          A starter blog template with AI-powered features.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-center">
        <p>
            Welcome to StarterStory, a place to share knowledge and stories. This template is designed to be a starting point for your own blog, with a clean design and AI-powered features to help you create content.
        </p>
        <p>
            Explore the posts, experiment with the AI tag suggester, and make it your own.
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayPosts.map(({ slug, date, title }, index) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden rounded-lg">
              <div className="relative w-full h-48">
                <Image 
                  src={postImages[index % postImages.length].src}
                  alt={title}
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={postImages[index % postImages.length].hint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {title}
                </CardTitle>
                <CardDescription>
                  <time dateTime={date}>{format(new Date(date), 'MM-dd-yyyy')}</time>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
