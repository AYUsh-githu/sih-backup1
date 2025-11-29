-- Table for Daily Wellness Tasks
create table if not exists public.wellness_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  date date default current_date not null,
  category text not null, -- 'Sleep', 'Nutrition', 'Movement', 'Mindfulness'
  title text not null,
  description text,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.wellness_tasks enable row level security;

-- Policy: Users can only manage their own tasks
create policy "Users manage their own tasks" 
on public.wellness_tasks for all 
using (auth.uid() = user_id);
