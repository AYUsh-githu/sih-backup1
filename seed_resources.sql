-- Insert initial resources into the 'resources' table
INSERT INTO public.resources (title, description, type, category, duration, rating, featured, content)
VALUES
  (
    'Understanding Anxiety: A Complete Guide',
    'Learn about anxiety disorders, symptoms, and effective coping strategies.',
    'article',
    'anxiety',
    '8 min read',
    4.8,
    true,
    '<h2>What is Anxiety?</h2><p>Anxiety is your body''s natural response to stress. It''s a feeling of fear or apprehension about what''s to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous.</p><h2>Common Symptoms</h2><ul><li>Feeling nervous, restless, or tense</li><li>Having a sense of impending danger, panic, or doom</li><li>Having an increased heart rate</li><li>Breathing rapidly (hyperventilation)</li><li>Sweating or trembling</li><li>Feeling weak or tired</li></ul><h2>Grounding Techniques</h2><p>If you feel overwhelmed, try the <strong>5-4-3-2-1 technique</strong>:</p><ul><li>Acknowledge <strong>5</strong> things you see around you.</li><li>Acknowledge <strong>4</strong> things you can touch.</li><li>Acknowledge <strong>3</strong> things you hear.</li><li>Acknowledge <strong>2</strong> things you can smell.</li><li>Acknowledge <strong>1</strong> thing you can taste.</li></ul><h2>When to Seek Help</h2><p>If your anxiety is interfering with your daily life, school work, or relationships, it may be time to speak with a professional. Our counselors are here to help you navigate these feelings in a safe, confidential space.</p>'
  ),
  (
    'Mindfulness Meditation for Beginners',
    'A guided meditation video to help you start your mindfulness journey.',
    'video',
    'wellness',
    '12 min',
    4.9,
    true,
    NULL
  ),
  (
    'Stress Management Techniques',
    'Practical audio guide on managing stress in daily life.',
    'audio',
    'stress',
    '15 min',
    4.7,
    false,
    NULL
  ),
  (
    'Depression Support Workbook',
    'Downloadable PDF with exercises and worksheets for depression support.',
    'pdf',
    'depression',
    '24 pages',
    4.6,
    true,
    NULL
  ),
  (
    'Building Resilience in Daily Life',
    'Learn how to develop mental resilience and bounce back from challenges.',
    'article',
    'wellness',
    '6 min read',
    4.8,
    false,
    NULL
  ),
  (
    'Sleep and Mental Health',
    'Understanding the connection between sleep quality and mental wellness.',
    'video',
    'general',
    '18 min',
    4.5,
    false,
    NULL
  );
