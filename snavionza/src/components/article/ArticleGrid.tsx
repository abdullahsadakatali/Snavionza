import { Post } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  posts: Post[];
  columns?: 2 | 3;
  emptyMessage?: string;
}

export default function ArticleGrid({ posts, columns = 3, emptyMessage = 'No articles found.' }: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  const gridClass = columns === 2
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  );
}
