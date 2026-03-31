import { Phone } from "lucide-react";

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur-md border-t border-border/20 p-3">
      <a
        href="tel:09642374666"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold shadow-lg"
      >
        <Phone className="w-5 h-5" /> Call Now — 096423 74666
      </a>
    </div>
  );
};

export default StickyCTA;
