import { Shield, Sparkles, Heart, Leaf, Users } from "lucide-react";

const benefits = [
  { icon: Leaf, title: "100% Pure Vegetarian", desc: "Every dish crafted with fresh, premium ingredients — no compromise on purity." },
  { icon: Sparkles, title: "Exceptional Ambience", desc: "Elegant interiors designed for a memorable dining experience every visit." },
  { icon: Heart, title: "Made with Love", desc: "Recipes perfected over years, served with genuine warmth and care." },
  { icon: Users, title: "Family Friendly", desc: "Spacious seating, kids-friendly menu, and a welcoming atmosphere for all." },
  { icon: Shield, title: "Trusted by 3,200+", desc: "Rated 3.9 stars with thousands of happy diners recommending us." },
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-gradient-gold">LA Panchavati</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
