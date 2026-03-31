-- Create menu_categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read categories" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (true);

-- Allow all inserts/updates/deletes (admin protected at UI level)
CREATE POLICY "Allow all inserts on categories" ON public.menu_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates on categories" ON public.menu_categories FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes on categories" ON public.menu_categories FOR DELETE USING (true);

CREATE POLICY "Allow all inserts on items" ON public.menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates on items" ON public.menu_items FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes on items" ON public.menu_items FOR DELETE USING (true);

CREATE POLICY "Allow all inserts on reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates on reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes on reviews" ON public.reviews FOR DELETE USING (true);

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-images', 'restaurant-images', true);

CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id = 'restaurant-images');
CREATE POLICY "Anyone can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'restaurant-images');
CREATE POLICY "Anyone can update images" ON storage.objects FOR UPDATE USING (bucket_id = 'restaurant-images');
CREATE POLICY "Anyone can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'restaurant-images');

-- Indexes
CREATE INDEX idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX idx_menu_categories_order ON public.menu_categories(display_order);
CREATE INDEX idx_menu_items_order ON public.menu_items(display_order);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved);