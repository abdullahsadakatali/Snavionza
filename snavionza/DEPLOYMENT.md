# Deployment Guide — Snavionza

Complete guide to deploying Snavionza to Netlify with Supabase backend.

---

## Prerequisites

Before deploying, make sure you have:
- [ ] Completed the [Supabase setup](./SUPABASE_SETUP.md)
- [ ] A Netlify account ([netlify.com](https://netlify.com))
- [ ] Your `.env.local` filled in (copy from `.env.local.example`)
- [ ] Node.js 20+ installed locally

---

## Step 1: Install Netlify Next.js Plugin

```bash
npm install @netlify/plugin-nextjs --save-dev
```

---

## Step 2: Test Build Locally

Before deploying, always verify the build passes:

```bash
npm run build
```

Fix any TypeScript or build errors before proceeding.

---

## Step 3: Push to GitHub

1. Create a new GitHub repository (private recommended)
2. Push your code:
```bash
git init
git add .
git commit -m "Initial Snavionza build"
git remote add origin https://github.com/yourusername/snavionza.git
git push -u origin main
```

---

## Step 4: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Choose your `snavionza` repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20`

---

## Step 5: Add Environment Variables

In your Netlify site dashboard, go to **Site configuration → Environment variables** and add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://www.snavionza.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 ID (e.g. `G-XXXXXXXXXX`) |
| `MAILERLITE_API_KEY` | Your MailerLite API key (when ready) |

---

## Step 6: Deploy

Click **Deploy site**. Netlify will:
1. Pull your code from GitHub
2. Install dependencies
3. Run `npm run build`
4. Deploy to a `.netlify.app` URL

---

## Step 7: Add Custom Domain

1. Go to **Domain management → Add a domain**
2. Enter `snavionza.com`
3. Follow the DNS configuration steps
4. Enable HTTPS (auto-managed by Netlify)

**Recommended DNS setup (at your domain registrar):**
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

---

## Step 8: Set Up Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property → **Web**
3. Enter `snavionza.com` as the website URL
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Add it to Netlify environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
6. Redeploy to activate tracking

---

## Step 9: Set Up Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://www.snavionza.com`
3. Verify ownership using the **HTML tag** method:
   - Copy the verification meta tag content value
   - In `src/app/layout.tsx`, replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_ID` with your actual verification code
   - Redeploy
4. Submit your sitemap: `https://www.snavionza.com/sitemap.xml`

---

## Step 10: Submit Sitemap to Google

After deploying with your domain:
1. In Google Search Console, go to **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

---

## Automatic Deploys

Every `git push` to your `main` branch will automatically trigger a new Netlify deployment. This is your publish workflow:

1. Write article in admin dashboard
2. Publish article (saves to Supabase)
3. Article is live immediately (no redeploy needed — Next.js fetches from Supabase at request time)

> **Note:** Static pages (About, Privacy, etc.) are cached. If you edit them in code, you'll need to push and redeploy.

---

## Performance Checklist

After deploying, verify:
- [ ] Lighthouse score ≥ 90 on mobile and desktop
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Admin login works at `/admin/login`
- [ ] Newsletter form subscribes correctly
- [ ] Contact form stores messages in Supabase
- [ ] GA4 is receiving pageview events

---

## Troubleshooting

**Build fails: "Cannot find module"**
→ Run `npm install` locally and push again

**Supabase connection error**
→ Check environment variables are set correctly in Netlify

**Admin login not working**
→ Ensure you created a user in Supabase Auth (see SUPABASE_SETUP.md Step 4)

**Images not loading**
→ Verify your Supabase Storage bucket is set to Public

---

✅ **Snavionza is live!** Start publishing articles and building your audience.
