import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Visit <span className="text-gradient-gold">Us Today</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground text-sm mt-1">78-1-3, Ave Appa Rao Rd, opp. First Cry, Syamala Nagar, Gandhipuram, Rajamahendravaram, AP 533103</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Phone</h3>
                <a href="tel:09642374666" className="text-accent font-medium mt-1 block">096423 74666</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Hours</h3>
                <p className="text-muted-foreground text-sm mt-1">Open Daily · Closes 10:30 PM</p>
                <p className="text-muted-foreground text-xs mt-0.5">Avg. wait: 15 min · Visit: 25 min–1 hr</p>
              </div>
            </div>
            <Button variant="hero" size="lg" className="w-full gap-2 mt-4" asChild>
              <a href="https://maps.google.com/?q=LA+Panchavati+Pure+Veg+Restaurant+Rajamahendravaram" target="_blank" rel="noopener noreferrer">
                <Navigation className="w-5 h-5" /> Get Directions
              </a>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden border border-border h-72 md:h-auto min-h-[280px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.123!2d81.804!3d16.981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a0edac0f!2sLA+Panchavati+Pure+Veg+Restaurant!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LA Panchavati location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
