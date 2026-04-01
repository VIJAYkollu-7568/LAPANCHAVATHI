import { useState } from "react";
import { validateAdmin, loginAdmin, logoutAdmin, isAdminLoggedIn } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-card border border-border rounded-xl p-8">
          <h1 className="font-heading text-2xl font-bold text-center">Admin Login</h1>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: "categories" as const, label: "Categories" },
    { id: "items" as const, label: "Menu Items" },
    { id: "reviews" as const, label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold">LA Panchavati Admin</h1>
        <Button variant="ghost" size="sm" onClick={() => { logoutAdmin(); setLoggedIn(false); }}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </header>
      <div className="container py-6">
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t.id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "categories" && <AdminCategories />}
        {tab === "items" && <AdminItems />}
        {tab === "reviews" && <AdminReviews />}
      </div>
    </div>
  );
};

export default AdminPage;
