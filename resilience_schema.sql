-- Resilience Assessments Table
CREATE TABLE IF NOT EXISTS public.resilience_assessments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    physical_score integer NOT NULL,
    emotional_score integer NOT NULL,
    social_score integer NOT NULL,
    cognitive_score integer NOT NULL,
    purpose_score integer NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Resilience Reframes Table (Cognitive Lab)
CREATE TABLE IF NOT EXISTS public.resilience_reframes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    stressor text NOT NULL,
    reframe text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Resilience Social Map Table
CREATE TABLE IF NOT EXISTS public.resilience_social_map (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    role text NOT NULL, -- 'Mentor', 'Friend', 'Family', 'Peer'
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role) -- One person per role for simplicity in this version
);

-- Enable RLS
ALTER TABLE public.resilience_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resilience_reframes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resilience_social_map ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert own assessments" ON public.resilience_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own assessments" ON public.resilience_assessments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reframes" ON public.resilience_reframes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own reframes" ON public.resilience_reframes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own social map" ON public.resilience_social_map FOR ALL USING (auth.uid() = user_id);
