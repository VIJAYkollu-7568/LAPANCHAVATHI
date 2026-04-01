import { Shield, Sparkles, Heart, Leaf, Users } from "lucide-react";

const benefits = [
  { icon: Leaf, title: "100% Pure Veg", desc: "Fresh, premium ingredients with no compromise on purity." },
  { icon: Sparkles, title: "Elegant Ambience", desc: "Designed for a memorable dining experience every visit." },
  { icon: Heart, title: "Made with Love", desc: "Recipes perfected over years, served with genuine care." },
  { icon: Users, title: "Family Friendly", desc: "Spacious seating & kids-friendly menu for everyone." },
  { icon: Shield, title: "3,200+ Trust Us", desc: "Rated 3.9★ by thousands of happy diners." },
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 bg-gradient-warm">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Why Us</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Why Choose <span className="text-gradient-gold">LA Panchavati</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-accent/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* 3D glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 shadow-[0_4px_12px_rgba(194,120,3,0.1)]">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1 text-foreground">{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
