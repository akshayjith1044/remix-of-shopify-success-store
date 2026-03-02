import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Upload, Loader2, Plus } from "lucide-react";

interface VideoRow {
  id: string;
  product_handle: string;
  video_url: string;
  title: string | null;
  sort_order: number;
  created_at: string;
}

export const AdminVideos = () => {
  const queryClient = useQueryClient();
  const [handle, setHandle] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["admin-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as VideoRow[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("product_videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["product-videos"] });
      toast.success("Video deleted");
    },
  });

  const handleUpload = async () => {
    if (!file || !handle.trim()) {
      toast.error("Product handle and video file are required");
      return;
    }
    setUploading(true);
    try {
      const fileName = `${handle}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("product-videos")
        .upload(fileName, file, { contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("product-videos")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("product_videos").insert({
        product_handle: handle.trim(),
        video_url: publicUrl.publicUrl,
        title: title.trim() || null,
      });
      if (insertError) throw insertError;

      queryClient.invalidateQueries({ queryKey: ["admin-videos"] });
      queryClient.invalidateQueries({ queryKey: ["product-videos"] });
      toast.success("Video uploaded!");
      setHandle("");
      setTitle("");
      setFile(null);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" /> Upload UGC Video
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="font-body text-sm">Product Handle *</Label>
            <Input
              placeholder="e.g. magnetic-phone-mount"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="font-body text-sm">Video Title (optional)</Label>
            <Input
              placeholder="Customer unboxing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label className="font-body text-sm">MP4 Video File *</Label>
          <Input
            type="file"
            accept="video/mp4,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1"
          />
        </div>
        <Button onClick={handleUpload} disabled={uploading} className="mt-4 gap-2">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload Video"}
        </Button>
      </div>

      {/* Video list */}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          All Videos ({videos?.length || 0})
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : !videos?.length ? (
          <p className="text-sm text-muted-foreground font-body">No videos uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {videos.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-foreground truncate">
                    {v.title || "Untitled"} <span className="text-muted-foreground font-body font-normal">— {v.product_handle}</span>
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">{v.video_url}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(v.id)}
                  disabled={deleteMutation.isPending}
                  className="text-destructive hover:text-destructive ml-3 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
