-- WeAreJobPilot Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  user_type text CHECK (user_type IN ('candidate', 'employer')) NOT NULL,
  avatar_url text,
  phone text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Candidate profiles
CREATE TABLE public.candidate_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  skills text[],
  experience_years integer,
  location text,
  remote_preference text CHECK (remote_preference IN ('remote', 'onsite', 'hybrid', 'flexible')),
  cv_url text,
  cv_text text,
  bio text,
  linkedin_url text,
  portfolio_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Employer profiles
CREATE TABLE public.employer_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name text NOT NULL,
  company_logo text,
  company_website text,
  company_size text,
  industry text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id uuid REFERENCES public.employer_profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  skills_required text[],
  location text,
  remote_type text CHECK (remote_type IN ('remote', 'onsite', 'hybrid')),
  salary_min integer,
  salary_max integer,
  salary_currency text DEFAULT 'EUR',
  employment_type text CHECK (employment_type IN ('fulltime', 'parttime', 'contract', 'freelance')),
  experience_level text CHECK (experience_level IN ('junior', 'medior', 'senior', 'lead')),
  status text CHECK (status IN ('draft', 'active', 'closed')) DEFAULT 'active',
  views integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Applications
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id uuid REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter text,
  status text CHECK (status IN ('pending', 'reviewed', 'interviewed', 'rejected', 'accepted')) DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

-- Matches (AI-generated)
CREATE TABLE public.matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id uuid REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  match_score integer CHECK (match_score >= 0 AND match_score <= 100),
  match_reasons text[],
  notified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

-- Feedback (👍/👎 tracking)
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  value integer CHECK (value IN (-1, 1)),
  context text,
  created_at timestamp with time zone DEFAULT now()
);

-- Saved jobs
CREATE TABLE public.saved_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id uuid REFERENCES public.candidate_profiles(id) ON DELETE CASCADE NOT NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(candidate_id, job_id)
);

-- Notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  link text,
  created_at timestamp with time zone DEFAULT now()
);

-- Row Level Security (RLS) Policies

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Candidate profiles
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can view own profile" ON public.candidate_profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Candidates can update own profile" ON public.candidate_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Candidates can insert own profile" ON public.candidate_profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Employers can view candidate profiles" ON public.candidate_profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'employer')
);

-- Employer profiles
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Employers can view own profile" ON public.employer_profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Employers can update own profile" ON public.employer_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Employers can insert own profile" ON public.employer_profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Anyone can view employer profiles" ON public.employer_profiles FOR SELECT USING (true);

-- Jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Employers can manage own jobs" ON public.jobs FOR ALL USING (
  employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid())
);

-- Applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can view own applications" ON public.applications FOR SELECT USING (
  candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Employers can view applications to own jobs" ON public.applications FOR SELECT USING (
  job_id IN (SELECT id FROM public.jobs WHERE employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Candidates can create applications" ON public.applications FOR INSERT WITH CHECK (
  candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid())
);

-- Matches
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can view own matches" ON public.matches FOR SELECT USING (
  candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Employers can view matches for own jobs" ON public.matches FOR SELECT USING (
  job_id IN (SELECT id FROM public.jobs WHERE employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()))
);

-- Feedback
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert feedback" ON public.feedback FOR INSERT WITH CHECK (user_id = auth.uid());

-- Saved jobs
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can manage saved jobs" ON public.saved_jobs FOR ALL USING (
  candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid())
);

-- Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- Functions and Triggers

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_candidate_profiles_updated_at BEFORE UPDATE ON public.candidate_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employer_profiles_updated_at BEFORE UPDATE ON public.employer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_employer ON public.jobs(employer_id);
CREATE INDEX idx_applications_job ON public.applications(job_id);
CREATE INDEX idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX idx_matches_candidate ON public.matches(candidate_id);
CREATE INDEX idx_matches_job ON public.matches(job_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'WeAreJobPilot database schema created successfully!';
END $$;
