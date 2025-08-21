import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Welcome to StarterStory</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A place to share stories, ideas, and journeys. Explore the posts below to see what's new.
        </p>
      </div>
      <section className="space-y-4">
        {allPostsData.map(({ slug, date, title }) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary-foreground hover:text-primary">
                  {title}
                </CardTitle>
                <CardDescription>
                  <time dateTime={date}>{format(new Date(date), 'LLLL d, yyyy')}</time>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
