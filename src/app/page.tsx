import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import ChatWidget from '@/components/ChatWidget';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const displayPosts = allPostsData.slice(0, 6);

  const postImages = [
    { src: '/images/chatbot.jpg', hint: 'Bedrock' },
    { src: '/images/antigravity.webp', hint: 'Google' },
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

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20">
      {/* Hero Section with Enhanced Visual Hierarchy */}
      <section className="space-y-8 pb-16 border-b border-border/50">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Full-stack × AI
          </p>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
            Front to back —<br className="hidden sm:block" /> powered by AI
          </h1>

          <div className="space-y-4 max-w-3xl">
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              I help solo developers and small teams blend modern full-stack tools with practical AI
              so they can ship real products faster, without over-engineering their stack.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              If you want to stay competitive as AI changes the way we build software, the most
              reliable path is to learn how to use AI as an augmentation layer across your workflow:
              shaping ideas, writing code, and shipping to production.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-background to-muted/50 border border-border px-4 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md hover:scale-105">
            <span className="text-blue-500">○</span>
            SvelteKit · Next.js · React
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-background to-muted/50 border border-border px-4 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md hover:scale-105">
            <span className="text-orange-500">△</span>
            Firebase · AWS · Cloud Functions
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-background to-muted/50 border border-border px-4 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md hover:scale-105">
            <span className="text-purple-500">◇</span>
            AI assistants · automation · tooling
          </span>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="mt-16 sm:mt-24">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="inline-block">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Start here
              </h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              New here? Begin with these guides that show how I think about AI-augmented
              full-stack development.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/posts/ai-skins-or-be-replaced" className="group">
              <Card className="h-full border-2 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                <CardHeader className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    AI
                  </div>
                  <CardTitle className="text-base group-hover:text-blue-600 transition-colors leading-snug">
                    Will AI replace devs who don&apos;t use AI?
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    Why AI augmentation is becoming a baseline skill, not a nice-to-have.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/posts/svelte" className="group">
              <Card className="h-full border-2 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
                <CardHeader className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                    SK
                  </div>
                  <CardTitle className="text-base group-hover:text-orange-600 transition-colors leading-snug">
                    Ship a SvelteKit app with Firebase
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    A realistic path from idea to live app using SvelteKit and Firebase.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/posts/firebase-netlify-or-amazon-aws" className="group">
              <Card className="h-full border-2 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <CardHeader className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                    VS
                  </div>
                  <CardTitle className="text-base group-hover:text-purple-600 transition-colors leading-snug">
                    Firebase vs Netlify vs AWS
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    How to pick an infra stack as a solo builder in 2026.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts with Enhanced Cards */}
      <section className="mt-20 sm:mt-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Latest from the lab</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full mt-2" />
          </div>
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all posts
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post, index) => {
            const image = postImages[index % postImages.length];

            return (
              <Link key={post.id} href={`/posts/${post.id}`} className="group">
                <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {image && (
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                      <Image
                        src={image.src}
                        alt={image.hint}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <CardHeader className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <time className="text-xs font-medium text-muted-foreground">
                        {format(new Date(post.date), 'MMM d, yyyy')}
                      </time>
                      <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-xs font-medium text-blue-600">Article</span>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
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

      {/* FAQ Section with Better Visual Treatment */}
      <section className="mt-20 sm:mt-28 rounded-2xl border-2 border-border bg-gradient-to-br from-muted/30 to-background p-8 sm:p-10">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Questions this site answers</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>

          <div className="grid gap-5 sm:grid-cols-1">
            {[
              "How can a solo developer use AI to design, build, and ship full-stack apps faster?",
              "Which stack (SvelteKit, Next.js, Firebase, AWS, etc.) makes sense for small, AI-powered products?",
              "What practical steps can I take today to avoid being left behind as AI changes the developer workflow?",
              "How to build a Chat Bot with Bedrock?",
              "Why Github matters?"
             

            ].map((question, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                  {idx + 1}
                </div>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed pt-1">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
