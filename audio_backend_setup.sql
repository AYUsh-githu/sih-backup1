-- 1. Create Ambient Sounds Table
CREATE TABLE IF NOT EXISTS public.ambient_sounds (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    icon_key TEXT NOT NULL, -- 'rain', 'forest', 'waves', 'wind'
    url TEXT NOT NULL,
    category TEXT DEFAULT 'nature'
);

-- 2. Insert Ambient Sounds
INSERT INTO public.ambient_sounds (name, icon_key, url) VALUES
    ('Soft Rain', 'rain', 'https://upload.wikimedia.org/wikipedia/commons/4/42/Rain_sound_effect.ogg'),
    ('Forest', 'forest', 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Forest_sounds.ogg'),
    ('Ocean', 'waves', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Ocean_Waves.ogg'),
    ('Binaural', 'binaural', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Synthesized_Binaural_Beat_-_Alpha_10Hz.ogg');

-- 3. Update Main Resource URL (Stress Management Techniques)
UPDATE public.resources 
SET url = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a8/Gymnop%C3%A9die_No._1.ogg/Gymnop%C3%A9die_No._1.ogg.mp3',
    content = 'audio' -- Ensure content type is marked if needed, though we use 'type' column usually
WHERE title = 'Stress Management Techniques';

-- 4. Insert Recommended Audio Resources
INSERT INTO public.resources (title, description, type, category, duration, rating, featured, url)
VALUES
    (
        'Deep Sleep Release',
        'Drift into deep sleep with this calming piano composition (Clair de lune).',
        'audio',
        'sleep',
        '5 min',
        4.9,
        false,
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/17/Clair_de_lune_%28Debussy%29_-_Suite_bergamasque.ogg/Clair_de_lune_%28Debussy%29_-_Suite_bergamasque.ogg.mp3'
    ),
    (
        'Anxiety SOS',
        'Immediate relief for anxiety moments with gentle piano.',
        'audio',
        'anxiety',
        '3 min',
        4.8,
        false,
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Muriel_Nguyen_Xuan_-_01_-_Stille_Wunder.ogg/Muriel_Nguyen_Xuan_-_01_-_Stille_Wunder.ogg.mp3'
    ),
    (
        'Morning Focus',
        'Start your day with clarity and purpose.',
        'audio',
        'focus',
        '10 min',
        4.7,
        false,
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b9/Erik_Satie_-_Gnossienne_1.ogg/Erik_Satie_-_Gnossienne_1.ogg.mp3'
    );
