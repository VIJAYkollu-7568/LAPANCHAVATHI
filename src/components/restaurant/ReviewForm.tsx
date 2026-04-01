import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rating || !text.trim()) {
      toast.error("Please fill all fields and select a rating");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({ reviewer_name: name.trim(), rating, review_text: text.trim() });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success("Thank you! Your review will appear after approval.");
      setName(""); setRating(0); setText("");
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-md mx-auto text-center">
        <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Feedback</p>
        <h2 className="font-heading text-2xl font-bold mb-6">
          Share Your <span className="text-gradient-gold">Experience</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 bg-card border border-border/50 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-left">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="text-sm" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
                <Star className={`w-5 h-5 transition-colors ${star <= (hoverRating || rating) ? "fill-gold text-gold" : "text-border"}`} />
              </button>
            ))}
          </div>
          <Textarea placeholder="Tell us about your experience..." value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={1000} className="text-sm" />
          <Button type="submit" variant="hero" size="sm" className="w-full gap-2" disabled={submitting}>
            <Send className="w-3.5 h-3.5" /> {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
