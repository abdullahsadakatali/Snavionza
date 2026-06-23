# Snavionza

> **Helping Creators Work Smarter with AI**

A production-ready, SEO-first, affiliate-ready blogging platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

---

## 🚀 Quick Start

### 1. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your values in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 2. Set Up Supabase

Follow the complete guide: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

This includes: database schema, RLS policies, admin user creation, and storage setup.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### 4. Deploy to Netlify

Follow the complete guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Editor | TipTap |
| Hosting | Netlify |
| Analytics | Google Analytics 4 |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── blog/               # Blog listing + articles
│   ├── category/           # Category pages
│   ├── search/             # Search results
│   ├── about/              # About page
│   ├── contact/            # Contact form
│   ├── newsletter/         # Newsletter signup
│   ├── tools/              # Recommended tools
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── affiliate-disclosure/
│   ├── admin/              # Password-protected admin
│   ├── api/                # API routes
│   ├── sitemap.ts          # Dynamic XML sitemap
│   └── robots.ts           # Dynamic robots.txt
├── components/
│   ├── layout/             # Header, Footer, Breadcrumb
│   ├── article/            # Article cards, TOC, progress bar
│   ├── affiliate/          # Tool boxes, comparison blocks
│   ├── newsletter/         # Newsletter forms
│   ├── search/             # Search bar
│   ├── seo/                # JSON-LD schema
│   ├── ui/                 # Buttons, badges
│   └── admin/              # Editor, SEO checklist, AI assistant
└── lib/
    ├── supabase/           # Browser + server clients
    ├── utils/              # slug, reading-time, TOC, SEO
    └── types/              # TypeScript interfaces
```

---

## ✨ Features

### Public Website
- ✅ Homepage with hero, featured articles, categories, newsletter CTA
- ✅ Blog listing with category filter and pagination
- ✅ Full article page with sticky TOC, reading progress, related articles
- ✅ Category pages
- ✅ Site-wide search
- ✅ About, Contact, Newsletter, Tools, Legal pages
- ✅ Custom 404 page

### SEO
- ✅ Dynamic `generateMetadata()` on every page
- ✅ Open Graph + Twitter Card tags
- ✅ Article JSON-LD + Breadcrumb schema
- ✅ Dynamic XML sitemap (`/sitemap.xml`)
- ✅ Dynamic robots.txt (`/robots.txt`)
- ✅ Canonical URLs
- ✅ Semantic HTML throughout

### Admin Dashboard
- ✅ Supabase Auth login (email + password)
- ✅ Dashboard with stats and content update reminders
- ✅ TipTap rich text editor (headings, lists, tables, code blocks, links, images)
- ✅ AI Draft Assistant (outline generator)
- ✅ SEO Checklist (pre-publish validation)
- ✅ Auto slug + reading time generation
- ✅ Schedule publication
- ✅ Category management (CRUD)
- ✅ Supabase Storage media upload
- ✅ Subscriber list view

### Affiliate Marketing
- ✅ Recommended Tool Box component
- ✅ Tool Comparison Block
- ✅ Pros & Cons Block
- ✅ Key Takeaways Block
- ✅ Affiliate Disclosure component
- ✅ Recommended Tools hub page

### Newsletter
- ✅ Newsletter forms (homepage, article inline, sidebar, dedicated page)
- ✅ Subscribers stored in Supabase
- ✅ MailerLite API hook ready (add key to `.env.local`)

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Database schema, RLS, storage setup |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Netlify deployment guide |
| [.env.local.example](./.env.local.example) | Environment variables reference |

---

## 📝 Content Categories

1. AI Writing
2. AI Productivity
3. AI Marketing
4. AI Automation
5. AI Tool Reviews
6. AI Comparisons
7. AI Workflows
8. Creator Tools
9. Business Productivity
10. Student Productivity

---

## 🔒 Admin Access

1. Go to `/admin/login`
2. Sign in with the email/password you created in Supabase Auth
3. You'll be redirected to `/admin` dashboard

All admin routes are protected by Supabase Auth via Next.js middleware.

---

## 📊 Analytics Setup

Add your GA4 Measurement ID to `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

For Google Search Console, replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_ID` in `src/app/layout.tsx`.

---

Built with ❤️ for long-term content publishing and organic growth.
