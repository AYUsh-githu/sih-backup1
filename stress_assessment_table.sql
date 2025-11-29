-- Create Stress Assessments Table
create table if not exists stress_assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  score integer not null,
  risk_level text check (risk_level in ('Low', 'Moderate', 'High')),
  answers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table stress_assessments enable row level security;

-- Policies
create policy "Users can view their own assessments"
  on stress_assessments for select
  using (auth.uid() = user_id);

create policy "Users can insert their own assessments"
  on stress_assessments for insert
  with check (auth.uid() = user_id);
