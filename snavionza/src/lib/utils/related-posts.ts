import { Post } from '@/lib/types';

/**
 * Finds related articles based on same category, excluding the current post.
 * Returns up to `limit` posts sorted by published date descending.
 */
export function findRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit = 3
): Post[] {
  return allPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        post.category_id === currentPost.category_id &&
        post.status === 'published'
    )
    .sort(
      (a, b) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime()
    )
    .slice(0, limit);
}

/**
 * Finds internal link suggestions based on keyword matching.
 * Matches published post titles against words in the current content.
 */
export function findInternalLinkSuggestions(
  currentPostId: string,
  content: string,
  allPosts: Post[],
  limit = 5
): Array<{ title: string; slug: string; excerpt: string | null }> {
  const contentLower = content.toLowerCase();

  return allPosts
    .filter(
      (post) =>
        post.id !== currentPostId &&
        post.status === 'published' &&
        contentLower.includes(post.title.toLowerCase().split(' ').slice(0, 3).join(' '))
    )
    .slice(0, limit)
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
    }));
}
