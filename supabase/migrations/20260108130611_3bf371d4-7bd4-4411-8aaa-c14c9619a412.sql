-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - admins can view all, users can view their own
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    phone TEXT,
    college_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create chapters table
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    standard TEXT NOT NULL,
    subject TEXT NOT NULL,
    paper_type TEXT NOT NULL DEFAULT 'question',
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    file_url TEXT,
    file_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chapters"
ON public.chapters
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage chapters"
ON public.chapters
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create user_downloads table to track downloads
CREATE TABLE public.user_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    college_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all downloads"
ON public.user_downloads
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own downloads"
ON public.user_downloads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own downloads"
ON public.user_downloads
FOR SELECT
USING (auth.uid() = user_id);

-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('papers', 'papers', true);

-- Storage policies for papers bucket
CREATE POLICY "Anyone can view papers"
ON storage.objects
FOR SELECT
USING (bucket_id = 'papers');

CREATE POLICY "Admins can upload papers"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'papers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update papers"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'papers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete papers"
ON storage.objects
FOR DELETE
USING (bucket_id = 'papers' AND public.has_role(auth.uid(), 'admin'));

-- Trigger for profile auto-creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON public.chapters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();