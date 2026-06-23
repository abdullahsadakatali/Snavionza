import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Post, Category } from '@/lib/types';
import ArticleGrid from '@/components/article/ArticleGrid';
import NewsletterInline from '@/components/newsletter/NewsletterInline';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';
import { generateCanonicalUrl } from '@/lib/utils/seo';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getCategory(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  return data as Category | null;
}

async function getCategoryPosts(categoryId: string, page = 1) {
  const supabase = await createClient();
  const perPage = 12;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from('posts')
    .select('*, category:categories(*)', { count: 'exact' })
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .order('published_at', { ascending: false })
    .range(from, to);

  return { posts: (data as Post[]) || [], total: count || 0, perPage };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Articles — Snavionza`,
    description: category.description || `Browse all ${category.name} articles on Snavionza.`,
    alternates: { canonical: generateCanonicalUrl(`/category/${slug}`) },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || '1');

  const category = await getCategory(slug);
  if (!category) notFound();

  const { posts, total, perPage } = await getCategoryPosts(category.id, page);
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: category.name }]} />
      </div>

      <header className="mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-xl text-gray-600 max-w-2xl">{category.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-4">
          {total} article{total !== 1 ? 's' : ''}
        </p>
      </header>

      <ArticleGrid posts={posts} columns={3} emptyMessage="No articles in this category yet. Check back soon!" />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {page > 1 && (
            <Link
              href={`/category/${slug}?page=${page - 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-gray-600">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link
              href={`/category/${slug}?page=${page + 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next →
            </Link>
          )}
        </div>
      )}

      <div className="mt-16">
        <NewsletterInline />
      </div>
    </div>
  );
}
