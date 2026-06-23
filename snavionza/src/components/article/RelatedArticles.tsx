import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import CategoryBadge from '@/components/ui/CategoryBadge';

interface RelatedArticlesProps {
  posts: Post[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Related articles" className="mt-12 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const publishDate = post.published_at || post.created_at;
          return (
            <article key={post.id} className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {post.featured_image ? (
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video bg-gray-100">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-blue-200 text-4xl font-bold">S</span>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                {post.category && <CategoryBadge category={post.category} className="mb-2" />}
                <h3 className="font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                  <span>{format(new Date(publishDate), 'MMM d, yyyy')}</span>
                  {post.reading_time && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} />{post.reading_time} min
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
