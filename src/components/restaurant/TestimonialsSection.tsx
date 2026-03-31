import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

const defaultReviews = [
  { id: "d1", reviewer_name: "Happy Diner", rating: 5, review_text: "Prices are bit high but worth the ambience service and food", created_at: "" },
  { id: "d2", reviewer_name: "Food Lover", rating: 4, review_text: "Cheese garlic naan, Schezwan naan and paneer butter masala are must try.", created_at: "" },
  { id: "d3", reviewer_name: "Veg Enthusiast", rating: 5, review_text: "A perfect vegetarian option for Rajamundry people. Reasonable and affordable prices with mouth watering food.", created_at: "" },
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
    <section id="reviews" className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          What Our <span className="text-gradient-gold">Guests Say</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">Real experiences from our valued diners</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayReviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed italic">"{review.review_text}"</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">— {review.reviewer_name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
