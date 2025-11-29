-- Create Assessments Table
create table if not exists assessments (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  name text not null,
  description text,
  instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table assessments enable row level security;

create policy "Anyone can view assessments"
  on assessments for select
  using (true);

-- Create Assessment Questions Table
create table if not exists assessment_questions (
  id uuid default uuid_generate_v4() primary key,
  assessment_id uuid references assessments(id) not null,
  question_text text not null,
  question_order integer not null,
  options jsonb not null, -- Array of {label: string, value: number}
  question_type text default 'single_choice',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table assessment_questions enable row level security;

create policy "Anyone can view assessment questions"
  on assessment_questions for select
  using (true);

-- Create User Assessments Table (Results)
create table if not exists user_assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  assessment_id uuid references assessments(id) not null,
  total_score integer not null,
  risk_level text,
  ai_analysis jsonb,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_assessments enable row level security;

create policy "Users can view their own assessments"
  on user_assessments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own assessments"
  on user_assessments for insert
  with check (auth.uid() = user_id);

-- Create User Assessment Responses Table (Detailed Answers)
create table if not exists user_assessment_responses (
  id uuid default uuid_generate_v4() primary key,
  user_assessment_id uuid references user_assessments(id) not null,
  question_id uuid references assessment_questions(id) not null,
  response_value integer,
  response_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_assessment_responses enable row level security;

create policy "Users can view their own responses"
  on user_assessment_responses for select
  using (
    exists (
      select 1 from user_assessments ua
      where ua.id = user_assessment_responses.user_assessment_id
      and ua.user_id = auth.uid()
    )
  );

create policy "Users can insert their own responses"
  on user_assessment_responses for insert
  with check (
    exists (
      select 1 from user_assessments ua
      where ua.id = user_assessment_responses.user_assessment_id
      and ua.user_id = auth.uid()
    )
  );

-- Seed Data: PHQ-9
do $$
declare
  phq9_id uuid;
  gad7_id uuid;
  cssrs_id uuid;
begin
  -- PHQ-9
  insert into assessments (code, name, description, instructions)
  values ('PHQ-9', 'Depression Screening (PHQ-9)', 'The Patient Health Questionnaire-9 (PHQ-9) is a multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression.', 'Over the last 2 weeks, how often have you been bothered by any of the following problems?')
  on conflict (code) do update set name = excluded.name
  returning id into phq9_id;

  delete from assessment_questions where assessment_id = phq9_id;

  insert into assessment_questions (assessment_id, question_text, question_order, options) values
  (phq9_id, 'Little interest or pleasure in doing things', 1, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Feeling down, depressed, or hopeless', 2, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Trouble falling or staying asleep, or sleeping too much', 3, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Feeling tired or having little energy', 4, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Poor appetite or overeating', 5, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', 6, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Trouble concentrating on things, such as reading the newspaper or watching television', 7, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', 8, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (phq9_id, 'Thoughts that you would be better off dead or of hurting yourself in some way', 9, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]');

  -- GAD-7
  insert into assessments (code, name, description, instructions)
  values ('GAD-7', 'Anxiety Assessment (GAD-7)', 'The GAD-7 is a useful tool for screening for generalized anxiety disorder and measuring the severity of anxiety symptoms.', 'Over the last 2 weeks, how often have you been bothered by the following problems?')
  on conflict (code) do update set name = excluded.name
  returning id into gad7_id;

  delete from assessment_questions where assessment_id = gad7_id;

  insert into assessment_questions (assessment_id, question_text, question_order, options) values
  (gad7_id, 'Feeling nervous, anxious or on edge', 1, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Not being able to stop or control worrying', 2, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Worrying too much about different things', 3, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Trouble relaxing', 4, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Being so restless that it is hard to sit still', 5, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Becoming easily annoyed or irritable', 6, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]'),
  (gad7_id, 'Feeling afraid as if something awful might happen', 7, '[{"label": "Not at all", "value": 0}, {"label": "Several days", "value": 1}, {"label": "More than half the days", "value": 2}, {"label": "Nearly every day", "value": 3}]');

  -- C-SSRS (Screener)
  insert into assessments (code, name, description, instructions)
  values ('C-SSRS', 'Columbia-Suicide Severity Rating Scale (Screener)', 'The C-SSRS is a tool used to identify and assess suicide risk.', 'In the past month, have you:')
  on conflict (code) do update set name = excluded.name
  returning id into cssrs_id;

  delete from assessment_questions where assessment_id = cssrs_id;

  insert into assessment_questions (assessment_id, question_text, question_order, options, question_type) values
  (cssrs_id, 'Wish to be dead', 1, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no'),
  (cssrs_id, 'Non-specific active suicidal thoughts', 2, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no'),
  (cssrs_id, 'Active suicidal ideation with any methods (not plan) without intent to act', 3, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no'),
  (cssrs_id, 'Active suicidal ideation with some intent to act, without specific plan', 4, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no'),
  (cssrs_id, 'Active suicidal ideation with specific plan and intent', 5, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no'),
  (cssrs_id, 'Suicidal behavior (Have you ever done anything, started to do anything, or prepared to do anything to end your life?)', 6, '[{"label": "Yes", "value": 1}, {"label": "No", "value": 0}]', 'yes_no');

end $$;
