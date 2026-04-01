import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gradient-warm">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-accent text-[11px] font-medium tracking-[0.2em] uppercase mb-2">Find Us</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Visit <span className="text-gradient-gold">Us Today</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-5">
            {[
              { Icon: MapPin, title: "Address", content: <p className="text-muted-foreground text-xs mt-1">78-1-3, Ave Appa Rao Rd, opp. First Cry, Syamala Nagar, Rajamahendravaram, AP 533103</p> },
              { Icon: Phone, title: "Phone", content: <a href="tel:09642374666" className="text-accent font-medium text-sm mt-1 block">096423 74666</a> },
              { Icon: Clock, title: "Hours", content: <><p className="text-muted-foreground text-xs mt-1">Open Daily · Closes 10:30 PM</p><p className="text-muted-foreground text-[10px] mt-0.5">~15 min wait · 25 min–1 hr visit</p></> },
            ].map(({ Icon, title, content }) => (
              <div key={title} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/30 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{title}</h3>
                  {content}
                </div>
              </div>
            ))}
            <Button variant="hero" size="default" className="w-full gap-2 shadow-[0_8px_24px_rgba(194,120,3,0.2)]" asChild>
              <a href="https://maps.google.com/?q=LA+Panchavati+Pure+Veg+Restaurant+Rajamahendravaram" target="_blank" rel="noopener noreferrer">
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden border border-border/50 h-64 md:h-auto min-h-[260px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.123!2d81.804!3d16.981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a0edac0f!2sLA+Panchavati+Pure+Veg+Restaurant!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="LA Panchavati location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
