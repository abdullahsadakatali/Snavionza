const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { marked } = require('marked');

// 1. Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found at', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  // Strip comments and parse
  const cleanLine = line.split('#')[0].trim();
  if (!cleanLine) return;
  const match = cleanLine.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or Service Role Key is missing in .env.local');
  console.error('URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('Service Key:', supabaseServiceKey ? 'Set' : 'Missing');
  process.exit(1);
}

// Create service client (bypasses RLS to seed database)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  console.log('Reading article markdown file...');
  const articlePath = path.join(__dirname, '..', 'content', 'best-ai-tools-for-students-2026.md');
  if (!fs.existsSync(articlePath)) {
    console.error('Markdown article not found at', articlePath);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(articlePath, 'utf8');
  
  // 2. Parse front matter
  const frontMatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!frontMatterMatch) {
    console.error('Invalid markdown format: missing front matter.');
    process.exit(1);
  }

  const frontMatterText = frontMatterMatch[1];
  const markdownContent = frontMatterMatch[2];

  const meta = {};
  frontMatterText.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let val = parts.slice(1).join(':').trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      meta[key] = val;
    }
  });

  console.log('Parsed Metadata:', {
    title: meta.title,
    slug: meta.slug,
    category: meta.category,
  });

  // 3. Find Category ID
  const categorySlug = 'student-productivity'; // slug of 'Student Productivity'
  console.log(`Querying category with slug: "${categorySlug}"...`);
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) {
    console.error('Error finding category:', catError?.message || 'Category not found.');
    console.log('Seeding fallback category...');
    // Create the category if not exists
    const { data: newCat, error: insertCatError } = await supabase
      .from('categories')
      .insert({
        name: 'Student Productivity',
        slug: categorySlug,
        description: 'AI tools and study systems for students'
      })
      .select()
      .single();

    if (insertCatError) {
      console.error('Failed to create category:', insertCatError.message);
      process.exit(1);
    }
    category = newCat;
  }

  console.log(`Using Category: "${category.name}" (ID: ${category.id})`);

  // 4. Convert markdown to HTML using marked
  console.log('Converting markdown to HTML...');
  const htmlContent = await marked.parse(markdownContent);

  // 5. Check if post already exists
  const { data: existingPost } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', meta.slug)
    .single();

  const postPayload = {
    title: meta.title,
    slug: meta.slug,
    excerpt: meta.excerpt,
    content: htmlContent,
    featured_image: '/images/best-ai-tools-for-students.png',
    category_id: category.id,
    status: 'published',
    meta_title: meta.meta_title,
    meta_description: meta.meta_description,
    reading_time: 20, // Approx 4000+ words
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  let result;
  if (existingPost) {
    console.log(`Post with slug "${meta.slug}" already exists. Updating existing post...`);
    result = await supabase
      .from('posts')
      .update(postPayload)
      .eq('id', existingPost.id)
      .select();
  } else {
    console.log(`Creating new post with slug "${meta.slug}"...`);
    result = await supabase
      .from('posts')
      .insert(postPayload)
      .select();
  }

  if (result.error) {
    console.error('Error saving post:', result.error.message);
    process.exit(1);
  }

  console.log('🎉 SUCCESS! Article seeded successfully inside Supabase database.');
}

run().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
