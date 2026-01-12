-- Create blog posts table for the Developer Ecosystem Showcase
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 1,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Anyone can view published posts" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Authenticated users can view their own drafts
CREATE POLICY "Authors can view their own drafts" 
ON public.blog_posts 
FOR SELECT 
TO authenticated
USING (auth.uid() = author_id);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts" 
ON public.blog_posts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts" 
ON public.blog_posts 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id);

-- Create index for slug lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index for published posts
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published) WHERE published = true;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-calculate reading time based on content
CREATE OR REPLACE FUNCTION public.calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  -- Average reading speed: 200 words per minute
  NEW.reading_time = GREATEST(1, CEIL(array_length(regexp_split_to_array(NEW.content, '\s+'), 1)::numeric / 200));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for auto-calculating reading time
CREATE TRIGGER calculate_blog_posts_reading_time
BEFORE INSERT OR UPDATE OF content ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.calculate_reading_time();