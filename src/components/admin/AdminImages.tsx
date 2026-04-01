import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { value: "hero", label: "Hero / Banner" },
  { value: "gallery", label: "Gallery" },
  { value: "about", label: "About Section" },
  { value: "ambience", label: "Ambience" },
];

const AdminImages = () => {
  const qc = useQueryClient();
  const [section, setSection] = useState("hero");
  const [label, setLabel] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [filterSection, setFilterSection] = useState("");

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["site_images"],
    queryFn: async () => {
      const { data } = await supabase.from("site_images").select("*").order("section").order("display_order");
      return data || [];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `site/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("restaurant-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("restaurant-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleAdd = async () => {
    if (!imageFile) return toast.error("Select an image");
    try {
      const imageUrl = await uploadImage(imageFile);
      const order = images.filter((i) => i.section === section).length;
      const { error } = await supabase.from("site_images").insert({
        section,
        label: label.trim() || null,
        image_url: imageUrl,
        display_order: order,
      });
      if (error) throw error;
      toast.success("Image added");
      setLabel("");
      setImageFile(null);
      qc.invalidateQueries({ queryKey: ["site_images"] });
    } catch {
      toast.error("Failed to upload");
    }
  };

  const handleReplace = async (id: string, file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      await supabase.from("site_images").update({ image_url: imageUrl }).eq("id", id);
      toast.success("Image replaced");
      qc.invalidateQueries({ queryKey: ["site_images"] });
    } catch {
      toast.error("Failed to replace");
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("site_images").delete().eq("id", id);
    if (error) return toast.error("Failed to delete");
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["site_images"] });
  };

  const filtered = filterSection ? images.filter((i) => i.section === filterSection) : images;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h3 className="font-heading font-semibold">Add Site Image</h3>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          {SECTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <Input placeholder="Label (optional)" value={label} onChange={(e) => setLabel(e.target.value)} />
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted text-sm flex-1">
            <Upload className="w-4 h-4" /> {imageFile ? imageFile.name.slice(0, 25) : "Choose image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </label>
          <Button onClick={handleAdd} className="gap-1"><Plus className="w-4 h-4" /> Add</Button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilterSection("")}
          className={`px-3 py-1 rounded-full text-xs font-medium border ${!filterSection ? "bg-accent text-accent-foreground border-accent" : "border-border"}`}>
          All
        </button>
        {SECTIONS.map((s) => (
          <button key={s.value} onClick={() => setFilterSection(s.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${filterSection === s.value ? "bg-accent text-accent-foreground border-accent" : "border-border"}`}>
            {s.label} ({images.filter((i) => i.section === s.value).length})
          </button>
        ))}
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border bg-card">
              <img src={img.image_url} alt={img.label || img.section} className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                <label className="p-2 bg-background/80 rounded-full cursor-pointer hover:bg-background">
                  <ImageIcon className="w-4 h-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleReplace(img.id, f);
                  }} />
                </label>
                <button onClick={() => handleDelete(img.id)} className="p-2 bg-background/80 rounded-full hover:bg-background">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{img.section}</span>
                {img.label && <p className="text-xs font-medium truncate">{img.label}</p>}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted-foreground text-sm">No images yet. Add one above.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminImages;
