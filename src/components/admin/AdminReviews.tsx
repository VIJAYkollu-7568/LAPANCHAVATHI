import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const qc = useQueryClient();

  const { data: reviews = [] } = useQuery({
    queryKey: ["all_reviews"],
    queryFn: async () => {
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const handleApprove = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    toast.success(approved ? "Approved" : "Hidden");
    qc.invalidateQueries({ queryKey: ["all_reviews"] });
    qc.invalidateQueries({ queryKey: ["approved_reviews"] });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["all_reviews"] });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-heading font-semibold">All Reviews ({reviews.length})</h3>
      {reviews.map((r) => (
        <div key={r.id} className={`bg-card border rounded-lg p-4 space-y-2 ${r.is_approved ? "border-green-200" : "border-border"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{r.reviewer_name}</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
            </div>
            <div className="flex gap-1">
              {!r.is_approved && (
                <Button variant="ghost" size="icon" onClick={() => handleApprove(r.id, true)} title="Approve">
                  <Check className="w-4 h-4 text-green-600" />
                </Button>
              )}
              {r.is_approved && (
                <Button variant="ghost" size="icon" onClick={() => handleApprove(r.id, false)} title="Hide">
                  <X className="w-4 h-4 text-orange-500" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{r.review_text}</p>
          <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
        </div>
      ))}
      {reviews.length === 0 && <p className="text-muted-foreground py-8 text-center">No reviews yet.</p>}
    </div>
  );
};

export default AdminReviews;
