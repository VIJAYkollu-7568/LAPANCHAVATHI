
CREATE TABLE public.site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  label text,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site images" ON public.site_images FOR SELECT TO public USING (true);
CREATE POLICY "Allow all inserts on site_images" ON public.site_images FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow all updates on site_images" ON public.site_images FOR UPDATE TO public USING (true);
CREATE POLICY "Allow all deletes on site_images" ON public.site_images FOR DELETE TO public USING (true);
