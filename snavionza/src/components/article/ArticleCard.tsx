import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import CategoryBadge from '@/components/ui/CategoryBadge';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'horizontal' | 'compact';
}

export default function ArticleCard({ post, variant = 'default' }: ArticleCardProps) {
  const publishDate = post.published_at || post.created_at;

  if (variant === 'horizontal') {
    return (
      <article className="flex gap-5 group">
        {post.featured_image && (
          <Link href={`/blog/${post.slug}`} className="shrink-0">
            <div className="relative w-32 h-24 sm:w-48 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 128px, 192px"
              />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          {post.category && <CategoryBadge category={post.category} className="mb-2" />}
          <h3 className="font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {format(new Date(publishDate), 'MMM d, yyyy')}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.reading_time} min read
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group">
        <h3 className="font-medium text-gray-900 leading-snug mb-1">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{format(new Date(publishDate), 'MMM d, yyyy')}</span>
          {post.reading_time && <span>· {post.reading_time} min</span>}
        </div>
      </article>
    );
  }

  // Default card
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {post.featured_image ? (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video bg-gray-100">
          <Image
            src={post.featured_image}
            alt={post.title}
            width={600}
            height={340}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <span className="text-blue-200 text-5xl font-bold">S</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {post.category && <CategoryBadge category={post.category} className="mb-3" />}

        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {format(new Date(publishDate), 'MMM d, yyyy')}
          </span>
          {post.reading_time && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.reading_time} min read
            </span>
          )}
          <span className="ml-auto text-gray-400">Snavionza Editorial</span>
        </div>
      </div>
    </article>
  );
}
