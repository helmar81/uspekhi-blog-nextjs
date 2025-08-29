import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const displayPosts = allPostsData.slice(0, 6);

  // Make sure these files exist in your /public folder with exact casing
  const postImages = [
    { src: "/images/firebase.jpg", hint: "Firebase" },
    { src: "/images/amz.jpg", hint: "Amazon Webservice" },
    { src: "/images/astro.png", hint: "Astro" },
    { src: "/images/cloud.png", hint: "Cloud" },
    { src: "/images/kit.jpeg", hint: "SvelteKit" },
    { src: "/images/github.png", hint: "GitHub" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter">
          USPEKHI
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Front to Back — Powered by AI
        </p>
      </div>

      {/* Intro Section */}
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-center">
        <p>
Blend fullstack development and artificial intelligence to turn bold ideas into scalable products.

        </p>
        <p>
         It’s very possible that in the future, people without some form of AI augmentation might feel outpaced or replaced.
        </p>
      </div>

      {/* Posts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayPosts.map(({ slug, date, title }, index) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden rounded-lg">
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={postImages[index % postImages.length].src}
                  alt={title}
                  fill
                  priority={index === 0} // preload first image
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={postImages[index % postImages.length].hint}
                />
              </div>

              {/* Card Content */}
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {title}
                </CardTitle>
                <CardDescription>
                  <time dateTime={date}>
                    {format(new Date(date), 'MM-dd-yyyy')}
                  </time>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
