# 🧑‍💻 Cursor Super-Prompt – WeAreJobPilot MVP

**Doel**: Bouw een **lichte, stabiele job marketplace MVP** die visueel lijkt op Upwork (maar mooier, babyblauw, minimalistisch). De site moet foutloos deployen op Vercel en eenvoudig uit te breiden zijn.

---

## 1. ⚙️ Upwork Techstack (Referentie)

Upwork gebruikt een **enterprise schaal platform** met miljoenen gebruikers:
- **Frontend**: React (SPA) + GraphQL API
- **Backend**: Java + Spring Boot services (microservices)
- **Database**: PostgreSQL + Redis caching
- **Search**: ElasticSearch voor snelle zoekresultaten
- **Infrastructure**: Kubernetes op AWS
- **Payments**: Eigen escrow-systeem + Stripe/PayPal
- **Security**: OAuth 2.0, 2FA, audit logging, anti-fraud AI

👉 **Jij hoeft dit NIET te kopiëren** - jouw MVP moet veel simpeler zijn, maar visueel lijken op Upwork.

---

## 2. 🏗️ Architectuur

- **Framework**: Next.js 15.5.3 (App Router) + React 19
- **Styling**: Tailwind CSS
  - Primair: babyblauw `#89CFF0`
  - Secundair: wit `#FFFFFF` / grijs `#F7F7F7`
  - Tekst: zwart/donkergrijs
  - Font: Inter of Roboto
- **Database**: Supabase (Postgres, RLS)
- **Auth**: Supabase Auth (email + Google OAuth)
- **Deployment**: Vercel Pro (geen build errors toegestaan)
- **Monitoring**: Sentry
- **Owner Dashboard**: modulair → klaar voor uitbreiding

---

## 3. 🎯 Core Features (MVP)

### Kandidaten
- Registratie/login
- Profiel aanmaken (naam, skills, foto, CV upload)
- **CV Upload + AI Cleanup** (AI herschrijft en maakt nette PDF)
- **Cover Letter Generator** (AI draft)
- **Job Summaries** (AI vat vacatures samen)
- **AI Job Hunter Chat/Spraak** (basis, Grok API)

### Werkgevers
- Registratie/login
- Vacature posten (titel, beschrijving, skills, vergoeding, locatie/remote)
- Dashboard: kandidatenlijst met matchscore

### Matching
- Basis AI matchscore (skills overlap)
- Jobs filteren op sector, locatie, remote

### Notificaties
- **E-mail** bij nieuwe match (SendGrid/Postmark)
- **WhatsApp** melding bij nieuwe match (Twilio/Meta API)

### Feedback
- Bij elke AI-suggestie: 👍/👎 → opslaan in Supabase

---

## 4. 📱 ASCII Mock-ups

### Homepage
```
---------------------------------------------------------
| LOGO (links)            [ Zoekbalk ............ ]    |
|-------------------------------------------------------|
|          "Vind je droomjob met AI, stressvrij"        |
|                                                       |
|  [ Maak je profiel gratis ]   [ Plaats een vacature ] |
|                                                       |
|  Recente Vacatures:                                   |
|   - Frontend Developer - Amsterdam - Remote           |
|   - Data Analyst - Berlin - Hybrid                    |
|   - Marketing Intern - Warsaw - Onsite                |
|                                                       |
| [ Footer: Privacy | Contact | Social Links ]          |
---------------------------------------------------------
```

### Kandidaten Dashboard
```
---------------------------------------------------------
| LOGO | Dashboard | Matches | Profiel | Logout         |
|-------------------------------------------------------|
|  Mijn Profiel:                                        |
|   [Foto] Kenneth Vreden                               |
|   Skills: React, SQL, AI                              |
|   CV: [Upload/Replace]                                |
|                                                       |
|  Matches:                                             |
|   - Fullstack Dev (85%)  [👍/👎]   [ Solliciteer ]      |
|                                                       |
|  AI Job Hunter:                                       |
|   Chat: "Hoi Kenneth! Zal ik een cover letter draften?"|
|   [ Typ hier... ]  [ 🎤 Spreek ]                      |
---------------------------------------------------------
```

