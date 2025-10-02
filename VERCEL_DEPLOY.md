# Vercel Deployment Guide - WeAreJobPilot MVP

## Project Structure
This is a **minimal, production-ready MVP** with:
- ✅ Next.js 15.5.3 + React 19.1.0
- ✅ App Router (frontend pages)
- ✅ Pages API (backend routes)
- ✅ AI features: CV cleanup, cover letter generator, job summaries
- ✅ Notifications: Email (SendGrid) + WhatsApp (Twilio)
- ✅ Feedback mechanism (Supabase)
- ✅ 2FA stub
- ✅ Rate limiting middleware

## Vercel Configuration

### Step 1: Project Settings
1. Go to Vercel Dashboard → Import Project
2. Select your GitHub repository
3. **Root Directory**: `apps/web`
4. **Framework Preset**: Next.js
5. **Build Command**: `npm run build`
6. **Install Command**: `npm install`
7. **Output Directory**: `.next` (auto-detected)

### Step 2: Environment Variables
Add these in Vercel → Settings → Environment Variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...
OPENAI_API_KEY=sk-proj-...

# Email (SendGrid)
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM=hello@wearejobpilot.com

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_FROM=whatsapp:+14155238886

# Optional
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
NODE_ENV=production
```

### Step 3: Deploy
1. Click **Deploy**
2. Wait for build to complete
3. Visit your deployment URL

## API Endpoints

After deployment, these endpoints are available:

- `POST /api/feedback` - Store user feedback (👍/👎)
- `POST /api/notify` - Send email/WhatsApp notifications
- `POST /api/ai/generate` - AI content generation (CV/cover letter/job summary)
- `POST /api/2fa` - 2FA OTP generation (stub)

## Testing the Deployment

### 1. Homepage
Visit `https://your-app.vercel.app/` - you should see the minimal landing page

### 2. Test AI Generation (requires OPENAI_API_KEY)
```bash
curl -X POST https://your-app.vercel.app/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "cv-clean",
    "text": "John Doe\nSoftware engineer\n5 years experience..."
  }'
```

### 3. Test Notifications (requires SendGrid/Twilio)
```bash
curl -X POST https://your-app.vercel.app/api/notify \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "email",
    "to": "user@example.com",
    "subject": "New Job Match!",
    "text": "You have a new job match on WeAreJobPilot!"
  }'
```

### 4. Test Feedback (requires Supabase)
```bash
curl -X POST https://your-app.vercel.app/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "type": "job_match",
    "value": 1,
    "context": "Job ID: 456"
  }'
```

## Supabase Database Setup

Create these tables in your Supabase project:

```sql
-- Feedback table
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

-- Allow inserts from authenticated users or service role
CREATE POLICY "Allow feedback insert" ON feedback
  FOR INSERT WITH CHECK (true);
```

## Troubleshooting

### Build fails with "Cannot find module"
- Check that all dependencies in `package.json` are correct
- Verify `Root Directory` is set to `apps/web`

### API routes return 500
- Check environment variables are set in Vercel
- View logs in Vercel Dashboard → Deployments → [your-deployment] → Runtime Logs

### TypeScript errors
- Run `npm run build` locally first to catch errors
- Ensure TypeScript version matches devDependencies

## Next Steps

1. **Add authentication** - Implement Supabase Auth for user login
2. **Build dashboards** - Create candidate & employer dashboards
3. **Seed dummy jobs** - Add 2000 dummy job listings
4. **Matching engine** - Build AI-powered job matching
5. **Frontend enhancement** - Replace minimal page with full UI

## Support

For issues, check:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
