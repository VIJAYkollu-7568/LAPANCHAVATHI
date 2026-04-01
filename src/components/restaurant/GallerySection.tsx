import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { X } from "lucide-react";

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data: images = [] } = useQuery({
    queryKey: ["site_images_gallery"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_images")
        .select("*")
        .in("section", ["gallery", "ambience"])
        .order("display_order");
      return data || [];
    },
  });

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="py-16 bg-gradient-warm">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Gallery</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Ambience</span>
          </h2>
          <p className="text-muted-foreground text-xs mt-2">A glimpse into our warm & welcoming space</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.image_url)}
              className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 hover:border-accent/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1"
            >
              <img
                src={img.image_url}
                alt={img.label || "Restaurant gallery"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {img.label && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-xs font-medium text-primary-foreground">{img.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-navy/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground">
            <X className="w-6 h-6" />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-lg object-contain" />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
