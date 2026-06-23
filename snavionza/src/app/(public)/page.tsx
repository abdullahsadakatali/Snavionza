import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import FeaturedArticle from '@/components/article/FeaturedArticle';
import ArticleCard from '@/components/article/ArticleCard';
import NewsletterHero from '@/components/newsletter/NewsletterHero';
import SearchBar from '@/components/search/SearchBar';
import { siteConfig } from '@/lib/utils/seo';
import { ArrowRight, BookOpen, Zap, TrendingUp, PenTool, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

const categories = [
  { name: 'AI Writing', slug: 'ai-writing', icon: PenTool, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'AI Productivity', slug: 'ai-productivity', icon: Zap, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'AI Marketing', slug: 'ai-marketing', icon: TrendingUp, color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { name: 'AI Automation', slug: 'ai-automation', icon: Zap, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'AI Tool Reviews', slug: 'ai-tool-reviews', icon: BookOpen, color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Creator Tools', slug: 'creator-tools', icon: Users, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Business Productivity', slug: 'business-productivity', icon: Briefcase, color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'AI Workflows', slug: 'ai-workflows', icon: Zap, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
];

async function getHomepageData() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(10);

  return { posts: (posts as Post[]) || [] };
}

export default async function HomePage() {
  const { posts } = await getHomepageData();

  const featuredPosts = posts.slice(0, 2);
  const latestPosts = posts.slice(2, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-200">
            <BookOpen size={14} />
            AI Tools &amp; Productivity Resource Hub
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Work Smarter with{' '}
            <span className="text-blue-600">AI Tools</span> &amp;{' '}
            <span className="text-blue-600">Productivity</span> Guides
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert reviews, workflow guides, and automation tips for creators, entrepreneurs, and business professionals.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Browse All Articles
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Recommended Tools
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Guides Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Guides</h2>
              <Link href="/blog" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedArticle key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Articles Section */}
        {latestPosts.length > 0 && (
          <section className="py-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <Link href="/blog" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state for new site */}
        {posts.length === 0 && (
          <section className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen size={28} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Articles Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We&apos;re crafting expert AI tools and productivity guides. Subscribe to be the first to know when we publish.
              </p>
            </div>
          </section>
        )}

        {/* Popular Categories Section */}
        <section className="py-16 border-t border-gray-100" id="categories">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all hover:shadow-sm hover:-translate-y-0.5 ${cat.color}`}
              >
                <cat.icon size={20} className="shrink-0" />
                <span className="text-sm font-semibold leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 border-t border-gray-100">
          <NewsletterHero />
        </section>

        {/* Recommended Tools Teaser */}
        <section className="py-16 border-t border-gray-100">
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full mb-4">
                Affiliate-Tested
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Recommended AI Tools
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Tools we&apos;ve personally tested and recommend for creators, writers, and business owners. Every recommendation is honest and based on real experience.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                View Recommended Tools
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {['AI Writing', 'AI Design', 'Automation', 'SEO Tools'].map((tool) => (
                <div key={tool} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Zap size={18} className="text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-gray-700">{tool}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
