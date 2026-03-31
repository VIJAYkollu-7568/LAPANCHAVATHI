import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const AdminItems = () => {
  const qc = useQueryClient();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["menu_categories"],
    queryFn: async () => {
      const { data } = await supabase.from("menu_categories").select("*").order("display_order");
      return data || [];
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["menu_items_admin", categoryId],
    queryFn: async () => {
      let q = supabase.from("menu_items").select("*, menu_categories(name)").order("display_order");
      if (categoryId) q = q.eq("category_id", categoryId);
      const { data } = await q;
      return data || [];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `items/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("restaurant-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("restaurant-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleAdd = async () => {
    if (!name.trim() || !categoryId) return toast.error("Name and category required");
    let imageUrl = null;
    if (imageFile) {
      try { imageUrl = await uploadImage(imageFile); } catch { toast.error("Upload failed"); return; }
    }
    const { error } = await supabase.from("menu_items").insert({
      name: name.trim(), description: description.trim() || null,
      price: price ? parseFloat(price) : null, image_url: imageUrl,
      category_id: categoryId, display_order: items.length,
    });
    if (error) return toast.error("Failed to add");
    toast.success("Item added");
    setName(""); setDescription(""); setPrice(""); setImageFile(null);
    qc.invalidateQueries({ queryKey: ["menu_items_admin"] });
  };

  const handleDelete = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["menu_items_admin"] });
  };

  const handleReplaceImage = async (id: string, file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      await supabase.from("menu_items").update({ image_url: imageUrl }).eq("id", id);
      toast.success("Image updated");
      qc.invalidateQueries({ queryKey: ["menu_items_admin"] });
    } catch { toast.error("Failed"); }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await supabase.from("menu_items").update({ is_available: !current }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["menu_items_admin"] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="font-heading font-semibold">Add New Item</h3>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <Input placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        <div className="flex gap-3">
          <Input placeholder="Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-32" />
          <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted text-sm flex-1">
            <ImageIcon className="w-4 h-4" /> {imageFile ? imageFile.name.slice(0, 20) : "Image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </label>
        </div>
        <Button onClick={handleAdd} className="gap-1"><Plus className="w-4 h-4" /> Add Item</Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-semibold">All Items ({items.length})</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          <button onClick={() => setCategoryId("")} className={`px-3 py-1 rounded-full text-xs font-medium border ${!categoryId ? "bg-accent text-accent-foreground border-accent" : "border-border"}`}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCategoryId(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryId === c.id ? "bg-accent text-accent-foreground border-accent" : "border-border"}`}>
              {c.name}
            </button>
          ))}
        </div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-secondary flex-shrink-0 group">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">🍛</div>
              )}
              <label className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                <ImageIcon className="w-4 h-4 text-primary-foreground" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleReplaceImage(item.id, f);
                }} />
              </label>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{(item as any).menu_categories?.name} {item.price ? `· ₹${Number(item.price).toFixed(0)}` : ""}</p>
            </div>
            <button onClick={() => toggleAvailability(item.id, item.is_available ?? true)}
              className={`px-2 py-1 rounded text-xs font-medium ${item.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {item.is_available ? "Available" : "Hidden"}
            </button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminItems;
