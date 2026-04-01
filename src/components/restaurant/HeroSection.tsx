import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="LA Panchavati Pure Veg Restaurant" width={1920} height={1080} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
      </div>

      {/* Floating 3D decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl animate-float" />
      <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-accent/5 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-10 w-20 h-20 rounded-full bg-gold-light/10 blur-xl animate-float" />

      <div className="container relative z-10 py-16 md:py-24 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <p className="text-gold/80 text-[11px] font-medium tracking-[0.25em] uppercase">
            — Pure Vegetarian Excellence —
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary-foreground">
            LA Panchavati
            <span className="block text-gradient-gold text-2xl md:text-3xl lg:text-4xl mt-1">Pure Veg Restaurant</span>
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/60 max-w-md mx-auto font-body leading-relaxed">
            Rajamahendravaram's beloved vegetarian destination — mouth-watering dishes & warm ambience.
          </p>

          {/* 3D Glass rating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mx-auto">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-gold font-bold text-sm">3.9</span>
            <span className="text-primary-foreground/50 text-xs">3,200+ reviews</span>
            <span className="text-primary-foreground/30 text-xs mx-1">•</span>
            <span className="text-primary-foreground/50 text-xs">₹200–400</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 justify-center">
            <Button variant="hero" size="default" className="gap-2 shadow-[0_8px_24px_rgba(194,120,3,0.3)] hover:shadow-[0_12px_32px_rgba(194,120,3,0.4)] transition-shadow" asChild>
              <a href="tel:09642374666">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </Button>
            <Button variant="hero-outline" size="default" className="gap-2 backdrop-blur-sm" asChild>
              <a href="https://maps.google.com/?q=LA+Panchavati+Pure+Veg+Restaurant+Rajamahendravaram" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4" /> Directions
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
