import { Leaf, Clock, Car, Utensils } from "lucide-react";

const features = [
  { icon: Leaf, label: "100% Pure Veg" },
  { icon: Utensils, label: "Multi-Cuisine" },
  { icon: Car, label: "Spacious Parking" },
  { icon: Clock, label: "Open Daily" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-warm">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase">About Us</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            One Stop for All <span className="text-gradient-gold">Veg Lovers</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            In the heart of Rajamahendravaram — authentic Andhra, North Indian, Chinese & South Indian cuisine. 
            Happiness on every plate with dine-in, delivery & take-away.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            {features.map((f) => (
              <div key={f.label} className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium text-xs text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
