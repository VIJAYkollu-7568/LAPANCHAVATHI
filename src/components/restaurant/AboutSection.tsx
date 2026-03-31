import { Leaf, Clock, Car, Utensils } from "lucide-react";

const features = [
  { icon: Leaf, label: "100% Pure Veg" },
  { icon: Utensils, label: "Multi-Cuisine" },
  { icon: Car, label: "Spacious Parking" },
  { icon: Clock, label: "Open Daily" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-warm">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            One Stop Solution for All <span className="text-gradient-gold">Veg Lovers</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Located in the heart of Rajamahendravaram, LA Panchavati is your go-to destination 
            for authentic vegetarian cuisine. With a variety of Andhra, North Indian, Chinese, 
            South Indian & more — we serve happiness on every plate with the best dine-in 
            experience, home delivery & take-away options.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-3 p-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="font-medium text-sm text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
