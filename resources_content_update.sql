-- 1. Add the 'content' column to hold HTML
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS content TEXT;

-- 2. Update the "Understanding Anxiety" article with rich, formatted content
UPDATE public.resources
SET content = '
  <h2>What is Anxiety?</h2>
  <p>Anxiety is your body''s natural response to stress. It''s a feeling of fear or apprehension about what''s to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous.</p>
  
  <h2>Common Symptoms</h2>
  <ul>
    <li>Feeling nervous, restless, or tense</li>
    <li>Having a sense of impending danger, panic, or doom</li>
    <li>Having an increased heart rate</li>
    <li>Breathing rapidly (hyperventilation)</li>
    <li>Sweating or trembling</li>
    <li>Feeling weak or tired</li>
  </ul>

  <h2>Grounding Techniques</h2>
  <p>If you feel overwhelmed, try the <strong>5-4-3-2-1 technique</strong>:</p>
  <ul>
    <li>Acknowledge <strong>5</strong> things you see around you.</li>
    <li>Acknowledge <strong>4</strong> things you can touch.</li>
    <li>Acknowledge <strong>3</strong> things you hear.</li>
    <li>Acknowledge <strong>2</strong> things you can smell.</li>
    <li>Acknowledge <strong>1</strong> thing you can taste.</li>
  </ul>

  <h2>When to Seek Help</h2>
  <p>If your anxiety is interfering with your daily life, school work, or relationships, it may be time to speak with a professional. Our counselors are here to help you navigate these feelings in a safe, confidential space.</p>
'
WHERE title = 'Understanding Anxiety: A Complete Guide';
