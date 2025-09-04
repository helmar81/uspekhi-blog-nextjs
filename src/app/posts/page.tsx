import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";

type Post = {
  id: string;
  date: string;
  title: string;
};

// Posts index page: lists all posts
export default async function PostsPage() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Posts
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our stories, ideas, and journeys.
        </p>
      </div>

      {/* Posts list */}
      <section className="space-y-4">
        {allPostsData.map(({ id, date, title }: Post) => (
          <Link href={`/posts/${id}`} key={id}>
            <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary-foreground hover:text-primary">
                  {title}
                </CardTitle>
                <CardDescription>
                  <time dateTime={date}>
                    {format(new Date(date), "LLLL d, yyyy")}
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

