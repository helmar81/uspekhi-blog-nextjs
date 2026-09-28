import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const displayPosts = allPostsData.slice(0, 6);

  const postImages = [
    { src: '/images/gemini.webp', hint: 'Gemini' },
    { src: '/images/fix.webp', hint: 'Tailwind' },
    { src: '/images/docker.jpg', hint: 'Docker' },
    { src: '/images/play.jpg', hint: 'Play' },
    { src: '/images/next.jpg', hint: 'Next.js' },
    { src: '/images/firebase.jpg', hint: 'Firebase' },
    { src: '/images/analytics.png', hint: 'Google Analytics' },
    { src: '/images/AWS.png', hint: 'AWS' },
    { src: '/images/cloud.png', hint: 'Cloud' },
    { src: '/images/kit.jpeg', hint: 'SvelteKit' },
    { src: '/images/github.png', hint: 'GitHub' },
  ];

  const faqs = [
    {
      question:
        'How can a solo developer use AI to design, build, and ship full-stack apps faster?',
      answer:
        'By treating AI as an augmentation layer across ideation, coding, debugging, and deployment, and combining it with a realistic stack like SvelteKit or Next.js plus Firebase or AWS.',
    },
    {
      question:
        'Which stack makes sense for small AI-powered products?',
      answer:
        'A modern frontend framework (SvelteKit or Next.js) with managed backends like Firebase, serverless functions, and simple automation tools such as n8n works well for small AI-powered products.',
    },
    {
      question:
        'How do I avoid being left behind as AI changes developer workflows?',
      answer:
        'Adopt AI tools into your daily workflow, learn how to prompt effectively for coding tasks, and build small end-to-end projects that integrate LLM APIs into real user-facing features.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://uspekhi.web.app/#website',
        url: 'https://uspekhi.web.app/',
        name: 'Uspekhi – Front to Back, Powered by AI',
        description:
          'A technical blog by Helmar Baechle for solo developers and small teams who want to blend modern full-stack development with practical AI to ship real products faster.',
      },
      {
        '@type': 'Person',
        '@id': 'https://uspekhi.web.app/#person',
        name: 'Helmar Baechle',
        url: 'https://uspekhi.web.app/',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://uspekhi.web.app/#faq',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* JSON-LD for search/AI engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero / intro */}
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
          Full‑stack × AI
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Front to back — powered by AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          I help solo developers and small teams blend modern full‑stack tools with practical AI
          so they can ship real products faster, without over‑engineering their stack.
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl">
          If you want to stay competitive as AI changes the way we build software, the most
          reliable path is to learn how to use AI as an augmentation layer across your workflow:
          shaping ideas, writing code, and shipping to production.
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1">
            SvelteKit · Next.js · React
          </span>
          <span className="rounded-full bg-muted px-3 py-1">
            Firebase · AWS · Cloud Functions
          </span>
          <span className="rounded-full bg-muted px-3 py-1">
            AI assistants · automation · tooling
          </span>
        </div>
      </section>

      {/* Latest posts (keep your existing grid) */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Latest from the lab</h2>
          <Link
            href="/posts"
            className="text-sm text-blue-500 hover:underline"
          >
            View all posts
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => {
            const image = postImages[index % postImages.length];

            return (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <Card className="h-full flex flex-col hover:shadow-sm transition-shadow">
                  {image && (
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.hint}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <CardTitle className="line-clamp-2 text-base">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs">
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </CardDescription>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ block that matches JSON-LD FAQPage */}
      <section className="mt-12 border-t pt-8 space-y-4">
        <h2 className="text-lg font-semibold">Questions this site answers</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {faqs.map((item) => (
            <li key={item.question}>
              <p className="font-medium">{item.question}</p>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
