import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, Star, FileUp } from "lucide-react";

interface ReviewRow {
  id: string;
  product_handle: string;
  reviewer_name: string;
  rating: number;
  review_text: string | null;
  source: string;
  source_url: string | null;
  verified_purchase: boolean;
  review_date: string;
  created_at: string;
}

export const AdminReviews = () => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<"manual" | "import">("manual");

  // Manual form state
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [source, setSource] = useState("aliexpress");
  const [sourceUrl, setSourceUrl] = useState("");
  const [verified, setVerified] = useState(true);

  // Import state
  const [importJson, setImportJson] = useState("");
  const [importing, setImporting] = useState(false);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ReviewRow[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("product_reviews").insert({
        product_handle: handle.trim(),
        reviewer_name: name.trim(),
        rating,
        review_text: text.trim() || null,
        source,
        source_url: sourceUrl.trim() || null,
        verified_purchase: verified,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
      toast.success("Review added!");
      setName("");
      setText("");
      setSourceUrl("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("product_reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
      toast.success("Review deleted");
    },
  });

  const handleImport = async () => {
    if (!importJson.trim()) {
      toast.error("Paste JSON review data first");
      return;
    }
    setImporting(true);
    try {
      const parsed = JSON.parse(importJson);
      const rows = Array.isArray(parsed) ? parsed : [parsed];
      const formatted = rows.map((r: any) => ({
        product_handle: r.product_handle || r.handle || handle,
        reviewer_name: r.reviewer_name || r.name || r.author || "Anonymous",
        rating: Math.min(5, Math.max(1, parseInt(r.rating) || 5)),
        review_text: r.review_text || r.text || r.content || null,
        source: r.source || "aliexpress",
        source_url: r.source_url || r.url || null,
        verified_purchase: r.verified_purchase ?? r.verified ?? true,
      }));
      const { error } = await supabase.from("product_reviews").insert(formatted);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
      toast.success(`Imported ${formatted.length} review(s)!`);
      setImportJson("");
    } catch (err: any) {
      toast.error(err.message || "Import failed — check JSON format");
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === "manual" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("manual")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Add Manually
        </Button>
        <Button
          variant={mode === "import" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("import")}
          className="gap-2"
        >
          <FileUp className="h-4 w-4" /> Bulk Import JSON
        </Button>
      </div>

      {mode === "manual" ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Add Review</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-body text-sm">Product Handle *</Label>
              <Input placeholder="magnetic-phone-mount" value={handle} onChange={(e) => setHandle(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="font-body text-sm">Reviewer Name *</Label>
              <Input placeholder="Sarah M." value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="font-body text-sm">Rating (1–5)</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} className="p-0.5">
                    <Star className={`h-6 w-6 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="font-body text-sm">Source</Label>
              <div className="flex gap-2 mt-1">
                {["aliexpress", "amazon", "manual"].map((s) => (
                  <Button key={s} variant={source === s ? "default" : "outline"} size="sm" onClick={() => setSource(s)} className="capitalize text-xs">
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Label className="font-body text-sm">Review Text</Label>
            <Textarea placeholder="Great product…" value={text} onChange={(e) => setText(e.target.value)} className="mt-1" rows={3} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <Label className="font-body text-sm">Source URL (optional)</Label>
              <Input placeholder="https://aliexpress.com/…" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="mt-1" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
                <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} className="rounded" />
                Verified Purchase
              </label>
            </div>
          </div>
          <Button onClick={() => addMutation.mutate()} disabled={addMutation.isPending || !handle.trim() || !name.trim()} className="mt-4 gap-2">
            {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add Review
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">Bulk Import Reviews</h3>
          <p className="text-xs text-muted-foreground font-body mb-4">
            Paste a JSON array with fields: <code className="bg-secondary px-1 rounded">product_handle</code>, <code className="bg-secondary px-1 rounded">name</code>, <code className="bg-secondary px-1 rounded">rating</code>, <code className="bg-secondary px-1 rounded">text</code>, <code className="bg-secondary px-1 rounded">source</code> (aliexpress/amazon), <code className="bg-secondary px-1 rounded">verified</code>
          </p>
          <Textarea
            placeholder={`[\n  {\n    "product_handle": "magnetic-phone-mount",\n    "name": "Sarah M.",\n    "rating": 5,\n    "text": "Love this mount!",\n    "source": "aliexpress",\n    "verified": true\n  }\n]`}
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            rows={10}
            className="font-mono text-xs"
          />
          <Button onClick={handleImport} disabled={importing} className="mt-4 gap-2">
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
            {importing ? "Importing…" : "Import Reviews"}
          </Button>
        </div>
      )}

      {/* Review list */}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          All Reviews ({reviews?.length || 0})
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : !reviews?.length ? (
          <p className="text-sm text-muted-foreground font-body">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="flex items-start justify-between rounded-lg border border-border bg-card p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-sm font-semibold text-foreground">{r.reviewer_name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground uppercase tracking-wider font-body">{r.source}</span>
                    <span className="text-xs text-muted-foreground font-body">— {r.product_handle}</span>
                  </div>
                  {r.review_text && <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-2">{r.review_text}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(r.id)}
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
