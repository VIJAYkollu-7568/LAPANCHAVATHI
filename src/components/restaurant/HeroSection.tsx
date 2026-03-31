import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="LA Panchavati Pure Veg Restaurant" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
      </div>
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 text-gold text-sm font-medium tracking-widest uppercase">
            <span className="w-8 h-px bg-gold" />
            Pure Vegetarian Excellence
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground">
            LA Panchavati
            <span className="block text-gradient-gold">Pure Veg Restaurant</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg font-body">
            Rajamahendravaram's beloved vegetarian destination. Mouth-watering dishes, 
            warm ambience & unforgettable dining since day one.
          </p>
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
            <span className="text-gold font-bold text-lg">★ 3.9</span>
            <span>(3,200+ reviews)</span>
            <span className="mx-2">•</span>
            <span>₹200–400 per person</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="hero" size="lg" className="gap-2" asChild>
              <a href="tel:09642374666">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" className="gap-2" asChild>
              <a href="https://maps.google.com/?q=LA+Panchavati+Pure+Veg+Restaurant+Rajamahendravaram" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
