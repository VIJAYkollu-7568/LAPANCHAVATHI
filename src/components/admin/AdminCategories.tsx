import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, GripVertical, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const AdminCategories = () => {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["menu_categories"],
    queryFn: async () => {
      const { data } = await supabase.from("menu_categories").select("*").order("display_order");
      return data || [];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `categories/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("restaurant-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("restaurant-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleAdd = async () => {
    if (!name.trim()) return toast.error("Enter category name");
    let imageUrl = null;
    if (imageFile) {
      try { imageUrl = await uploadImage(imageFile); } catch { toast.error("Image upload failed"); return; }
    }
    const order = categories.length;
    const { error } = await supabase.from("menu_categories").insert({ name: name.trim(), image_url: imageUrl, display_order: order });
    if (error) return toast.error("Failed to add");
    toast.success("Category added");
    setName(""); setImageFile(null);
    qc.invalidateQueries({ queryKey: ["menu_categories"] });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("menu_categories").delete().eq("id", id);
    if (error) return toast.error("Failed to delete");
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["menu_categories"] });
  };

  const handleReplaceImage = async (id: string, file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      await supabase.from("menu_categories").update({ image_url: imageUrl }).eq("id", id);
      toast.success("Image updated");
      qc.invalidateQueries({ queryKey: ["menu_categories"] });
    } catch { toast.error("Failed to update image"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
        <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted text-sm">
          <ImageIcon className="w-4 h-4" /> {imageFile ? imageFile.name.slice(0, 20) : "Image"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </label>
        <Button onClick={handleAdd} className="gap-1"><Plus className="w-4 h-4" /> Add</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0 group">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
                )}
                <label className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                  <ImageIcon className="w-5 h-5 text-primary-foreground" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleReplaceImage(cat.id, f);
                  }} />
                </label>
              </div>
              <span className="flex-1 font-medium">{cat.name}</span>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
