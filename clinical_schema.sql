-- Clinical Symptoms Table
CREATE TABLE IF NOT EXISTS public.clinical_symptoms (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug text NOT NULL UNIQUE, -- e.g., 'anhedonia'
    label text NOT NULL,
    subtext text,
    icon_name text, -- store lucide icon name as string
    color_class text, -- store tailwind classes
    intervention_title text NOT NULL,
    intervention_text text NOT NULL,
    intervention_action text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CBT Distortions Table
CREATE TABLE IF NOT EXISTS public.cbt_distortions (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug text NOT NULL UNIQUE, -- e.g., 'catastrophizing'
    label text NOT NULL,
    description text NOT NULL,
    reframe text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User Clinical Logs Table (for tracking interactions)
CREATE TABLE IF NOT EXISTS public.user_clinical_logs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    interaction_type text NOT NULL CHECK (interaction_type IN ('symptom_selected', 'distortion_selected')),
    item_slug text NOT NULL, -- slug of the symptom or distortion
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.clinical_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_distortions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_clinical_logs ENABLE ROW LEVEL SECURITY;

-- Policies
-- Everyone can view symptoms and distortions
CREATE POLICY "Everyone can view symptoms" ON public.clinical_symptoms FOR SELECT USING (true);
CREATE POLICY "Everyone can view distortions" ON public.cbt_distortions FOR SELECT USING (true);

-- Users can insert their own logs
CREATE POLICY "Users can insert own logs" ON public.user_clinical_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Users can view their own logs
CREATE POLICY "Users can view own logs" ON public.user_clinical_logs FOR SELECT USING (auth.uid() = user_id);

-- Seed Data for Symptoms
INSERT INTO public.clinical_symptoms (slug, label, subtext, icon_name, color_class, intervention_title, intervention_text, intervention_action)
VALUES
    ('anhedonia', 'Anhedonia', 'Feeling numb / No joy', 'Zap', 'text-blue-600 bg-blue-50 dark:bg-blue-900/20', 'Behavioral Activation', 'Motivation follows action, not the other way around. In anhedonia, waiting to "feel like it" leads to paralysis.', 'Commit to one "Micro-Task" (e.g., wash one dish, stand outside for 2 mins) right now.'),
    ('agitation', 'Agitation', 'Restless / On edge', 'Activity', 'text-orange-600 bg-orange-50 dark:bg-orange-900/20', 'Physiological Regulation', 'Your sympathetic nervous system is overactive. You cannot "think" your way out of this state; you must use the body.', 'Perform "Box Breathing": Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Repeat 4 times.'),
    ('brain_fog', 'Brain Fog', 'Can''t focus / Confused', 'Brain', 'text-purple-600 bg-purple-50 dark:bg-purple-900/20', 'Cognitive Offloading', 'Your working memory is overwhelmed. Trying to "force" focus will worsen the fatigue.', 'Stop trying to remember. Write down the single next step you need to take, and hide everything else.'),
    ('insomnia', 'Insomnia', 'Can''t sleep / Tired', 'Clock', 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20', 'Stimulus Control', 'The bed has become associated with wakefulness and frustration.', 'If you haven''t slept in 20 mins, get out of bed. Do not return until you are physically struggling to keep your eyes open.')
ON CONFLICT (slug) DO UPDATE SET
    label = EXCLUDED.label,
    subtext = EXCLUDED.subtext,
    icon_name = EXCLUDED.icon_name,
    color_class = EXCLUDED.color_class,
    intervention_title = EXCLUDED.intervention_title,
    intervention_text = EXCLUDED.intervention_text,
    intervention_action = EXCLUDED.intervention_action;

-- Seed Data for CBT Distortions
INSERT INTO public.cbt_distortions (slug, label, description, reframe)
VALUES
    ('catastrophizing', 'Catastrophizing', 'Assuming the worst possible outcome will happen.', 'Ask: "What is the most likely outcome?" and "If the worst did happen, what specific steps would I take to cope?"'),
    ('all_or_nothing', 'All-or-Nothing', 'Viewing situations as strictly black or white, with no middle ground.', 'Challenge the binary. Ask: "Is there a partial success here?" or "What would a 50% solution look like?"'),
    ('emotional_reasoning', 'Emotional Reasoning', 'Believing that because you feel something, it must be true.', 'Separate feeling from fact. "I feel stupid" is a feeling, not a fact. What is the evidence for and against this?'),
    ('personalization', 'Personalization', 'Blaming yourself for events outside your control.', 'Check the "Circle of Control". List factors involved in the event. How many were actually under your direct influence?')
ON CONFLICT (slug) DO UPDATE SET
    label = EXCLUDED.label,
    description = EXCLUDED.description,
    reframe = EXCLUDED.reframe;