### Werkgevers Dashboard
```
---------------------------------------------------------
| LOGO | Dashboard | Vacatures | Kandidaten | Logout    |
|-------------------------------------------------------|
|  Mijn Vacatures:                                      |
|   - Frontend Developer (3 kandidaten, beste 90%)      |
|   - Data Analyst (2 kandidaten, beste 75%)            |
|   [ Nieuwe vacature plaatsen ]                        |
|                                                       |
|  Kandidatenlijst:                                     |
|   - Kenneth Vreden (React, SQL) - 85% match           |
|   - Maria Jansen (Python, AI) - 80% match             |
---------------------------------------------------------
```

---

## 5. 📊 Data

- Start: **2000 dummy jobs** (JSON in Supabase)
- Binnen 2 maanden: pipeline voor echte jobs (open-source feeds, partnerships)

---

## 6. 🔒 Security

- JWT + RLS policies
- Optionele **2FA** bij login
- API rate limiting
- Audit log tabel in Supabase
- GDPR: cookie banner + privacy policy

---

## 7. 📋 Deliverables (Sprint 1, 2–3 weken)

- [x] Homepage + zoekfunctie
- [x] Kandidaten-dashboard (profiel, CV upload, AI buddy)
- [x] Werkgevers-dashboard (vacature posten, kandidatenlijst)
- [x] Matching engine
- [x] AI-features (CV cleanup, cover letter, job summaries, chat/spraak)
- [x] Notificaties (e-mail + WhatsApp)
- [x] Feedbackknoppen
- [x] Security hooks
- [x] Deployment live op Vercel

---

## 8. ❌ Wat NIET in MVP

- Geen video-interviews
- Geen enterprise modules
- Geen API marketplace
- Geen mobiele app
- Geen complexe ML (skills overlap is genoeg)

---

## 9. 📧 Voorbeeld Notificaties

### E-mail template (SendGrid)
**Onderwerp**: ✈️ WeAreJobPilot vond een match voor jou!

**Body**:
```
Hallo Kenneth,

Onze AI Job Hunter heeft een nieuwe vacature gevonden die past bij jouw profiel:

**Job**: Frontend Developer (Amsterdam, Remote)
**Matchscore**: 87%

👉 Klik hier om direct te bekijken en een AI-cover letter te laten genereren.
[ Bekijk vacature ]

Met vriendelijke groet,
Team WeAreJobPilot
```

### WhatsApp template (Twilio API)
```
✈️ WeAreJobPilot:
We hebben een nieuwe job voor je gevonden → Frontend Developer (Amsterdam, Remote).
Wil je dat ik meteen een cover letter voor je schrijf?
👉 Klik: https://wearejobpilot.com/job/123
```

---

## 10. 🚀 Implementatie Status

**ALLE FEATURES ZIJN GEÏMPLEMENTEERD:**
- ✅ Babyblauw design system (#89CFF0)
- ✅ Homepage met zoekbalk en CTA's
- ✅ Kandidaten dashboard met CV upload
- ✅ Werkgevers dashboard met vacature management
- ✅ AI features (CV cleanup, cover letter generator)
- ✅ Notificaties (email + WhatsApp)
- ✅ Feedback systeem (👍/👎)
- ✅ Security hooks (2FA, audit logs, rate limiting)
- ✅ Vercel deployment ready

**De MVP is klaar voor launch! 🎯**

---

## 11. 📝 Deployment Instructies

1. **Upload naar GitHub**:
   ```bash
   git add .
   git commit -m "WeAreJobPilot MVP - Complete implementation"
   git push origin main
   ```

2. **Vercel configuratie**:
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm -w run build --filter=./apps/web`
   - Install Command: `cd ../.. && pnpm install --no-frozen-lockfile`

3. **Environment Variables**:
   - `CRON_SECRET` = `x7k9p2m4`
   - `VERCEL_FORCE_NO_BUILD_CACHE` = `1`

**De WeAreJobPilot MVP is volledig geïmplementeerd en klaar voor productie! 🚀**
