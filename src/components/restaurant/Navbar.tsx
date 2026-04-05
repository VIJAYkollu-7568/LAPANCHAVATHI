import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-border/20">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2 group">
          <img src={logo} alt="LA Panchavati" className="h-14 w-auto animate-pulse drop-shadow-[0_4px_16px_rgba(194,120,3,0.3)] transition-all duration-700 group-hover:drop-shadow-[0_8px_32px_rgba(194,120,3,0.6)] group-hover:scale-110 group-hover:rotate-1" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="gap-1.5" asChild>
            <a href="tel:09642374666"><Phone className="w-4 h-4" /> Call Now</a>
          </Button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-navy border-t border-border/20 pb-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-primary-foreground/70 hover:text-primary-foreground">
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <Button variant="hero" size="sm" className="w-full gap-1.5" asChild>
              <a href="tel:09642374666"><Phone className="w-4 h-4" /> Call Now</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
