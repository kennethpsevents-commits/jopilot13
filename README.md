# WeAreJobPilot - Minimal MVP ✅

## 🎯 Vision
AI-powered job co-pilot that reduces stress in job hunting. Upwork-inspired layout but lighter, cleaner, with baby blue theme (#89CFF0). Pan-EU scalable with GDPR compliance from day 1.

## ✅ What's Built (Minimal MVP - Ready for Vercel)

### Pages (App Router)
- `/` - Minimal landing page with baby blue theme
- Clean, simple layout - ready to expand

### API Routes (Pages Router)
- `POST /api/feedback` - Store user feedback (👍/👎) to Supabase
- `POST /api/notify` - Send notifications via Email (SendGrid) or WhatsApp (Twilio)
- `POST /api/ai/generate` - AI content generation:
  - `mode: cv-clean` - Clean and format CV
  - `mode: cover-letter` - Generate cover letter
  - `mode: job-summary` - Summarize job posting
- `POST /api/2fa` - 2FA OTP generation (stub)

### Core Libraries
- `lib/supabaseClient.ts` - Supabase client (server & client safe)
- `lib/sentry.ts` - Sentry integration stub
- `middleware/rateLimit.ts` - In-memory rate limiter (60 req/min)

### Tech Stack
- **Frontend**: Next.js 15.5.3 + React 19.1.0
- **Styling**: Minimal inline styles (baby blue #89CFF0)
- **Database**: Supabase (configured, tables needed)
- **AI**: OpenAI GPT-4o-mini
- **Email**: SendGrid
- **WhatsApp**: Twilio
- **Monitoring**: Sentry (optional)

## 🚀 Deploy to Vercel

### 1. Vercel Project Settings
```
Root Directory: apps/web
Framework: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: .next (auto-detected)
Node Version: 20.x
```

### 2. Environment Variables (Required)
Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...

# OpenAI (for AI features)
OPENAI_API_KEY=sk-proj-...

# SendGrid (email notifications)
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM=hello@wearejobpilot.com

# Twilio (WhatsApp notifications)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_FROM=whatsapp:+14155238886

# Optional
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
NODE_ENV=production
```

### 3. Supabase Database Setup
Run this SQL in Supabase SQL Editor:

```sql
-- Feedback table for 👍/👎 tracking
CREATE TABLE feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  type text NOT NULL,
  value integer NOT NULL,
  context text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow inserts (adjust based on your auth setup)
CREATE POLICY "Allow feedback insert" ON feedback
  FOR INSERT WITH CHECK (true);
```

### 4. Deploy
1. Push code to GitHub
2. Import project in Vercel
3. Set Root Directory to `apps/web`
4. Add environment variables
5. Deploy!

## 📋 Next Steps (Following Your Vision)

### Phase 1: Core Features (Week 1-2)
- [ ] Build full homepage with job search
- [ ] Create candidate dashboard
  - Profile management
  - CV upload interface
  - AI buddy chat (Grok API integration)
  - Match list
- [ ] Create employer dashboard
  - Post jobs
  - View candidates
  - Match scores
- [ ] Implement authentication (Supabase Auth)

### Phase 2: AI & Matching (Week 2-3)
- [ ] CV cleanup UI + API integration
- [ ] Cover letter generator UI
- [ ] Job summary cards
- [ ] AI Job Hunter chat/voice interface
- [ ] Basic matching algorithm (skills overlap)
- [ ] Notifications flow (email + WhatsApp on match)

### Phase 3: Data & Content (Week 3-4)
- [ ] Seed 2000 dummy jobs
- [ ] Set up ethical data pipeline (partnerships, not scraping)
- [ ] GDPR compliance checks
- [ ] Multi-language hooks (pan-EU prep)

### Phase 4: Polish & Launch (Week 4+)
- [ ] Baby blue theme implementation (full UI)
- [ ] Lighter grid than Upwork (fewer columns, more AI focus)
- [ ] Owner dashboard (modular skeleton for future features)
- [ ] Beta testing with 100 users
- [ ] Lean marketing: LinkedIn (daily), X, email (3x/week)

## ⚠️ What to AVOID (Per Your Rules)
- ❌ NO animations or complex features
- ❌ NO video interviews
- ❌ NO enterprise modules in MVP
- ❌ NO illegal scraping - only partnerships

## 🏗️ Architecture Principles
- **Modular**: Owner dashboard as skeleton for future expansion
- **GDPR-first**: Privacy by design from day 1
- **Pan-EU ready**: Multi-language hooks, localization prep
- **AI-centric**: Focus on reducing stress, not just matching jobs
- **Ethical data**: Partnerships over scraping

## 📊 Success Metrics
- Revenue target: 100-200K/month (freemium model)
- Beta goal: 100 users
- Post-launch: 3-5 marketing channels
- Transition to real jobs: Within 2 months

## 🛠️ Local Development
```bash
cd apps/web
npm install
npm run dev
# Visit http://localhost:3000
```

## 📚 Documentation
- [Vercel Deployment Guide](./VERCEL_DEPLOY.md)
- [Supabase Setup](https://supabase.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

---

**Built following strict rules:** Minimal, stable, production-ready MVP. No force-push, backup-first, build-before-commit. Ready for Vercel deployment.
