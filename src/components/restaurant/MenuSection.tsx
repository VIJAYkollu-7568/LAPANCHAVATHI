import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ChevronLeft, IndianRupee } from "lucide-react";

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["menu_categories"],
    queryFn: async () => {
      const { data } = await supabase.from("menu_categories").select("*").order("display_order");
      return data || [];
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["menu_items", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const { data } = await supabase.from("menu_items").select("*").eq("category_id", selectedCategory).eq("is_available", true).order("display_order");
      return data || [];
    },
    enabled: !!selectedCategory,
  });

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Explore</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Menu</span>
          </h2>
          <p className="text-muted-foreground text-xs mt-2">Wide variety of pure vegetarian delights</p>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 hover:border-accent/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              >
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-3xl">🍽️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-heading text-sm font-semibold text-primary-foreground">{cat.name}</h3>
                </div>
              </button>
            ))}
            {categories.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                Menu coming soon!
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-1.5 text-accent font-medium text-sm mb-6 hover:underline">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-foreground">{item.name}</h4>
                    {item.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>}
                    {item.price && (
                      <div className="flex items-center gap-0.5 mt-1.5 text-accent font-semibold text-sm">
                        <IndianRupee className="w-3 h-3" />{Number(item.price).toFixed(0)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="col-span-full text-center py-10 text-muted-foreground text-sm">No items yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
