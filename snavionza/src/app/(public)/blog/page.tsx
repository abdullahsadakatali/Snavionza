import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import ArticleGrid from '@/components/article/ArticleGrid';
import SearchBar from '@/components/search/SearchBar';
import NewsletterInline from '@/components/newsletter/NewsletterInline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — AI Tools, Productivity & Automation Guides',
  description: 'Explore expert articles on AI writing tools, productivity software, automation workflows, and creator resources.',
};

const categories = [
  { name: 'All', slug: '' },
  { name: 'AI Writing', slug: 'ai-writing' },
  { name: 'AI Productivity', slug: 'ai-productivity' },
  { name: 'AI Marketing', slug: 'ai-marketing' },
  { name: 'AI Automation', slug: 'ai-automation' },
  { name: 'AI Tool Reviews', slug: 'ai-tool-reviews' },
  { name: 'AI Comparisons', slug: 'ai-comparisons' },
  { name: 'AI Workflows', slug: 'ai-workflows' },
  { name: 'Creator Tools', slug: 'creator-tools' },
  { name: 'Business Productivity', slug: 'business-productivity' },
  { name: 'Student Productivity', slug: 'student-productivity' },
];

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function getPosts(categorySlug?: string, page = 1) {
  const supabase = await createClient();
  const perPage = 12;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from('posts')
    .select('*, category:categories(*)', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { data, count } = await query;
  return { posts: (data as Post[]) || [], total: count || 0, perPage };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeCat = params.category || '';
  const page = parseInt(params.page || '1');
  const { posts, total, perPage } = await getPosts(activeCat, page);
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-6">
          Expert guides on AI tools, productivity systems, automation workflows, and creator resources.
        </p>
        <div className="max-w-lg">
          <SearchBar />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-gray-200">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug ? `/blog?category=${cat.slug}` : '/blog'}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCat === cat.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Results count */}
      {total > 0 && (
        <p className="text-sm text-gray-500 mb-6">
          {total} article{total !== 1 ? 's' : ''}
          {activeCat && ` in ${categories.find((c) => c.slug === activeCat)?.name}`}
        </p>
      )}

      {/* Article Grid */}
      <ArticleGrid posts={posts} columns={3} emptyMessage="No articles found in this category yet." />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {page > 1 && (
            <Link
              href={`/blog?${activeCat ? `category=${activeCat}&` : ''}page=${page - 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ← Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/blog?${activeCat ? `category=${activeCat}&` : ''}page=${page + 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterInline />
      </div>
    </div>
  );
}
