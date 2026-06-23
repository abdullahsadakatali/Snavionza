import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import CategoryBadge from '@/components/ui/CategoryBadge';

interface FeaturedArticleProps {
  post: Post;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const publishDate = post.published_at || post.created_at;

  return (
    <article className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[360px]">
        {/* Image */}
        <div className="lg:col-span-3 relative bg-gray-100 min-h-[240px] lg:min-h-0">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white/20 text-9xl font-bold">S</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-10">
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-3">
              Featured Guide
            </span>
            {post.category && <CategoryBadge category={post.category} className="mb-0" />}
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {format(new Date(publishDate), 'MMMM d, yyyy')}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.reading_time} min read
              </span>
            )}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-150"
          >
            Read Article
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
