import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Videos | Uspekhi FullStack Blog",
    description: "Watch the latest videos, tutorials, and insights on fullstack development and AI.",
};

const videos = [
    {
        id: "wx-1",
        videoId: "PdwHbvzkPgs",
        label: "Featured Video"
    },
    {
        id: "wx-2",
        videoId: "uriEtTuth94",
        label: "Featured Video"
    },
    {
        id: "wx-3",
        videoId: "WxVxkQ7UjNg",
        label: "Featured Video"
    },
];

export default function VideosPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Videos</h1>
                <p className="text-muted-foreground text-lg">
                    Explore our latest collection of videos and tutorials.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden transition-all hover:ring-2 hover:ring-primary/20 hover:shadow-lg">
                        <CardContent className="p-0">
                            <div className="aspect-video w-full relative bg-muted">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.videoId}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
