import { useState } from "react";
import { validateAdmin, loginAdmin, logoutAdmin, isAdminLoggedIn } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, LayoutGrid, UtensilsCrossed, Image, Star, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminItems from "@/components/admin/AdminItems";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminImages from "@/components/admin/AdminImages";
import logo from "@/assets/logo-clean.png";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"categories" | "items" | "reviews" | "images">("categories");
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdmin(username, password)) {
      loginAdmin();
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-[hsl(220,25%,12%)] to-navy p-4 relative overflow-hidden">
        {/* 3D floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gold/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-accent/5 blur-2xl animate-float" />

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-sm space-y-6 rounded-2xl p-8 border border-accent/20 bg-[hsl(220,20%,10%)]/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_-10px_hsl(28,80%,52%,0.15)]"
          style={{ transform: "perspective(800px) rotateX(1deg)" }}
        >
          <div className="flex flex-col items-center gap-3">
            <img
              src={logo}
              alt="LA Panchavati"
              className="h-16 w-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            />
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-secondary/30 border-accent/10 focus:border-accent/40 text-primary-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary/30 border-accent/10 focus:border-accent/40 text-primary-foreground placeholder:text-muted-foreground"
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_4px_20px_-4px_hsl(28,80%,52%,0.4)]">
            Sign In
          </Button>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: "categories" as const, label: "Categories", icon: LayoutGrid },
    { id: "items" as const, label: "Menu Items", icon: UtensilsCrossed },
    { id: "images" as const, label: "Site Images", icon: Image },
    { id: "reviews" as const, label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-[hsl(220,25%,10%)] to-[hsl(220,20%,8%)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-accent/10 bg-[hsl(220,20%,10%)]/80 backdrop-blur-xl shadow-[0_4px_30px_-8px_rgba(0,0,0,0.4)]">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="LA Panchavati"
              className="h-10 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
            />
            <span className="text-xs font-medium text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { logoutAdmin(); setLoggedIn(false); }}
            className="text-muted-foreground hover:text-primary-foreground gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="container py-6">
        {/* Tab bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-accent text-accent-foreground shadow-[0_4px_20px_-4px_hsl(28,80%,52%,0.4)]"
                    : "bg-[hsl(220,15%,14%)] text-muted-foreground hover:text-primary-foreground hover:bg-[hsl(220,15%,18%)] border border-accent/5"
                }`}
                style={active ? { transform: "perspective(600px) translateZ(2px)" } : {}}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="bg-[hsl(220,20%,12%)]/60 backdrop-blur-sm border border-accent/10 rounded-2xl p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]">
          <div className="[&_*]:text-primary-foreground [&_input]:bg-secondary/20 [&_input]:border-accent/10 [&_textarea]:bg-secondary/20 [&_textarea]:border-accent/10 [&_select]:bg-secondary/20 [&_select]:border-accent/10 [&_.text-muted-foreground]:text-muted-foreground [&_p.text-destructive]:text-destructive">
            {tab === "categories" && <AdminCategories />}
            {tab === "items" && <AdminItems />}
            {tab === "images" && <AdminImages />}
            {tab === "reviews" && <AdminReviews />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
