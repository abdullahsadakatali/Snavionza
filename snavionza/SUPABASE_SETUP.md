# Supabase Setup Guide — Snavionza

Follow these steps to set up your Supabase backend for Snavionza.

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Choose a name (e.g. `snavionza`) and a strong database password
4. Select the region closest to your audience
5. Wait for the project to be created (~2 minutes)

---

## Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings → API**
2. Copy the following values to your `.env.local` file:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Never expose the `service_role` key publicly. It's only used server-side.

---

## Step 3: Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Paste the entire SQL below and click **Run**:

```sql
-- ============================================================
-- SNAVIONZA DATABASE SCHEMA
-- ============================================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  meta_title TEXT,
  meta_description TEXT,
  reading_time INTEGER,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public: read published posts only
CREATE POLICY "public_read_published_posts" ON posts
  FOR SELECT USING (status = 'published');

-- Public: read all categories
CREATE POLICY "public_read_categories" ON categories
  FOR SELECT USING (true);

-- Authenticated admin: full access to posts
CREATE POLICY "admin_all_posts" ON posts
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated admin: full access to categories
CREATE POLICY "admin_all_categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Public: insert subscribers
CREATE POLICY "public_insert_subscribers" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated admin: read subscribers
CREATE POLICY "admin_read_subscribers" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Public: insert contact messages
CREATE POLICY "public_insert_contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Authenticated admin: read contact messages
CREATE POLICY "admin_read_contact_messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- AUTO-UPDATE updated_at ON POSTS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- ============================================================
-- SEED CATEGORIES
-- ============================================================

INSERT INTO categories (name, slug, description) VALUES
  ('AI Writing', 'ai-writing', 'Tools and guides for AI-powered writing and content creation'),
  ('AI Productivity', 'ai-productivity', 'Boost your productivity using AI tools and systems'),
  ('AI Marketing', 'ai-marketing', 'AI tools for email marketing, social media, and growth'),
  ('AI Automation', 'ai-automation', 'Automate repetitive tasks and workflows with AI'),
  ('AI Tool Reviews', 'ai-tool-reviews', 'In-depth reviews of the best AI software and tools'),
  ('AI Comparisons', 'ai-comparisons', 'Side-by-side comparisons of AI tools and platforms'),
  ('AI Workflows', 'ai-workflows', 'Practical AI workflow guides for creators and professionals'),
  ('Creator Tools', 'creator-tools', 'Tools designed for content creators, YouTubers, and bloggers'),
  ('Business Productivity', 'business-productivity', 'AI and productivity tools for business professionals'),
  ('Student Productivity', 'student-productivity', 'AI tools and study systems for students')
ON CONFLICT (slug) DO NOTHING;
```

---

## Step 4: Create Your Admin User

1. In Supabase, go to **Authentication → Users**
2. Click **Invite user** (or **Add user**)
3. Enter your email address and a strong password
4. This account will be your admin login at `/admin/login`

---

## Step 5: Set Up Storage (for Media Library)

1. In Supabase, go to **Storage**
2. Click **New bucket**
3. Name it: `article-images`
4. Check **Public bucket** ✓
5. Click **Create bucket**
6. Go to **Storage → Policies** and add a policy for authenticated uploads:
   ```sql
   CREATE POLICY "authenticated_upload" ON storage.objects
     FOR INSERT TO authenticated
     WITH CHECK (bucket_id = 'article-images');
   ```

---

## Step 6: Enable Full-Text Search (optional but recommended)

For better search performance, add this index:

```sql
CREATE INDEX IF NOT EXISTS posts_search_idx ON posts
  USING gin(to_tsvector('english', title || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, '')));
```

---

## Step 7: Verify Setup

Run this query to confirm everything is working:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see: `categories`, `contact_messages`, `posts`, `subscribers`

---

✅ **Setup complete!** You can now:
- Start the dev server: `npm run dev`
- Log in at: `http://localhost:3000/admin/login`
- Create your first article: `http://localhost:3000/admin/articles/new`
