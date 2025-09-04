import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostData, getSortedPostsData } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>; // ✅ params is now async in Next.js 15
}

// ✅ Fix for metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // await params
  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: "Post not found",
      description: "The requested post does not exist.",
    };
  }

  return {
    title: postData.title,
    description: postData.excerpt || "A blog post on Uspekhi Blog",
  };
}

// ✅ Fix for dynamic static params (SSG)
export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

// ✅ Fix for page rendering
export default async function Post({ params }: Props) {
  const { slug } = await params; // await params
  const postData = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="prose prose-lg max-w-none mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-4">{postData.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
// Note: Ensure that getPostData and getSortedPostsData are properly defined in "@/lib/posts"