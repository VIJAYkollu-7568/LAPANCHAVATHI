import { useState } from "react";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import logo from "@/assets/logo-clean.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 dark:bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="LA Panchavati" className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 dark:hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <Button variant="hero" size="sm" className="gap-1.5" asChild>
            <a href="tel:09642374666"><Phone className="w-4 h-4" /> Call Now</a>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button onClick={() => setOpen(!open)} className="text-primary-foreground dark:text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-navy dark:bg-background border-t border-border/20 pb-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-primary-foreground/70 hover:text-primary-foreground dark:text-foreground/70 dark:hover:text-foreground">
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
