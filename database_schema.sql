-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles Table (to store user details and roles)
create table profiles (
  id uuid references auth.users(id) primary key,
  email text,
  full_name text,
  role text default 'student' check (role in ('student', 'admin', 'counselor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Journals Table
create table journals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  content text not null,
  mood text,
  risk_level text check (risk_level in ('Low', 'Medium', 'High')),
  ai_analysis jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table journals enable row level security;

create policy "Users can view their own journals"
  on journals for select
  using (auth.uid() = user_id);

create policy "Users can insert their own journals"
  on journals for insert
  with check (auth.uid() = user_id);

-- Sessions Table
create table sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  counselor_id text not null,
  date timestamp with time zone not null,
  time_slot text not null,
  session_type text not null,
  reason text,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table sessions enable row level security;

create policy "Users can view their own sessions"
  on sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on sessions for insert
  with check (auth.uid() = user_id);

-- Alerts Table
create table alerts (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references auth.users(id) not null,
  severity text check (severity in ('low', 'medium', 'high')),
  message text not null,
  is_resolved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table alerts enable row level security;

create policy "Users can view their own alerts"
  on alerts for select
  using (auth.uid() = student_id);

create policy "Users can insert alerts"
  on alerts for insert
  with check (auth.uid() = student_id);

-- Resources Table
create table resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table resources enable row level security;

create policy "Anyone can view resources"
  on resources for select
  using (true);

-- Activities Table
create table activities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table activities enable row level security;

create policy "Anyone can view activities"
  on activities for select
  using (true);

-- Counselors Table
create table counselors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text not null,
  specialties text[] not null,
  rating numeric(3, 1) not null,
  experience text not null,
  bio text not null,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table counselors enable row level security;

create policy "Anyone can view counselors"
  on counselors for select
  using (true);

-- Seed Data for Counselors
insert into counselors (name, title, specialties, rating, experience, bio, is_available) values
('Dr. Sarah Johnson', 'Licensed Clinical Psychologist', ARRAY['Anxiety', 'Depression', 'Trauma'], 4.9, '8 years', 'Specializes in cognitive behavioral therapy and mindfulness-based approaches.', true),
('Dr. Michael Chen', 'Mental Health Counselor', ARRAY['Stress Management', 'Academic Pressure', 'Relationships'], 4.8, '6 years', 'Focuses on helping students navigate academic and social challenges.', true),
('Dr. Emily Rodriguez', 'Licensed Therapist', ARRAY['Self-esteem', 'Life Transitions', 'Wellness'], 4.9, '10 years', 'Expert in helping individuals build confidence and navigate life changes.', false),
('Dr. James Wilson', 'Clinical Social Worker', ARRAY['Crisis Support', 'Coping Skills', 'Support Groups'], 4.7, '12 years', 'Experienced in crisis intervention and developing practical coping strategies.', true);

-- Trigger to create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles Table (to store user details and roles)
create table profiles (
  id uuid references auth.users(id) primary key,
  email text,
  full_name text,
  role text default 'student' check (role in ('student', 'admin', 'counselor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Journals Table
create table journals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  content text not null,
  mood text,
  risk_level text check (risk_level in ('Low', 'Medium', 'High')),
  ai_analysis jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table journals enable row level security;

create policy "Users can view their own journals"
  on journals for select
  using (auth.uid() = user_id);

create policy "Users can insert their own journals"
  on journals for insert
  with check (auth.uid() = user_id);

-- Sessions Table
create table sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  counselor_id text not null,
  date timestamp with time zone not null,
  time_slot text not null,
  session_type text not null,
  reason text,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table sessions enable row level security;

create policy "Users can view their own sessions"
  on sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on sessions for insert
  with check (auth.uid() = user_id);

-- Alerts Table
create table alerts (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references auth.users(id) not null,
  severity text check (severity in ('low', 'medium', 'high')),
  message text not null,
  is_resolved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table alerts enable row level security;

create policy "Users can view their own alerts"
  on alerts for select
  using (auth.uid() = student_id);

create policy "Users can insert alerts"
  on alerts for insert
  with check (auth.uid() = student_id);

-- Resources Table
create table resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table resources enable row level security;

create policy "Anyone can view resources"
  on resources for select
  using (true);

-- Activities Table
create table activities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table activities enable row level security;

create policy "Anyone can view activities"
  on activities for select
  using (true);

-- Counselors Table
create table counselors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text not null,
  specialties text[] not null,
  rating numeric(3, 1) not null,
  experience text not null,
  bio text not null,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table counselors enable row level security;

create policy "Anyone can view counselors"
  on counselors for select
  using (true);

-- Seed Data for Counselors
insert into counselors (name, title, specialties, rating, experience, bio, is_available) values
('Dr. Sarah Johnson', 'Licensed Clinical Psychologist', ARRAY['Anxiety', 'Depression', 'Trauma'], 4.9, '8 years', 'Specializes in cognitive behavioral therapy and mindfulness-based approaches.', true),
('Dr. Michael Chen', 'Mental Health Counselor', ARRAY['Stress Management', 'Academic Pressure', 'Relationships'], 4.8, '6 years', 'Focuses on helping students navigate academic and social challenges.', true),
('Dr. Emily Rodriguez', 'Licensed Therapist', ARRAY['Self-esteem', 'Life Transitions', 'Wellness'], 4.9, '10 years', 'Expert in helping individuals build confidence and navigate life changes.', false),
('Dr. James Wilson', 'Clinical Social Worker', ARRAY['Crisis Support', 'Coping Skills', 'Support Groups'], 4.7, '12 years', 'Experienced in crisis intervention and developing practical coping strategies.', true);

-- Trigger to create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'student');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Chat History Table
create table chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  role text not null check (role in ('user', 'ai')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table chat_history enable row level security;

create policy "Users can view their own chat history"
  on chat_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own chat history"
  on chat_history for insert
  with check (auth.uid() = user_id);