import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Quote } from "lucide-react";

const defaultReviews = [
  { id: "d1", reviewer_name: "Happy Diner", rating: 5, review_text: "Prices are bit high but worth the ambience service and food", created_at: "" },
  { id: "d2", reviewer_name: "Food Lover", rating: 4, review_text: "Cheese garlic naan, Schezwan naan and paneer butter masala are must try.", created_at: "" },
  { id: "d3", reviewer_name: "Veg Enthusiast", rating: 5, review_text: "A perfect vegetarian option for Rajamundry people. Reasonable and affordable prices.", created_at: "" },
];

const TestimonialsSection = () => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["approved_reviews"],
    queryFn: async () => {
      const { data } = await supabase.from("reviews").select("*").eq("is_approved", true).order("created_at", { ascending: false }).limit(6);
      return data || [];
    },
  });

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Testimonials</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            What Our <span className="text-gradient-gold">Guests Say</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {displayReviews.map((review) => (
            <div key={review.id} className="relative bg-card border border-border/50 rounded-xl p-5 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
              <Quote className="w-6 h-6 text-accent/20 absolute top-4 right-4" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground/70 text-xs leading-relaxed italic">"{review.review_text}"</p>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">— {review.reviewer_name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
