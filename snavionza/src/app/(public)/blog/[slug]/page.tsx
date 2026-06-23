import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types';
import { generateTableOfContents } from '@/lib/utils/toc';
import { generateMetaTitle, generateMetaDescription, generateCanonicalUrl, siteConfig } from '@/lib/utils/seo';
import { format } from 'date-fns';
import { Clock, Calendar, User, RefreshCw } from 'lucide-react';
import ArticleBody from '@/components/article/ArticleBody';
import TableOfContents from '@/components/article/TableOfContents';
import ReadingProgress from '@/components/article/ReadingProgress';
import RelatedArticles from '@/components/article/RelatedArticles';
import SocialShare from '@/components/article/SocialShare';
import CategoryBadge from '@/components/ui/CategoryBadge';
import NewsletterInline from '@/components/newsletter/NewsletterInline';
import NewsletterSidebar from '@/components/newsletter/NewsletterSidebar';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import ArticleSchema from '@/components/seo/ArticleSchema';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return null;

  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('category_id', post.category_id)
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(3);

  return { post: post as Post, relatedPosts: (relatedPosts as Post[]) || [] };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) return { title: 'Article Not Found' };

  const { post } = data;
  const title = generateMetaTitle(post.title, post.meta_title);
  const description = generateMetaDescription(post.excerpt, post.meta_description);
  const canonical = generateCanonicalUrl(`/blog/${post.slug}`);
  const image = post.featured_image || siteConfig.defaultImage;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Snavionza Editorial'],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}



export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) notFound();

  const { post, relatedPosts } = data;
  const toc = generateTableOfContents(post.content || '');
  const publishDate = post.published_at || post.created_at;
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <ArticleSchema post={post} />
      <ReadingProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              ...(post.category ? [{ label: post.category.name, href: `/category/${post.category.slug}` }] : []),
              { label: post.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Main article column */}
          <article>
            {/* Article Header */}
            <header className="mb-8">
              {post.category && <CategoryBadge category={post.category} className="mb-4" />}

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-6 border-b border-gray-200">
                <span className="flex items-center gap-1.5">
                  <User size={15} />
                  Snavionza Editorial
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  {format(new Date(publishDate), 'MMMM d, yyyy')}
                </span>
                {post.reading_time && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} />
                    {post.reading_time} min read
                  </span>
                )}
                {post.updated_at !== post.created_at && (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw size={13} />
                    Updated {format(new Date(post.updated_at), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-8">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            )}

            {/* Mobile TOC */}
            {toc.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

            {/* Affiliate Disclosure */}
            <AffiliateDisclosure />

            {/* Article Body */}
            {post.content && <ArticleBody content={post.content} />}

            {/* Share + Newsletter */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <SocialShare title={post.title} url={articleUrl} />
            </div>

            <NewsletterInline />

            {/* Related Articles */}
            <RelatedArticles posts={relatedPosts} />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              {toc.length > 0 && <TableOfContents items={toc} />}

              {/* Newsletter */}
              <NewsletterSidebar />

              {/* Back to blog */}
              <div className="pt-2">
                <a href="/blog" className="text-sm text-blue-600 hover:underline">
                  ← Back to Blog
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
