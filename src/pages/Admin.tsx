import { useState } from "react";
import { validateAdmin, loginAdmin, logoutAdmin, isAdminLoggedIn } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, LayoutGrid, UtensilsCrossed, Image, Star, ShieldCheck } from "lucide-react";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminItems from "@/components/admin/AdminItems";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminImages from "@/components/admin/AdminImages";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"categories" | "items" | "reviews" | "images">("categories");
  const [error, setError] = useState("");

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-6 rounded-2xl p-8 border border-border bg-card shadow-xl"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-heading text-xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Sign in to manage your restaurant</p>
          </div>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="font-heading font-semibold text-foreground">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { logoutAdmin(); setLoggedIn(false); }}
            className="text-muted-foreground hover:text-foreground gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="container py-6">
        {/* Tab bar */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          {tab === "categories" && <AdminCategories />}
          {tab === "items" && <AdminItems />}
          {tab === "images" && <AdminImages />}
          {tab === "reviews" && <AdminReviews />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
