import { useEffect, useState } from "react";
import { Phone, ShoppingCart } from "lucide-react";

const StickyCTA = () => {
  const [showCall, setShowCall] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowCall((prev) => !prev);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const cta = showCall
    ? {
        href: "tel:09642374666",
        label: "Call Now — 096423 74666",
        icon: <Phone className="w-5 h-5" />,
        bg: "bg-accent text-accent-foreground",
      }
    : {
        href: "https://www.swiggy.com/city/rajahmundry/la-panchavati-syamala-nagar-ava-road-rest458620",
        label: "Order Now",
        icon: <ShoppingCart className="w-5 h-5" />,
        bg: "bg-amber-600 text-white",
      };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur-md border-t border-border/20 p-3">
      <a
        href={cta.href}
        target={showCall ? undefined : "_blank"}
        rel={showCall ? undefined : "noopener noreferrer"}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold shadow-lg ${cta.bg}`}
      >
        {cta.icon}
        {cta.label}
      </a>
    </div>
  );
};

export default StickyCTA;
