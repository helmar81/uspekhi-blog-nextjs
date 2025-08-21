import { getAllPostSlugs, getPostData } from '@/lib/posts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import TagSuggester from '@/components/tag-suggester';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  if (!postData) {
    return {
      title: 'Post not found',
    };
  }
  return {
    title: `${postData.title} | StarterStory`,
  };
}

export async function generateStaticParams() {
  const paths = await getAllPostSlugs();
  return paths;
}

export default async function Post({ params }: Props) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          {postData.title}
        </h1>
        <p className="text-muted-foreground">
          <time dateTime={postData.date}>{format(new Date(postData.date), 'LLLL d, yyyy')}</time>
        </p>
      </header>
      
      <Separator />

      <div className="prose whitespace-pre-wrap">
        {postData.content}
      </div>
      
      <Separator />

      <TagSuggester postContent={postData.content} />
    </article>
  );
}
