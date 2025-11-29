-- Add missing columns to the resources table
ALTER TABLE public.resources
ADD COLUMN IF NOT EXISTS type text,
ADD COLUMN IF NOT EXISTS duration text,
ADD COLUMN IF NOT EXISTS rating numeric,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS content text;
