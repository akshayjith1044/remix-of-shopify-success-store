import { useProductVideos } from "@/hooks/useProductVideos";
import { Play } from "lucide-react";

interface ProductVideosProps {
  productHandle: string;
}

export const ProductVideos = ({ productHandle }: ProductVideosProps) => {
  const { data: videos, isLoading } = useProductVideos(productHandle);

  if (isLoading || !videos?.length) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Play className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-bold text-foreground">Customer Videos</h2>
        <span className="text-xs font-body text-muted-foreground ml-1">({videos.length})</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-xl overflow-hidden border border-border bg-card aspect-[9/16] sm:aspect-video"
          >
            <video
              src={video.video_url}
              controls
              preload="metadata"
              className="w-full h-full object-cover"
              playsInline
            />
            {video.title && (
              <div className="p-3 border-t border-border">
                <p className="text-sm font-body text-foreground line-clamp-1">{video.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
