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
    <section id="menu" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Menu</span>
          </h2>
          <p className="text-muted-foreground mt-3">Explore our wide variety of pure vegetarian delights</p>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-4xl">🍽️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-lg font-semibold text-primary-foreground">{cat.name}</h3>
                </div>
              </button>
            ))}
            {categories.length === 0 && (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                Menu items coming soon! Check back later.
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-accent font-medium mb-8 hover:underline">
              <ChevronLeft className="w-4 h-4" /> Back to Categories
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-foreground">{item.name}</h4>
                    {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
                    {item.price && (
                      <div className="flex items-center gap-1 mt-2 text-accent font-semibold">
                        <IndianRupee className="w-3.5 h-3.5" />{Number(item.price).toFixed(0)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">No items in this category yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
