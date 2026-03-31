import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground/70 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">
              LA <span className="text-gradient-gold">Panchavati</span>
            </h3>
            <p className="text-sm leading-relaxed">Pure vegetarian restaurant serving Andhra, North Indian, Chinese, South Indian & more.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-primary-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a>
              <a href="#menu" className="hover:text-primary-foreground transition-colors">Menu</a>
              <a href="#reviews" className="hover:text-primary-foreground transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <h4 className="font-heading font-semibold text-primary-foreground">Contact Info</h4>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /><a href="tel:09642374666">096423 74666</a></div>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent mt-0.5" /><span>78-1-3, Ave Appa Rao Rd, Rajamahendravaram</span></div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /><span>Open Daily · Closes 10:30 PM</span></div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs">
          © {new Date().getFullYear()} LA Panchavati Pure Veg Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
