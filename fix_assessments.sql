-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- 1. Assessments Table (Ensure it exists and is accessible)
create table if not exists assessments (
  id uuid default uuid_generate_v4() primary key,
  code text not null,
  name text not null,
  description text,
  instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table assessments enable row level security;

drop policy if exists "Anyone can view assessments" on assessments;
create policy "Anyone can view assessments" on assessments for select using (true);

-- 2. Assessment Questions Table
create table if not exists assessment_questions (
  id uuid default uuid_generate_v4() primary key,
  assessment_id uuid references assessments(id) not null,
  question_text text not null,
  question_type text not null,
  options jsonb,
  question_order integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table assessment_questions enable row level security;

drop policy if exists "Anyone can view assessment questions" on assessment_questions;
create policy "Anyone can view assessment questions" on assessment_questions for select using (true);

-- 3. User Assessments Table (The one causing error)
create table if not exists user_assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  assessment_id uuid references assessments(id) not null,
  total_score integer,
  risk_level text,
  ai_analysis jsonb,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_assessments enable row level security;

drop policy if exists "Users can view their own assessments" on user_assessments;
create policy "Users can view their own assessments"
  on user_assessments for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own assessments" on user_assessments;
create policy "Users can insert their own assessments"
  on user_assessments for insert
  with check (auth.uid() = user_id);

-- 4. User Assessment Responses Table
create table if not exists user_assessment_responses (
  id uuid default uuid_generate_v4() primary key,
  user_assessment_id uuid references user_assessments(id) on delete cascade not null,
  question_id text,
  response_value integer,
  response_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_assessment_responses enable row level security;

drop policy if exists "Users can view their own assessment responses" on user_assessment_responses;
create policy "Users can view their own assessment responses"
  on user_assessment_responses for select
  using (
    exists (
      select 1 from user_assessments
      where user_assessments.id = user_assessment_responses.user_assessment_id
      and user_assessments.user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert their own assessment responses" on user_assessment_responses;
create policy "Users can insert their own assessment responses"
  on user_assessment_responses for insert
  with check (
    exists (
      select 1 from user_assessments
      where user_assessments.id = user_assessment_responses.user_assessment_id
      and user_assessments.user_id = auth.uid()
    )
  );
