import { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import ArticleCard from '@/components/article/ArticleCard';
import SearchBar from '@/components/search/SearchBar';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search — Snavionza',
  description: 'Search AI tools reviews, productivity guides, and automation articles on Snavionza.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return [];
  const supabase = await createClient();

  const { data } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false })
    .limit(20);

  return (data as Post[]) || [];
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchPosts(query);

  if (!query) return null;

  return (
    <div>
      <p className="text-gray-600 mb-8">
        {results.length > 0
          ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
          : `No results found for "${query}"`}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">No results found</p>
          <p className="text-gray-500">Try different keywords or browse our categories.</p>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const query = sp.q || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        {query ? `Search Results` : 'Search'}
      </h1>

      <div className="max-w-2xl mb-10">
        <SearchBar initialQuery={query} variant="hero" />
      </div>

      <Suspense fallback={<p className="text-gray-500">Searching...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
