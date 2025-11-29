-- Insert 12 new video resources into the 'resources' table
INSERT INTO public.resources (title, description, type, category, duration, rating, featured, content, url)
VALUES
  -- Meditation Category
  (
    '5-Minute Meditation You Can Do Anywhere',
    'A quick and effective meditation to reset your mind during a busy day.',
    'video',
    'meditation',
    '5 min',
    4.9,
    true,
    NULL,
    'https://www.youtube.com/embed/inpok4MKVLM'
  ),
  (
    'Daily Calm: 10 Minute Mindfulness',
    'A daily practice to cultivate mindfulness and reduce stress.',
    'video',
    'meditation',
    '10 min',
    4.8,
    true,
    NULL,
    'https://www.youtube.com/embed/ZToicYcHIOU'
  ),
  (
    'Guided Meditation for Deep Sleep',
    'Relax your body and mind for a restful night''s sleep.',
    'video',
    'meditation',
    '20 min',
    4.9,
    false,
    NULL,
    'https://www.youtube.com/embed/aEqlQvczMJQ'
  ),
  (
    'Letting Go of Stress',
    'A guided meditation to help you release tension and anxiety.',
    'video',
    'meditation',
    '15 min',
    4.7,
    false,
    NULL,
    'https://www.youtube.com/embed/6p_yaNFSYao'
  ),

  -- Yoga Category
  (
    'Yoga for Anxiety and Stress',
    'A gentle yoga practice designed to calm the nervous system.',
    'video',
    'yoga',
    '20 min',
    4.9,
    true,
    NULL,
    'https://www.youtube.com/embed/hJbRpHZr_d0'
  ),
  (
    'Morning Yoga for Beginners',
    'Start your day with energy and clarity using this simple routine.',
    'video',
    'yoga',
    '15 min',
    4.8,
    true,
    NULL,
    'https://www.youtube.com/embed/v7AYKMP6rOE'
  ),
  (
    'Bedtime Yoga for Better Sleep',
    'Wind down before bed with these relaxing stretches.',
    'video',
    'yoga',
    '12 min',
    4.9,
    false,
    NULL,
    'https://www.youtube.com/embed/BiWDsfZ3zbo'
  ),
  (
    'Yoga for Focus and Concentration',
    'Improve your mental clarity and focus with this short practice.',
    'video',
    'yoga',
    '10 min',
    4.7,
    false,
    NULL,
    'https://www.youtube.com/embed/Z1088e1H1F4'
  ),

  -- Wellness & Stress Category
  (
    'The Science of Mindfulness',
    'Understand how mindfulness changes your brain and improves well-being.',
    'video',
    'wellness',
    '14 min',
    4.8,
    true,
    NULL,
    'https://www.youtube.com/embed/w6T02g5hnT4'
  ),
  (
    'Breathing Techniques for Anxiety',
    'Learn simple breathing exercises to instantly reduce anxiety.',
    'video',
    'stress',
    '8 min',
    4.9,
    false,
    NULL,
    'https://www.youtube.com/embed/tEmt1Znux58'
  ),
  (
    'How to Manage Stress',
    'Practical tips and strategies for managing daily stress.',
    'video',
    'stress',
    '12 min',
    4.6,
    false,
    NULL,
    'https://www.youtube.com/embed/hnpQrMgDTFo'
  ),
  (
    'The Power of Vulnerability',
    'Brené Brown talks about the power of vulnerability and connection.',
    'video',
    'wellness',
    '20 min',
    5.0,
    true,
    NULL,
    'https://www.youtube.com/embed/iCvmsMzlF7o'
  );
